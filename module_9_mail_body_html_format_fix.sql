-- Module 9: structured vendor follow-up email body
-- Adds an HTML body column so Zoho Mail can render line breaks/sections correctly.

alter table public.vendor_email_queue
add column if not exists body_html text;

alter table public.vendor_email_queue
add column if not exists from_email text default 'sourcing@stacknstock.in';

alter table public.vendor_email_queue
add column if not exists queued_by text;

update public.vendor_email_queue
set from_email = coalesce(nullif(trim(from_email), ''), 'sourcing@stacknstock.in')
where from_email is null or trim(from_email) = '';
