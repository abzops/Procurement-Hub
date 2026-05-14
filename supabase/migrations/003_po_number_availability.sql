-- PO Number Availability system

create table if not exists public.po_master (
  po_number text primary key,
  status text not null default 'Available',
  created_by text,
  created_at timestamptz default now(),
  type text not null default 'Marketplace',
  is_reusable boolean not null default false,
  token_number text,
  updated_at timestamptz default now()
);

create table if not exists public.po_token_log (
  token_number text primary key,
  po_number text not null,
  taken_by text not null,
  type text not null default 'Marketplace',
  timestamp timestamptz not null default now(),
  status text not null default 'Active',
  notes text,
  source text,
  cancelled_at timestamptz,
  cancellation_reason text,
  submitted_at timestamptz,
  released_at timestamptz,
  release_reason text
);

create table if not exists public.reusable_queue (
  po_number text primary key,
  cancelled_by text,
  type text not null default 'Marketplace',
  cancellation_reason text,
  cancelled_date timestamptz not null default now(),
  status text not null default 'Available',
  token_number text
);

create table if not exists public.active_reservations (
  po_number text primary key,
  token_number text unique,
  reserved_by text not null,
  reserved_at timestamptz not null default now(),
  expiry_time timestamptz not null,
  source text,
  type text not null default 'Marketplace'
);

alter table public.po_master
  drop constraint if exists po_master_status_check;
alter table public.po_master
  add constraint po_master_status_check
  check (status in ('Available', 'Reserved', 'Submitted', 'Cancelled', 'Unused'));

alter table public.po_master
  drop constraint if exists po_master_type_check;
alter table public.po_master
  add constraint po_master_type_check
  check (type in ('Marketplace', 'Vendor'));

alter table public.po_token_log
  drop constraint if exists po_token_log_status_check;
alter table public.po_token_log
  add constraint po_token_log_status_check
  check (status in ('Active', 'Submitted', 'Cancelled', 'Unused'));

alter table public.po_token_log
  drop constraint if exists po_token_log_type_check;
alter table public.po_token_log
  add constraint po_token_log_type_check
  check (type in ('Marketplace', 'Vendor'));

alter table public.reusable_queue
  drop constraint if exists reusable_queue_status_check;
alter table public.reusable_queue
  add constraint reusable_queue_status_check
  check (status in ('Available', 'Reserved', 'Used'));

alter table public.reusable_queue
  drop constraint if exists reusable_queue_type_check;
alter table public.reusable_queue
  add constraint reusable_queue_type_check
  check (type in ('Marketplace', 'Vendor'));

alter table public.active_reservations
  drop constraint if exists active_reservations_type_check;
alter table public.active_reservations
  add constraint active_reservations_type_check
  check (type in ('Marketplace', 'Vendor'));

create index if not exists po_token_log_po_number_idx
  on public.po_token_log (po_number);
create index if not exists po_token_log_timestamp_idx
  on public.po_token_log (timestamp desc);
create index if not exists reusable_queue_status_date_idx
  on public.reusable_queue (status, cancelled_date);
create index if not exists active_reservations_expiry_idx
  on public.active_reservations (expiry_time);

grant select, insert, update, delete on public.po_master to anon, authenticated;
grant select, insert, update, delete on public.po_token_log to anon, authenticated;
grant select, insert, update, delete on public.reusable_queue to anon, authenticated;
grant select, insert, update, delete on public.active_reservations to anon, authenticated;
