alter table public.po_lines
add column if not exists uom text default 'Nos';

update public.po_lines
set uom = 'Nos'
where uom is null or trim(uom) = '';
