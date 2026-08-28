-- Procurement Hub - Migration 008: Fix Canonical PO Status
-- Repair confirmed corrupted PO status 'Mixed' on affected purchase orders and synchronize line statuses.
-- Safe and idempotent to run multiple times.

UPDATE public.purchase_orders
SET po_status = 'Closed'
WHERE po_number IN (
  'PO-00011',
  'PO-00014',
  'PO-00016',
  'PO-00017'
)
AND po_status = 'Mixed';

UPDATE public.po_lines
SET po_status = 'Closed'
WHERE po_number IN (
  'PO-00011',
  'PO-00014',
  'PO-00016',
  'PO-00017'
);
