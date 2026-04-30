Stack n Stock Procurement Command Center

Files:
- index.html
- styles.css
- app.js
- data.js

What changed in this redesign:
- Main Purchase Orders list is now PO-first, not product-line-first
- Payments are treated at PO level
- Product names are removed from the main PO list
- Click the Products button on any PO to open a popup with full product details
- Edit and delete now work at the full PO level
- Add Purchase Order supports multiple product lines in one PO
- Vendor contacts and vendor-specific metrics still save locally
- Export / Import local JSON still works

How to use:
1. Keep all files in the same folder.
2. Open index.html in a browser.
3. Use + Add Purchase Order to create a PO with multiple items.
4. Click Products on any PO to open the full line-item popup.
5. Use Export Local Data to back up manual rows, PO edits, vendor contacts, and metrics.


New:
- Export Full Data button downloads one JSON with:
  - base data from data.js
  - local browser changes
  - merged rows
  - derived summaries


Updates:
- Vendors tab now includes a small Delete Vendor button beside Save Vendor Details.
- Freight / packing / transport / similar non-product lines are classified as charges.
- Charges stay inside PO totals and detail popup, but are excluded from Products and Vendor Metrics.
- Add/Edit PO now supports line type selection: Product or Charge.


Launch header:
- Header redesigned for launch-ready V1
- Removed old promo hero strip and extra header clutter
- To add your company logo, place a PNG in the same folder as index.html with this exact name:
  stacknstock-logo.png
- If the file is missing, the header shows an SNS fallback mark


Header logo update:
- Removed the boxed logo area from the header
- Logo is now placed inline in the brand strip area
- Included file: stacknstock-logo.png


Supabase live mode:
- config.js is prefilled with the project URL and publishable key
- app.js now loads from Supabase on startup and syncs changes back to Supabase
- For GitHub Pages, upload all files in this folder to repo root and commit


Update:
- Added PO-level Discount Amount field in Add/Edit PO modal
- PO total now calculates as Item Total + Tax Total - Discount
- Discount shows in PO detail popup and PO cards
- Supabase requires running add_po_discount_column.sql once

Fix:
- Discount field now updates totals live while typing via delegated form input.
- Added clearer alert if Supabase is missing discount_amount column.

- Moved Discount Amount input from PO header fields to the totals area above the summary chips.


Update:
- Added PO-level Adjustment field in totals area
- Adjustment supports plus or minus values
- New PO total formula: Item Total + Tax Total - Discount + Adjustment
- Supabase requires running add_po_adjustment_column.sql once


Algorithm update:
- Item Total = sum(qty * unit price)
- Discount now supports amount or percent
- Tax is calculated after discount
- PO Total = taxable subtotal + tax total + adjustment
- Run add_discount_mode_columns.sql once in Supabase


Live fix:
- Removed old duplicate discount field above summary cards
- Adjustment and discount inputs now recalculate PO Total instantly


Queue processor:
- Added Process Queue button in the header for bulk Zoho payload processing.
- App can now normalize and ingest three payload shapes:
  1. strict DB JSON with purchase_orders + po_lines
  2. single package JSON with purchase_order + po_lines
  3. raw Zoho Books PO payload with purchaseorder_number + line_items
- To enable queue processing, set useQueueProcessor = true in config.js and point queueTable to your raw queue table.
- Expected queue columns can be configured in config.js. Defaults:
  - raw_payload
  - status
  - error_message
  - processed_at
- Process Queue upserts vendors, purchase_orders, and po_lines without deleting existing DB data.
