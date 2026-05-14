-- Enable RLS for PO Number Availability tables while preserving current anon app access.

alter table public.po_master enable row level security;
alter table public.po_token_log enable row level security;
alter table public.reusable_queue enable row level security;
alter table public.active_reservations enable row level security;

drop policy if exists "public read po_master" on public.po_master;
drop policy if exists "public insert po_master" on public.po_master;
drop policy if exists "public update po_master" on public.po_master;
drop policy if exists "public delete po_master" on public.po_master;

create policy "public read po_master"
on public.po_master for select
to anon, authenticated
using (true);

create policy "public insert po_master"
on public.po_master for insert
to anon, authenticated
with check (true);

create policy "public update po_master"
on public.po_master for update
to anon, authenticated
using (true)
with check (true);

create policy "public delete po_master"
on public.po_master for delete
to anon, authenticated
using (true);

drop policy if exists "public read po_token_log" on public.po_token_log;
drop policy if exists "public insert po_token_log" on public.po_token_log;
drop policy if exists "public update po_token_log" on public.po_token_log;
drop policy if exists "public delete po_token_log" on public.po_token_log;

create policy "public read po_token_log"
on public.po_token_log for select
to anon, authenticated
using (true);

create policy "public insert po_token_log"
on public.po_token_log for insert
to anon, authenticated
with check (true);

create policy "public update po_token_log"
on public.po_token_log for update
to anon, authenticated
using (true)
with check (true);

create policy "public delete po_token_log"
on public.po_token_log for delete
to anon, authenticated
using (true);

drop policy if exists "public read reusable_queue" on public.reusable_queue;
drop policy if exists "public insert reusable_queue" on public.reusable_queue;
drop policy if exists "public update reusable_queue" on public.reusable_queue;
drop policy if exists "public delete reusable_queue" on public.reusable_queue;

create policy "public read reusable_queue"
on public.reusable_queue for select
to anon, authenticated
using (true);

create policy "public insert reusable_queue"
on public.reusable_queue for insert
to anon, authenticated
with check (true);

create policy "public update reusable_queue"
on public.reusable_queue for update
to anon, authenticated
using (true)
with check (true);

create policy "public delete reusable_queue"
on public.reusable_queue for delete
to anon, authenticated
using (true);

drop policy if exists "public read active_reservations" on public.active_reservations;
drop policy if exists "public insert active_reservations" on public.active_reservations;
drop policy if exists "public update active_reservations" on public.active_reservations;
drop policy if exists "public delete active_reservations" on public.active_reservations;

create policy "public read active_reservations"
on public.active_reservations for select
to anon, authenticated
using (true);

create policy "public insert active_reservations"
on public.active_reservations for insert
to anon, authenticated
with check (true);

create policy "public update active_reservations"
on public.active_reservations for update
to anon, authenticated
using (true)
with check (true);

create policy "public delete active_reservations"
on public.active_reservations for delete
to anon, authenticated
using (true);
