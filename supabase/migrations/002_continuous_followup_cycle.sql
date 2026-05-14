-- Continuous follow-up cycle support
-- Allows repeated daily delay follow-ups for the same PO/stage on different dates.

alter table public.po_followups
add column if not exists followup_type text default 'Lead Time Follow-up',
add column if not exists parent_followup_id text,
add column if not exists close_reason text;

alter table public.po_followup_logs
add column if not exists close_reason text,
add column if not exists created_next_followup_date date;

update public.po_followups
set followup_type = 'Lead Time Follow-up'
where followup_type is null or trim(followup_type) = '';

drop index if exists public.po_followups_unique_po_stage;

create unique index if not exists po_followups_unique_po_stage_due_date
on public.po_followups (po_number, followup_stage, due_date)
where due_date is not null;

create unique index if not exists po_followups_unique_po_stage_no_due_date
on public.po_followups (po_number, followup_stage)
where due_date is null;

alter table public.po_followups
drop constraint if exists po_followups_email_status_check;

alter table public.po_followups
add constraint po_followups_email_status_check
check (
  email_status in (
    'Not Sent',
    'Pending',
    'Sent',
    'Failed',
    'Not Required'
  )
);

alter table public.po_followups
drop constraint if exists po_followups_call_status_check;

alter table public.po_followups
add constraint po_followups_call_status_check
check (
  call_status in (
    'Not Required',
    'Pending',
    'Completed',
    'Failed'
  )
);

grant select, insert, update on public.po_followups to anon, authenticated;
grant select, insert, update on public.po_followup_logs to anon, authenticated;
grant select, insert on public.po_activity_events to anon, authenticated;
