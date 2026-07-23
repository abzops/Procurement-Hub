-- Allow explicit Delete PO from the browser app.

grant select, insert, update, delete on public.purchase_orders to anon, authenticated;
grant select, insert, update, delete on public.po_lines to anon, authenticated;

drop policy if exists "public delete purchase_orders" on public.purchase_orders;
create policy "public delete purchase_orders"
on public.purchase_orders
for delete
to anon, authenticated
using (true);

drop policy if exists "public delete po_lines" on public.po_lines;
create policy "public delete po_lines"
on public.po_lines
for delete
to anon, authenticated
using (true);
