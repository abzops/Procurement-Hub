-- Procurement Hub - Module 1: Database Foundation
-- Run this in Supabase SQL Editor.
-- Safe to run multiple times where possible.

-- Required for gen_random_uuid()
create extension if not exists pgcrypto;

-- 1) Extend purchase_orders for follow-up workflow
alter table public.purchase_orders
  add column if not exists material_type text default 'Unknown',
  add column if not exists vendor_email text,
  add column if not exists vendor_phone text,
  add column if not exists delay_reason text,
  add column if not exists edd date;

-- Keep material type controlled but non-blocking for old data.
alter table public.purchase_orders
  drop constraint if exists purchase_orders_material_type_check;

alter table public.purchase_orders
  add constraint purchase_orders_material_type_check
  check (material_type in ('Unknown', 'RTO', 'MTO'));

comment on column public.purchase_orders.material_type is 'PO material type used for follow-up rules: Unknown, RTO, MTO';
comment on column public.purchase_orders.vendor_email is 'Vendor email used for follow-up mail queue';
comment on column public.purchase_orders.vendor_phone is 'Vendor phone/contact number used for call follow-ups';
comment on column public.purchase_orders.delay_reason is 'Latest known reason for delivery delay';
comment on column public.purchase_orders.edd is 'Revised Estimated Delivery Date';

-- 2) Follow-up task table: one row per PO follow-up stage/task
create table if not exists public.po_followups (
  id uuid primary key default gen_random_uuid(),
  po_number text not null,
  vendor_name text not null,
  vendor_email text,
  vendor_phone text,
  material_type text default 'Unknown',
  followup_stage text not null,
  lead_time_percent numeric,
  followup_activity text,
  communication_method text,
  due_date date,
  status text default 'Pending',
  priority text default 'Normal',
  email_status text default 'Not Required',
  call_status text default 'Not Required',
  zoho_flow_status text,
  last_email_queue_id uuid,
  completed_at timestamptz,
  completed_by text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.po_followups
  drop constraint if exists po_followups_material_type_check;

alter table public.po_followups
  add constraint po_followups_material_type_check
  check (material_type in ('Unknown', 'RTO', 'MTO'));

alter table public.po_followups
  drop constraint if exists po_followups_status_check;

alter table public.po_followups
  add constraint po_followups_status_check
  check (status in ('Pending', 'Completed', 'Skipped', 'Cancelled'));

alter table public.po_followups
  drop constraint if exists po_followups_priority_check;

alter table public.po_followups
  add constraint po_followups_priority_check
  check (priority in ('Low', 'Normal', 'High', 'Critical'));

alter table public.po_followups
  drop constraint if exists po_followups_email_status_check;

alter table public.po_followups
  add constraint po_followups_email_status_check
  check (email_status in ('Not Required', 'Pending', 'Queued', 'Sent', 'Failed'));

alter table public.po_followups
  drop constraint if exists po_followups_call_status_check;

alter table public.po_followups
  add constraint po_followups_call_status_check
  check (call_status in ('Not Required', 'Pending', 'Completed', 'Failed'));

-- Avoid duplicate generated task for same PO + stage.
create unique index if not exists po_followups_unique_po_stage
  on public.po_followups (po_number, followup_stage);

create index if not exists po_followups_due_date_idx on public.po_followups (due_date);
create index if not exists po_followups_status_idx on public.po_followups (status);
create index if not exists po_followups_po_number_idx on public.po_followups (po_number);

-- 3) Follow-up logs: append-only history of calls, completions, EDD updates, notes
create table if not exists public.po_followup_logs (
  id uuid primary key default gen_random_uuid(),
  followup_id uuid,
  po_number text not null,
  action_type text not null,
  update_received text,
  vendor_contact_person text,
  done_by text,
  communication_method text,
  edd date,
  delay_reason text,
  next_followup_date date,
  notes text,
  created_at timestamptz default now()
);

alter table public.po_followup_logs
  drop constraint if exists po_followup_logs_action_type_check;

alter table public.po_followup_logs
  add constraint po_followup_logs_action_type_check
  check (action_type in ('Created', 'Email Queued', 'Email Sent', 'Email Failed', 'Call Completed', 'Completed', 'EDD Updated', 'Delay Updated', 'Note Added', 'Rescheduled', 'Status Changed'));

create index if not exists po_followup_logs_po_number_idx on public.po_followup_logs (po_number);
create index if not exists po_followup_logs_created_at_idx on public.po_followup_logs (created_at);
create index if not exists po_followup_logs_followup_id_idx on public.po_followup_logs (followup_id);

-- 4) Vendor email queue: Procurement Hub inserts, Zoho Flow sends
create table if not exists public.vendor_email_queue (
  id uuid primary key default gen_random_uuid(),
  followup_id uuid,
  po_number text not null,
  vendor_name text not null,
  vendor_email text not null,
  cc_email text,
  subject text not null,
  body text not null,
  material_type text default 'Unknown',
  followup_stage text,
  template_key text,
  status text default 'Pending',
  error_message text,
  sent_at timestamptz,
  created_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.vendor_email_queue
  drop constraint if exists vendor_email_queue_status_check;

alter table public.vendor_email_queue
  add constraint vendor_email_queue_status_check
  check (status in ('Pending', 'Sent', 'Failed', 'Cancelled'));

alter table public.vendor_email_queue
  drop constraint if exists vendor_email_queue_material_type_check;

alter table public.vendor_email_queue
  add constraint vendor_email_queue_material_type_check
  check (material_type in ('Unknown', 'RTO', 'MTO'));

create index if not exists vendor_email_queue_status_idx on public.vendor_email_queue (status);
create index if not exists vendor_email_queue_po_number_idx on public.vendor_email_queue (po_number);
create index if not exists vendor_email_queue_created_at_idx on public.vendor_email_queue (created_at);

-- 5) Daily CEO report history
create table if not exists public.daily_followup_reports (
  id uuid primary key default gen_random_uuid(),
  report_date date not null,
  recipient_email text not null,
  subject text,
  body text,
  status text default 'Pending',
  error_message text,
  sent_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.daily_followup_reports
  drop constraint if exists daily_followup_reports_status_check;

alter table public.daily_followup_reports
  add constraint daily_followup_reports_status_check
  check (status in ('Pending', 'Sent', 'Failed', 'Cancelled'));

create unique index if not exists daily_followup_reports_unique_date_recipient
  on public.daily_followup_reports (report_date, recipient_email);

-- 6) PO activity events: powers Status timeline popup later
create table if not exists public.po_activity_events (
  id uuid primary key default gen_random_uuid(),
  po_number text not null,
  event_type text not null,
  event_title text not null,
  event_description text,
  old_value text,
  new_value text,
  actor text,
  source text default 'Procurement Hub',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists po_activity_events_po_number_idx on public.po_activity_events (po_number);
create index if not exists po_activity_events_created_at_idx on public.po_activity_events (created_at);
create index if not exists po_activity_events_event_type_idx on public.po_activity_events (event_type);

-- 7) Optional updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_po_followups_updated_at on public.po_followups;
create trigger set_po_followups_updated_at
before update on public.po_followups
for each row execute function public.set_updated_at();

drop trigger if exists set_vendor_email_queue_updated_at on public.vendor_email_queue;
create trigger set_vendor_email_queue_updated_at
before update on public.vendor_email_queue
for each row execute function public.set_updated_at();

drop trigger if exists set_daily_followup_reports_updated_at on public.daily_followup_reports;
create trigger set_daily_followup_reports_updated_at
before update on public.daily_followup_reports
for each row execute function public.set_updated_at();
