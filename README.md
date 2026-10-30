# Procurement-Hub
Manage purchase orders, delivery, payments, vendors, and sourcing decisions from one clean workspace.

The Reports section offers three complete Excel workbooks (Procurement: 5 sheets,
Mechanical: 10 sheets, Audit: 14 sheets), one ZIP containing all three, and CSV
downloads for every preview tab. Exports run in the browser and use the full loaded
dataset. Purchase Order workspace filters do not limit report scope.

PO Summary contains one row per order, including discounts, adjustments, paid
amounts and balances. Line Items keeps product and charge amounts separate from
PO-level totals. Audit exports include independent invoice, payment and receipt
records as well as the combined Money Spent Audit and filling guide.

For isolated local testing, run `python tests/serve-local.py` and open
`http://127.0.0.1:8789/`. This server disables Supabase without changing config.js.
Run regression checks with `node --test tests/regression.test.cjs tests/report-exports.test.cjs`.
The optional read-only live snapshot checks use `PROCUREMENT_QA_SNAPSHOT` pointing
to an Export Full JSON file. Validate generated XLSX files with
`python tests/validate-report-files.py` (requires openpyxl).
