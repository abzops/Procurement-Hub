-- Module 10: TXT mail templates + structured vendor email queue fields

alter table public.vendor_email_queue
add column if not exists from_email text default 'sourcing@stacknstock.in';

alter table public.vendor_email_queue
add column if not exists queued_by text;

alter table public.vendor_email_queue
add column if not exists body_html text;

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
set from_email = 'sourcing@stacknstock.in'
where from_email is null or trim(from_email) = '';

-- Optional DB registry for template names. TXT files remain the source used by the app.
create table if not exists public.mail_templates (
  template_key text primary key,
  template_file text not null,
  description text,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.mail_templates (template_key, template_file, description)
values
  ('RTO_50', 'mail_templates/RTO_50.txt', 'RTO 50% readiness follow-up'),
  ('RTO_75', 'mail_templates/RTO_75.txt', 'RTO 75% dispatch planning follow-up'),
  ('RTO_95', 'mail_templates/RTO_95.txt', 'RTO 95% next-day delivery confirmation'),
  ('RTO_100', 'mail_templates/RTO_100.txt', 'RTO 100% delivery-day status'),
  ('RTO_DELAY', 'mail_templates/RTO_DELAY.txt', 'RTO delay escalation'),
  ('MTO_25', 'mail_templates/MTO_25.txt', 'MTO 25% raw material and kickoff'),
  ('MTO_50', 'mail_templates/MTO_50.txt', 'MTO 50% manufacturing progress'),
  ('MTO_75', 'mail_templates/MTO_75.txt', 'MTO 75% production and QC readiness'),
  ('MTO_90', 'mail_templates/MTO_90.txt', 'MTO 90% packing and dispatch readiness'),
  ('MTO_95', 'mail_templates/MTO_95.txt', 'MTO 95% next-day delivery confirmation'),
  ('MTO_100', 'mail_templates/MTO_100.txt', 'MTO 100% delivery-day status'),
  ('MTO_DELAY', 'mail_templates/MTO_DELAY.txt', 'MTO delay escalation'),
  ('UNKNOWN_50', 'mail_templates/UNKNOWN_50.txt', 'General 50% follow-up'),
  ('UNKNOWN_75', 'mail_templates/UNKNOWN_75.txt', 'General 75% follow-up'),
  ('UNKNOWN_100', 'mail_templates/UNKNOWN_100.txt', 'General 100% follow-up'),
  ('UNKNOWN_DELAY', 'mail_templates/UNKNOWN_DELAY.txt', 'General delay follow-up'),
  ('DAILY_DELAY', 'mail_templates/DAILY_DELAY.txt', 'Daily delay follow-up'),
  ('SCHEDULED_FOLLOWUP', 'mail_templates/SCHEDULED_FOLLOWUP.txt', 'Scheduled follow-up'),
  ('DEFAULT', 'mail_templates/DEFAULT.txt', 'Default vendor follow-up')
on conflict (template_key) do update
set template_file = excluded.template_file,
    description = excluded.description,
    is_active = true,
    updated_at = now();

grant select on public.mail_templates to anon, authenticated;
grant select, insert, update on public.vendor_email_queue to anon, authenticated;

notify pgrst, 'reload schema';
