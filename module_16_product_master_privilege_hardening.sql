-- Procurement Hub - Migration 010: Product Master Privilege Hardening
-- Explicitly hardens table, sequence, and function grants for client roles (anon, authenticated, PUBLIC).

-- 1) Products Table: Exact Grants (anon: SELECT / authenticated: SELECT, INSERT, UPDATE)
REVOKE ALL PRIVILEGES
ON TABLE public.products
FROM anon, authenticated;

GRANT SELECT
ON TABLE public.products
TO anon;

GRANT SELECT, INSERT, UPDATE
ON TABLE public.products
TO authenticated;

-- 2) Product Aliases Table: Exact Grants (anon: SELECT / authenticated: SELECT, INSERT, UPDATE, DELETE)
REVOKE ALL PRIVILEGES
ON TABLE public.product_aliases
FROM anon, authenticated;

GRANT SELECT
ON TABLE public.product_aliases
TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.product_aliases
TO authenticated;

-- 3) Procurement Admins Table: Zero Client Privileges
REVOKE ALL PRIVILEGES
ON TABLE public.procurement_admins
FROM PUBLIC, anon, authenticated;

-- 4) Product Code Sequence: Authenticated USAGE Only
REVOKE ALL PRIVILEGES
ON SEQUENCE public.product_code_seq
FROM PUBLIC, anon, authenticated;

GRANT USAGE
ON SEQUENCE public.product_code_seq
TO authenticated;

-- 5) Admin Check Function: Revoke PUBLIC Default Execution, Grant anon & authenticated
REVOKE ALL
ON FUNCTION public.is_procurement_admin()
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.is_procurement_admin()
TO anon, authenticated;
