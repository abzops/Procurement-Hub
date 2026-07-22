-- Procurement audit workspace
-- Apply after the existing Procurement Hub schema and migrations 001-006.

alter table public.vendors
  add column if not exists vendor_category text,
  add column if not exists contact_person_2 text,
  add column if not exists phone_2 text,
  add column if not exists currency_code text default 'INR'
    check (currency_code is null or currency_code ~ '^[A-Z]{3}$');

alter table public.purchase_orders
  add column if not exists purchase_category text,
  add column if not exists currency_code text default 'INR'
    check (currency_code is null or currency_code ~ '^[A-Z]{3}$'),
  add column if not exists gst_included boolean,
  add column if not exists advance_paid numeric(14, 2) default 0
    check (advance_paid >= 0),
  add column if not exists audit_status text default 'Pending'
    check (audit_status in ('Pending', 'In Progress', 'Completed'));

create table if not exists public.po_line_audits (
  line_id text primary key,
  po_number text not null,
  vendor_name text,
  purchase_type text,
  audit_type text,
  item_maturity text,
  vendor_type text,
  purchase_urgency text,
  quote_count integer,
  technical_validation text,
  price_benchmark_available boolean,
  benchmark_unit_price numeric(14, 4),
  backup_vendor_available boolean,
  risk_level text,
  action_required text,
  price_variance numeric(12, 2),
  delivery_variance integer,
  quality_variance text,
  notes text,
  updated_at timestamptz not null default now(),
  constraint po_line_audits_quote_count_check
    check (quote_count is null or quote_count >= 0),
  constraint po_line_audits_benchmark_check
    check (benchmark_unit_price is null or benchmark_unit_price >= 0),
  constraint po_line_audits_purchase_type_check
    check (purchase_type is null or purchase_type in ('Prototype', 'Production', 'Consumable', 'Tooling')),
  constraint po_line_audits_audit_type_check
    check (audit_type is null or audit_type in ('Routine', 'Technical', 'Commercial')),
  constraint po_line_audits_item_maturity_check
    check (item_maturity is null or item_maturity in ('Prototype', 'Alpha', 'Beta', 'Production')),
  constraint po_line_audits_vendor_type_check
    check (vendor_type is null or vendor_type in ('OEM', 'Distributor', 'Local Manufacturer')),
  constraint po_line_audits_urgency_check
    check (purchase_urgency is null or purchase_urgency in ('Low', 'Medium', 'High', 'Critical')),
  constraint po_line_audits_validation_check
    check (technical_validation is null or technical_validation in ('Pending', 'Yes', 'No', 'Approved', 'Failed')),
  constraint po_line_audits_risk_check
    check (risk_level is null or risk_level in ('Low', 'Medium', 'High', 'Critical'))
);

create table if not exists public.procurement_vendor_audits (
  vendor_name text primary key,
  price_competitiveness numeric(4, 2),
  quality numeric(4, 2),
  delivery_reliability numeric(4, 2),
  technical_capability numeric(4, 2),
  responsiveness numeric(4, 2),
  payment_flexibility numeric(4, 2),
  documentation_discipline numeric(4, 2),
  notes text,
  updated_at timestamptz not null default now(),
  constraint procurement_vendor_audits_score_check check (
    (price_competitiveness is null or price_competitiveness between 1 and 10)
    and (quality is null or quality between 1 and 10)
    and (delivery_reliability is null or delivery_reliability between 1 and 10)
    and (technical_capability is null or technical_capability between 1 and 10)
    and (responsiveness is null or responsiveness between 1 and 10)
    and (payment_flexibility is null or payment_flexibility between 1 and 10)
    and (documentation_discipline is null or documentation_discipline between 1 and 10)
  )
);

create table if not exists public.po_invoices (
  id text primary key default gen_random_uuid()::text,
  po_number text not null,
  vendor_name text,
  invoice_number text not null,
  invoice_date date,
  invoice_amount numeric(14, 2) not null
    check (invoice_amount > 0),
  gst_correct text default 'Pending',
  freight_included boolean default false,
  freight_amount numeric(14, 2) default 0
    check (freight_amount >= 0),
  extra_charges numeric(14, 2) default 0
    check (extra_charges >= 0),
  evidence_reference text,
  comments text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (po_number, invoice_number),
  constraint po_invoices_gst_correct_check
    check (gst_correct in ('Pending', 'Correct', 'Incorrect', 'Not Applicable'))
);

create table if not exists public.po_payments (
  id text primary key default gen_random_uuid()::text,
  po_number text not null,
  invoice_id text references public.po_invoices(id) on delete set null,
  payment_date date,
  payment_type text,
  amount numeric(14, 2) not null
    check (amount > 0),
  payment_reference text,
  proof_available boolean default false,
  approved boolean default false,
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint po_payments_type_check
    check (payment_type is null or payment_type in ('Advance', 'Balance', 'Final', 'Refund', 'Other'))
);

create table if not exists public.po_receipts (
  id text primary key default gen_random_uuid()::text,
  po_number text not null,
  line_id text,
  grn_number text,
  grn_date date,
  received_quantity numeric(14, 3) default 0
    check (received_quantity >= 0),
  inspection_status text default 'Pending',
  rejection_quantity numeric(14, 3) default 0
    check (rejection_quantity >= 0),
  delivery_challan text,
  test_certificate text,
  warranty_reference text,
  comments text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint po_receipts_rejection_check
    check (rejection_quantity <= received_quantity),
  constraint po_receipts_inspection_check
    check (inspection_status in ('Pending', 'Passed', 'Failed', 'Conditional'))
);

create table if not exists public.procurement_documents (
  id text primary key default gen_random_uuid()::text,
  po_number text,
  vendor_name text,
  document_type text not null,
  status text not null default 'Missing',
  comments text,
  updated_at timestamptz not null default now(),
  constraint procurement_documents_status_check
    check (status in ('Missing', 'Requested', 'Received', 'Verified', 'Rejected', 'Not Required'))
);

create table if not exists public.procurement_risks (
  id text primary key default gen_random_uuid()::text,
  item_po text,
  finding text not null,
  risk text,
  evidence text,
  impact text,
  action text,
  owner text,
  priority text not null default 'Medium',
  due_date date,
  status text not null default 'Open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint procurement_risks_priority_check
    check (priority in ('Critical', 'High', 'Medium', 'Low')),
  constraint procurement_risks_status_check
    check (status in ('Open', 'Mitigated', 'Closed'))
);

create table if not exists public.procurement_actions (
  id text primary key default gen_random_uuid()::text,
  risk_id text references public.procurement_risks(id) on delete set null,
  description text not null,
  owner text,
  priority text not null default 'Medium',
  due_date date,
  status text not null default 'Open',
  comments text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint procurement_actions_priority_check
    check (priority in ('Critical', 'High', 'Medium', 'Low')),
  constraint procurement_actions_status_check
    check (status in ('Open', 'In Progress', 'Closed'))
);

create index if not exists po_invoices_po_number_idx
  on public.po_invoices (po_number);
create index if not exists po_payments_po_number_idx
  on public.po_payments (po_number);
create index if not exists po_receipts_po_number_idx
  on public.po_receipts (po_number);
create index if not exists procurement_documents_po_number_idx
  on public.procurement_documents (po_number);
create index if not exists procurement_risks_status_idx
  on public.procurement_risks (status, priority);
create index if not exists procurement_actions_status_idx
  on public.procurement_actions (status, priority);

alter table public.procurement_vendor_audits enable row level security;
alter table public.po_line_audits enable row level security;
alter table public.po_invoices enable row level security;
alter table public.po_payments enable row level security;
alter table public.po_receipts enable row level security;
alter table public.procurement_documents enable row level security;
alter table public.procurement_risks enable row level security;
alter table public.procurement_actions enable row level security;

grant select, insert, update, delete on
  public.procurement_vendor_audits,
  public.po_line_audits,
  public.po_invoices,
  public.po_payments,
  public.po_receipts,
  public.procurement_documents,
  public.procurement_risks,
  public.procurement_actions
to authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'procurement_vendor_audits',
    'po_line_audits',
    'po_invoices',
    'po_payments',
    'po_receipts',
    'procurement_documents',
    'procurement_risks',
    'procurement_actions'
  ]
  loop
    execute format('drop policy if exists authenticated_audit_access on public.%I', table_name);
    execute format(
      'create policy authenticated_audit_access on public.%I for all to authenticated using (true) with check (true)',
      table_name
    );
  end loop;
end
$$;
