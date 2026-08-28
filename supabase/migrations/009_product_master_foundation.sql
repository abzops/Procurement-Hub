-- Procurement Hub - Migration 009: Product Master Foundation (P1)
-- Safe, additive, idempotent migration establishing canonical products, product codes, aliases, links, and administrator authorization.

-- 1) Create Sequence for Human-Readable Product Codes
CREATE SEQUENCE IF NOT EXISTS public.product_code_seq START WITH 1 INCREMENT BY 1;

-- 2) Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  normalized_name TEXT NOT NULL,
  category TEXT,
  subcategory TEXT,
  brand TEXT,
  manufacturer_part_no TEXT,
  specification TEXT,
  default_uom TEXT NOT NULL DEFAULT 'Nos',
  hsn_code TEXT,
  default_tax_percent NUMERIC(5, 2) DEFAULT 18.00,
  default_material_type TEXT DEFAULT 'Unknown',
  status TEXT NOT NULL DEFAULT 'Active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT products_status_check
    CHECK (status IN ('Active', 'Inactive')),
  CONSTRAINT products_material_type_check
    CHECK (default_material_type IN ('Unknown', 'RTO', 'MTO')),
  CONSTRAINT products_tax_percent_check
    CHECK (default_tax_percent IS NULL OR (default_tax_percent >= 0 AND default_tax_percent <= 100)),
  CONSTRAINT products_code_format_check
    CHECK (product_code ~ '^SNS-P-[0-9]{5}$')
);

-- 3) Create Product Aliases Table
CREATE TABLE IF NOT EXISTS public.product_aliases (
  alias_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(product_id) ON DELETE RESTRICT,
  alias_text TEXT NOT NULL,
  normalized_alias TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'Manual',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT product_aliases_normalized_unique
    UNIQUE (normalized_alias)
);

-- 4) Create Procurement Admins Table (Authorization Allowlist)
CREATE TABLE IF NOT EXISTS public.procurement_admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT
);

-- 5) Add Nullable Foreign Keys to Existing Tables
ALTER TABLE public.po_lines
  ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(product_id) ON DELETE RESTRICT;

ALTER TABLE public.product_vendor_metrics
  ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(product_id) ON DELETE SET NULL;

-- 6) Create Triggers for Code Generation, Normalization, and Timestamps

-- Code Generator
CREATE OR REPLACE FUNCTION public.generate_product_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.product_code IS NULL OR TRIM(NEW.product_code) = '' THEN
    NEW.product_code := 'SNS-P-' || LPAD(NEXTVAL('public.product_code_seq')::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_generate_code ON public.products;
CREATE TRIGGER trg_products_generate_code
BEFORE INSERT ON public.products
FOR EACH ROW EXECUTE FUNCTION public.generate_product_code();

-- Name Normalization
CREATE OR REPLACE FUNCTION public.sync_product_normalized_name()
RETURNS TRIGGER AS $$
BEGIN
  NEW.normalized_name := REGEXP_REPLACE(LOWER(TRIM(COALESCE(NEW.product_name, ''))), '\s+', ' ', 'g');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_sync_normalized ON public.products;
CREATE TRIGGER trg_products_sync_normalized
BEFORE INSERT OR UPDATE OF product_name ON public.products
FOR EACH ROW EXECUTE FUNCTION public.sync_product_normalized_name();

-- Alias Normalization
CREATE OR REPLACE FUNCTION public.sync_product_alias_normalized()
RETURNS TRIGGER AS $$
BEGIN
  NEW.normalized_alias := REGEXP_REPLACE(LOWER(TRIM(COALESCE(NEW.alias_text, ''))), '\s+', ' ', 'g');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_product_aliases_sync_normalized ON public.product_aliases;
CREATE TRIGGER trg_product_aliases_sync_normalized
BEFORE INSERT OR UPDATE OF alias_text ON public.product_aliases
FOR EACH ROW EXECUTE FUNCTION public.sync_product_alias_normalized();

-- Updated_at Maintenance Trigger
CREATE OR REPLACE FUNCTION public.set_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_column();

DROP TRIGGER IF EXISTS trg_product_aliases_updated_at ON public.product_aliases;
CREATE TRIGGER trg_product_aliases_updated_at
BEFORE UPDATE ON public.product_aliases
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_column();

-- 7) Create Administrator Authorization Check Function
CREATE OR REPLACE FUNCTION public.is_procurement_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  RETURN EXISTS (
    SELECT 1
    FROM public.procurement_admins
    WHERE user_id = auth.uid()
  );
END;
$$;

-- 8) Create Indexes
CREATE INDEX IF NOT EXISTS products_normalized_name_idx ON public.products (normalized_name);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products (category, status);
CREATE INDEX IF NOT EXISTS products_status_idx ON public.products (status);
CREATE INDEX IF NOT EXISTS product_aliases_product_id_idx ON public.product_aliases (product_id);
CREATE INDEX IF NOT EXISTS product_aliases_normalized_idx ON public.product_aliases (normalized_alias);
CREATE INDEX IF NOT EXISTS po_lines_product_id_idx ON public.po_lines (product_id);
CREATE INDEX IF NOT EXISTS product_vendor_metrics_product_id_idx ON public.product_vendor_metrics (product_id);

-- 9) Enable RLS & Strict Security Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurement_admins ENABLE ROW LEVEL SECURITY;

-- Explicitly revoke all mutation permissions from anonymous role
REVOKE INSERT, UPDATE, DELETE ON public.products FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.product_aliases FROM anon;
REVOKE USAGE, SELECT ON SEQUENCE public.product_code_seq FROM anon;
REVOKE ALL ON TABLE public.procurement_admins FROM anon, authenticated;

-- Explicitly drop any obsolete/insecure mutation policies
DROP POLICY IF EXISTS "anon_insert_products" ON public.products;
DROP POLICY IF EXISTS "anon_update_products" ON public.products;
DROP POLICY IF EXISTS "anon_delete_products" ON public.products;
DROP POLICY IF EXISTS "auth_insert_products" ON public.products;
DROP POLICY IF EXISTS "auth_update_products" ON public.products;
DROP POLICY IF EXISTS "auth_delete_products" ON public.products;

DROP POLICY IF EXISTS "anon_insert_aliases" ON public.product_aliases;
DROP POLICY IF EXISTS "anon_update_aliases" ON public.product_aliases;
DROP POLICY IF EXISTS "anon_delete_aliases" ON public.product_aliases;
DROP POLICY IF EXISTS "auth_insert_aliases" ON public.product_aliases;
DROP POLICY IF EXISTS "auth_update_aliases" ON public.product_aliases;
DROP POLICY IF EXISTS "auth_delete_aliases" ON public.product_aliases;

-- Explicit Grants
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE ON public.products TO authenticated;

GRANT SELECT ON public.product_aliases TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_aliases TO authenticated;

GRANT USAGE, SELECT ON SEQUENCE public.product_code_seq TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_procurement_admin() TO anon, authenticated;

-- Policies for public.products (Read: all / Write: admin only)
DROP POLICY IF EXISTS "anon_read_products" ON public.products;
CREATE POLICY "anon_read_products"
ON public.products FOR SELECT
TO anon
USING (true);

DROP POLICY IF EXISTS "auth_read_products" ON public.products;
CREATE POLICY "auth_read_products"
ON public.products FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "admin_insert_products" ON public.products;
CREATE POLICY "admin_insert_products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.is_procurement_admin());

DROP POLICY IF EXISTS "admin_update_products" ON public.products;
CREATE POLICY "admin_update_products"
ON public.products FOR UPDATE
TO authenticated
USING (public.is_procurement_admin())
WITH CHECK (public.is_procurement_admin());

-- Policies for public.product_aliases (Read: all / Write: admin only)
DROP POLICY IF EXISTS "anon_read_aliases" ON public.product_aliases;
CREATE POLICY "anon_read_aliases"
ON public.product_aliases FOR SELECT
TO anon
USING (true);

DROP POLICY IF EXISTS "auth_read_aliases" ON public.product_aliases;
CREATE POLICY "auth_read_aliases"
ON public.product_aliases FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "admin_insert_aliases" ON public.product_aliases;
CREATE POLICY "admin_insert_aliases"
ON public.product_aliases FOR INSERT
TO authenticated
WITH CHECK (public.is_procurement_admin());

DROP POLICY IF EXISTS "admin_update_aliases" ON public.product_aliases;
CREATE POLICY "admin_update_aliases"
ON public.product_aliases FOR UPDATE
TO authenticated
USING (public.is_procurement_admin())
WITH CHECK (public.is_procurement_admin());

DROP POLICY IF EXISTS "admin_delete_aliases" ON public.product_aliases;
CREATE POLICY "admin_delete_aliases"
ON public.product_aliases FOR DELETE
TO authenticated
USING (public.is_procurement_admin());
