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
