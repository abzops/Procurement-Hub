-- Module 8: Dedicated follow-up mail templates + Zoho Flow webhook support
-- Safe to run multiple times.

alter table public.vendor_email_queue
add column if not exists from_email text default 'sourcing@stacknstock.in';

alter table public.vendor_email_queue
add column if not exists queued_by text;

alter table public.vendor_email_queue
add column if not exists template_key text;

alter table public.vendor_email_queue
add column if not exists webhook_status text default 'Disabled';

alter table public.vendor_email_queue
add column if not exists webhook_response text;

alter table public.vendor_email_queue
add column if not exists webhook_last_attempt_at timestamptz;

update public.vendor_email_queue
set from_email = 'sourcing@stacknstock.in'
where from_email is null or trim(from_email) = '';

alter table public.vendor_email_queue
drop constraint if exists vendor_email_queue_webhook_status_check;

alter table public.vendor_email_queue
add constraint vendor_email_queue_webhook_status_check
check (webhook_status in ('Disabled', 'Pending', 'Triggered', 'Failed'));

grant select, insert, update on public.vendor_email_queue to anon, authenticated;
