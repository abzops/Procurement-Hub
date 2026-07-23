-- Procurement Hub - Module 13: Delivered Date
-- Run this in Supabase SQL Editor.
-- Safe to run multiple times.

alter table public.purchase_orders
  add column if not exists delivered_date date;

alter table public.po_lines
  add column if not exists delivered_date date;

comment on column public.purchase_orders.delivered_date is 'Actual date when the PO delivery status changed to Delivered';
comment on column public.po_lines.delivered_date is 'Actual date when the PO delivery status changed to Delivered';
