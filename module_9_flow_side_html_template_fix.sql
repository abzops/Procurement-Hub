-- Module 9: Zoho Flow side structured HTML mail support
-- Run once in Supabase SQL Editor.

alter table public.vendor_email_queue
add column if not exists body_html text;

alter table public.vendor_email_queue
add column if not exists from_email text default 'sourcing@stacknstock.in';

alter table public.vendor_email_queue
add column if not exists queued_by text;

alter table public.vendor_email_queue
add column if not exists followup_activity text;

alter table public.vendor_email_queue
add column if not exists communication_method text;

alter table public.vendor_email_queue
add column if not exists po_date date;

alter table public.vendor_email_queue
add column if not exists delivery_date date;

alter table public.vendor_email_queue
add column if not exists followup_due_date date;

update public.vendor_email_queue
set from_email = coalesce(nullif(trim(from_email), ''), 'sourcing@stacknstock.in')
where from_email is null or trim(from_email) = '';
