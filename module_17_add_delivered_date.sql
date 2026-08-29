-- Module 17: Add delivered_date column to purchase_orders and po_lines

ALTER TABLE public.purchase_orders
  ADD COLUMN IF NOT EXISTS delivered_date DATE;

ALTER TABLE public.po_lines
  ADD COLUMN IF NOT EXISTS delivered_date DATE;

COMMENT ON COLUMN public.purchase_orders.delivered_date IS 'Actual date when the purchase order was delivered';
COMMENT ON COLUMN public.po_lines.delivered_date IS 'Actual date when the purchase order line was delivered';
