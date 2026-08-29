const STORAGE_KEYS = {
  manualRows: "sns-manual-rows-v1",
  rowOverrides: "sns-row-overrides-v1",
  vendorContacts: "sns-vendor-contacts-v1",
  productVendorMetrics: "sns-product-vendor-metrics-v1",
  deletedVendors: "sns-deleted-vendors-v1",
  poTokenLog: "sns-po-token-log-v1",
  reusableQueue: "sns-reusable-po-queue-v1",
  poMaster: "sns-po-master-v1",
  activeReservations: "sns-active-po-reservations-v1",
  procurementAudit: "sns-procurement-audit-v1",
  products: "sns-products-v1",
  productAliases: "sns-product-aliases-v1",
};

let baseRows = Array.isArray(window.STACKNSTOCK_DATA?.rows)
  ? window.STACKNSTOCK_DATA.rows
  : [];
let vendorSeeds = Array.isArray(window.STACKNSTOCK_DATA?.vendorSeeds)
  ? window.STACKNSTOCK_DATA.vendorSeeds
  : [];

const PRODUCT_MASTER_COLUMNS = [
  { key: "productCode", label: "Product Code" },
  { key: "productName", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand / Make" },
  { key: "manufacturerPartNo", label: "Part #" },
  { key: "defaultUom", label: "UOM" },
  { key: "defaultTaxPercent", label: "Tax %" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

const PRODUCT_SORTS = [
  { value: "totalSpend-desc", label: "Sort: Highest Spend" },
  { value: "totalSpend-asc", label: "Sort: Lowest Spend" },
  { value: "vendorCount-desc", label: "Sort: Most Vendors" },
  { value: "vendorCount-asc", label: "Sort: Fewest Vendors" },
  { value: "bestPrice-asc", label: "Sort: Lowest Best Price" },
  { value: "bestPrice-desc", label: "Sort: Highest Best Price" },
  { value: "avgPrice-asc", label: "Sort: Lowest Avg Price" },
  { value: "avgPrice-desc", label: "Sort: Highest Avg Price" },
  { value: "totalQty-desc", label: "Sort: Highest Qty" },
  { value: "totalQty-asc", label: "Sort: Lowest Qty" },
  { value: "lastOrderDate-desc", label: "Sort: Latest Order" },
  { value: "lastOrderDate-asc", label: "Sort: Oldest Order" },
  { value: "bestVendor-asc", label: "Sort: Best Vendor A to Z" },
  { value: "productName-asc", label: "Sort: Product A to Z" },
  { value: "productName-desc", label: "Sort: Product Z to A" },
];

const PO_SORTS = [
  { value: "poDate-desc", label: "Newest first" },
  { value: "poDate-asc", label: "Oldest first" },
  { value: "poNumber-asc", label: "PO number A-Z" },
  { value: "poNumber-desc", label: "PO number Z-A" },
  { value: "deliveryDate-asc", label: "Delivery due soon" },
  { value: "deliveryDate-desc", label: "Delivery latest first" },
  { value: "poTotal-desc", label: "Highest value" },
  { value: "poTotal-asc", label: "Lowest value" },
  { value: "vendorName-asc", label: "Vendor A-Z" },
  { value: "vendorName-desc", label: "Vendor Z-A" },
  { value: "productCount-desc", label: "Most products" },
  { value: "productCount-asc", label: "Fewest products" },
  { value: "paymentStatus-desc", label: "Payment most complete" },
  { value: "paymentStatus-asc", label: "Payment least complete" },
  { value: "poStatus-asc", label: "PO status A-Z" },
  { value: "poStatus-desc", label: "PO status Z-A" },
];

const PO_BOARD_SORTS = {
  poNumber: { defaultDir: "asc" },
  vendorName: { defaultDir: "asc" },
  productCount: { defaultDir: "desc" },
  poTotal: { defaultDir: "desc" },
  paymentStatus: { defaultDir: "desc" },
  poStatus: { defaultDir: "asc" },
  deliveryDate: { defaultDir: "asc" },
};

const VENDOR_SORTS = [
  { value: "totalSpend-desc", label: "Sort: Highest Spend" },
  { value: "totalSpend-asc", label: "Sort: Lowest Spend" },
  { value: "poCount-desc", label: "Sort: Most POs" },
  { value: "poCount-asc", label: "Sort: Fewest POs" },
  { value: "productCount-desc", label: "Sort: Most Products" },
  { value: "productCount-asc", label: "Sort: Fewest Products" },
  { value: "lastOrderDate-desc", label: "Sort: Latest Order" },
  { value: "lastOrderDate-asc", label: "Sort: Oldest Order" },
  { value: "vendorName-asc", label: "Sort: Vendor A to Z" },
  { value: "vendorName-desc", label: "Sort: Vendor Z to A" },
  { value: "source-asc", label: "Sort: Source A to Z" },
  { value: "gstin-asc", label: "Sort: GSTIN A to Z" },
];

const METRIC_SORTS = [
  { value: "vendorCount-desc", label: "Sort: Most Vendors" },
  { value: "vendorCount-asc", label: "Sort: Fewest Vendors" },
  { value: "bestPrice-asc", label: "Sort: Lowest Best Price" },
  { value: "bestPrice-desc", label: "Sort: Highest Best Price" },
  { value: "avgPrice-asc", label: "Sort: Lowest Avg Price" },
  { value: "avgPrice-desc", label: "Sort: Highest Avg Price" },
  { value: "totalQty-desc", label: "Sort: Highest Qty" },
  { value: "totalQty-asc", label: "Sort: Lowest Qty" },
  { value: "totalSpend-desc", label: "Sort: Highest Spend" },
  { value: "totalSpend-asc", label: "Sort: Lowest Spend" },
  { value: "lastOrderDate-desc", label: "Sort: Latest Order" },
  { value: "lastOrderDate-asc", label: "Sort: Oldest Order" },
  { value: "productName-asc", label: "Sort: Product A to Z" },
  { value: "productName-desc", label: "Sort: Product Z to A" },
];

const PRODUCT_COLUMNS = [
  { key: "productName", label: "Product" },
  { key: "vendorCount", label: "Vendors" },
  { key: "bestVendor", label: "Best Vendor" },
  { key: "bestPrice", label: "Best Price" },
  { key: "avgPrice", label: "Avg Price" },
  { key: "totalQty", label: "Total Qty" },
  { key: "totalSpend", label: "Total Spend" },
  { key: "lastOrderDate", label: "Last Order" },
];

const VENDOR_COLUMNS = [
  { key: "vendorName", label: "Vendor" },
  { key: "source", label: "Source" },
  { key: "gstin", label: "GSTIN" },
  { key: "poCount", label: "POs" },
  { key: "productCount", label: "Products" },
  { key: "totalSpend", label: "Spend" },
  { key: "lastOrderDate", label: "Last Order" },
];

const PROCUREMENT_REPORT_COLUMNS = [
  { key: "itemName", label: "Item Name", type: "text", width: 42 },
  { key: "amount", label: "Amount", type: "money", width: 14 },
  { key: "qty", label: "Qty", type: "number", width: 10 },
  { key: "category", label: "Category", type: "text", width: 20 },
  { key: "sourceOfSupply", label: "Source Of Supply", type: "text", width: 16 },
  { key: "vendorName", label: "Vendor Name", type: "text", width: 28 },
  { key: "poNumber", label: "PO Number", type: "text", width: 14 },
  { key: "freightCost", label: "Freight Cost", type: "money", width: 14 },
  { key: "billNo", label: "Bill No", type: "text", width: 14 },
  { key: "uom", label: "UOM", type: "text", width: 10 },
  { key: "qtyInt", label: "Qty Int", type: "number", width: 10 },
  { key: "poDate", label: "PO Date", type: "date", width: 14 },
  { key: "deliveryDate", label: "Delivery Date", type: "date", width: 14 },
  { key: "materialType", label: "Material Type", type: "text", width: 18 },
  { key: "unitRate", label: "Unit Rate", type: "money", width: 14 },
  { key: "taxPercent", label: "Tax %", type: "percent", width: 10 },
  { key: "taxAmount", label: "Tax Amount", type: "money", width: 14 },
  { key: "lineTotal", label: "Line Total", type: "money", width: 14 },
  { key: "poTotal", label: "PO Total", type: "money", width: 14 },
  { key: "amountPaid", label: "Amount Paid", type: "money", width: 14 },
  { key: "balanceDue", label: "Balance Due", type: "money", width: 14 },
  { key: "paymentStatus", label: "Payment Status", type: "text", width: 18 },
  { key: "poStatus", label: "PO Status", type: "text", width: 16 },
  { key: "deliveryStatus", label: "Delivery Status", type: "text", width: 18 },
];

const MECHANICAL_ANALYSIS_TABS = [
  "Dashboard",
  "Cleaned Lines",
  "Vendor Summary",
  "Material Analysis",
  "Custom vs OTS",
  "Lead Time",
  "Tax Freight",
  "Opportunities",
  "Cleaning Notes",
];

const MECHANICAL_ANALYSIS_COLUMNS = {
  Dashboard: [
    { key: "section", label: "Section", type: "text", width: 24 },
    { key: "item", label: "Item", type: "text", width: 44 },
    { key: "value", label: "Value", type: "text", width: 20 },
    { key: "comment", label: "Comment", type: "text", width: 58 },
  ],
  "Cleaned Lines": [
    { key: "bomLine", label: "BOM Line", type: "number", width: 10 },
    { key: "poNumber", label: "PO Number", type: "text", width: 14 },
    { key: "itemDescription", label: "Item Description", type: "text", width: 52 },
    { key: "vendor", label: "Vendor", type: "text", width: 28 },
    { key: "source", label: "Source", type: "text", width: 12 },
    { key: "materialType", label: "Material Type", type: "text", width: 24 },
    { key: "classification", label: "Classification", type: "text", width: 18 },
    { key: "qtyPerBom", label: "Qty per BOM", type: "number", width: 12 },
    { key: "poQty", label: "PO Qty", type: "number", width: 12 },
    { key: "unitPrice", label: "Unit Price", type: "money", width: 14 },
    { key: "lineTotalBeforeTax", label: "Line Total Before Tax", type: "money", width: 18 },
    { key: "taxAmount", label: "Tax Amount", type: "money", width: 14 },
    { key: "lineTotal", label: "Line Total", type: "money", width: 14 },
    { key: "allocatedFreight", label: "Allocated Freight", type: "money", width: 16 },
    { key: "landedCost", label: "Landed Cost", type: "money", width: 14 },
    { key: "poDate", label: "PO Date", type: "date", width: 14 },
    { key: "deliveryDate", label: "Delivery Date", type: "date", width: 14 },
    { key: "leadTimeDays", label: "Lead Time Days", type: "number", width: 14 },
    { key: "mechanicalSpendPercent", label: "Mechanical Spend %", type: "percent", width: 18 },
    { key: "totalBomPercent", label: "Total BOM %", type: "percent", width: 14 },
    { key: "paymentStatus", label: "Payment Status", type: "text", width: 18 },
    { key: "poStatus", label: "PO Status", type: "text", width: 16 },
    { key: "deliveryStatus", label: "Delivery Status", type: "text", width: 18 },
    { key: "sourcingComment", label: "Sourcing Comment", type: "text", width: 52 },
  ],
  "Vendor Summary": [
    { key: "vendor", label: "Vendor", type: "text", width: 28 },
    { key: "totalSpend", label: "Total Spend", type: "money", width: 16 },
    { key: "spendPercent", label: "Spend %", type: "percent", width: 12 },
    { key: "lineCount", label: "Line Count", type: "number", width: 12 },
    { key: "avgUnitPrice", label: "Avg Unit Price", type: "money", width: 16 },
    { key: "totalTax", label: "Total Tax", type: "money", width: 14 },
    { key: "allocatedFreight", label: "Allocated Freight", type: "money", width: 16 },
    { key: "avgLeadTime", label: "Avg Lead Time", type: "number", width: 14 },
    { key: "paymentStatus", label: "Payment Status", type: "text", width: 18 },
    { key: "materialTypes", label: "Material Types", type: "text", width: 34 },
    { key: "customSplit", label: "Custom Split", type: "text", width: 28 },
    { key: "riskLevel", label: "Risk Level", type: "text", width: 14 },
    { key: "recommendedAction", label: "Recommended Action", type: "text", width: 46 },
  ],
  "Material Analysis": [
    { key: "materialType", label: "Material Type", type: "text", width: 24 },
    { key: "totalSpend", label: "Total Spend", type: "money", width: 16 },
    { key: "spendPercent", label: "Spend %", type: "percent", width: 12 },
    { key: "lineCount", label: "Line Count", type: "number", width: 12 },
    { key: "avgUnitPrice", label: "Avg Unit Price", type: "money", width: 16 },
    { key: "avgLeadTime", label: "Avg Lead Time", type: "number", width: 14 },
    { key: "customSpend", label: "Custom Spend", type: "money", width: 16 },
    { key: "offTheShelfSpend", label: "Off-the-shelf Spend", type: "money", width: 20 },
    { key: "needsReviewSpend", label: "Needs Review Spend", type: "money", width: 20 },
  ],
  "Custom vs OTS": [
    { key: "category", label: "Category", type: "text", width: 18 },
    { key: "totalSpend", label: "Total Spend", type: "money", width: 16 },
    { key: "spendPercent", label: "Spend %", type: "percent", width: 12 },
    { key: "lineCount", label: "Line Count", type: "number", width: 12 },
    { key: "avgUnitPrice", label: "Avg Unit Price", type: "money", width: 16 },
    { key: "avgLeadTime", label: "Avg Lead Time", type: "number", width: 14 },
    { key: "vendorCount", label: "Vendor Count", type: "number", width: 14 },
    { key: "recommendation", label: "Recommendation", type: "text", width: 52 },
  ],
  "Lead Time": [
    { key: "vendor", label: "Vendor", type: "text", width: 28 },
    { key: "avgLeadTime", label: "Avg Lead Time", type: "number", width: 14 },
    { key: "minLeadTime", label: "Min Lead Time", type: "number", width: 14 },
    { key: "maxLeadTime", label: "Max Lead Time", type: "number", width: 14 },
    { key: "lineCount", label: "Line Count", type: "number", width: 12 },
    { key: "totalSpend", label: "Total Spend", type: "money", width: 16 },
    { key: "riskComment", label: "Risk Comment", type: "text", width: 44 },
  ],
  "Tax Freight": [
    { key: "vendor", label: "Vendor", type: "text", width: 28 },
    { key: "totalTax", label: "Total Tax", type: "money", width: 16 },
    { key: "taxPercentOfBase", label: "Tax % of Base", type: "percent", width: 16 },
    { key: "allocatedFreight", label: "Allocated Freight", type: "money", width: 16 },
    { key: "freightPercentOfLanded", label: "Freight % of Landed", type: "percent", width: 18 },
    { key: "lineCount", label: "Line Count", type: "number", width: 12 },
  ],
  Opportunities: [
    { key: "rank", label: "Rank", type: "number", width: 8 },
    { key: "itemDescription", label: "Item Description", type: "text", width: 56 },
    { key: "vendor", label: "Vendor", type: "text", width: 28 },
    { key: "classification", label: "Classification", type: "text", width: 18 },
    { key: "materialType", label: "Material Type", type: "text", width: 24 },
    { key: "landedCost", label: "Landed Cost", type: "money", width: 16 },
    { key: "leadTime", label: "Lead Time", type: "number", width: 12 },
    { key: "opportunity", label: "Opportunity", type: "text", width: 30 },
    { key: "recommendedAction", label: "Recommended Action", type: "text", width: 58 },
  ],
  "Cleaning Notes": [
    { key: "area", label: "Area", type: "text", width: 28 },
    { key: "method", label: "Method / Assumption", type: "text", width: 86 },
  ],
};

const PROCUREMENT_AUDIT_TABS = [
  "Vendor Master",
  "PO Master",
  "Line Item Audit",
  "Vendor Audit",
  "Invoices",
  "Payments",
  "Receipts",
  "Missing Documents",
  "Risk Register",
  "Action Tracker",
  "KPI Summary",
];

const AUDIT_SELECT_OPTIONS = {
  yesNo: ["Yes", "No"],
  vendorCategory: ["Mechanical", "Electrical", "Electronics", "Fabrication", "Raw Material", "Tools", "Consumables", "Services", "Other"],
  currency: ["INR", "USD", "EUR", "GBP", "CNY"],
  poAuditStatus: ["Pending", "In Progress", "Completed"],
  purchaseType: ["Prototype", "Production", "Consumable", "Tooling"],
  auditType: ["Routine", "Technical", "Commercial"],
  itemMaturity: ["Prototype", "Alpha", "Beta", "Production"],
  vendorType: ["OEM", "Distributor", "Local Manufacturer"],
  urgency: ["Low", "Medium", "High", "Critical"],
  technicalValidation: ["Pending", "Yes", "No", "Approved", "Failed"],
  riskLevel: ["Low", "Medium", "High", "Critical"],
  gstCheck: ["Pending", "Correct", "Incorrect", "Not Applicable"],
  inspection: ["Pending", "Passed", "Failed", "Conditional"],
  documentStatus: ["Missing", "Requested", "Received", "Verified", "Rejected", "Not Required"],
  riskStatus: ["Open", "Mitigated", "Closed"],
  actionStatus: ["Open", "In Progress", "Closed"],
};

const PROCUREMENT_AUDIT_CONFIG = {
  "Vendor Master": {
    keyField: "vendorName",
    source: "vendor",
    fields: [
      { key: "vendorName", label: "Vendor Name", readonly: true, required: true },
      { key: "vendorCategory", label: "Category", options: AUDIT_SELECT_OPTIONS.vendorCategory },
      { key: "contactPerson", label: "Contact Person 1" },
      { key: "contactPerson2", label: "Contact Person 2" },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone 1" },
      { key: "phone2", label: "Phone 2" },
      { key: "currencyCode", label: "Currency", options: AUDIT_SELECT_OPTIONS.currency },
      { key: "source", label: "Source of Supply" },
      { key: "gstin", label: "GSTIN" },
    ],
  },
  "PO Master": {
    keyField: "poNumber",
    source: "po",
    fields: [
      { key: "poNumber", label: "PO Number", readonly: true, required: true },
      { key: "poDate", label: "PO Date", type: "date", readonly: true },
      { key: "vendorName", label: "Vendor Name", readonly: true },
      { key: "purchaseCategory", label: "Category", options: AUDIT_SELECT_OPTIONS.vendorCategory },
      { key: "poTotal", label: "Total PO Value", type: "money", readonly: true },
      { key: "gstIncluded", label: "GST Included", options: AUDIT_SELECT_OPTIONS.yesNo },
      { key: "advancePaid", label: "Advance Paid", type: "number", min: 0, step: "0.01" },
      { key: "balancePaid", label: "Balance Paid", type: "money", readonly: true },
      { key: "paymentStatus", label: "Payment Status", readonly: true },
      { key: "expectedDeliveryDate", label: "Expected Delivery Date", type: "date", readonly: true },
      { key: "actualDeliveryDate", label: "Actual Delivery Date", type: "date", readonly: true },
      { key: "deliveryStatus", label: "Delivery Status", readonly: true },
      { key: "grnAvailable", label: "GRN Available", readonly: true },
      { key: "invoiceAvailable", label: "Invoice Available", readonly: true },
      { key: "auditStatus", label: "Audit Status", options: AUDIT_SELECT_OPTIONS.poAuditStatus },
      { key: "auditNotes", label: "Audit Notes", type: "textarea" },
    ],
  },
  "Line Item Audit": {
    keyField: "lineId",
    source: "line",
    fields: [
      { key: "lineId", label: "Line ID", readonly: true, hidden: true },
      { key: "poNumber", label: "PO Number", readonly: true },
      { key: "vendorName", label: "Vendor Name", readonly: true },
      { key: "itemName", label: "Item Name / Description", readonly: true },
      { key: "quantity", label: "Quantity", type: "number", readonly: true },
      { key: "unitPrice", label: "Unit Price", type: "money", readonly: true },
      { key: "totalValue", label: "Total Value", type: "money", readonly: true },
      { key: "purchaseType", label: "Purchase Type", options: AUDIT_SELECT_OPTIONS.purchaseType },
      { key: "auditType", label: "Audit Type", options: AUDIT_SELECT_OPTIONS.auditType },
      { key: "itemMaturity", label: "Item Maturity", options: AUDIT_SELECT_OPTIONS.itemMaturity },
      { key: "vendorType", label: "Vendor Type", options: AUDIT_SELECT_OPTIONS.vendorType },
      { key: "purchaseUrgency", label: "Purchase Urgency", options: AUDIT_SELECT_OPTIONS.urgency },
      { key: "quoteCount", label: "Quote Count", type: "number", min: 0, step: "1" },
      { key: "technicalValidation", label: "Technical Validation", options: AUDIT_SELECT_OPTIONS.technicalValidation },
      { key: "priceBenchmarkAvailable", label: "Price Benchmark Available", options: AUDIT_SELECT_OPTIONS.yesNo },
      { key: "benchmarkUnitPrice", label: "Benchmark Unit Price", type: "number", min: 0, step: "0.01" },
      { key: "backupVendorAvailable", label: "Backup Vendor Available", options: AUDIT_SELECT_OPTIONS.yesNo },
      { key: "riskLevel", label: "Risk Level", options: AUDIT_SELECT_OPTIONS.riskLevel },
      { key: "actionRequired", label: "Action Required", type: "textarea" },
      { key: "priceVariance", label: "Price Variance %", type: "number", step: "0.01" },
      { key: "deliveryVariance", label: "Delivery Variance Days", type: "number", step: "1" },
      { key: "qualityVariance", label: "Quality Variance", type: "textarea" },
    ],
  },
  "Vendor Audit": {
    keyField: "vendorName",
    source: "vendorAudit",
    fields: [
      { key: "vendorName", label: "Vendor Name", readonly: true },
      { key: "priceCompetitiveness", label: "Price Competitiveness", type: "number", min: 1, max: 10, step: "0.1" },
      { key: "quality", label: "Quality", type: "number", min: 1, max: 10, step: "0.1" },
      { key: "deliveryReliability", label: "Delivery Reliability", type: "number", min: 1, max: 10, step: "0.1" },
      { key: "technicalCapability", label: "Technical Capability", type: "number", min: 1, max: 10, step: "0.1" },
      { key: "responsiveness", label: "Responsiveness", type: "number", min: 1, max: 10, step: "0.1" },
      { key: "paymentFlexibility", label: "Payment Flexibility", type: "number", min: 1, max: 10, step: "0.1" },
      { key: "documentationDiscipline", label: "Documentation Discipline", type: "number", min: 1, max: 10, step: "0.1" },
      { key: "overallScore", label: "Overall Score", type: "number", readonly: true },
      { key: "classification", label: "Classification", readonly: true },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  Invoices: {
    collection: "invoices",
    fields: [
      { key: "poNumber", label: "PO Number", sourceOptions: "po", required: true },
      { key: "vendorName", label: "Vendor Name", readonly: true },
      { key: "invoiceNumber", label: "Invoice Number", required: true },
      { key: "invoiceDate", label: "Invoice Date", type: "date" },
      { key: "invoiceAmount", label: "Invoice Amount", type: "number", min: 0, step: "0.01", required: true },
      { key: "gstCorrect", label: "GST Verification", options: AUDIT_SELECT_OPTIONS.gstCheck },
      { key: "freightIncluded", label: "Freight Included", options: AUDIT_SELECT_OPTIONS.yesNo },
      { key: "freightAmount", label: "Freight Amount", type: "number", min: 0, step: "0.01" },
      { key: "extraCharges", label: "Extra Charges", type: "number", min: 0, step: "0.01" },
      { key: "evidenceReference", label: "Evidence Reference" },
      { key: "comments", label: "Comments", type: "textarea" },
    ],
  },
  Payments: {
    collection: "payments",
    fields: [
      { key: "poNumber", label: "PO Number", sourceOptions: "po", required: true },
      { key: "invoiceId", label: "Invoice", sourceOptions: "invoice" },
      { key: "paymentDate", label: "Payment Date", type: "date" },
      { key: "paymentType", label: "Payment Type", options: ["Advance", "Balance", "Final", "Refund", "Other"] },
      { key: "amount", label: "Amount", type: "number", min: 0, step: "0.01", required: true },
      { key: "paymentReference", label: "Payment Reference" },
      { key: "proofAvailable", label: "Proof Available", options: AUDIT_SELECT_OPTIONS.yesNo },
      { key: "approved", label: "Approved", options: AUDIT_SELECT_OPTIONS.yesNo },
      { key: "remarks", label: "Remarks", type: "textarea" },
    ],
  },
  Receipts: {
    collection: "receipts",
    fields: [
      { key: "poNumber", label: "PO Number", sourceOptions: "po", required: true },
      { key: "lineId", label: "PO Line", sourceOptions: "line" },
      { key: "grnNumber", label: "GRN Number" },
      { key: "grnDate", label: "GRN / Receipt Date", type: "date" },
      { key: "receivedQuantity", label: "Received Quantity", type: "number", min: 0, step: "0.001" },
      { key: "inspectionStatus", label: "Inspection Status", options: AUDIT_SELECT_OPTIONS.inspection },
      { key: "rejectionQuantity", label: "Rejection Quantity", type: "number", min: 0, step: "0.001" },
      { key: "deliveryChallan", label: "Delivery Challan" },
      { key: "testCertificate", label: "Test Certificate" },
      { key: "warrantyReference", label: "Warranty Reference" },
      { key: "comments", label: "Comments", type: "textarea" },
    ],
  },
  "Missing Documents": {
    collection: "documents",
    fields: [
      { key: "poNumber", label: "PO Number", sourceOptions: "po" },
      { key: "vendorName", label: "Vendor Name", readonly: true },
      { key: "documentType", label: "Document Type", options: ["PO", "Invoice", "GRN", "Delivery Challan", "Test Certificate", "Warranty", "Payment Proof", "Other"], required: true },
      { key: "status", label: "Status", options: AUDIT_SELECT_OPTIONS.documentStatus },
      { key: "comments", label: "Comments", type: "textarea" },
    ],
  },
  "Risk Register": {
    collection: "risks",
    fields: [
      { key: "itemPo", label: "Item / PO" },
      { key: "finding", label: "Finding", required: true },
      { key: "risk", label: "Risk" },
      { key: "evidence", label: "Evidence", type: "textarea" },
      { key: "impact", label: "Impact", type: "textarea" },
      { key: "action", label: "Recommended Action", type: "textarea" },
      { key: "owner", label: "Owner" },
      { key: "priority", label: "Priority", options: AUDIT_SELECT_OPTIONS.riskLevel },
      { key: "dueDate", label: "Due Date", type: "date" },
      { key: "status", label: "Status", options: AUDIT_SELECT_OPTIONS.riskStatus },
    ],
  },
  "Action Tracker": {
    collection: "actions",
    fields: [
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "owner", label: "Owner" },
      { key: "priority", label: "Priority", options: AUDIT_SELECT_OPTIONS.riskLevel },
      { key: "dueDate", label: "Due Date", type: "date" },
      { key: "status", label: "Status", options: AUDIT_SELECT_OPTIONS.actionStatus },
      { key: "comments", label: "Comments / Closure Evidence", type: "textarea" },
    ],
  },
  "KPI Summary": { readonly: true, fields: [] },
};

const METRIC_PRODUCT_COLUMNS = [
  { key: "productName", label: "Product" },
  { key: "vendorCount", label: "Vendors" },
  { key: "bestPrice", label: "Best Price" },
  { key: "lastOrderDate", label: "Last Order" },
];

const PO_RESERVATION_COMPAT_EXPIRY = "9999-12-31T23:59:59.000Z";

const FOLLOWUP_RULES = {
  RTO: [
    {
      key: "RTO_50",
      percent: 50,
      label: "50% Lead Time",
      activity: "Verify order readiness and logistics arrangement",
      method: "Call / Email",
    },
    {
      key: "RTO_75",
      percent: 75,
      label: "75% Lead Time",
      activity: "Confirm dispatch schedule and transportation details",
      method: "Call + Email",
    },
    {
      key: "RTO_95",
      percent: 95,
      label: "95% Lead Time",
      activity: "Confirm next-day delivery commitment",
      method: "Mandatory Call + Email",
    },
    {
      key: "RTO_100",
      percent: 100,
      label: "100% Lead Date",
      activity: "Confirm dispatch / delivery status and ETA",
      method: "Mandatory Call + Email",
    },
    {
      key: "RTO_DELAY",
      percent: 101,
      label: "Delay Stage",
      activity: "Ask reason for delay and revised delivery date",
      method: "Mandatory Call + Email",
      delay: true,
    },
  ],
  MTO: [
    {
      key: "MTO_25",
      percent: 25,
      label: "25% Lead Time",
      activity: "Confirm raw material procurement and manufacturing kickoff",
      method: "Call + Email",
    },
    {
      key: "MTO_50",
      percent: 50,
      label: "50% Lead Time",
      activity: "Obtain manufacturing progress update (%)",
      method: "Call + Email",
    },
    {
      key: "MTO_75",
      percent: 75,
      label: "75% Lead Time",
      activity: "Verify production completion, QC, and inspection readiness",
      method: "Call + Email",
    },
    {
      key: "MTO_90",
      percent: 90,
      label: "90% Lead Time",
      activity: "Confirm packing, dispatch readiness, and logistics planning",
      method: "Call + Email",
    },
    {
      key: "MTO_95",
      percent: 95,
      label: "95% Lead Time",
      activity: "Confirm next-day committed delivery",
      method: "Mandatory Call + Email",
    },
    {
      key: "MTO_100",
      percent: 100,
      label: "100% Lead Date",
      activity: "Confirm dispatch / material movement / ETA",
      method: "Mandatory Call + Email",
    },
    {
      key: "MTO_DELAY",
      percent: 101,
      label: "Delay Stage",
      activity: "Obtain delay justification and revised delivery schedule",
      method: "Mandatory Call + Email",
      delay: true,
    },
  ],
  Unknown: [
    {
      key: "UNKNOWN_50",
      percent: 50,
      label: "50% Lead Time",
      activity: "Verify order readiness and delivery commitment",
      method: "Call / Email",
    },
    {
      key: "UNKNOWN_75",
      percent: 75,
      label: "75% Lead Time",
      activity: "Confirm dispatch schedule and transportation details",
      method: "Call + Email",
    },
    {
      key: "UNKNOWN_100",
      percent: 100,
      label: "100% Lead Date",
      activity: "Confirm dispatch / delivery status and ETA",
      method: "Mandatory Call + Email",
    },
    {
      key: "UNKNOWN_DELAY",
      percent: 101,
      label: "Delay Stage",
      activity: "Ask reason for delay and revised delivery date",
      method: "Mandatory Call + Email",
      delay: true,
    },
  ],
};

function normalizeProcurementAuditState(value) {
  const raw = value && typeof value === "object" ? value : {};
  const objectValue = (key) =>
    raw[key] && typeof raw[key] === "object" && !Array.isArray(raw[key])
      ? raw[key]
      : {};
  const arrayValue = (key) => (Array.isArray(raw[key]) ? raw[key] : []);
  return {
    poMaster: objectValue("poMaster"),
    lineAudits: objectValue("lineAudits"),
    vendorAudits: objectValue("vendorAudits"),
    invoices: arrayValue("invoices"),
    payments: arrayValue("payments"),
    receipts: arrayValue("receipts"),
    documents: arrayValue("documents"),
    risks: arrayValue("risks"),
    actions: arrayValue("actions"),
  };
}

const state = {
  manualRows: loadJson(STORAGE_KEYS.manualRows, []),
  rowOverrides: loadJson(STORAGE_KEYS.rowOverrides, {}),
  vendorContacts: mergeVendorSeeds(loadJson(STORAGE_KEYS.vendorContacts, {})),
  productVendorMetrics: loadJson(STORAGE_KEYS.productVendorMetrics, {}),
  followups: [],
  followupLogs: [],
  activityEvents: [],
  deletedVendors: loadJson(STORAGE_KEYS.deletedVendors, []),
  poTokenLog: loadJson(STORAGE_KEYS.poTokenLog, []),
  reusableQueue: loadJson(STORAGE_KEYS.reusableQueue, []),
  poMaster: loadJson(STORAGE_KEYS.poMaster, []),
  activeReservations: loadJson(STORAGE_KEYS.activeReservations, []),
  procurementAudit: normalizeProcurementAuditState(
    loadJson(STORAGE_KEYS.procurementAudit, {}),
  ),
  products: loadJson(STORAGE_KEYS.products, []),
  productAliases: loadJson(STORAGE_KEYS.productAliases, []),
  productsSubTab: "master",
  selectedMasterProductId: null,
  selectedMasterDetailTab: "overview",
  authSession: null,
  isAuthenticatedUser: false,
  productMasterCanWrite: false,
  activeMappingGroup: null,
  pendingHistoricalMapping: null,
  activeTab: "overview",
  selectedVendor: null,
  selectedMetricProduct: null,
  editingPoKey: null,
  showMetricVendorForm: false,
  showProcurementReport: false,
  showMechanicalAnalysis: false,
  showProcurementAudit: false,
  mechanicalAnalysisTab: "Dashboard",
  procurementAuditTab: "Vendor Master",
  procurementAuditEditingId: null,
  filters: {
    poSearch: "",
    poVendor: "all",
    poPayment: "all",
    poStatus: "all",
    poDelivery: "all",
    poSort: "poDate-desc",
    productMasterSearch: "",
    productMasterCategory: "all",
    productMasterStatus: "Active",
    unmappedProductSearch: "",
    productSearch: "",
    productSort: "totalSpend-desc",
    vendorSearch: "",
    vendorSort: "totalSpend-desc",
    metricProductSearch: "",
    metricSort: "vendorCount-desc",
    followupDate: new Date().toISOString().slice(0, 10),
    followupMaterial: "all",
    followupStatus: "all",
  },
};

const snsConfig = window.SNS_CONFIG || {};
let useSupabase = false;
let supabaseClient = null;
let supabaseSdkLoadPromise = null;

function hasSupabaseConfig() {
  return Boolean(
    snsConfig.useSupabase && snsConfig.supabaseUrl && snsConfig.supabaseAnonKey,
  );
}

function createSupabaseClientIfReady() {
  if (!hasSupabaseConfig() || !window.supabase?.createClient) return false;
  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(
      snsConfig.supabaseUrl,
      snsConfig.supabaseAnonKey,
    );
    if (supabaseClient?.auth?.onAuthStateChange) {
      supabaseClient.auth.onAuthStateChange(async (event, session) => {
        await checkSupabaseAuthSession();
        renderAll();
      });
    }
  }
  useSupabase = true;
  return true;
}


function loadSupabaseSdk() {
  if (createSupabaseClientIfReady()) return Promise.resolve(true);
  if (!hasSupabaseConfig()) return Promise.resolve(false);
  if (supabaseSdkLoadPromise) return supabaseSdkLoadPromise;

  supabaseSdkLoadPromise = new Promise((resolve) => {
    const existing = document.querySelector("script[data-supabase-sdk]");
    const done = (ready) => {
      const clientReady = ready && createSupabaseClientIfReady();
      if (clientReady) {
        queueConfig.enabled = Boolean(snsConfig.useQueueProcessor && useSupabase);
      }
      resolve(clientReady);
    };
    if (existing) {
      existing.addEventListener("load", () => done(true), { once: true });
      existing.addEventListener("error", () => done(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.async = true;
    script.dataset.supabaseSdk = "true";
    const timeout = window.setTimeout(() => done(false), 4500);
    script.addEventListener(
      "load",
      () => {
        window.clearTimeout(timeout);
        done(true);
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        window.clearTimeout(timeout);
        done(false);
      },
      { once: true },
    );
    document.head.appendChild(script);
  });

  return supabaseSdkLoadPromise;
}

createSupabaseClientIfReady();
const queueConfig = {
  enabled: Boolean(snsConfig.useQueueProcessor && useSupabase),
  table: cleanConfigText(snsConfig.queueTable) || "incoming_po_queue",
  payloadColumn: cleanConfigText(snsConfig.queuePayloadColumn) || "raw_payload",
  statusColumn: cleanConfigText(snsConfig.queueStatusColumn) || "status",
  errorColumn: cleanConfigText(snsConfig.queueErrorColumn) || "error_message",
  processedAtColumn:
    cleanConfigText(snsConfig.queueProcessedAtColumn) || "processed_at",
  poNumberColumn: cleanConfigText(snsConfig.queuePoNumberColumn) || "po_number",
  sourceColumn: cleanConfigText(snsConfig.queueSourceColumn) || "source",
  batchSize: Number.isFinite(Number(snsConfig.queueBatchSize))
    ? Math.max(1, Number(snsConfig.queueBatchSize))
    : 20,
};

const followupMailConfig = {
  fromEmail: cleanConfigText(snsConfig.followupMailFrom || snsConfig.defaultFollowupMailFrom) || 'sourcing@stacknstock.in',
  webhookUrl: cleanConfigText(snsConfig.followupMailWebhookUrl || snsConfig.zohoFollowupMailWebhookUrl || ''),
  webhookEnabled: Boolean(snsConfig.followupMailWebhookEnabled && cleanConfigText(snsConfig.followupMailWebhookUrl || snsConfig.zohoFollowupMailWebhookUrl || '')),
  webhookMode: cleanConfigText(snsConfig.followupMailWebhookMode || 'json').toLowerCase() === 'text' ? 'text' : 'json'
};

let remoteSyncTimer = null;
let remoteSyncInFlight = false;
let queueProcessingInFlight = false;
let completingFollowupContext = null;
let mailingFollowupContext = null;

function cleanConfigText(value) {
  return String(value ?? "").trim();
}

function safeDate(value) {
  const text = cleanText(value);
  return text || null;
}

function todayIsoDate() {
  return dateToIso(todayDateOnly());
}

function isMissingSupabaseColumnError(error, columns = []) {
  const message = String(error?.message || error || "").toLowerCase();
  const optionalColumns = columns.map((column) => column.toLowerCase());
  return (
    optionalColumns.some((column) => message.includes(column)) &&
    (error?.code === "42703" ||
      error?.code === "PGRST204" ||
      message.includes("schema cache") ||
      message.includes("column"))
  );
}

function stripOptionalColumns(value, columns = []) {
  if (Array.isArray(value)) {
    return value.map((row) => stripOptionalColumns(row, columns));
  }
  const copy = { ...(value || {}) };
  columns.forEach((column) => delete copy[column]);
  return copy;
}

async function upsertSupabaseWithOptionalColumns(
  table,
  payload,
  options,
  optionalColumns = [],
) {
  const first = await supabaseClient.from(table).upsert(payload, options);
  if (!first.error) return first;
  if (!isMissingSupabaseColumnError(first.error, optionalColumns))
    throw first.error;
  const fallbackPayload = stripOptionalColumns(payload, optionalColumns);
  const second = await supabaseClient
    .from(table)
    .upsert(fallbackPayload, options);
  if (second.error) throw second.error;
  return second;
}

async function updateSupabaseEqWithOptionalColumns(
  table,
  patch,
  column,
  value,
  optionalColumns = [],
) {
  const first = await supabaseClient.from(table).update(patch).eq(column, value);
  if (!first.error) return first;
  if (!isMissingSupabaseColumnError(first.error, optionalColumns))
    throw first.error;
  const fallbackPatch = stripOptionalColumns(patch, optionalColumns);
  const second = await supabaseClient
    .from(table)
    .update(fallbackPatch)
    .eq(column, value);
  if (second.error) throw second.error;
  return second;
}

function toNumeric(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Number(n.toFixed(2)) : null;
}

function roundMoney(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Number(n.toFixed(2)) : 0;
}

function parsePayloadMoney(value) {
  if (value === null || value === undefined || value === "") return null;
  const direct = Number(value);
  if (Number.isFinite(direct)) return Number(direct.toFixed(2));
  const cleaned = String(value).replace(/[^0-9.-]+/g, "");
  if (!cleaned || cleaned === "-" || cleaned === "." || cleaned === "-.")
    return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? Number(parsed.toFixed(2)) : null;
}

function normalizePoAvailabilityType(value) {
  const raw = normalizeKey(value);
  if (raw.includes("VENDOR")) return "Vendor";
  return "Marketplace";
}

function normalizePoTokenStatus(value) {
  const raw = normalizeKey(value);
  if (raw.includes("CANCEL")) return "Cancelled";
  return "Taken";
}

function serializePoTokenStatus(value) {
  return normalizePoTokenStatus(value) === "Cancelled" ? "Cancelled" : "Active";
}

function normalizeReusableStatus(value) {
  const raw = normalizeKey(value);
  if (raw.includes("RESERV")) return "Reserved";
  if (raw.includes("USED") || raw.includes("SUBMIT")) return "Used";
  return "Available";
}

function normalizePoMasterStatus(value) {
  const raw = normalizeKey(value);
  if (raw.includes("SUBMIT")) return "Submitted";
  if (raw.includes("CANCEL")) return "Cancelled";
  if (raw.includes("UNUSED") || raw.includes("EXPIRE")) return "Unused";
  if (raw.includes("RESERV")) return "Reserved";
  return "Available";
}

function normalizeAvailabilityArrays() {
  state.poTokenLog = Array.isArray(state.poTokenLog) ? state.poTokenLog : [];
  state.reusableQueue = Array.isArray(state.reusableQueue)
    ? state.reusableQueue
    : [];
  state.poMaster = Array.isArray(state.poMaster) ? state.poMaster : [];
  state.activeReservations = Array.isArray(state.activeReservations)
    ? state.activeReservations
    : [];
  state.poTokenLog.forEach((token) => {
    token.status = normalizePoTokenStatus(token.status);
  });
}

function toIsoDateTime(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return cleanText(value) || "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getPoNumberParts(value) {
  const text = cleanText(value);
  const match = text.match(/^(.*?)(\d+)$/);
  if (!match) return null;
  return {
    prefix: match[1] || "PO-",
    number: Number(match[2]),
    width: match[2].length,
  };
}

function formatPoNumber(prefix, numberValue, width) {
  return `${prefix || "PO-"}${String(Math.max(0, Number(numberValue) || 0)).padStart(Math.max(4, width || 4), "0")}`;
}

function getFollowingPoNumber(poNumber) {
  const parts = getPoNumberParts(poNumber);
  if (!parts) return getNextSequencePO();
  return formatPoNumber(parts.prefix, parts.number + 1, parts.width);
}

function comparePoNumbers(a, b) {
  const aParts = getPoNumberParts(a);
  const bParts = getPoNumberParts(b);
  if (aParts && bParts && aParts.prefix === bParts.prefix)
    return aParts.number - bParts.number;
  return cleanText(a).localeCompare(cleanText(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function getKnownPoNumbers() {
  normalizeAvailabilityArrays();
  return new Set(
    [
      ...allRows().map((row) => row.poNumber),
      ...state.poTokenLog.map((row) => row.poNumber),
      ...state.reusableQueue.map((row) => row.poNumber),
      ...state.poMaster.map((row) => row.poNumber),
      ...state.activeReservations.map((row) => row.poNumber),
    ]
      .map(cleanText)
      .filter(Boolean),
  );
}

function getNextSequencePO() {
  const known = getKnownPoNumbers();
  const parts = [...known].map(getPoNumberParts).filter(Boolean);
  const poParts = parts.filter((item) => normalizeKey(item.prefix).includes("PO"));
  const candidates = poParts.length ? poParts : parts;
  const maxPart = candidates.reduce(
    (best, item) => (!best || item.number > best.number ? item : best),
    null,
  );
  const prefix = maxPart?.prefix || "PO-";
  const width = Math.max(5, maxPart?.width || 5);
  let nextNumber = (maxPart?.number || 0) + 1;
  let candidate = formatPoNumber(prefix, nextNumber, width);
  while (known.has(candidate)) {
    nextNumber += 1;
    candidate = formatPoNumber(prefix, nextNumber, width);
  }
  return candidate;
}

function getOldestReusablePO() {
  normalizeAvailabilityArrays();
  return state.reusableQueue
    .filter((row) => normalizeReusableStatus(row.status) === "Available")
    .slice()
    .sort((a, b) => {
      const aTime = new Date(a.cancelledOn || a.cancelled_date || 0).getTime();
      const bTime = new Date(b.cancelledOn || b.cancelled_date || 0).getTime();
      if (aTime !== bTime) return aTime - bTime;
      return comparePoNumbers(a.poNumber, b.poNumber);
    })[0];
}

function upsertPoMaster(row) {
  normalizeAvailabilityArrays();
  const poNumber = cleanText(row?.poNumber);
  if (!poNumber) return;
  const existingIndex = state.poMaster.findIndex(
    (item) => cleanText(item.poNumber) === poNumber,
  );
  const next = {
    ...(existingIndex >= 0 ? state.poMaster[existingIndex] : {}),
    ...row,
    poNumber,
    status: normalizePoMasterStatus(row.status),
  };
  if (existingIndex >= 0) state.poMaster[existingIndex] = next;
  else state.poMaster.push(next);
}

function getTokenByNumber(tokenNumber) {
  normalizeAvailabilityArrays();
  const wanted = cleanText(tokenNumber);
  return state.poTokenLog.find(
    (token) => cleanText(token.tokenNumber) === wanted,
  );
}

function generatePoTokenNumber() {
  normalizeAvailabilityArrays();
  const year = new Date().getFullYear();
  const prefix = `TKN-${year}-`;
  const next =
    state.poTokenLog
      .map((row) => cleanText(row.tokenNumber))
      .filter((token) => token.startsWith(prefix))
      .map((token) => Number(token.slice(prefix.length)))
      .filter(Number.isFinite)
      .reduce((max, value) => Math.max(max, value), 0) + 1;
  return `${prefix}${String(next).padStart(4, "0")}`;
}

function getCurrentAvailablePO() {
  const reusable = getOldestReusablePO();
  const nextSequencePo = getNextSequencePO();
  if (reusable) {
    return {
      currentPo: cleanText(reusable.poNumber),
      nextPo: nextSequencePo,
      type: "Reusable",
      reusable,
    };
  }
  return {
    currentPo: nextSequencePo,
    nextPo: getFollowingPoNumber(nextSequencePo),
    type: "New Sequence",
    reusable: null,
  };
}

function getActiveReservationRows() {
  normalizeAvailabilityArrays();
  return state.activeReservations
    .map((reservation) => {
      const poNumber = cleanText(reservation.poNumber || reservation.po_number);
      const tokenNumber = cleanText(
        reservation.tokenNumber || reservation.token_number,
      );
      const token = tokenNumber ? getTokenByNumber(tokenNumber) : null;
      return {
        poNumber,
        tokenNumber,
        reservedBy: cleanText(
          reservation.reservedBy || reservation.reserved_by || token?.takenBy,
        ),
        reservedAt: reservation.reservedAt || reservation.reserved_at || "",
        source: cleanText(reservation.source || token?.source),
        type: normalizePoAvailabilityType(reservation.type || token?.type),
        token,
      };
    })
    .filter((row) => row.poNumber)
    .sort(
      (a, b) =>
        new Date(a.reservedAt || 0).getTime() -
        new Date(b.reservedAt || 0).getTime(),
    );
}

function getLastTakenPoToken() {
  normalizeAvailabilityArrays();
  return state.poTokenLog
    .filter((token) => normalizePoTokenStatus(token.status) === "Taken")
    .slice()
    .sort(
      (a, b) =>
        new Date(b.timestamp || 0) - new Date(a.timestamp || 0),
    )[0];
}

function getPoAvailabilityStats(derived = null) {
  normalizeAvailabilityArrays();
  const activeReservations = getActiveReservationRows();
  const takenTokens = state.poTokenLog.filter(
    (token) => normalizePoTokenStatus(token.status) === "Taken",
  );
  const cancelledTokens = state.poTokenLog.filter(
    (token) => normalizePoTokenStatus(token.status) === "Cancelled",
  );
  const reusableRows = state.reusableQueue.filter(
    (row) => normalizeReusableStatus(row.status) === "Available",
  );
  const knownCount = getKnownPoNumbers().size;
  return {
    active: activeReservations.length,
    taken: takenTokens.length,
    submitted: takenTokens.length,
    reusable: reusableRows.length,
    cancelled: cancelledTokens.length,
    tokenCount: state.poTokenLog.length,
    knownCount,
    poCount: Array.isArray(derived?.pos) ? derived.pos.length : 0,
    lastTaken: getLastTakenPoToken(),
  };
}

function poAvailabilityStatusClass(status) {
  const raw = normalizeKey(status);
  if (raw.includes("SUBMIT") || raw.includes("USED") || raw.includes("AVAILABLE"))
    return "good";
  if (raw.includes("TAKEN") || raw.includes("ACTIVE") || raw.includes("RESERV"))
    return "warning";
  if (raw.includes("CANCEL") || raw.includes("UNUSED")) return "danger";
  return "neutral";
}

function derivePaymentState(
  poTotal,
  amountPaidInput = 0,
  explicitBalanceDue = null,
) {
  const total = Math.max(0, roundMoney(poTotal));
  const paidInput = Math.max(0, roundMoney(amountPaidInput));
  const hasExplicitBalance =
    explicitBalanceDue !== null &&
    explicitBalanceDue !== undefined &&
    explicitBalanceDue !== "" &&
    Number.isFinite(Number(explicitBalanceDue));
  const rawBalance = hasExplicitBalance
    ? roundMoney(explicitBalanceDue)
    : roundMoney(total - Math.min(total, paidInput));
  const balanceDue = Math.max(0, rawBalance);
  const amountPaid = Math.max(0, roundMoney(total - balanceDue));
  let paymentStatus = "Pending";
  if (total <= 0 || amountPaid >= total) paymentStatus = "Paid";
  else if (amountPaid > 0) paymentStatus = "Partially Paid";
  return { amountPaid, balanceDue, paymentStatus };
}

function paymentProgressPercent(po) {
  const total = Math.max(0, number(po?.poTotal));
  const explicitPaid = Math.max(0, number(po?.amountPaid));
  const balance =
    po?.balanceDue === null ||
    po?.balanceDue === undefined ||
    po?.balanceDue === ""
      ? null
      : Math.max(0, number(po?.balanceDue));
  const status = normalizePaymentStatus(po?.paymentStatus || "Pending");
  if (status === "Paid") return 100;
  if (total <= 0) return status === "Paid" ? 100 : 0;
  let paid = explicitPaid;
  if (balance !== null && Number.isFinite(balance))
    paid = Math.max(0, total - balance);
  let percent = Math.round((Math.min(total, paid) / total) * 100);
  if (status === "Pending") percent = 0;
  if (status === "Partially Paid" && percent <= 0) percent = 1;
  if (status === "Partially Paid" && percent >= 100) percent = 99;
  return Math.max(0, Math.min(100, percent));
}

function paymentProgressStatus(po) {
  const percent = paymentProgressPercent(po);
  if (percent >= 100) return "Paid";
  if (percent > 0) return "Partially Paid";
  return "Pending";
}

function paymentProgressClass(po) {
  const percent = paymentProgressPercent(po);
  if (percent >= 100) return "paid";
  if (percent > 0) return "partial";
  return "pending";
}

function renderPaymentProgress(po) {
  const percent = paymentProgressPercent(po);
  const status = paymentProgressStatus(po);
  const total = Math.max(0, number(po?.poTotal));
  const paidFromBalance =
    po?.balanceDue === null ||
    po?.balanceDue === undefined ||
    po?.balanceDue === ""
      ? number(po?.amountPaid || 0)
      : Math.max(0, total - number(po?.balanceDue));
  const paid = Math.max(0, Math.min(total, paidFromBalance));
  const balance = Math.max(
    0,
    number(po?.balanceDue ?? Math.max(0, total - paid)),
  );
  return `
    <div class="payment-progress payment-${paymentProgressClass(po)}" title="${escapeHtml(status)} · ${percent}% paid">
      <div class="payment-progress-head">
        <strong>${percent}%</strong>
        <span>${escapeHtml(status)}</span>
      </div>
      <div class="payment-progress-track" aria-label="${percent}% paid">
        <span style="width:${percent}%"></span>
      </div>
      <div class="payment-progress-meta">
        <span>Paid ${money(paid)}</span>
        <span>Bal ${money(balance)}</span>
      </div>
    </div>
  `;
}

function getDiscountStateFromInputs() {
  const typeEl = document.getElementById("summaryDiscountType");
  const inputEl = document.getElementById("summaryDiscountInput");
  const adjustmentEl = document.getElementById("summaryAdjustmentInput");
  const discountType =
    cleanText(typeEl?.value || "amount").toLowerCase() === "percent"
      ? "percent"
      : "amount";
  const discountInputValue = Math.max(0, number(inputEl?.value));
  const adjustmentAmount = roundMoney(number(adjustmentEl?.value));
  return { discountType, discountInputValue, adjustmentAmount };
}

function calculatePoBreakdown(
  lines,
  discountType = "amount",
  discountInputValue = 0,
  adjustmentAmount = 0,
) {
  const normalizedLines = (lines || []).map((line) => {
    const quantityOrdered = number(line.quantityOrdered);
    const itemPrice = number(line.itemPrice);
    const itemTaxPercent = number(line.itemTaxPercent);
    const lineBase = roundMoney(quantityOrdered * itemPrice);
    return {
      ...line,
      quantityOrdered,
      uom: normalizeUom(line.uom || "Nos"),
      itemPrice,
      itemTaxPercent,
      lineBase,
    };
  });

  const itemSubtotal = roundMoney(
    normalizedLines.reduce((sum, line) => sum + line.lineBase, 0),
  );
  const rawDiscountValue =
    discountType === "percent"
      ? itemSubtotal * (number(discountInputValue) / 100)
      : number(discountInputValue);
  const discountValue = roundMoney(
    Math.min(itemSubtotal, Math.max(0, rawDiscountValue)),
  );
  const taxableSubtotal = roundMoney(itemSubtotal - discountValue);

  let allocatedDiscount = 0;
  const computedLines = normalizedLines.map((line, index) => {
    let discountShare = 0;
    if (itemSubtotal > 0 && discountValue > 0) {
      if (index === normalizedLines.length - 1) {
        discountShare = roundMoney(discountValue - allocatedDiscount);
      } else {
        discountShare = roundMoney(
          discountValue * (line.lineBase / itemSubtotal),
        );
        allocatedDiscount += discountShare;
      }
    }
    const taxableBase = roundMoney(Math.max(0, line.lineBase - discountShare));
    const taxAmount = roundMoney(taxableBase * (line.itemTaxPercent / 100));
    const lineGrandTotal = roundMoney(taxableBase + taxAmount);
    return {
      ...line,
      discountShare,
      taxableBase,
      itemTotal: line.lineBase,
      itemTaxAmount: taxAmount,
      lineGrandTotal,
    };
  });

  const taxTotal = roundMoney(
    computedLines.reduce((sum, line) => sum + line.itemTaxAmount, 0),
  );
  const grandTotal = roundMoney(
    Math.max(0, taxableSubtotal + taxTotal + number(adjustmentAmount)),
  );

  return {
    itemSubtotal,
    discountType,
    discountInputValue: roundMoney(discountInputValue),
    discountValue,
    taxableSubtotal,
    taxTotal,
    adjustmentAmount: roundMoney(adjustmentAmount),
    grandTotal,
    lines: computedLines,
  };
}

function isOptionalSupabaseTableError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  return (
    error?.code === "42P01" ||
    error?.code === "PGRST205" ||
    message.includes("does not exist") ||
    message.includes("schema cache")
  );
}

async function loadPoAvailabilityFromSupabase() {
  if (!useSupabase) return false;
  const [masterRes, tokenRes, queueRes, reservationRes] = await Promise.all([
    supabaseClient.from("po_master").select("*").order("po_number"),
    supabaseClient
      .from("po_token_log")
      .select("*")
      .order("timestamp", { ascending: false }),
    supabaseClient
      .from("reusable_queue")
      .select("*")
      .order("cancelled_date", { ascending: true }),
    supabaseClient.from("active_reservations").select("*").order("reserved_at"),
  ]);
  const errors = [
    masterRes.error,
    tokenRes.error,
    queueRes.error,
    reservationRes.error,
  ].filter(Boolean);
  if (errors.length) {
    if (!errors.every(isOptionalSupabaseTableError))
      console.warn("PO availability load skipped", errors);
    return false;
  }

  state.poMaster = (masterRes.data || []).map((row) => ({
    poNumber: row.po_number,
    status: normalizePoMasterStatus(row.status),
    createdBy: row.created_by || "",
    createdAt: row.created_at || "",
    type: normalizePoAvailabilityType(row.type),
    isReusable: Boolean(row.is_reusable),
    tokenNumber: row.token_number || "",
  }));
  state.poTokenLog = (tokenRes.data || []).map((row) => ({
    tokenNumber: row.token_number,
    poNumber: row.po_number,
    takenBy: row.taken_by || "",
    type: normalizePoAvailabilityType(row.type),
    timestamp: row.timestamp || "",
    status: normalizePoTokenStatus(row.status),
    notes: row.notes || "",
    source: row.source || "",
  }));
  state.reusableQueue = (queueRes.data || []).map((row) => ({
    poNumber: row.po_number,
    cancelledBy: row.cancelled_by || "",
    type: normalizePoAvailabilityType(row.type),
    cancelledOn: row.cancelled_date || "",
    reason: row.cancellation_reason || "",
    status: normalizeReusableStatus(row.status),
    tokenNumber: row.token_number || "",
  }));
  state.activeReservations = (reservationRes.data || []).map((row) => ({
    poNumber: row.po_number,
    tokenNumber: row.token_number || "",
    reservedBy: row.reserved_by || "",
    reservedAt: row.reserved_at || "",
    expiryTime: row.expiry_time || "",
    source: row.source || "",
    type: normalizePoAvailabilityType(row.type),
  }));
  normalizeAvailabilityArrays();
  localStorage.setItem(
    STORAGE_KEYS.poTokenLog,
    JSON.stringify(state.poTokenLog),
  );
  localStorage.setItem(
    STORAGE_KEYS.reusableQueue,
    JSON.stringify(state.reusableQueue),
  );
  localStorage.setItem(STORAGE_KEYS.poMaster, JSON.stringify(state.poMaster));
  localStorage.setItem(
    STORAGE_KEYS.activeReservations,
    JSON.stringify(state.activeReservations),
  );
  return true;
}

async function syncPoAvailabilityToSupabase() {
  if (!useSupabase) return;
  normalizeAvailabilityArrays();
  const masterPayload = state.poMaster.map((row) => ({
    po_number: cleanText(row.poNumber),
    status: normalizePoMasterStatus(row.status),
    created_by: cleanText(row.createdBy || ""),
    created_at: row.createdAt || null,
    type: normalizePoAvailabilityType(row.type),
    is_reusable: Boolean(row.isReusable),
    token_number: cleanText(row.tokenNumber || "") || null,
  }));
  const tokenPayload = state.poTokenLog.map((row) => ({
    token_number: cleanText(row.tokenNumber),
    po_number: cleanText(row.poNumber),
    taken_by: cleanText(row.takenBy || ""),
    type: normalizePoAvailabilityType(row.type),
    timestamp: row.timestamp || null,
    status: serializePoTokenStatus(row.status),
    notes: row.notes || "",
    source: cleanText(row.source || ""),
  }));
  const queuePayload = state.reusableQueue.map((row) => ({
    po_number: cleanText(row.poNumber),
    cancelled_by: cleanText(row.cancelledBy || ""),
    type: normalizePoAvailabilityType(row.type),
    cancellation_reason: row.reason || "",
    cancelled_date: row.cancelledOn || null,
    status: normalizeReusableStatus(row.status),
    token_number: cleanText(row.tokenNumber || "") || null,
  }));
  const reservationPayload = state.activeReservations.map((row) => ({
    po_number: cleanText(row.poNumber),
    token_number: cleanText(row.tokenNumber || "") || null,
    reserved_by: cleanText(row.reservedBy || ""),
    reserved_at: row.reservedAt || null,
    expiry_time: row.expiryTime || null,
    source: cleanText(row.source || ""),
    type: normalizePoAvailabilityType(row.type),
  }));

  try {
    if (masterPayload.length) {
      const { error } = await supabaseClient
        .from("po_master")
        .upsert(masterPayload, { onConflict: "po_number" });
      if (error) throw error;
    }
    if (tokenPayload.length) {
      const { error } = await supabaseClient
        .from("po_token_log")
        .upsert(tokenPayload, { onConflict: "token_number" });
      if (error) throw error;
    }
    if (queuePayload.length) {
      const { error } = await supabaseClient
        .from("reusable_queue")
        .upsert(queuePayload, { onConflict: "po_number" });
      if (error) throw error;
    }

    const currentReservationKeys = new Set(
      reservationPayload.map((row) => row.po_number).filter(Boolean),
    );
    const existingReservations = await supabaseClient
      .from("active_reservations")
      .select("po_number");
    if (existingReservations.error) throw existingReservations.error;
    for (const row of existingReservations.data || []) {
      if (!currentReservationKeys.has(cleanText(row.po_number))) {
        const { error } = await supabaseClient
          .from("active_reservations")
          .delete()
          .eq("po_number", row.po_number);
        if (error) throw error;
      }
    }
    if (reservationPayload.length) {
      const { error } = await supabaseClient
        .from("active_reservations")
        .upsert(reservationPayload, { onConflict: "po_number" });
      if (error) throw error;
    }
  } catch (error) {
    if (!isOptionalSupabaseTableError(error))
      console.warn("PO availability sync skipped", error);
  }
}

async function loadRemoteStateFromSupabase() {
  if (!useSupabase) return false;

  const [
    vendorsRes,
    poRes,
    linesRes,
    metricsRes,
    followupsRes,
    followupLogsRes,
    activityEventsRes,
  ] = await Promise.all([
    supabaseClient.from("vendors").select("*").order("vendor_name"),
    supabaseClient
      .from("purchase_orders")
      .select("*")
      .order("po_date", { ascending: false }),
    supabaseClient
      .from("po_lines")
      .select("*")
      .order("po_date", { ascending: false }),
    supabaseClient
      .from("product_vendor_metrics")
      .select("*")
      .order("product_name"),
    supabaseClient
      .from("po_followups")
      .select("*")
      .order("due_date", { ascending: true }),
    supabaseClient
      .from("po_followup_logs")
      .select("*")
      .order("created_at", { ascending: false }),
    supabaseClient
      .from("po_activity_events")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const errors = [
    vendorsRes.error,
    poRes.error,
    linesRes.error,
    metricsRes.error,
    followupsRes.error,
    activityEventsRes.error,
  ].filter(Boolean);
  if (errors.length) {
    console.error("Supabase load error", errors);
    alert(
      "Supabase connection loaded with errors. Falling back to local mode for this session.",
    );
    return false;
  }
  if (followupLogsRes.error && !isOptionalSupabaseTableError(followupLogsRes.error)) {
    console.warn("Follow-up log history could not be loaded", followupLogsRes.error);
  }

  const vendors = vendorsRes.data || [];
  const lines = linesRes.data || [];
  const metrics = metricsRes.data || [];

  vendorSeeds = vendors
    .filter((v) => !v.is_deleted)
    .map((v) => ({
      vendorName: v.vendor_name,
      source: v.source || "",
      vendorCategory: v.vendor_category || "",
      currencyCode: v.currency_code || "INR",
      gstin: v.gstin || "",
      contactPerson: v.contact_person || "",
      contactPerson2: v.contact_person_2 || "",
      phone: v.phone || "",
      phone2: v.phone_2 || "",
      email: v.email || "",
      website: v.website || "",
      city: v.city || "",
      defaultLeadTimeDays: v.default_lead_time_days || "",
      rating: v.rating || "",
      notes: v.notes || "",
    }));

  baseRows = lines.map((line) => ({
    id: line.line_id,
    productId: line.product_id || null,
    poDate: line.po_date || "",
    deliveryDate: line.delivery_date || "",
    deliveredDate: line.delivered_date || "",
    deliveryStatus: line.delivery_status || "",
    poNumber: line.po_number,
    reference: "",
    poStatus: line.po_status || "",
    vendorName: line.vendor_name || "",
    hsnSac: "",
    source: line.source || "",
    gstin: line.gstin || "",
    referenceNo: "",
    terms: line.terms || "",
    itemPrice: Number(line.item_price || 0),
    itemDesc: line.item_desc || "",
    quantityOrdered: Number(line.quantity_ordered || 0),
    uom: cleanText(line.uom || line.unit || line.unit_name || ""),
    itemTax: line.item_tax_percent ? `GST${line.item_tax_percent}` : "",
    itemTaxPercent: Number(line.item_tax_percent || 0),
    itemTaxAmount: Number(line.item_tax_amount || 0),
    itemTotal: Number(line.item_total || 0),
    lineGrandTotal: Number(line.line_grand_total || 0),
    total: null,
    paymentStatus: line.payment_status || "",
    balanceDue: line.balance_due,
    discountAmount: 0,
    discountType: "amount",
    discountInputValue: 0,
    adjustmentAmount: 0,
    manual: Boolean(line.manual),
    lineType: line.line_type || "product",
  }));

  // set po total on first line of each PO so existing grouping logic can keep using it
  const poMap = new Map((poRes.data || []).map((po) => [po.po_number, po]));
  const firstIndexByPo = new Map();
  baseRows.forEach((row, idx) => {
    if (!firstIndexByPo.has(row.poNumber))
      firstIndexByPo.set(row.poNumber, idx);
  });
  firstIndexByPo.forEach((idx, poNumber) => {
    if (poMap.has(poNumber))
      baseRows[idx].total = Number(poMap.get(poNumber).po_total || 0);
  });
  baseRows.forEach((row) => {
    const po = poMap.get(row.poNumber);
    row.poStatus = normalizePoStatus(po?.po_status || row.poStatus);
    row.discountAmount = Number(po?.discount_amount || 0);
    row.discountType =
      cleanText(po?.discount_type || "amount").toLowerCase() === "percent"
        ? "percent"
        : "amount";
    row.discountInputValue = Number(
      po?.discount_input_value ?? po?.discount_amount ?? 0,
    );
    row.adjustmentAmount = Number(po?.adjustment_amount || 0);
    row.amountPaid = Number(po?.amount_paid || 0);
    row.materialType = normalizeMaterialType(
      po?.material_type || row.materialType || "Unknown",
    );
    row.edd = po?.edd || row.edd || "";
    row.deliveredDate = po?.delivered_date || row.deliveredDate || "";
    row.vendorEmail = po?.vendor_email || row.vendorEmail || "";
    row.vendorPhone = po?.vendor_phone || row.vendorPhone || "";
    row.delayReason = po?.delay_reason || row.delayReason || "";
    row.balanceDue = po?.balance_due ?? row.balanceDue ?? null;
  });

  state.manualRows = [];
  state.rowOverrides = {};
  state.vendorContacts = mergeVendorSeeds(
    Object.fromEntries(
      vendors
        .filter((v) => !v.is_deleted)
        .map((v) => [
          cleanText(v.vendor_name),
          {
            vendorName: v.vendor_name,
            source: v.source || "",
            vendorCategory: v.vendor_category || "",
            currencyCode: v.currency_code || "INR",
            gstin: v.gstin || "",
            contactPerson: v.contact_person || "",
            contactPerson2: v.contact_person_2 || "",
            phone: v.phone || "",
            phone2: v.phone_2 || "",
            email: v.email || "",
            website: v.website || "",
            city: v.city || "",
            defaultLeadTimeDays: v.default_lead_time_days || "",
            rating: v.rating || "",
            notes: v.notes || "",
          },
        ]),
    ),
  );
  state.productVendorMetrics = Object.fromEntries(
    metrics.map((m) => [
      m.metric_key,
      {
        productName: m.product_name,
        vendorName: m.vendor_name,
        quotedPrice: m.quoted_price == null ? "" : String(m.quoted_price),
        leadTimeDays: m.lead_time_days || "",
        moq: m.moq || "",
        rating: m.rating || "",
        notes: m.notes || "",
        source: m.source || "",
        gstin: m.gstin || "",
      },
    ]),
  );
  state.deletedVendors = vendors
    .filter((v) => v.is_deleted)
    .map((v) => v.vendor_name);
  state.followups = (followupsRes.data || []).filter(
    (row) => !isAcknowledgementFollowup(row),
  );
  state.followupLogs = followupLogsRes.error ? [] : followupLogsRes.data || [];
  state.activityEvents = activityEventsRes.data || [];
  const audit = procurementAuditState();
  (poRes.data || []).forEach((po) => {
    const key = cleanText(po.po_number);
    if (!key) return;
    const current = audit.poMaster[key] || {};
    audit.poMaster[key] = {
      ...current,
      purchaseCategory: po.purchase_category ?? current.purchaseCategory ?? "",
      gstIncluded:
        po.gst_included == null
          ? current.gstIncluded ?? ""
          : po.gst_included
            ? "Yes"
            : "No",
      advancePaid: po.advance_paid ?? current.advancePaid ?? "",
      auditStatus: po.audit_status ?? current.auditStatus ?? "Pending",
    };
  });
  await loadProcurementAuditFromSupabase();
  await loadPoAvailabilityFromSupabase();
  await loadProductsFromSupabase();
  return true;
}

async function loadProcurementAuditFromSupabase() {
  if (!useSupabase) return false;
  const specs = [
    ["vendorAudits", "procurement_vendor_audits"],
    ["lineAudits", "po_line_audits"],
    ["invoices", "po_invoices"],
    ["payments", "po_payments"],
    ["receipts", "po_receipts"],
    ["documents", "procurement_documents"],
    ["risks", "procurement_risks"],
    ["actions", "procurement_actions"],
  ];
  const results = await Promise.all(
    specs.map(async ([key, table]) => {
      const result = await supabaseClient.from(table).select("*");
      return { key, table, ...result };
    }),
  );
  const available = results.filter((result) => !result.error);
  if (!available.length) {
    const unexpected = results.find(
      (result) => !isOptionalSupabaseTableError(result.error),
    );
    if (unexpected)
      console.warn(
        "Procurement audit cloud records are unavailable; local records remain active.",
        unexpected.error,
      );
    return false;
  }

  const audit = procurementAuditState();
  available.forEach(({ key, data }) => {
    const rows = data || [];
    if (!rows.length) return;
    if (key === "vendorAudits") {
      audit.vendorAudits = Object.fromEntries(
        rows.map((row) => [
          row.vendor_name,
          {
            priceCompetitiveness: row.price_competitiveness ?? "",
            quality: row.quality ?? "",
            deliveryReliability: row.delivery_reliability ?? "",
            technicalCapability: row.technical_capability ?? "",
            responsiveness: row.responsiveness ?? "",
            paymentFlexibility: row.payment_flexibility ?? "",
            documentationDiscipline: row.documentation_discipline ?? "",
            notes: row.notes || "",
          },
        ]),
      );
      return;
    }
    if (key === "lineAudits") {
      audit.lineAudits = Object.fromEntries(
        rows.map((row) => [
          row.line_id,
          {
            purchaseType: row.purchase_type || "",
            auditType: row.audit_type || "",
            itemMaturity: row.item_maturity || "",
            vendorType: row.vendor_type || "",
            purchaseUrgency: row.purchase_urgency || "",
            quoteCount: row.quote_count ?? "",
            technicalValidation: row.technical_validation || "",
            priceBenchmarkAvailable:
              row.price_benchmark_available == null
                ? ""
                : row.price_benchmark_available
                  ? "Yes"
                  : "No",
            benchmarkUnitPrice: row.benchmark_unit_price ?? "",
            backupVendorAvailable:
              row.backup_vendor_available == null
                ? ""
                : row.backup_vendor_available
                  ? "Yes"
                  : "No",
            riskLevel: row.risk_level || "",
            actionRequired: row.action_required || "",
            priceVariance: row.price_variance ?? "",
            deliveryVariance: row.delivery_variance ?? "",
            qualityVariance: row.quality_variance || "",
            notes: row.notes || "",
          },
        ]),
      );
      return;
    }
    const mapped = rows.map((row) => {
      if (key === "invoices")
        return {
          id: row.id,
          poNumber: row.po_number,
          vendorName: row.vendor_name || "",
          invoiceNumber: row.invoice_number,
          invoiceDate: row.invoice_date || "",
          invoiceAmount: row.invoice_amount ?? 0,
          gstCorrect: row.gst_correct || "Pending",
          freightIncluded: row.freight_included ? "Yes" : "No",
          freightAmount: row.freight_amount ?? 0,
          extraCharges: row.extra_charges ?? 0,
          evidenceReference: row.evidence_reference || "",
          comments: row.comments || "",
        };
      if (key === "payments")
        return {
          id: row.id,
          poNumber: row.po_number,
          invoiceId: row.invoice_id || "",
          paymentDate: row.payment_date || "",
          paymentType: row.payment_type || "",
          amount: row.amount ?? 0,
          paymentReference: row.payment_reference || "",
          proofAvailable: row.proof_available ? "Yes" : "No",
          approved: row.approved ? "Yes" : "No",
          remarks: row.remarks || "",
        };
      if (key === "receipts")
        return {
          id: row.id,
          poNumber: row.po_number,
          lineId: row.line_id || "",
          grnNumber: row.grn_number || "",
          grnDate: row.grn_date || "",
          receivedQuantity: row.received_quantity ?? 0,
          inspectionStatus: row.inspection_status || "Pending",
          rejectionQuantity: row.rejection_quantity ?? 0,
          deliveryChallan: row.delivery_challan || "",
          testCertificate: row.test_certificate || "",
          warrantyReference: row.warranty_reference || "",
          comments: row.comments || "",
        };
      if (key === "documents")
        return {
          id: row.id,
          poNumber: row.po_number || "",
          vendorName: row.vendor_name || "",
          documentType: row.document_type || "",
          status: row.status || "Missing",
          comments: row.comments || "",
        };
      if (key === "risks")
        return {
          id: row.id,
          itemPo: row.item_po || "",
          finding: row.finding || "",
          risk: row.risk || "",
          evidence: row.evidence || "",
          impact: row.impact || "",
          action: row.action || "",
          owner: row.owner || "",
          priority: row.priority || "Medium",
          dueDate: row.due_date || "",
          status: row.status || "Open",
        };
      return {
        id: row.id,
        description: row.description || "",
        owner: row.owner || "",
        priority: row.priority || "Medium",
        dueDate: row.due_date || "",
        status: row.status || "Open",
        comments: row.comments || "",
      };
    });
    audit[key] = mapped;
  });
  localStorage.setItem(
    STORAGE_KEYS.procurementAudit,
    JSON.stringify(state.procurementAudit),
  );
  return true;
}

async function syncProcurementAuditToSupabase() {
  if (!useSupabase) return false;
  const audit = procurementAuditState();
  const lineMap = auditLineMap();
  const payloads = [
    [
      "procurement_vendor_audits",
      Object.entries(audit.vendorAudits).map(([vendorName, row]) => ({
        vendor_name: vendorName,
        price_competitiveness: row.priceCompetitiveness || null,
        quality: row.quality || null,
        delivery_reliability: row.deliveryReliability || null,
        technical_capability: row.technicalCapability || null,
        responsiveness: row.responsiveness || null,
        payment_flexibility: row.paymentFlexibility || null,
        documentation_discipline: row.documentationDiscipline || null,
        notes: row.notes || "",
        updated_at: new Date().toISOString(),
      })),
      "vendor_name",
    ],
    [
      "po_line_audits",
      Object.entries(audit.lineAudits).map(([lineId, row]) => {
        const line = lineMap.get(lineId) || {};
        return {
          line_id: lineId,
          po_number: line.poNumber || "",
          vendor_name: line.vendorName || "",
          purchase_type: row.purchaseType || null,
          audit_type: row.auditType || null,
          item_maturity: row.itemMaturity || null,
          vendor_type: row.vendorType || null,
          purchase_urgency: row.purchaseUrgency || null,
          quote_count: row.quoteCount === "" ? null : number(row.quoteCount),
          technical_validation: row.technicalValidation || null,
          price_benchmark_available:
            row.priceBenchmarkAvailable === ""
              ? null
              : normalizeKey(row.priceBenchmarkAvailable) === "YES",
          benchmark_unit_price:
            row.benchmarkUnitPrice === "" ? null : number(row.benchmarkUnitPrice),
          backup_vendor_available:
            row.backupVendorAvailable === ""
              ? null
              : normalizeKey(row.backupVendorAvailable) === "YES",
          risk_level: row.riskLevel || null,
          action_required: row.actionRequired || "",
          price_variance:
            row.priceVariance === "" ? null : number(row.priceVariance),
          delivery_variance:
            row.deliveryVariance === "" ? null : number(row.deliveryVariance),
          quality_variance: row.qualityVariance || "",
          notes: row.notes || "",
          updated_at: new Date().toISOString(),
        };
      }),
      "line_id",
    ],
    [
      "po_invoices",
      audit.invoices.map((row) => ({
        id: row.id,
        po_number: row.poNumber,
        vendor_name: row.vendorName || "",
        invoice_number: row.invoiceNumber,
        invoice_date: safeDate(row.invoiceDate),
        invoice_amount: toNumeric(row.invoiceAmount) || 0,
        gst_correct: row.gstCorrect || "Pending",
        freight_included: normalizeKey(row.freightIncluded) === "YES",
        freight_amount: toNumeric(row.freightAmount) || 0,
        extra_charges: toNumeric(row.extraCharges) || 0,
        evidence_reference: row.evidenceReference || "",
        comments: row.comments || "",
        updated_at: new Date().toISOString(),
      })),
      "id",
    ],
    [
      "po_payments",
      audit.payments.map((row) => ({
        id: row.id,
        po_number: row.poNumber,
        invoice_id: row.invoiceId || null,
        payment_date: safeDate(row.paymentDate),
        payment_type: row.paymentType || "",
        amount: toNumeric(row.amount) || 0,
        payment_reference: row.paymentReference || "",
        proof_available: normalizeKey(row.proofAvailable) === "YES",
        approved: normalizeKey(row.approved) === "YES",
        remarks: row.remarks || "",
        updated_at: new Date().toISOString(),
      })),
      "id",
    ],
    [
      "po_receipts",
      audit.receipts.map((row) => ({
        id: row.id,
        po_number: row.poNumber,
        line_id: row.lineId || null,
        grn_number: row.grnNumber || null,
        grn_date: safeDate(row.grnDate),
        received_quantity: toNumeric(row.receivedQuantity) || 0,
        inspection_status: row.inspectionStatus || "Pending",
        rejection_quantity: toNumeric(row.rejectionQuantity) || 0,
        delivery_challan: row.deliveryChallan || "",
        test_certificate: row.testCertificate || "",
        warranty_reference: row.warrantyReference || "",
        comments: row.comments || "",
        updated_at: new Date().toISOString(),
      })),
      "id",
    ],
    [
      "procurement_documents",
      audit.documents.map((row) => ({
        id: row.id,
        po_number: row.poNumber || null,
        vendor_name: row.vendorName || null,
        document_type: row.documentType,
        status: row.status || "Missing",
        comments: row.comments || "",
        updated_at: new Date().toISOString(),
      })),
      "id",
    ],
    [
      "procurement_risks",
      audit.risks.map((row) => ({
        id: row.id,
        item_po: row.itemPo || "",
        finding: row.finding,
        risk: row.risk || "",
        evidence: row.evidence || "",
        impact: row.impact || "",
        action: row.action || "",
        owner: row.owner || "",
        priority: row.priority || "Medium",
        due_date: safeDate(row.dueDate),
        status: row.status || "Open",
        updated_at: new Date().toISOString(),
      })),
      "id",
    ],
    [
      "procurement_actions",
      audit.actions.map((row) => ({
        id: row.id,
        description: row.description,
        owner: row.owner || "",
        priority: row.priority || "Medium",
        due_date: safeDate(row.dueDate),
        status: row.status || "Open",
        comments: row.comments || "",
        updated_at: new Date().toISOString(),
      })),
      "id",
    ],
  ];
  try {
    for (const [table, payload, onConflict] of payloads) {
      if (!payload.length) continue;
      const { error } = await supabaseClient
        .from(table)
        .upsert(payload, { onConflict });
      if (error) throw error;
    }
    await syncStateToSupabase();
    return true;
  } catch (error) {
    console.warn(
      "Procurement audit records remain saved locally; cloud sync requires migration 007 and an authenticated Supabase session.",
      error,
    );
    return false;
  }
}

const AUDIT_COLLECTION_TABLES = {
  invoices: "po_invoices",
  payments: "po_payments",
  receipts: "po_receipts",
  documents: "procurement_documents",
  risks: "procurement_risks",
  actions: "procurement_actions",
};

async function deleteProcurementAuditRecordFromSupabase(collection, id) {
  if (!useSupabase || !AUDIT_COLLECTION_TABLES[collection] || !id) return;
  const { error } = await supabaseClient
    .from(AUDIT_COLLECTION_TABLES[collection])
    .delete()
    .eq("id", id);
  if (error)
    console.warn("Audit record was deleted locally but not from Supabase.", error);
}

function isProductMasterAuth() {
  return Boolean(state.productMasterCanWrite);
}

async function checkSupabaseAuthSession() {
  state.authSession = null;
  state.isAuthenticatedUser = false;
  state.productMasterCanWrite = false;

  if (useSupabase && supabaseClient?.auth) {
    try {
      const { data } = await supabaseClient.auth.getSession();
      state.authSession = data?.session || null;
      state.isAuthenticatedUser = Boolean(data?.session?.user);

      if (state.isAuthenticatedUser && supabaseClient.rpc) {
        const { data: isAdmin, error } = await supabaseClient.rpc("is_procurement_admin");
        state.productMasterCanWrite = !error && Boolean(isAdmin);
      }
    } catch (err) {
      state.authSession = null;
      state.isAuthenticatedUser = false;
      state.productMasterCanWrite = false;
    }
  } else {
    state.authSession = null;
    state.isAuthenticatedUser = false;
    state.productMasterCanWrite = false;
  }
}

async function loadProductsFromSupabase() {
  if (!useSupabase) return false;
  await checkSupabaseAuthSession();
  try {
    const [productsRes, aliasesRes] = await Promise.all([
      supabaseClient
        .from("products")
        .select("*")
        .order("product_code", { ascending: true }),
      supabaseClient
        .from("product_aliases")
        .select("*")
        .order("created_at", { ascending: true }),
    ]);

    if (productsRes.error && !isOptionalSupabaseTableError(productsRes.error)) {
      console.warn("Products table could not be loaded from Supabase", productsRes.error);
    } else if (!productsRes.error && Array.isArray(productsRes.data)) {
      state.products = productsRes.data.map((p) => ({
        productId: p.product_id,
        productCode: p.product_code,
        productName: p.product_name,
        normalizedName: p.normalized_name,
        category: p.category || "",
        subcategory: p.subcategory || "",
        brand: p.brand || "",
        manufacturerPartNo: p.manufacturer_part_no || "",
        specification: p.specification || "",
        defaultUom: p.default_uom || "Nos",
        hsnCode: p.hsn_code || "",
        defaultTaxPercent: Number(p.default_tax_percent ?? 18),
        defaultMaterialType: p.default_material_type || "Unknown",
        status: p.status || "Active",
        notes: p.notes || "",
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      }));
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(state.products));
    }

    if (aliasesRes.error && !isOptionalSupabaseTableError(aliasesRes.error)) {
      console.warn("Product aliases table could not be loaded from Supabase", aliasesRes.error);
    } else if (!aliasesRes.error && Array.isArray(aliasesRes.data)) {
      state.productAliases = aliasesRes.data.map((a) => ({
        aliasId: a.alias_id,
        productId: a.product_id,
        aliasText: a.alias_text,
        normalizedAlias: a.normalized_alias,
        source: a.source || "Manual",
        notes: a.notes || "",
        createdAt: a.created_at,
        updatedAt: a.updated_at,
      }));
      localStorage.setItem(STORAGE_KEYS.productAliases, JSON.stringify(state.productAliases));
    }
    return true;
  } catch (err) {
    console.warn("loadProductsFromSupabase error", err);
    return false;
  }
}

async function syncProductsToSupabase() {
  if (!useSupabase) return false;
  try {
    if (state.products && state.products.length) {
      const productsPayload = dedupeRecordsByKey(
        state.products.map((p) => ({
          product_id: p.productId || p.product_id,
          product_code: p.productCode || p.product_code,
          product_name: cleanText(p.productName || p.product_name),
          category: cleanText(p.category || p.category) || null,
          subcategory: cleanText(p.subcategory || p.subcategory) || null,
          brand: cleanText(p.brand || p.brand) || null,
          manufacturer_part_no: cleanText(p.manufacturerPartNo || p.manufacturer_part_no) || null,
          specification: cleanText(p.specification || p.specification) || null,
          default_uom: cleanText(p.defaultUom || p.default_uom || "Nos") || "Nos",
          hsn_code: cleanText(p.hsnCode || p.hsn_code) || null,
          default_tax_percent: p.defaultTaxPercent != null ? Number(p.defaultTaxPercent) : 18.0,
          default_material_type: cleanText(p.defaultMaterialType || p.default_material_type || "Unknown") || "Unknown",
          status: p.status === "Inactive" ? "Inactive" : "Active",
          notes: cleanText(p.notes || p.notes) || null,
        })).filter((p) => p.product_id && p.product_name),
        "product_id",
      );

      if (productsPayload.length) {
        await upsertSupabaseWithOptionalColumns(
          "products",
          productsPayload,
          { onConflict: "product_id" },
          ["subcategory", "specification", "notes"],
        );
      }
    }

    if (state.productAliases && state.productAliases.length) {
      const aliasesPayload = dedupeRecordsByKey(
        state.productAliases.map((a) => ({
          alias_id: a.aliasId || a.alias_id,
          product_id: a.productId || a.product_id,
          alias_text: cleanText(a.aliasText || a.alias_text),
          source: cleanText(a.source || a.source || "Manual") || "Manual",
          notes: cleanText(a.notes || a.notes) || null,
        })).filter((a) => a.alias_id && a.product_id && a.alias_text),
        "alias_id",
      );

      if (aliasesPayload.length) {
        await upsertSupabaseWithOptionalColumns(
          "product_aliases",
          aliasesPayload,
          { onConflict: "alias_id" },
          ["notes"],
        );
      }
    }
    return true;
  } catch (err) {
    if (!isOptionalSupabaseTableError(err)) {
      console.warn("syncProductsToSupabase error", err);
    }
    return false;
  }
}

async function syncStateToSupabase() {
  if (!useSupabase || remoteSyncInFlight) return;
  remoteSyncInFlight = true;
  try {
    const derived = buildDerived();
    const allRowsData = dedupeRowsById(allRows());

    const vendorNames = new Set([
      ...Object.keys(state.vendorContacts || {}).map(cleanText),
      ...derived.vendors.map((v) => cleanText(v.vendorName)),
      ...allRowsData.map((r) => cleanText(r.vendorName)),
    ]);

    const vendorsPayload = Array.from(vendorNames)
      .filter(Boolean)
      .map((vendorName) => {
        const contact = state.vendorContacts[vendorName] || {};
        const derivedVendor =
          derived.vendors.find((v) => cleanText(v.vendorName) === vendorName) ||
          {};
        return {
          vendor_name: vendorName,
          source: cleanText(contact.source || derivedVendor.source || ""),
          vendor_category: cleanText(contact.vendorCategory || ""),
          currency_code: cleanText(contact.currencyCode || "INR"),
          gstin: cleanText(contact.gstin || derivedVendor.gstin || ""),
          contact_person: cleanText(contact.contactPerson || ""),
          contact_person_2: cleanText(contact.contactPerson2 || ""),
          phone: cleanText(contact.phone || ""),
          phone_2: cleanText(contact.phone2 || ""),
          email: cleanText(contact.email || ""),
          website: cleanText(contact.website || ""),
          city: cleanText(contact.city || ""),
          default_lead_time_days: cleanText(contact.defaultLeadTimeDays || ""),
          rating: cleanText(contact.rating || ""),
          notes: contact.notes || "",
          is_deleted: isVendorDeleted(vendorName),
        };
      });

    const poPayload = dedupeRecordsByKey(
      derived.pos.map((po) => {
        const auditPo = procurementAuditState().poMaster[cleanText(po.poNumber)] || {};
        const safePoStatus = normalizePoStatus(po.poStatus || "Unknown");
        return {
        po_number: po.poNumber,
        po_date: safeDate(po.poDate),
        vendor_name: po.vendorName,
        source: po.source || "",
        gstin: po.gstin || "",
        delivery_date: safeDate(po.deliveryDate),
        delivered_date: safeDate(po.deliveredDate),
        payment_status: po.paymentStatus || "",
        po_status: safePoStatus === "Mixed" ? "Unknown" : safePoStatus,
        delivery_status: po.deliveryStatus || "",
        terms: po.terms || "",
        po_total: toNumeric(po.poTotal),
        discount_amount: toNumeric(po.discountAmount),
        discount_type: po.discountType || "amount",
        discount_input_value: toNumeric(po.discountInputValue),
        adjustment_amount: toNumeric(po.adjustmentAmount),
        amount_paid: toNumeric(po.amountPaid),
        balance_due: toNumeric(po.balanceDue),
        item_count: Number(po.itemCount || 0),
        product_count: Number(po.productCount || 0),
        charge_count: Number(po.chargeCount || 0),
        total_qty: toNumeric(po.totalQty),
        total_charge_value: toNumeric(po.totalChargeValue),
        reference_no: "",
        material_type: normalizeMaterialType(po.materialType || "Unknown"),
        vendor_email: cleanText(
          po.vendorEmail || state.vendorContacts[po.vendorName]?.email || "",
        ),
        vendor_phone: cleanText(
          po.vendorPhone || state.vendorContacts[po.vendorName]?.phone || "",
        ),
        delay_reason: cleanText(po.delayReason || ""),
        edd: safeDate(po.edd),
        purchase_category: cleanText(auditPo.purchaseCategory || ""),
        currency_code: cleanText(
          state.vendorContacts[po.vendorName]?.currencyCode || "INR",
        ),
        gst_included:
          auditPo.gstIncluded === ""
            ? null
            : normalizeKey(auditPo.gstIncluded) === "YES",
        advance_paid: toNumeric(auditPo.advancePaid),
        audit_status: cleanText(auditPo.auditStatus || "Pending"),
      };
      }),
      "po_number",
    );

    const poStatusByNumber = new Map(
      poPayload.map((po) => [cleanText(po.po_number), po.po_status]),
    );

    const linePayload = dedupeRecordsByKey(
      allRowsData.map((line) => {
        const parentPoStatus =
          poStatusByNumber.get(cleanText(line.poNumber)) ||
          normalizePoStatus(line.poStatus || "Unknown");
        return {
        line_id: line.id,
        po_number: line.poNumber,
        vendor_name: line.vendorName,
        po_date: safeDate(line.poDate),
        delivery_date: safeDate(line.deliveryDate),
        delivered_date: safeDate(line.deliveredDate),
        payment_status: line.paymentStatus || "",
        po_status: parentPoStatus === "Mixed" ? "Unknown" : parentPoStatus,
        delivery_status: line.deliveryStatus || "",
        line_type: line.lineType || inferLineType(line.itemDesc, line.lineType),
        is_charge: Boolean(line.isCharge),
        item_desc: line.itemDesc,
        quantity_ordered: toNumeric(line.quantityOrdered),
        uom: cleanText(line.uom || ""),
        item_price: toNumeric(line.itemPrice),
        item_tax_percent: toNumeric(line.itemTaxPercent),
        item_tax_amount: toNumeric(line.itemTaxAmount),
        item_total: toNumeric(line.itemTotal),
        line_grand_total: toNumeric(line.lineGrandTotal),
        balance_due: toNumeric(line.balanceDue),
        terms: line.terms || "",
        source: line.source || "",
        gstin: line.gstin || "",
        manual: Boolean(line.manual),
      };
      }),
      "line_id",
    );

    const metricsPayload = dedupeRecordsByKey(
      Object.entries(state.productVendorMetrics || {})
        .map(([metricKey, metric]) => ({
          metric_key: metricKey,
          product_name: cleanText(
            metric.productName || splitMetricStorageKey(metricKey).productName,
          ),
          vendor_name: cleanText(
            metric.vendorName || splitMetricStorageKey(metricKey).vendorName,
          ),
          quoted_price:
            metric.quotedPrice === "" ? null : toNumeric(metric.quotedPrice),
          lead_time_days: cleanText(metric.leadTimeDays || ""),
          moq: cleanText(metric.moq || ""),
          rating: cleanText(metric.rating || ""),
          notes: metric.notes || "",
          source: cleanText(metric.source || ""),
          gstin: cleanText(metric.gstin || ""),
        }))
        .filter((x) => x.product_name && x.vendor_name),
      "metric_key",
    );

    // Upsert vendors first for FK safety
    if (vendorsPayload.length) {
      await upsertSupabaseWithOptionalColumns(
        "vendors",
        vendorsPayload,
        { onConflict: "vendor_name" },
        ["vendor_category", "currency_code", "contact_person_2", "phone_2"],
      );
    }

    // Normal sync is upsert-only. Do not delete existing Supabase rows here; explicit Delete PO handles deletion.

    if (poPayload.length) {
      await upsertSupabaseWithOptionalColumns(
        "purchase_orders",
        poPayload,
        { onConflict: "po_number" },
        [
          "delivered_date",
          "purchase_category",
          "currency_code",
          "gst_included",
          "advance_paid",
          "audit_status",
        ],
      );
    }

    if (linePayload.length) {
      await upsertSupabaseWithOptionalColumns(
        "po_lines",
        linePayload,
        { onConflict: "line_id" },
        ["delivered_date"],
      );
    }

    if (metricsPayload.length) {
      const { error } = await supabaseClient
        .from("product_vendor_metrics")
        .upsert(metricsPayload, { onConflict: "metric_key" });
      if (error) throw error;
    }

    await syncProductsToSupabase();
    await generateFollowupsForPOs(derived.pos);
    await syncPoAvailabilityToSupabase();
    await loadRemoteStateFromSupabase();
  } catch (error) {
    console.error("Supabase sync failed", error);
    const message = String(error?.message || error || "");
    if (message.includes("cannot affect row a second time")) {
      alert(
        "Supabase sync failed because duplicate PO line IDs were detected in this save. Refresh once and save again.",
      );
    } else {
      alert(`Supabase sync failed: ${message}`);
    }
  } finally {
    remoteSyncInFlight = false;
  }
}

async function deletePoFromSupabase(poNumber) {
  if (!useSupabase || !poNumber) return;
  const optionalDeletes = [
    ["po_followup_logs", "po_number"],
    ["vendor_email_queue", "po_number"],
    ["po_activity_events", "po_number"],
    ["po_followups", "po_number"],
  ];
  for (const [table, column] of optionalDeletes) {
    const { error } = await supabaseClient
      .from(table)
      .delete()
      .eq(column, poNumber);
    if (error && !isOptionalSupabaseTableError(error))
      console.warn(`PO cleanup skipped for ${table}`, error);
  }
  const lineDelete = await supabaseClient
    .from("po_lines")
    .delete()
    .eq("po_number", poNumber);
  if (lineDelete.error) throw lineDelete.error;
  const poDelete = await supabaseClient
    .from("purchase_orders")
    .delete()
    .eq("po_number", poNumber);
  if (poDelete.error) throw poDelete.error;
}

function scheduleRemoteSync() {
  if (!useSupabase) return;
  clearTimeout(remoteSyncTimer);
  remoteSyncTimer = setTimeout(() => {
    syncStateToSupabase();
  }, 250);
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEYS.manualRows,
    JSON.stringify(state.manualRows),
  );
  localStorage.setItem(
    STORAGE_KEYS.rowOverrides,
    JSON.stringify(state.rowOverrides),
  );
  localStorage.setItem(
    STORAGE_KEYS.vendorContacts,
    JSON.stringify(state.vendorContacts),
  );
  localStorage.setItem(
    STORAGE_KEYS.productVendorMetrics,
    JSON.stringify(state.productVendorMetrics),
  );
  localStorage.setItem(
    STORAGE_KEYS.deletedVendors,
    JSON.stringify(state.deletedVendors),
  );
  localStorage.setItem(
    STORAGE_KEYS.poTokenLog,
    JSON.stringify(state.poTokenLog),
  );
  localStorage.setItem(
    STORAGE_KEYS.reusableQueue,
    JSON.stringify(state.reusableQueue),
  );
  localStorage.setItem(STORAGE_KEYS.poMaster, JSON.stringify(state.poMaster));
  localStorage.setItem(
    STORAGE_KEYS.activeReservations,
    JSON.stringify(state.activeReservations),
  );
  localStorage.setItem(
    STORAGE_KEYS.procurementAudit,
    JSON.stringify(state.procurementAudit),
  );
  localStorage.setItem(
    STORAGE_KEYS.products,
    JSON.stringify(state.products || []),
  );
  localStorage.setItem(
    STORAGE_KEYS.productAliases,
    JSON.stringify(state.productAliases || []),
  );
  scheduleRemoteSync();
}

function mergeVendorSeeds(existing) {
  const merged = { ...(existing || {}) };
  vendorSeeds.forEach((seed) => {
    if (!seed?.vendorName) return;
    const key = cleanText(seed.vendorName);
    merged[key] = { ...seed, ...(merged[key] || {}) };
  });
  return merged;
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeRowsById(rows) {
  const map = new Map();
  (rows || []).forEach((row) => {
    if (!row || row.__deleted) return;
    const key = cleanText(row.id);
    if (!key) return;
    map.set(key, row);
  });
  return Array.from(map.values());
}

function dedupeRecordsByKey(records, keyName) {
  const map = new Map();
  (records || []).forEach((record) => {
    const key = cleanText(record?.[keyName]);
    if (!key) return;
    map.set(key, record);
  });
  return Array.from(map.values());
}

function isDbImportPayload(payload) {
  return Boolean(
    payload &&
    Array.isArray(payload.purchase_orders) &&
    Array.isArray(payload.po_lines),
  );
}

function isSinglePoPackagePayload(payload) {
  return Boolean(
    payload && payload.purchase_order && Array.isArray(payload.po_lines),
  );
}

function isRawZohoPoPayload(payload) {
  return Boolean(
    payload &&
    cleanText(
      payload.purchaseorder_number ||
        payload.purchaseorder_id ||
        payload.po_number,
    ) &&
    Array.isArray(payload.line_items),
  );
}

function sumLineItemTaxes(lineItem) {
  const taxes = Array.isArray(lineItem?.line_item_taxes)
    ? lineItem.line_item_taxes
    : [];
  if (!taxes.length) return toNumeric(lineItem?.item_tax_amount) || 0;
  return roundMoney(
    taxes.reduce((sum, tax) => {
      const amount = Number(
        tax?.tax_amount ?? tax?.amount ?? tax?.tax_total ?? 0,
      );
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0),
  );
}

function convertSinglePoPackageToDbPayload(payload) {
  if (!isSinglePoPackagePayload(payload)) return null;
  const purchaseOrder = payload.purchase_order || {};
  const poLines = Array.isArray(payload.po_lines) ? payload.po_lines : [];
  return {
    purchase_orders: [purchaseOrder],
    po_lines: poLines,
  };
}

function convertZohoPoPayloadToDbPayload(payload) {
  if (!isRawZohoPoPayload(payload)) return null;

  const poNumber = cleanText(payload.purchaseorder_number || payload.po_number);
  const poDate = cleanText(payload.date || payload.po_date);
  const deliveryDate = cleanText(
    payload.delivery_date || payload.expected_delivery_date,
  );
  const deliveredDate = cleanText(
    payload.delivered_date ||
      payload.actual_delivery_date ||
      payload.delivery_completed_date,
  );
  const vendorName = cleanText(payload.vendor_name);
  const source = cleanText(
    payload.source_of_supply || payload.source || payload.destination_of_supply,
  );
  const gstin = cleanText(payload.gst_no || payload.gstin);
  const terms = String(payload.terms ?? payload.notes ?? "");
  const paymentStatus = normalizePaymentStatus(
    payload.payment_status || payload.payment_terms_label || "Pending",
  );
  const rawPoStatus = normalizePoStatus(
    payload.status || payload.po_status || "Issued",
  );
  const poStatus = rawPoStatus === "Mixed" ? "Unknown" : rawPoStatus;
  const deliveryStatus = normalizeDeliveryStatus(
    payload.delivery_status ||
      payload.received_status ||
      payload.received_status_formatted ||
      "Unknown",
  );
  const discountAmount = roundMoney(
    payload.discount_total ?? payload.discount_amount ?? 0,
  );
  const discountInputValue = roundMoney(
    payload.discount_total ?? payload.discount_amount ?? 0,
  );
  const adjustmentAmount = roundMoney(payload.adjustment ?? 0);
  const totalAmount = roundMoney(payload.total ?? payload.po_total ?? 0);
  const referenceNo = cleanText(
    payload.reference_number ||
      payload.reference_no ||
      payload.purchaseorder_id,
  );
  const lineItems = Array.isArray(payload.line_items) ? payload.line_items : [];

  const poLines = lineItems.map((item, index) => {
    const itemDesc = cleanText(
      item?.name || item?.item_desc || item?.description,
    );
    const quantityOrdered = roundMoney(item?.quantity ?? item?.qty ?? 0);
    const uom = normalizeUom(
      item?.unit ||
        item?.uom ||
        item?.unit_name ||
        item?.unit_measure ||
        item?.unit_of_measurement ||
        item?.measure ||
        "",
    );
    const itemPrice = roundMoney(item?.rate ?? item?.item_price ?? 0);
    const itemTotal = roundMoney(
      item?.item_total ?? quantityOrdered * itemPrice,
    );
    const itemTaxPercent = roundMoney(
      item?.tax_percentage ?? item?.item_tax_percent ?? 0,
    );
    const itemTaxAmount = sumLineItemTaxes(item);
    const lineType = inferLineType(itemDesc, item?.line_type);
    const isCharge = lineType === "charge";
    const itemOrder = cleanText(
      item?.item_order || item?.line_item_id || String(index + 1),
    );
    return {
      line_id: `${poNumber}__${itemOrder}`,
      po_number: poNumber,
      vendor_name: vendorName,
      po_date: poDate,
      delivery_date: deliveryDate || null,
      delivered_date: deliveredDate || null,
      payment_status: paymentStatus,
      po_status: poStatus,
      delivery_status: deliveryStatus,
      line_type: lineType,
      is_charge: isCharge,
      item_desc: itemDesc,
      quantity_ordered: quantityOrdered,
      uom,
      item_price: itemPrice,
      item_tax_percent: itemTaxPercent,
      item_tax_amount: itemTaxAmount,
      item_total: itemTotal,
      line_grand_total: roundMoney(itemTotal + itemTaxAmount),
      balance_due: null,
      terms,
      source,
      gstin,
      manual: false,
    };
  });

  const chargeLines = poLines.filter((line) => line.is_charge);
  const productLines = poLines.filter((line) => !line.is_charge);
  const totalQty = roundMoney(
    productLines.reduce((sum, line) => sum + number(line.quantity_ordered), 0),
  );
  const totalChargeValue = roundMoney(
    chargeLines.reduce((sum, line) => sum + number(line.line_grand_total), 0),
  );
  const itemCount = poLines.length;
  const chargeCount = chargeLines.length;
  const productCount = productLines.length;

  const explicitAmountPaid = parsePayloadMoney(
    payload.amount_paid ??
      payload.paid_amount ??
      payload.amount_paid_formatted ??
      payload.paid_amount_formatted,
  );
  const explicitBalanceDue = parsePayloadMoney(
    payload.balance_due ??
      payload.balance ??
      payload.outstanding_balance ??
      payload.balance_due_formatted ??
      payload.balance_formatted,
  );

  let amountPaid = 0;
  let balanceDue = totalAmount;
  if (paymentStatus === "Paid") {
    amountPaid = totalAmount;
    balanceDue = 0;
  } else if (explicitBalanceDue !== null) {
    balanceDue = Math.max(0, Math.min(totalAmount, explicitBalanceDue));
    amountPaid = Math.max(0, roundMoney(totalAmount - balanceDue));
  } else if (explicitAmountPaid !== null) {
    amountPaid = Math.max(0, Math.min(totalAmount, explicitAmountPaid));
    balanceDue = Math.max(0, roundMoney(totalAmount - amountPaid));
  } else if (paymentStatus === "Partially Paid") {
    amountPaid = roundMoney(totalAmount / 2);
    balanceDue = roundMoney(totalAmount / 2);
  }

  return {
    purchase_orders: [
      {
        po_number: poNumber,
        po_date: poDate || null,
        vendor_name: vendorName,
        source,
        gstin,
        delivery_date: deliveryDate || null,
        delivered_date: deliveredDate || null,
        payment_status: paymentStatus,
        po_status: poStatus,
        delivery_status: deliveryStatus,
        terms,
        po_total: totalAmount,
        item_count: itemCount,
        product_count: productCount,
        charge_count: chargeCount,
        total_qty: totalQty,
        total_charge_value: totalChargeValue,
        reference_no: referenceNo,
        discount_amount: discountAmount,
        discount_type: "amount",
        discount_input_value: discountInputValue,
        adjustment_amount: adjustmentAmount,
        amount_paid: amountPaid,
        balance_due: balanceDue,
      },
    ],
    po_lines: poLines,
  };
}

function normalizeIncomingDbPayload(payload) {
  if (isDbImportPayload(payload)) return payload;
  const singlePackage = convertSinglePoPackageToDbPayload(payload);
  if (singlePackage) return singlePackage;
  const zohoPackage = convertZohoPoPayloadToDbPayload(payload);
  if (zohoPackage) return zohoPackage;
  return null;
}

function buildVendorPayloadFromDbPayload(payload) {
  const vendorMap = new Map();
  (payload.purchase_orders || []).forEach((po) => {
    const vendorName = cleanText(po.vendor_name);
    if (!vendorName) return;
    vendorMap.set(vendorName, {
      vendor_name: vendorName,
      source: cleanText(po.source),
      gstin: cleanText(po.gstin),
      contact_person: "",
      phone: "",
      email: "",
      website: "",
      city: "",
      default_lead_time_days: "",
      rating: "",
      notes: "",
      is_deleted: false,
    });
  });
  (payload.po_lines || []).forEach((line) => {
    const vendorName = cleanText(line.vendor_name);
    if (!vendorName) return;
    const existing = vendorMap.get(vendorName) || {
      vendor_name: vendorName,
      source: "",
      gstin: "",
      contact_person: "",
      phone: "",
      email: "",
      website: "",
      city: "",
      default_lead_time_days: "",
      rating: "",
      notes: "",
      is_deleted: false,
    };
    if (!existing.source) existing.source = cleanText(line.source);
    if (!existing.gstin) existing.gstin = cleanText(line.gstin);
    vendorMap.set(vendorName, existing);
  });
  return Array.from(vendorMap.values());
}

async function upsertDbPayloadToSupabase(payload) {
  if (!useSupabase) throw new Error("Supabase is not enabled.");
  const normalized = normalizeIncomingDbPayload(payload);
  if (!normalized) throw new Error("Unsupported payload shape.");

  const vendorsPayload = buildVendorPayloadFromDbPayload(normalized);
  const poPayload = dedupeRecordsByKey(
    (normalized.purchase_orders || []).map((po) => ({
      po_number: cleanText(po.po_number),
      po_date: safeDate(po.po_date),
      vendor_name: cleanText(po.vendor_name),
      source: cleanText(po.source),
      gstin: cleanText(po.gstin),
      delivery_date: safeDate(po.delivery_date),
      delivered_date: safeDate(
        po.delivered_date || po.actual_delivery_date || po.deliveryCompletedDate,
      ),
      payment_status: normalizePaymentStatus(po.payment_status || "Pending"),
      po_status: (() => {
        const safe = normalizePoStatus(po.po_status || "Issued");
        return safe === "Mixed" ? "Unknown" : safe;
      })(),
      delivery_status: normalizeDeliveryStatus(po.delivery_status || "Unknown"),
      terms: String(po.terms ?? ""),
      po_total: toNumeric(po.po_total),
      discount_amount: toNumeric(po.discount_amount),
      discount_type:
        cleanText(po.discount_type || "amount").toLowerCase() === "percent"
          ? "percent"
          : "amount",
      discount_input_value: toNumeric(
        po.discount_input_value ?? po.discount_amount ?? 0,
      ),
      adjustment_amount: toNumeric(po.adjustment_amount),
      amount_paid: toNumeric(po.amount_paid),
      balance_due: toNumeric(po.balance_due),
      item_count: Number(po.item_count || 0),
      product_count: Number(po.product_count || 0),
      charge_count: Number(po.charge_count || 0),
      total_qty: toNumeric(po.total_qty),
      total_charge_value: toNumeric(po.total_charge_value),
      reference_no: cleanText(po.reference_no),
      material_type: normalizeMaterialType(
        po.material_type || po.materialType || "Unknown",
      ),
      vendor_email: cleanText(po.vendor_email || po.vendorEmail || ""),
      vendor_phone: cleanText(po.vendor_phone || po.vendorPhone || ""),
      delay_reason: cleanText(po.delay_reason || po.delayReason || ""),
      edd: safeDate(
        po.edd ||
          po.revised_estimated_delivery_date ||
          po.revised_delivery_date,
      ),
    })),
    "po_number",
  );

  const poStatusByNumber = new Map(
    poPayload.map((po) => [cleanText(po.po_number), po.po_status]),
  );

  const linePayload = dedupeRecordsByKey(
    (normalized.po_lines || []).map((line) => {
      const parentPoStatus =
        poStatusByNumber.get(cleanText(line.po_number)) ||
        normalizePoStatus(line.po_status || "Issued");
      return {
      line_id: cleanText(line.line_id),
      po_number: cleanText(line.po_number),
      vendor_name: cleanText(line.vendor_name),
      po_date: safeDate(line.po_date),
      delivery_date: safeDate(line.delivery_date),
      delivered_date: safeDate(
        line.delivered_date ||
          line.actual_delivery_date ||
          line.deliveryCompletedDate,
      ),
      payment_status: normalizePaymentStatus(line.payment_status || "Pending"),
      po_status: parentPoStatus === "Mixed" ? "Unknown" : parentPoStatus,
      delivery_status: normalizeDeliveryStatus(
        line.delivery_status || "Unknown",
      ),
      line_type: inferLineType(line.item_desc, line.line_type),
      is_charge:
        Boolean(line.is_charge) ||
        inferLineType(line.item_desc, line.line_type) === "charge",
      item_desc: cleanText(line.item_desc),
      quantity_ordered: toNumeric(line.quantity_ordered),
      uom: normalizeUom(line.uom || line.unit || line.unit_name || ""),
      item_price: toNumeric(line.item_price),
      item_tax_percent: toNumeric(line.item_tax_percent),
      item_tax_amount: toNumeric(line.item_tax_amount),
      item_total: toNumeric(line.item_total),
      line_grand_total: toNumeric(line.line_grand_total),
      balance_due: toNumeric(line.balance_due),
      terms: String(line.terms ?? ""),
      source: cleanText(line.source),
      gstin: cleanText(line.gstin),
      manual: Boolean(line.manual),
    };
    }),
    "line_id",
  );

  if (vendorsPayload.length) {
    const { error } = await supabaseClient
      .from("vendors")
      .upsert(vendorsPayload, { onConflict: "vendor_name" });
    if (error) throw error;
  }
  if (poPayload.length) {
    await upsertSupabaseWithOptionalColumns(
      "purchase_orders",
      poPayload,
      { onConflict: "po_number" },
      ["delivered_date"],
    );
  }
  if (linePayload.length) {
    await upsertSupabaseWithOptionalColumns(
      "po_lines",
      linePayload,
      { onConflict: "line_id" },
      ["delivered_date"],
    );
  }
  return {
    vendors: vendorsPayload.length,
    purchaseOrders: poPayload.length,
    poLines: linePayload.length,
  };
}

async function refreshStateFromSupabase(options = {}) {
  if (!useSupabase) return;
  const shouldGenerateFollowups = options.generateFollowups !== false;
  await loadRemoteStateFromSupabase();
  if (shouldGenerateFollowups) {
    await generateFollowupsForPOs(buildDerived().pos);
    await loadRemoteStateFromSupabase();
  }
  renderAll();
}

function readQueueRowPayload(row) {
  if (!row || typeof row !== "object") return null;
  const candidates = [
    row[queueConfig.payloadColumn],
    row.raw_payload,
    row.payload,
    row.data,
    row.body,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (typeof candidate === "string") {
      try {
        return JSON.parse(candidate);
      } catch {
        continue;
      }
    }
    if (typeof candidate === "object") return candidate;
  }
  return null;
}

async function markQueueRow(rowId, patch) {
  if (!queueConfig.enabled || !rowId) return;
  const updateData = {};
  if (queueConfig.statusColumn && patch.status !== undefined)
    updateData[queueConfig.statusColumn] = patch.status;
  if (queueConfig.errorColumn && patch.error_message !== undefined)
    updateData[queueConfig.errorColumn] = patch.error_message;
  if (queueConfig.processedAtColumn && patch.processed_at !== undefined)
    updateData[queueConfig.processedAtColumn] = patch.processed_at;
  if (!Object.keys(updateData).length) return;
  const { error } = await supabaseClient
    .from(queueConfig.table)
    .update(updateData)
    .eq("id", rowId);
  if (error) console.warn("Queue row update skipped", error);
}

async function processIncomingQueue() {
  if (!queueConfig.enabled) {
    alert("Queue processor is disabled. Enable it in config.js first.");
    return;
  }
  if (queueProcessingInFlight) return;
  queueProcessingInFlight = true;
  const processBtn = document.getElementById("processQueueBtn");
  if (processBtn) processBtn.disabled = true;
  try {
    let query = supabaseClient.from(queueConfig.table).select("*");
    if (queueConfig.statusColumn) {
      query = query.or(
        `${queueConfig.statusColumn}.is.null,${queueConfig.statusColumn}.eq.pending,${queueConfig.statusColumn}.eq.Pending,${queueConfig.statusColumn}.eq.PENDING,${queueConfig.statusColumn}.eq.failed,${queueConfig.statusColumn}.eq.Failed,${queueConfig.statusColumn}.eq.FAILED`,
      );
    }
    const { data, error } = await query
      .order("created_at", { ascending: true })
      .limit(queueConfig.batchSize);
    if (error) throw error;

    const pendingRows = (data || []).filter((row) => {
      const status = normalizeKey(row?.[queueConfig.statusColumn]);
      return !status || ["PENDING", "FAILED"].includes(status);
    });

    if (!pendingRows.length) {
      alert("No pending queue rows found.");
      return;
    }

    let processed = 0;
    let failed = 0;
    for (const row of pendingRows) {
      try {
        const payload = readQueueRowPayload(row);
        const normalized = normalizeIncomingDbPayload(payload);
        if (!normalized)
          throw new Error("Unsupported raw payload shape in queue row.");
        await upsertDbPayloadToSupabase(normalized);
        await markQueueRow(row.id, {
          status: "processed",
          error_message: null,
          processed_at: new Date().toISOString(),
        });
        processed += 1;
      } catch (queueError) {
        failed += 1;
        await markQueueRow(row.id, {
          status: "failed",
          error_message: String(queueError?.message || queueError),
          processed_at: null,
        });
      }
    }

    await refreshStateFromSupabase();
    const message = failed
      ? `Queue processed. Success: ${processed}. Failed: ${failed}.`
      : `Queue processed successfully. ${processed} row(s) synced.`;
    alert(message);
  } catch (error) {
    console.error("Queue processing failed", error);
    alert(`Queue processing failed: ${error.message || error}`);
  } finally {
    queueProcessingInFlight = false;
    if (processBtn) processBtn.disabled = false;
  }
}

function buildProductVendorMetricsFromRows(rows) {
  const metrics = {};
  (rows || []).forEach((row) => {
    const vendorName = cleanText(row.vendorName);
    const productName = cleanText(row.itemDesc);
    const lineType = cleanText(row.lineType || row.line_type).toLowerCase();
    if (!vendorName || !productName || lineType === "charge") return;
    const key = `${productName}__${vendorName}`;
    metrics[key] = {
      ...(metrics[key] || {}),
      productName,
      vendorName,
      quotedPrice: number(row.itemPrice),
      source: cleanText(row.source),
      gstin: cleanText(row.gstin),
      notes: metrics[key]?.notes || "",
    };
  });
  return metrics;
}

function convertDbImportPayloadToLocalRows(payload) {
  const poMap = new Map(
    (payload.purchase_orders || []).map((po) => [cleanText(po.po_number), po]),
  );

  const firstLineIndexByPo = new Map();
  const rows = dedupeRecordsByKey(
    (payload.po_lines || []).map((line, index) => {
      const poNumber = cleanText(line.po_number);
      const po = poMap.get(poNumber) || {};
      const rowId = cleanText(line.line_id) || uid("import");
      const rowIndex = (firstLineIndexByPo.get(poNumber) || 0) + 1;
      firstLineIndexByPo.set(poNumber, rowIndex);

      return {
        id: rowId,
        poDate: cleanText(po.po_date || line.po_date),
        deliveryDate: cleanText(po.delivery_date || line.delivery_date),
        deliveredDate: cleanText(
          po.delivered_date ||
            po.actual_delivery_date ||
            line.delivered_date ||
            line.actual_delivery_date,
        ),
        poNumber,
        vendorName: cleanText(po.vendor_name || line.vendor_name),
        source: cleanText(line.source || po.source),
        gstin: cleanText(line.gstin ?? po.gstin),
        terms: String(line.terms ?? po.terms ?? ""),
        itemDesc: cleanText(line.item_desc),
        quantityOrdered: number(line.quantity_ordered),
        uom: normalizeUom(line.uom || line.unit || line.unit_name || ""),
        itemPrice: number(line.item_price),
        itemTaxPercent: number(line.item_tax_percent),
        itemTaxAmount: number(line.item_tax_amount),
        itemTotal: number(line.item_total),
        lineGrandTotal: number(line.line_grand_total),
        lineType:
          cleanText(
            line.line_type || inferLineType(line.item_desc, line.line_type),
          ).toLowerCase() === "charge"
            ? "charge"
            : "product",
        isCharge:
          Boolean(line.is_charge) ||
          cleanText(line.line_type).toLowerCase() === "charge",
        paymentStatus: normalizePaymentStatus(
          po.payment_status || line.payment_status,
        ),
        poStatus: normalizePoStatus(po.po_status || line.po_status),
        deliveryStatus: normalizeDeliveryStatus(
          po.delivery_status || line.delivery_status,
        ),
        balanceDue: line.balance_due ?? null,
        discountAmount: number(po.discount_amount),
        discountType:
          cleanText(po.discount_type || "amount").toLowerCase() === "percent"
            ? "percent"
            : "amount",
        discountInputValue: number(po.discount_input_value),
        adjustmentAmount: number(po.adjustment_amount),
        amountPaid: number(po.amount_paid),
        balanceDue: po.balance_due ?? line.balance_due ?? null,
        total: rowIndex === 1 ? number(po.po_total) : null,
        manual: true,
      };
    }),
    "id",
  );

  const vendorContacts = {};
  (payload.purchase_orders || []).forEach((po) => {
    const vendorName = cleanText(po.vendor_name);
    if (!vendorName) return;
    vendorContacts[vendorName] = {
      ...(vendorContacts[vendorName] || {}),
      vendorName,
      source: cleanText(po.source),
      gstin: cleanText(po.gstin),
    };
  });

  return {
    manualRows: rows,
    rowOverrides: {},
    vendorContacts,
    productVendorMetrics: buildProductVendorMetricsFromRows(rows),
    restoredVendorNames: Object.keys(vendorContacts),
  };
}

function normalizeKey(value) {
  return cleanText(value).toUpperCase();
}

function normalizeProductMasterName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function metricStorageKey(productName, vendorName) {
  return `${cleanText(productName)}__${cleanText(vendorName)}`;
}

function splitMetricStorageKey(key) {
  const [productName = "", vendorName = ""] = String(key || "").split("__");
  return {
    productName: cleanText(productName),
    vendorName: cleanText(vendorName),
  };
}

const CHARGE_PATTERNS = [
  /\bfreight\b/i,
  /\bfright\b/i,
  /\bpacking\b/i,
  /\bpackaging\b/i,
  /\bshipping\b/i,
  /\bdelivery\s*charge/i,
  /\btransport\b/i,
  /\btransportation\b/i,
  /\bcourier\b/i,
  /\bloading\b/i,
  /\bunloading\b/i,
  /\bhandling\b/i,
  /\bforwarding\b/i,
  /\binsurance\b/i,
  /\bservice\s*charge/i,
  /\blabou?r\s*charge/i,
  /\bother\s*charge/i,
  /\bmisc(?:ellaneous)?\s*charge/i,
  /\bcartage\b/i,
  /\binstallation\s*charge/i,
];

function isVendorDeleted(vendorName) {
  const key = normalizeKey(vendorName);
  return (
    Array.isArray(state.deletedVendors) &&
    state.deletedVendors.some((item) => normalizeKey(item) === key)
  );
}

function restoreVendorIfDeleted(vendorName) {
  const key = normalizeKey(vendorName);
  state.deletedVendors = (state.deletedVendors || []).filter(
    (item) => normalizeKey(item) !== key,
  );
}

function inferLineType(itemDesc, explicitType = "") {
  const explicit = cleanText(explicitType).toLowerCase();
  if (explicit === "charge") return "charge";
  if (explicit === "product") return "product";
  const text = cleanText(itemDesc);
  if (!text) return "product";
  return CHARGE_PATTERNS.some((pattern) => pattern.test(text))
    ? "charge"
    : "product";
}

function getLineTypeLabel(lineType) {
  return lineType === "charge" ? "Charge Line" : "Product Line";
}

function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(number(value));
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(
    number(value),
  );
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return cleanText(value) || "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

function lineGrandTotal(row) {
  const itemTotal =
    number(row.itemTotal) ||
    number(row.itemPrice) * number(row.quantityOrdered);
  const itemTaxAmount =
    number(row.itemTaxAmount) || itemTotal * (number(row.itemTaxPercent) / 100);
  return itemTotal + itemTaxAmount;
}

function normalizePaymentStatus(value) {
  const raw = normalizeKey(value);
  if (!raw) return "Unknown";
  if (raw.includes("PART")) return "Partially Paid";
  if (raw.includes("PAID")) return "Paid";
  if (raw.includes("PENDING") || raw.includes("DUE") || raw.includes("OPEN"))
    return "Pending";
  return cleanText(value) || "Unknown";
}

function normalizePoStatus(value) {
  const raw = normalizeKey(value);
  if (!raw || raw === "MIXED" || raw.includes("MIXED")) return "Unknown";
  if (raw.includes("DRAFT")) return "Draft";
  if (raw.includes("BILL")) return "Billed";
  if (raw.includes("ISSU")) return "Issued";
  if (raw.includes("CLOSE")) return "Closed";
  const cleaned = cleanText(value);
  if (cleaned.toLowerCase() === "mixed") return "Unknown";
  return cleaned || "Unknown";
}

function normalizeMaterialType(value) {
  const raw = normalizeKey(value);
  if (raw === "RTO") return "RTO";
  if (raw === "MTO") return "MTO";
  return "Unknown";
}

function normalizeDeliveryStatus(value) {
  const raw = normalizeKey(value);
  if (!raw) return "Unknown";
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanText(value))) return "Unknown";
  if (raw.includes("TRANSIT")) return "In Transit";
  if (raw.includes("PART")) return "Partially Delivered";
  if (
    [
      "YES",
      "Y",
      "DELIVERED",
      "RECEIVED",
      "DONE",
      "COMPLETE",
      "COMPLETED",
    ].includes(raw)
  )
    return "Delivered";
  return cleanText(value) || "Unknown";
}

function parseDateOnly(value) {
  const text = cleanText(value);
  if (!text) return null;
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const date = new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
    );
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function todayDateOnly() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function isPoDelayed(po) {
  if (!po) return false;
  if (normalizeDeliveryStatus(po.deliveryStatus) === "Delivered") return false;
  const deliveryDate = parseDateOnly(po.deliveryDate);
  if (!deliveryDate) return false;
  return deliveryDate < todayDateOnly();
}

function displayDeliveryStatus(po) {
  if (isPoDelayed(po)) return "Delayed";
  const status = cleanText(po?.deliveryStatus);
  if (status === "Mixed") return "Mixed";
  return normalizeDeliveryStatus(status);
}

function displayDeliveryBadgeClass(po) {
  return isPoDelayed(po) ? "delayed" : badgeClass(displayDeliveryStatus(po));
}

function badgeClass(value) {
  const raw = normalizeKey(value);
  if (raw === "PAID" || raw === "DELIVERED") return "paid delivered";
  if (raw.includes("PART")) return "partial";
  if (raw === "ISSUED") return "issued";
  if (raw === "BILLED") return "billed";
  if (raw === "DELAYED") return "delayed";
  return "unknown";
}

function normalizeUom(value) {
  const raw = cleanText(value);
  if (!raw) return "Nos";
  const lower = raw.toLowerCase();
  if (
    ["m", "meter", "meters", "metre", "metres", "mtr", "mtrs"].includes(lower)
  )
    return "Mtr";
  if (
    [
      "nos",
      "no",
      "number",
      "numbers",
      "pcs",
      "piece",
      "pieces",
      "qty",
    ].includes(lower)
  )
    return "Nos";
  if (["kg", "kgs", "kilogram", "kilograms"].includes(lower)) return "Kg";
  if (["g", "gm", "gram", "grams"].includes(lower)) return "Gm";
  if (
    ["ltr", "ltrs", "liter", "liters", "litre", "litres", "l"].includes(lower)
  )
    return "Ltr";
  if (["set", "sets"].includes(lower)) return "Set";
  if (["box", "boxes"].includes(lower)) return "Box";
  if (["roll", "rolls"].includes(lower)) return "Roll";
  return raw;
}

function materializeRow(row) {
  const itemTotal =
    number(row.itemTotal) ||
    number(row.itemPrice) * number(row.quantityOrdered);
  const itemTaxAmount =
    number(row.itemTaxAmount) || itemTotal * (number(row.itemTaxPercent) / 100);
  const lineType = inferLineType(row.itemDesc, row.lineType);
  const discountAmount = Math.max(0, number(row.discountAmount));
  const discountType =
    cleanText(row.discountType || "amount").toLowerCase() === "percent"
      ? "percent"
      : "amount";
  const discountInputValue = Math.max(
    0,
    number(
      row.discountInputValue ??
        (discountType === "amount" ? discountAmount : 0),
    ),
  );
  const adjustmentAmount = number(row.adjustmentAmount);
  const amountPaid = Math.max(0, number(row.amountPaid));
  const balanceDue = row.balanceDue ?? null;
  return {
    ...row,
    id: cleanText(row.id) || uid("row"),
    productId: cleanText(row.productId || row.product_id) || null,
    poDate: cleanText(row.poDate),
    deliveryDate: cleanText(row.deliveryDate),
    deliveredDate: cleanText(row.deliveredDate),
    edd: cleanText(row.edd),
    materialType: normalizeMaterialType(row.materialType),
    vendorEmail: cleanText(row.vendorEmail),
    vendorPhone: cleanText(row.vendorPhone),
    delayReason: cleanText(row.delayReason),
    poNumber: cleanText(row.poNumber) || cleanText(row.id),
    vendorName: cleanText(row.vendorName) || "Unknown Vendor",
    source: cleanText(row.source),
    gstin: cleanText(row.gstin),
    terms: String(row.terms ?? ""),
    itemDesc: cleanText(row.itemDesc) || "Unnamed Item",
    quantityOrdered: number(row.quantityOrdered),
    uom: normalizeUom(row.uom || row.unit || row.unitName || ""),
    itemPrice: number(row.itemPrice),
    itemTaxPercent: number(row.itemTaxPercent),
    itemTotal,
    itemTaxAmount,
    lineGrandTotal: number(row.lineGrandTotal) || itemTotal + itemTaxAmount,
    discountAmount,
    discountType,
    discountInputValue,
    adjustmentAmount,
    amountPaid,
    balanceDue,
    lineType,
    isCharge: lineType === "charge",
    paymentStatus: normalizePaymentStatus(row.paymentStatus),
    poStatus: normalizePoStatus(row.poStatus),
    deliveryStatus: normalizeDeliveryStatus(row.deliveryStatus),
    manual: Boolean(row.manual),
  };
}

function allRows() {
  const rowMap = new Map();
  const manualPoNumbers = new Set(
    (state.manualRows || [])
      .filter((row) => row && !row.__deleted)
      .map((row) => cleanText(row.poNumber))
      .filter(Boolean),
  );

  baseRows.forEach((base) => {
    if (manualPoNumbers.has(cleanText(base.poNumber))) return;
    const override = state.rowOverrides?.[base.id];
    if (override?.__deleted) return;
    const merged = materializeRow(override ? { ...base, ...override } : base);
    rowMap.set(cleanText(merged.id), merged);
  });

  (state.manualRows || []).forEach((row) => {
    if (row?.__deleted) return;
    const merged = materializeRow(row);
    rowMap.set(cleanText(merged.id), merged);
  });

  return Array.from(rowMap.values());
}

function uniqueMeaningful(values) {
  return [
    ...new Set(
      values
        .map((v) => cleanText(v))
        .filter((v) => v && v !== "Unknown" && v !== "—"),
    ),
  ];
}

function summarizeStatus(items, field) {
  const unique = uniqueMeaningful(items.map((item) => item[field]));
  if (!unique.length) return "Unknown";
  if (unique.length === 1) return unique[0];
  return "Mixed";
}

function summarizeDate(items, field) {
  const values = items.map((item) => cleanText(item[field])).filter(Boolean);
  if (!values.length) return "";
  const dated = values
    .map((v) => ({
      raw: v,
      ts: Number.isNaN(new Date(v).getTime())
        ? -Infinity
        : new Date(v).getTime(),
    }))
    .sort((a, b) => b.ts - a.ts);
  return dated[0]?.raw || values[0] || "";
}

function parseMetadata(value) {
  if (!value) return {};
  if (typeof value === "object") return value;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function dateValueToIso(value) {
  if (!cleanText(value)) return "";
  const date = parseDateOnly(value);
  if (date) return dateToIso(date);
  const direct = new Date(value);
  if (Number.isNaN(direct.getTime())) return "";
  return dateToIso(
    new Date(direct.getFullYear(), direct.getMonth(), direct.getDate()),
  );
}

function earliestIsoDate(values) {
  return values
    .map(dateValueToIso)
    .filter(Boolean)
    .sort((a, b) => {
      const ad = parseDateOnly(a)?.getTime() || 0;
      const bd = parseDateOnly(b)?.getTime() || 0;
      return ad - bd;
    })[0] || "";
}

function deriveDeliveredDateFromHistory(poNumber) {
  const key = cleanText(poNumber);
  if (!key) return "";
  const candidates = [];
  const addCandidate = (value) => {
    const date = dateValueToIso(value);
    if (date) candidates.push(date);
  };

  (state.activityEvents || [])
    .filter((event) => cleanText(event.po_number || event.poNumber) === key)
    .forEach((event) => {
      const metadata = parseMetadata(event.metadata);
      const eventType = normalizeKey(event.event_type || event.type);
      const title = normalizeKey(event.event_title || event.title);
      const description = normalizeKey(
        event.event_description || event.description,
      );
      const newValue = cleanText(
        event.new_value ||
          event.newValue ||
          metadata.new_value ||
          metadata.newValue ||
          metadata.delivery_status ||
          metadata.deliveryStatus ||
          metadata.close_reason ||
          metadata.closeReason,
      );
      const isDeliveredEvent =
        normalizeDeliveryStatus(newValue) === "Delivered" ||
        eventType.includes("DELIVERY_COMPLETED") ||
        title.includes("DELIVERED DATE") ||
        (eventType.includes("DELIVERY") && description.includes("DELIVERED"));
      if (!isDeliveredEvent) return;
      addCandidate(
        metadata.delivered_date ||
          metadata.deliveredDate ||
          metadata.actual_delivery_date ||
          metadata.actualDeliveryDate ||
          event.created_at ||
          event.createdAt ||
          event.date,
      );
    });

  (state.followupLogs || [])
    .filter((row) => cleanText(row.po_number || row.poNumber) === key)
    .forEach((row) => {
      const metadata = parseMetadata(row.metadata);
      const closeReason = cleanText(
        row.close_reason ||
          row.closeReason ||
          metadata.close_reason ||
          metadata.closeReason,
      );
      if (normalizeDeliveryStatus(closeReason) !== "Delivered") return;
      addCandidate(
        row.delivered_date ||
          row.deliveredDate ||
          metadata.delivered_date ||
          metadata.deliveredDate ||
          row.created_at ||
          row.createdAt,
      );
    });

  (state.followups || [])
    .filter((row) => cleanText(row.po_number || row.poNumber) === key)
    .forEach((row) => {
      const closeReason = cleanText(row.close_reason || row.closeReason);
      if (normalizeDeliveryStatus(closeReason) !== "Delivered") return;
      addCandidate(
        row.delivered_date ||
          row.deliveredDate ||
          row.completed_at ||
          row.completedAt ||
          row.updated_at ||
          row.updatedAt ||
          row.created_at ||
          row.createdAt,
      );
    });

  return earliestIsoDate(candidates);
}

function resolveDeliveredDate(poNumber, savedDate = "") {
  return deriveDeliveredDateFromHistory(poNumber) || safeDate(savedDate) || "";
}

function groupedPoItems(items) {
  const map = new Map();

  items.forEach((item) => {
    const key = normalizeKey(item.itemDesc) || item.id;
    if (!map.has(key)) {
      map.set(key, {
        itemDesc: item.itemDesc || "Unnamed Item",
        lineType: item.lineType || (item.isCharge ? "charge" : "product"),
        isCharge: Boolean(item.isCharge),
        quantityOrdered: 0,
        itemTotal: 0,
        itemTaxAmount: 0,
        lineGrandTotal: 0,
        itemTaxPercent: number(item.itemTaxPercent),
        lines: [],
        prices: [],
        uoms: [],
      });
    }
    const group = map.get(key);
    group.quantityOrdered += number(item.quantityOrdered);
    group.itemTotal += number(item.itemTotal);
    group.itemTaxAmount += number(item.itemTaxAmount);
    group.lineGrandTotal += number(item.lineGrandTotal);
    group.lines.push(item);
    if (number(item.itemPrice) > 0) group.prices.push(number(item.itemPrice));
    if (cleanText(item.uom)) group.uoms.push(normalizeUom(item.uom));
  });

  return Array.from(map.values()).map((group) => {
    const uniquePrices = [...new Set(group.prices.filter(Boolean))];
    const minPrice = uniquePrices.length ? Math.min(...uniquePrices) : 0;
    const maxPrice = uniquePrices.length ? Math.max(...uniquePrices) : 0;
    const avgPrice =
      group.quantityOrdered > 0 ? group.itemTotal / group.quantityOrdered : 0;
    const uniqueUoms = [...new Set(group.uoms.filter(Boolean))];
    const displayUom =
      uniqueUoms.length === 1
        ? uniqueUoms[0]
        : uniqueUoms.length
          ? "Mixed"
          : "Nos";
    return {
      ...group,
      lineCount: group.lines.length,
      minPrice,
      maxPrice,
      avgPrice,
      displayUom,
      displayPrice:
        minPrice && maxPrice && minPrice !== maxPrice
          ? `${money(minPrice)} to ${money(maxPrice)}`
          : minPrice
            ? money(minPrice)
            : "—",
      displayTaxPercent:
        group.lines.length === 1 ? formatNumber(group.itemTaxPercent) : "Mixed",
    };
  });
}

function groupedPOs(rows) {
  const map = new Map();

  rows.forEach((row) => {
    const key = cleanText(row.poNumber) || row.id;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  });

  return Array.from(map.entries()).map(([poNumber, items]) => {
    const first = items[0] || {};
    const productItems = items.filter((item) => !item.isCharge);
    const chargeItems = items.filter((item) => item.isCharge);
    const groupedItems = groupedPoItems(productItems);
    const groupedCharges = groupedPoItems(chargeItems);
    const itemSubtotal = roundMoney(
      items.reduce((sum, item) => sum + number(item.itemTotal), 0),
    );
    const taxTotal = roundMoney(
      items.reduce((sum, item) => sum + number(item.itemTaxAmount), 0),
    );
    const grossTotal = roundMoney(itemSubtotal + taxTotal);
    const providedDiscounts = [
      ...new Set(
        items
          .map((item) => Math.max(0, number(item.discountAmount)))
          .filter((value) => value > 0),
      ),
    ];
    const providedDiscountTypes = uniqueMeaningful(
      items.map((item) => item.discountType),
    );
    const providedDiscountInputs = [
      ...new Set(
        items
          .map((item) => Math.max(0, number(item.discountInputValue)))
          .filter((value) => value > 0),
      ),
    ];
    const providedAdjustments = [
      ...new Set(
        items
          .map((item) => number(item.adjustmentAmount))
          .filter((value) => value !== 0),
      ),
    ];
    const providedTotals = [
      ...new Set(
        items.map((item) => number(item.total)).filter((value) => value > 0),
      ),
    ];
    const providedAmountPaid = [
      ...new Set(
        items
          .map((item) => Math.max(0, number(item.amountPaid)))
          .filter((value) => value >= 0),
      ),
    ];
    const providedBalanceDue = [
      ...new Set(
        items
          .map((item) => item.balanceDue)
          .filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              value !== "" &&
              Number.isFinite(Number(value)),
          ),
      ),
    ];
    const discountAmount = providedDiscounts.length ? providedDiscounts[0] : 0;
    const discountType = providedDiscountTypes.length
      ? providedDiscountTypes[0]
      : "amount";
    const discountInputValue = providedDiscountInputs.length
      ? providedDiscountInputs[0]
      : discountAmount;
    const adjustmentAmount = providedAdjustments.length
      ? providedAdjustments[0]
      : 0;
    const taxableSubtotal = roundMoney(itemSubtotal - discountAmount);
    const poTotal =
      providedTotals.length === 1
        ? providedTotals[0]
        : Math.max(0, taxableSubtotal + taxTotal + adjustmentAmount);
    const fallbackAmountPaid = providedAmountPaid.length
      ? providedAmountPaid[0]
      : 0;
    const fallbackBalanceDue = providedBalanceDue.length
      ? providedBalanceDue[0]
      : null;
    const paymentDerived = derivePaymentState(
      poTotal,
      fallbackAmountPaid,
      fallbackBalanceDue,
    );
    const amountPaid = paymentDerived.amountPaid;
    const balanceDue = paymentDerived.balanceDue;
    const totalQty = productItems.reduce(
      (sum, item) => sum + number(item.quantityOrdered),
      0,
    );
    const totalChargeValue = chargeItems.reduce(
      (sum, item) => sum + number(item.lineGrandTotal),
      0,
    );
    const searchBlob = [
      poNumber,
      first.vendorName,
      first.gstin,
      first.source,
      ...items.map((item) => item.itemDesc),
    ]
      .join(" ")
      .toLowerCase();
    const savedDeliveredDate =
      summarizeDate(items, "deliveredDate") || first.deliveredDate || "";

    return {
      poKey: poNumber,
      poNumber,
      poDate: first.poDate,
      vendorName: first.vendorName || "Unknown Vendor",
      gstin: first.gstin || "",
      source: first.source || "",
      terms: first.terms || "",
      materialType: normalizeMaterialType(first.materialType || "Unknown"),
      edd: summarizeDate(items, "edd") || first.edd || "",
      vendorEmail:
        first.vendorEmail ||
        state.vendorContacts[first.vendorName]?.email ||
        "",
      vendorPhone:
        first.vendorPhone ||
        state.vendorContacts[first.vendorName]?.phone ||
        "",
      delayReason: first.delayReason || "",
      deliveryDate:
        summarizeDate(items, "deliveryDate") || first.deliveryDate || "",
      deliveredDate: resolveDeliveredDate(poNumber, savedDeliveredDate),
      paymentStatus: summarizeStatus(items, "paymentStatus"),
      poStatus: normalizePoStatus(first.poStatus || items[0]?.poStatus || "Unknown"),
      deliveryStatus: summarizeStatus(items, "deliveryStatus"),
      itemCount: items.length,
      productCount: groupedItems.length,
      chargeCount: groupedCharges.length,
      totalQty,
      totalChargeValue,
      itemSubtotal,
      taxTotal,
      discountType,
      discountInputValue,
      discountAmount,
      adjustmentAmount,
      amountPaid,
      balanceDue,
      taxableSubtotal,
      grossTotal,
      poTotal,
      items,
      groupedItems,
      groupedCharges,
      searchBlob,
    };
  });
}

function buildDerived() {
  const rows = allRows();
  const pos = groupedPOs(rows);

  const vendorMap = new Map();
  const productMap = new Map();
  const productVendorMap = new Map();

  rows.forEach((row) => {
    const vendorName = cleanText(row.vendorName) || "Unknown Vendor";
    const vendorKey = vendorName;
    const productName = cleanText(row.itemDesc) || "Unnamed Item";
    const productKey = productName;
    const vendorDeleted = isVendorDeleted(vendorName);

    if (!vendorDeleted && !vendorMap.has(vendorKey)) {
      const seed = state.vendorContacts[vendorKey] || {};
      vendorMap.set(vendorKey, {
        vendorName,
        source: row.source || seed.source || "",
        gstin: row.gstin || seed.gstin || "",
        poSet: new Set(),
        productSet: new Set(),
        totalSpend: 0,
        lastOrderDate: row.poDate || "",
        contacts: seed,
      });
    }

    if (!vendorDeleted) {
      const vendor = vendorMap.get(vendorKey);
      vendor.poSet.add(row.poNumber || row.id);
      if (!row.isCharge) vendor.productSet.add(productKey);
      vendor.totalSpend += number(row.lineGrandTotal);
      if (
        new Date(row.poDate || 0).getTime() >
        new Date(vendor.lastOrderDate || 0).getTime()
      )
        vendor.lastOrderDate = row.poDate;
      if (!vendor.source) vendor.source = row.source || "";
      if (!vendor.gstin) vendor.gstin = row.gstin || "";
    }

    if (row.isCharge || vendorDeleted) return;

    if (!productMap.has(productKey)) {
      productMap.set(productKey, {
        productName,
        vendorSet: new Set(),
        priceList: [],
        totalQty: 0,
        totalSpend: 0,
        lastOrderDate: row.poDate || "",
      });
    }

    const product = productMap.get(productKey);
    product.vendorSet.add(vendorName);
    if (number(row.itemPrice) > 0)
      product.priceList.push({
        vendorName,
        price: number(row.itemPrice),
        source: "history",
      });
    product.totalQty += number(row.quantityOrdered);
    product.totalSpend += number(row.lineGrandTotal);
    if (
      new Date(row.poDate || 0).getTime() >
      new Date(product.lastOrderDate || 0).getTime()
    )
      product.lastOrderDate = row.poDate;

    const pvKey = metricStorageKey(productKey, vendorName);
    if (!productVendorMap.has(pvKey)) {
      const saved = state.productVendorMetrics[pvKey] || {};
      productVendorMap.set(pvKey, {
        productName,
        vendorName,
        source:
          saved.source ||
          state.vendorContacts[vendorName]?.source ||
          row.source ||
          "",
        gstin:
          saved.gstin ||
          state.vendorContacts[vendorName]?.gstin ||
          row.gstin ||
          "",
        historicalBestPrice: number(row.itemPrice),
        latestPrice: number(row.itemPrice),
        quotedPrice: cleanText(saved.quotedPrice || ""),
        leadTimeDays: cleanText(saved.leadTimeDays || ""),
        moq: cleanText(saved.moq || ""),
        rating: cleanText(saved.rating || ""),
        notes: saved.notes || "",
        lastOrderDate: row.poDate || "",
        totalQty: 0,
        poCount: new Set(),
        hasHistory: true,
      });
    }

    const metric = productVendorMap.get(pvKey);
    metric.latestPrice = number(row.itemPrice) || metric.latestPrice;
    metric.historicalBestPrice = metric.historicalBestPrice
      ? Math.min(
          metric.historicalBestPrice,
          number(row.itemPrice) || metric.historicalBestPrice,
        )
      : number(row.itemPrice);
    metric.totalQty += number(row.quantityOrdered);
    metric.poCount.add(row.poNumber || row.id);
    if (
      new Date(row.poDate || 0).getTime() >
      new Date(metric.lastOrderDate || 0).getTime()
    )
      metric.lastOrderDate = row.poDate;
  });

  Object.entries(state.vendorContacts || {}).forEach(
    ([vendorName, contact]) => {
      const cleanVendorName = cleanText(vendorName);
      if (!cleanVendorName || isVendorDeleted(cleanVendorName)) return;
      if (!vendorMap.has(cleanVendorName)) {
        vendorMap.set(cleanVendorName, {
          vendorName: cleanVendorName,
          source: contact.source || "",
          gstin: contact.gstin || "",
          poSet: new Set(),
          productSet: new Set(),
          totalSpend: 0,
          lastOrderDate: "",
          contacts: contact,
        });
      }
    },
  );

  Object.entries(state.productVendorMetrics || {}).forEach(([key, saved]) => {
    const parsed = splitMetricStorageKey(key);
    const productName = cleanText(saved.productName || parsed.productName);
    const vendorName = cleanText(saved.vendorName || parsed.vendorName);
    if (
      !productName ||
      !vendorName ||
      isVendorDeleted(vendorName) ||
      inferLineType(productName, saved.lineType) === "charge"
    )
      return;

    const vendorSeed = state.vendorContacts[vendorName] || {};
    if (!vendorMap.has(vendorName)) {
      vendorMap.set(vendorName, {
        vendorName,
        source: saved.source || vendorSeed.source || "",
        gstin: saved.gstin || vendorSeed.gstin || "",
        poSet: new Set(),
        productSet: new Set(),
        totalSpend: 0,
        lastOrderDate: "",
        contacts: vendorSeed,
      });
    }

    const vendor = vendorMap.get(vendorName);
    vendor.productSet.add(productName);
    if (!vendor.source) vendor.source = saved.source || vendorSeed.source || "";
    if (!vendor.gstin) vendor.gstin = saved.gstin || vendorSeed.gstin || "";

    if (!productMap.has(productName)) {
      productMap.set(productName, {
        productName,
        vendorSet: new Set(),
        priceList: [],
        totalQty: 0,
        totalSpend: 0,
        lastOrderDate: "",
      });
    }

    const product = productMap.get(productName);
    product.vendorSet.add(vendorName);
    const quotedPrice = number(saved.quotedPrice);
    if (quotedPrice > 0)
      product.priceList.push({
        vendorName,
        price: quotedPrice,
        source: "quote",
      });

    const pvKey = metricStorageKey(productName, vendorName);
    if (!productVendorMap.has(pvKey)) {
      productVendorMap.set(pvKey, {
        productName,
        vendorName,
        source: saved.source || vendorSeed.source || "",
        gstin: saved.gstin || vendorSeed.gstin || "",
        historicalBestPrice: 0,
        latestPrice: 0,
        quotedPrice: cleanText(saved.quotedPrice || ""),
        leadTimeDays: cleanText(saved.leadTimeDays || ""),
        moq: cleanText(saved.moq || ""),
        rating: cleanText(saved.rating || ""),
        notes: saved.notes || "",
        lastOrderDate: "",
        totalQty: 0,
        poCount: new Set(),
        hasHistory: false,
      });
    } else {
      const metric = productVendorMap.get(pvKey);
      metric.quotedPrice = cleanText(
        saved.quotedPrice || metric.quotedPrice || "",
      );
      metric.leadTimeDays = cleanText(
        saved.leadTimeDays || metric.leadTimeDays || "",
      );
      metric.moq = cleanText(saved.moq || metric.moq || "");
      metric.rating = cleanText(saved.rating || metric.rating || "");
      metric.notes = saved.notes || metric.notes || "";
      metric.source = metric.source || saved.source || vendorSeed.source || "";
      metric.gstin = metric.gstin || saved.gstin || vendorSeed.gstin || "";
    }
  });

  const vendors = Array.from(vendorMap.values()).map((vendor) => ({
    vendorName: vendor.vendorName,
    source: vendor.source || "",
    gstin: vendor.gstin || "",
    poCount: vendor.poSet.size,
    productCount: vendor.productSet.size,
    totalSpend: vendor.totalSpend,
    lastOrderDate: vendor.lastOrderDate,
    contacts: {
      vendorName: vendor.vendorName,
      source: vendor.source || "",
      gstin: vendor.gstin || "",
      contactPerson: vendor.contacts.contactPerson || "",
      phone: vendor.contacts.phone || "",
      email: vendor.contacts.email || "",
      website: vendor.contacts.website || "",
      city: vendor.contacts.city || "",
      defaultLeadTimeDays: vendor.contacts.defaultLeadTimeDays || "",
      rating: vendor.contacts.rating || "",
      notes: vendor.contacts.notes || "",
    },
  }));

  const products = Array.from(productMap.values()).map((product) => {
    const priceList = product.priceList.filter((item) => item.price > 0);
    const best = priceList.slice().sort((a, b) => a.price - b.price)[0];
    const avgPrice = priceList.length
      ? priceList.reduce((sum, item) => sum + item.price, 0) / priceList.length
      : 0;
    return {
      productName: product.productName,
      vendorCount: product.vendorSet.size,
      bestVendor: best?.vendorName || "—",
      bestPrice: best?.price || 0,
      avgPrice,
      totalQty: product.totalQty,
      totalSpend: product.totalSpend,
      lastOrderDate: product.lastOrderDate,
    };
  });

  const productVendorMetrics = Array.from(productVendorMap.values()).map(
    (metric) => ({
      ...metric,
      poCount: metric.poCount.size,
      quotedPriceNumber: number(metric.quotedPrice),
    }),
  );

  return { rows, pos, vendors, products, productVendorMetrics };
}

function statusSortValue(key, value) {
  const raw = normalizeKey(value);
  if (key === "paymentStatus") {
    const ranks = {
      UNKNOWN: 0,
      PENDING: 1,
      "PARTIALLY PAID": 2,
      PAID: 3,
      MIXED: 4,
    };
    return ranks[cleanText(value).toUpperCase()] ?? ranks[raw] ?? 99;
  }
  if (key === "poStatus") {
    const ranks = { UNKNOWN: 0, ISSUED: 1, BILLED: 2, CLOSED: 3, MIXED: 4 };
    return ranks[cleanText(value).toUpperCase()] ?? ranks[raw] ?? 99;
  }
  if (key === "deliveryStatus") {
    const ranks = {
      UNKNOWN: 0,
      "IN TRANSIT": 1,
      "PARTIALLY DELIVERED": 2,
      DELAYED: 3,
      DELIVERED: 4,
      MIXED: 5,
    };
    return ranks[cleanText(value).toUpperCase()] ?? ranks[raw] ?? 99;
  }
  return null;
}

function sortData(items, sortValue) {
  const [key, dir] = String(sortValue || "").split("-");
  const direction = dir === "asc" ? 1 : -1;
  return items.slice().sort((a, b) => {
    let av = key === "deliveryStatus" ? displayDeliveryStatus(a) : a[key];
    let bv = key === "deliveryStatus" ? displayDeliveryStatus(b) : b[key];
    if (key === "paymentStatus") {
      av = paymentProgressPercent(a);
      bv = paymentProgressPercent(b);
    }
    const statusA = key === "paymentStatus" ? null : statusSortValue(key, av);
    const statusB = key === "paymentStatus" ? null : statusSortValue(key, bv);

    if (statusA !== null && statusB !== null) {
      av = statusA;
      bv = statusB;
    } else if (key.toLowerCase().includes("date")) {
      av = new Date(av || 0).getTime();
      bv = new Date(bv || 0).getTime();
    } else if (typeof av === "string" || typeof bv === "string") {
      av = cleanText(av).toLowerCase();
      bv = cleanText(bv).toLowerCase();
      if (av < bv) return -1 * direction;
      if (av > bv) return 1 * direction;
      return 0;
    } else {
      av = number(av);
      bv = number(bv);
    }

    if (av < bv) return -1 * direction;
    if (av > bv) return 1 * direction;
    return 0;
  });
}

function addDays(date, days) {
  if (!date) return null;
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + Number(days || 0));
  return result;
}

function dateToIso(date) {
  if (!date || Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysBetween(start, end) {
  if (!start || !end) return 0;
  const ms = end.getTime() - start.getTime();
  return Math.round(ms / 86400000);
}

function getFollowupRules(materialType) {
  return (
    FOLLOWUP_RULES[normalizeMaterialType(materialType)] ||
    FOLLOWUP_RULES.Unknown
  );
}

function isAcknowledgementFollowup(row = {}) {
  const stage = normalizeKey(row.followup_stage || row.label || "");
  const key = normalizeKey(row.followup_key || row.key || "");
  const activity = normalizeKey(row.followup_activity || row.activity || "");
  return (
    /^0\s*%/.test(stage) ||
    stage.includes("ACKNOWLEDGEMENT") ||
    stage.includes("ACKNOWLEDGMENT") ||
    key.endsWith("_0") ||
    activity.includes("PO ACKNOWLEDGEMENT") ||
    activity.includes("PO ACKNOWLEDGMENT")
  );
}

function getCurrentFollowupForPo(po, asOfDate = todayDateOnly()) {
  if (!po || normalizeDeliveryStatus(po.deliveryStatus) === "Delivered")
    return null;
  const poDate = parseDateOnly(po.poDate);
  const deliveryDate = parseDateOnly(po.deliveryDate);
  if (!poDate || !deliveryDate) return null;
  const leadTimeDays = Math.max(1, daysBetween(poDate, deliveryDate));
  const elapsedDays = Math.max(0, daysBetween(poDate, asOfDate));
  const leadTimePercent = Math.round(
    Math.min(999, (elapsedDays / leadTimeDays) * 100),
  );
  const materialType = normalizeMaterialType(po.materialType || "Unknown");
  const rules = getFollowupRules(materialType);
  const isDelayed = deliveryDate < asOfDate;
  let rule = null;
  if (isDelayed) {
    rule = rules.find((item) => item.delay) || rules[rules.length - 1];
  } else {
    const eligible = rules.filter(
      (item) => !item.delay && leadTimePercent >= item.percent,
    );
    rule = eligible[eligible.length - 1] || null;
  }
  if (
    !rule ||
    Number(rule.percent) <= 0 ||
    /^0\s*%/.test(normalizeKey(rule.label))
  )
    return null;
  // For delayed POs, follow-up is a continuous daily cycle.
  // The card should be due on the selected/current date, not stuck on the original delivery date.
  const dueDate = rule.delay
    ? asOfDate
    : addDays(poDate, Math.round(leadTimeDays * (rule.percent / 100)));
  const followupType = rule.delay
    ? "Daily Delay Follow-up"
    : "Lead Time Follow-up";
  return {
    po_number: po.poNumber,
    vendor_name: po.vendorName,
    vendor_email:
      po.vendorEmail || state.vendorContacts[po.vendorName]?.email || "",
    vendor_phone:
      po.vendorPhone || state.vendorContacts[po.vendorName]?.phone || "",
    material_type: materialType,
    followup_stage: rule.label,
    followup_key: rule.key,
    lead_time_percent: leadTimePercent,
    followup_activity: rule.activity,
    communication_method: rule.method,
    due_date: dateToIso(dueDate),
    po_delivery_date: dateToIso(deliveryDate),
    status: "Pending",
    priority: rule.delay
      ? "High"
      : rule.percent >= 95
        ? "High"
        : rule.percent >= 75
          ? "Medium"
          : "Low",
    email_status: "Not Sent",
    call_status: rule.method.toLowerCase().includes("call")
      ? "Pending"
      : "Not Required",
    followup_type: followupType,
    poKey: po.poKey,
    isVirtual: true,
  };
}

function makeFollowupTaskKey(row = {}) {
  return `${cleanText(row.po_number || row.poNumber)}__${cleanText(row.followup_stage || row.label)}__${safeDate(row.due_date || row.dueDate)}`;
}

async function generateFollowupsForPOs(pos = []) {
  if (!useSupabase || !Array.isArray(pos) || !pos.length) return [];
  const today = todayDateOnly();
  const candidates = pos
    .map((po) => getCurrentFollowupForPo(po, today))
    .filter((row) => row && !isAcknowledgementFollowup(row));
  if (!candidates.length) return [];

  try {
    const { data: existing, error: existingError } = await supabaseClient
      .from("po_followups")
      .select("po_number, followup_stage, due_date, status, followup_type");
    if (existingError) throw existingError;

    const existingRows = existing || [];
    const existingKeys = new Set(
      existingRows.map((row) => makeFollowupTaskKey(row)),
    );
    const activePendingByPo = new Set(
      existingRows
        .filter(
          (row) => !normalizeKey(row.status || "Pending").includes("COMPLETE"),
        )
        .map((row) => cleanText(row.po_number))
        .filter(Boolean),
    );
    const payload = candidates
      .filter((row) => !existingKeys.has(makeFollowupTaskKey(row)))
      .filter((row) => !activePendingByPo.has(cleanText(row.po_number)))
      .map((row) => ({
        po_number: row.po_number,
        vendor_name: row.vendor_name,
        vendor_email: row.vendor_email || null,
        vendor_phone: row.vendor_phone || null,
        material_type: row.material_type,
        followup_stage: row.followup_stage,
        lead_time_percent: row.lead_time_percent,
        followup_activity: row.followup_activity,
        communication_method: row.communication_method,
        due_date: row.due_date || null,
        status: row.status,
        priority: toDbFollowupPriority(row.priority),
        email_status: row.email_status,
        call_status: row.call_status,
        followup_type: row.followup_type || "Lead Time Follow-up",
      }));

    if (payload.length) {
      const firstInsert = await supabaseClient
        .from("po_followups")
        .insert(payload);
      if (firstInsert.error) {
        const message = String(firstInsert.error.message || "");
        if (message.includes("followup_type")) {
          const fallbackPayload = payload.map((row) => {
            const copy = { ...row };
            delete copy.followup_type;
            return copy;
          });
          const retryInsert = await supabaseClient
            .from("po_followups")
            .insert(fallbackPayload);
          if (retryInsert.error) throw retryInsert.error;
        } else {
          throw firstInsert.error;
        }
      }
      const events = payload.map((row) => ({
        po_number: row.po_number,
        event_type: "followup_generated",
        event_title: "Follow-up Generated",
        event_description: `${row.followup_stage}: ${row.followup_activity}`,
        actor_name: "Procurement Hub",
        metadata: {
          material_type: row.material_type,
          due_date: row.due_date,
          followup_type: row.followup_type || "Lead Time Follow-up",
        },
      }));
      await supabaseClient.from("po_activity_events").insert(events);
    }

    const { data: refreshed, error: refreshError } = await supabaseClient
      .from("po_followups")
      .select("*")
      .order("due_date", { ascending: true });
    if (!refreshError)
      state.followups = (refreshed || []).filter(
        (row) => !isAcknowledgementFollowup(row),
      );
    return payload;
  } catch (error) {
    console.error("Follow-up generation failed", error);
    return [];
  }
}

function enrichFollowupRowForCard(row, po = {}) {
  return {
    ...row,
    poKey: po.poKey || row.poKey || row.po_number,
    poTotal: po.poTotal || row.poTotal || 0,
    productCount: po.productCount || po.itemCount || row.productCount || 0,
    po_delivery_date:
      po.deliveryDate || row.po_delivery_date || row.delivery_date || "",
    latestUpdate:
      row.latest_update ||
      row.completion_note ||
      row.notes ||
      row.latestUpdate ||
      "",
    followup_type: row.followup_type || row.type || "Lead Time Follow-up",
    close_reason: row.close_reason || "",
    isVirtual: Boolean(row.isVirtual),
  };
}

function buildFollowupCards(pos = []) {
  const selectedDate =
    parseDateOnly(state.filters.followupDate) || todayDateOnly();
  const poMap = new Map((pos || []).map((po) => [cleanText(po.poNumber), po]));

  const persisted = (state.followups || [])
    .filter((row) => !isAcknowledgementFollowup(row))
    .map((row) =>
      enrichFollowupRowForCard(row, poMap.get(cleanText(row.po_number)) || {}),
    );

  const persistedByPoStage = new Map(
    persisted.map((row) => [makeFollowupTaskKey(row), row]),
  );

  const visibleByPo = new Map();
  const addVisible = (row, poFallback = null) => {
    if (!row || isAcknowledgementFollowup(row)) return;
    const poNumber = cleanText(
      row.po_number || row.poNumber || poFallback?.poNumber,
    );
    if (!poNumber) return;
    const enriched = enrichFollowupRowForCard(
      row,
      poFallback || poMap.get(poNumber) || {},
    );
    const existing = visibleByPo.get(poNumber);
    if (!existing) {
      visibleByPo.set(poNumber, enriched);
      return;
    }

    // Keep one card per PO. Prefer current/due card over older persisted rows,
    // and completed card only when no active task is pending.
    const existingStatus = normalizeKey(existing.status || "Pending");
    const newStatus = normalizeKey(enriched.status || "Pending");
    const existingDue = parseDateOnly(existing.due_date)?.getTime() || 0;
    const newDue = parseDateOnly(enriched.due_date)?.getTime() || 0;
    if (
      existingStatus.includes("COMPLETE") &&
      !newStatus.includes("COMPLETE")
    ) {
      visibleByPo.set(poNumber, enriched);
    } else if (
      !existingStatus.includes("COMPLETE") &&
      !newStatus.includes("COMPLETE") &&
      newDue >= existingDue
    ) {
      visibleByPo.set(poNumber, enriched);
    }
  };

  const activeFutureScheduledByPo = new Set(
    persisted
      .filter(
        (row) => !normalizeKey(row.status || "Pending").includes("COMPLETE"),
      )
      .filter((row) => {
        const type = normalizeKey(row.followup_type || "");
        const due = parseDateOnly(row.due_date);
        // Only a user-selected Scheduled Follow-up in the future should suppress
        // automatic lead-time/daily-delay cards. Existing Daily Delay rows must
        // not hide today's lead-time follow-up for non-delayed POs.
        return (
          type.includes("SCHEDULED") &&
          due &&
          selectedDate &&
          due > selectedDate
        );
      })
      .map((row) => cleanText(row.po_number))
      .filter(Boolean),
  );

  // Main rule: for every active non-delivered PO, show the current follow-up
  // when it is due today or already missed. If the user already scheduled the
  // next follow-up for a future date, do not show that PO before the scheduled date.
  (pos || []).forEach((po) => {
    if (!po || normalizeDeliveryStatus(po.deliveryStatus) === "Delivered")
      return;
    const poNumberForSchedule = cleanText(po.poNumber);
    const current = getCurrentFollowupForPo(po, selectedDate);
    if (!current || isAcknowledgementFollowup(current)) return;
    const dueDate = parseDateOnly(current.due_date);
    if (!dueDate || !selectedDate || dueDate > selectedDate) return;
    // Do not suppress Daily Delay follow-ups due today, even if future scheduled follow-up exists
    const isDailyDelayDueToday =
      normalizeKey(current.followup_type).includes("DAILY DELAY") &&
      dueDate.getTime() === selectedDate.getTime();
    if (activeFutureScheduledByPo.has(poNumberForSchedule) && !isDailyDelayDueToday)
      return;
    const poNumber = cleanText(current.po_number || po.poNumber);
    const stage = cleanText(current.followup_stage);
    const persistedMatch = persistedByPoStage.get(makeFollowupTaskKey(current));
    addVisible(persistedMatch || current, po);
  });

  // Preserve completed follow-ups for the selected date.
  persisted.forEach((row) => {
    const isCompleted = normalizeKey(row.status).includes("COMPLETE");
    if (!isCompleted) return;
    const completedDate = parseDateOnly(
      row.completed_at || row.updated_at || row.created_at,
    );
    if (
      completedDate &&
      selectedDate &&
      completedDate.getTime() === selectedDate.getTime()
    ) {
      addVisible(row, poMap.get(cleanText(row.po_number)) || null);
    }
  });

  // Fallback for old DB rows when the PO no longer exists locally, or when
  // a missed DB follow-up has no matching generated current-stage card.
  persisted.forEach((row) => {
    const isCompleted = normalizeKey(row.status).includes("COMPLETE");
    if (isCompleted) return;
    const dueDate = parseDateOnly(row.due_date);
    if (dueDate && selectedDate && dueDate <= selectedDate) {
      addVisible(row, poMap.get(cleanText(row.po_number)) || null);
    }
  });

  return Array.from(visibleByPo.values());
}

function getFollowupCardStatus(card, selectedDate) {
  const status = cleanText(card.status || "Pending");
  const isCompleted = normalizeKey(status).includes("COMPLETE");
  const dueDate = parseDateOnly(card.due_date);
  if (isCompleted) return "Completed";
  if (dueDate && selectedDate && dueDate < selectedDate)
    return "Missed Follow-up";
  if (dueDate && selectedDate && dueDate.getTime() === selectedDate.getTime())
    return "Due Today";
  if (normalizeKey(card.email_status).includes("SENT")) return "Email Sent";
  return status || "Pending";
}

function toDbFollowupPriority(value) {
  const raw = normalizeKey(value);
  if (raw.includes("LOW")) return "Low";
  if (raw.includes("HIGH")) return "High";
  if (raw.includes("CRITICAL")) return "Critical";
  // Supabase Module 1 constraint supports Low, Normal, High, Critical.
  // UI still displays Medium based on stage, but DB stores it as Normal.
  return "Normal";
}

function getEffectiveFollowupPriority(card, viewStatus) {
  const statusKey = normalizeKey(card?.status || "");
  const rawPriority = normalizeKey(card?.priority || "");
  const stageKey = normalizeKey(card?.followup_stage || "");
  const activityKey = normalizeKey(card?.followup_activity || "");

  // Priority is based on follow-up stage/risk. Overdue is shown separately as the status.
  // Example: a 25% MTO follow-up can be overdue, but it remains Low Priority.
  if (statusKey.includes("COMPLETE"))
    return { key: "low", label: "Low Priority" };
  if (
    rawPriority.includes("INCOMPLETE") ||
    activityKey.includes("MISSING") ||
    activityKey.includes("REQUIRED")
  ) {
    return { key: "incomplete", label: "Incomplete Tasks" };
  }
  if (
    stageKey.includes("DELAY") ||
    stageKey.includes("95") ||
    stageKey.includes("100") ||
    rawPriority.includes("CRITICAL")
  ) {
    return { key: "high", label: "High Priority" };
  }
  if (
    stageKey.includes("90") ||
    stageKey.includes("75") ||
    stageKey.includes("50") ||
    rawPriority.includes("MEDIUM")
  ) {
    return { key: "medium", label: "Medium Priority" };
  }
  if (stageKey.includes("25") || rawPriority.includes("LOW")) {
    return { key: "low", label: "Low Priority" };
  }
  return { key: "medium", label: "Medium Priority" };
}

function shouldShowFollowupCard(card, selectedDate) {
  const status = cleanText(card.status || "Pending");
  const isCompleted = normalizeKey(status).includes("COMPLETE");
  if (isCompleted) {
    const completedDate = parseDateOnly(
      card.completed_at || card.updated_at || card.created_at,
    );
    return (
      completedDate &&
      selectedDate &&
      completedDate.getTime() === selectedDate.getTime()
    );
  }
  const dueDate = parseDateOnly(card.due_date);
  return Boolean(dueDate && selectedDate && dueDate <= selectedDate);
}

function renderFollowups({ pos }) {
  const dateInput = document.getElementById("followupDateFilter");
  const summaryMount = document.getElementById("followupSummary");
  const listMount = document.getElementById("followupCardList");
  if (!summaryMount || !listMount) return;
  if (!state.filters.followupDate)
    state.filters.followupDate = dateToIso(todayDateOnly());
  if (dateInput && dateInput.value !== state.filters.followupDate)
    dateInput.value = state.filters.followupDate;

  const materialOptions = [
    { value: "all", label: "All Material Types" },
    { value: "RTO", label: "RTO" },
    { value: "MTO", label: "MTO" },
    { value: "Unknown", label: "Unknown" },
  ];
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "due_today", label: "Due Today" },
    { value: "missed", label: "Missed Follow-ups" },
    { value: "pending", label: "Pending" },
    { value: "email_sent", label: "Email Sent" },
    { value: "completed", label: "Completed" },
  ];
  setSelectOptions(
    "followupMaterialFilter",
    materialOptions,
    state.filters.followupMaterial,
  );
  setSelectOptions(
    "followupStatusFilter",
    statusOptions,
    state.filters.followupStatus,
  );

  const selectedDate =
    parseDateOnly(state.filters.followupDate) || todayDateOnly();
  let cards = buildFollowupCards(pos).filter((card) =>
    shouldShowFollowupCard(card, selectedDate),
  );
  cards = cards.filter((card) => {
    const material = normalizeMaterialType(
      card.material_type || card.materialType || "Unknown",
    );
    if (
      state.filters.followupMaterial !== "all" &&
      material !== state.filters.followupMaterial
    )
      return false;
    const viewStatus = getFollowupCardStatus(card, selectedDate);
    const rawStatus = normalizeKey(card.status || "Pending");
    if (
      state.filters.followupStatus === "due_today" &&
      viewStatus !== "Due Today"
    )
      return false;
    if (
      state.filters.followupStatus === "missed" &&
      viewStatus !== "Missed Follow-up"
    )
      return false;
    if (
      state.filters.followupStatus === "pending" &&
      !rawStatus.includes("PENDING")
    )
      return false;
    if (
      state.filters.followupStatus === "completed" &&
      !rawStatus.includes("COMPLETE")
    )
      return false;
    if (
      state.filters.followupStatus === "email_sent" &&
      !normalizeKey(card.email_status).includes("SENT")
    )
      return false;
    return true;
  });

  cards.sort((a, b) => {
    const aDue = parseDateOnly(a.due_date)?.getTime() || 0;
    const bDue = parseDateOnly(b.due_date)?.getTime() || 0;
    const aStatusKey = normalizeKey(getFollowupCardStatus(a, selectedDate));
    const bStatusKey = normalizeKey(getFollowupCardStatus(b, selectedDate));
    const aPriority = aStatusKey.includes("MISSED")
      ? 0
      : aStatusKey.includes("DUE")
        ? 1
        : 2;
    const bPriority = bStatusKey.includes("MISSED")
      ? 0
      : bStatusKey.includes("DUE")
        ? 1
        : 2;
    return aPriority - bPriority || aDue - bDue;
  });

  const dueTodayCount = cards.filter(
    (card) => getFollowupCardStatus(card, selectedDate) === "Due Today",
  ).length;
  const missedCount = cards.filter(
    (card) => getFollowupCardStatus(card, selectedDate) === "Missed Follow-up",
  ).length;
  const completedCount = cards.filter((card) =>
    normalizeKey(card.status).includes("COMPLETE"),
  ).length;
  const callCount = cards.filter(
    (card) => !normalizeKey(card.call_status).includes("NOT REQUIRED"),
  ).length;
  summaryMount.innerHTML = `
    <span class="followup-stat"><strong>${formatNumber(cards.length)}</strong> action cards</span>
    <span class="followup-stat warning"><strong>${formatNumber(dueTodayCount)}</strong> due today</span>
    <span class="followup-stat danger"><strong>${formatNumber(missedCount)}</strong> missed follow-ups</span>
    <span class="followup-stat good"><strong>${formatNumber(completedCount)}</strong> completed</span>
    <span class="followup-stat"><strong>${formatNumber(callCount)}</strong> call required</span>
  `;

  if (!cards.length) {
    listMount.innerHTML =
      '<div class="empty-state">No follow-up cards for the selected filters.</div>';
    return;
  }

  listMount.innerHTML = cards
    .map((card) => {
      const viewStatus = getFollowupCardStatus(card, selectedDate);
      const isDue = ["Due Today", "Missed Follow-up"].includes(viewStatus);
      const isCompleted = normalizeKey(card.status).includes("COMPLETE");
      const isEmailSent = normalizeKey(card.email_status).includes("SENT");
      const priorityInfo = getEffectiveFollowupPriority(card, viewStatus);
      const className = isDue
        ? "followup-due"
        : isCompleted
          ? "followup-completed"
          : isEmailSent
            ? "followup-email-sent"
            : "";
      const deliveryDateText = formatDate(
        card.po_delivery_date || card.delivery_date || "",
      );
      return `
      <article class="followup-card ${className} priority-${priorityInfo.key}">
        <div class="followup-card-main">
          <div>
            <div class="followup-topline">
              <span class="followup-po">${escapeHtml(card.po_number)}</span>
              <span class="badge material-type-badge">${escapeHtml(normalizeMaterialType(card.material_type))}</span>
              <span class="followup-status-pill ${isDue ? "danger" : ""}">${escapeHtml(viewStatus)}</span>
              <span class="priority-chip priority-${priorityInfo.key}">${escapeHtml(priorityInfo.label)}</span>
              ${card.isVirtual ? '<span class="followup-status-pill">Preview</span>' : ""}
            </div>
            <h3>${escapeHtml(card.vendor_name || "Unknown Vendor")}</h3>
          </div>
          <div class="followup-due-box">
            <span>Follow-up Due</span>
            <strong>${formatDate(card.due_date)}</strong>
            <small>Delivery: ${escapeHtml(deliveryDateText)}</small>
          </div>
        </div>
        <div class="followup-action-copy">
          <span>${escapeHtml(card.followup_stage || "Follow-up")}</span>
          <strong>${escapeHtml(card.followup_activity || "Follow up with vendor")}</strong>
        </div>
        <div class="followup-meta-grid">
          <div><span>Type</span><strong>${escapeHtml(getFollowupTypeLabel(card))}</strong></div>
          <div><span>Communication</span><strong>${escapeHtml(card.communication_method || "—")}</strong></div>
          <div><span>Email</span><strong>${escapeHtml(card.email_status || "Not Sent")}</strong></div>
          <div><span>Call</span><strong>${escapeHtml(card.call_status || "Not Required")}</strong></div>
          <div class="priority-cell priority-${priorityInfo.key}"><span>Priority</span><strong>${escapeHtml(priorityInfo.label)}</strong></div>
        </div>
        <div class="followup-latest">
          <span>Latest Update</span>
          <p>${escapeHtml(card.latestUpdate || (card.isVirtual ? "Generated from current PO status. Complete or sync to persist this task." : "No update added yet."))}</p>
        </div>
        <div class="inline-actions followup-actions">
          <button class="ghost-btn small-btn" data-action="view-products" data-po="${escapeHtml(card.poKey || card.po_number)}">View PO</button>
          <button class="primary-btn small-btn" data-action="complete-followup" data-followup="${escapeHtml(card.id || "")}" data-po="${escapeHtml(card.poKey || card.po_number)}">Complete</button>
          <button class="ghost-btn small-btn" data-action="send-followup-mail" data-followup="${escapeHtml(card.id || "")}" data-po="${escapeHtml(card.poKey || card.po_number)}">Send Mail</button>
        </div>
      </article>
    `;
    })
    .join("");
}

function getFollowupByIdOrPo(followupId, poKey) {
  const derived = buildDerived();
  const cleanFollowupId = cleanText(followupId);
  const cleanPoKey = cleanText(poKey);
  const po = derived.pos.find(item => cleanText(item.poKey) === cleanPoKey || cleanText(item.poNumber) === cleanPoKey) || null;
  const allCards = buildFollowupCards(derived.pos);

  // Important: virtual follow-up cards do not have a DB id yet.
  // Previously, an empty followupId matched the first virtual card because
  // cleanText(undefined) === ''. That made Send Mail open the wrong template
  // for many cards. Only match by id when an actual id exists; otherwise match
  // by the clicked PO key/number.
  const card = (cleanFollowupId
    ? allCards.find(item => cleanText(item.id) === cleanFollowupId)
    : null)
    || allCards.find(item => {
      const cardPoKey = cleanText(item.poKey || item.po_number);
      const cardPoNumber = cleanText(item.po_number || item.poNumber);
      return cardPoKey === cleanPoKey || cardPoNumber === cleanPoKey;
    })
    || null;
  return { card, po };
}

async function ensureFollowupPersisted(card) {
  if (!card) throw new Error("Follow-up card not found.");
  if (cleanText(card.id) && !card.isVirtual) return card;

  if (!useSupabase) {
    const localRow = {
      ...card,
      id: cleanText(card.id) || uid("followup"),
      isVirtual: false,
      created_at: new Date().toISOString(),
    };
    state.followups = [...(state.followups || []), localRow];
    return localRow;
  }

  let existingFollowupQuery = supabaseClient
    .from("po_followups")
    .select("*")
    .eq("po_number", card.po_number)
    .eq("followup_stage", card.followup_stage);
  const cardDueDate = safeDate(card.due_date);
  if (cardDueDate)
    existingFollowupQuery = existingFollowupQuery.eq("due_date", cardDueDate);
  const matchQuery = await existingFollowupQuery.limit(1).maybeSingle();

  if (matchQuery.error && matchQuery.error.code !== "PGRST116")
    throw matchQuery.error;
  if (matchQuery.data) return matchQuery.data;

  const payload = {
    po_number: card.po_number,
    vendor_name: card.vendor_name || "Unknown Vendor",
    vendor_email: card.vendor_email || null,
    vendor_phone: card.vendor_phone || null,
    material_type: normalizeMaterialType(card.material_type || "Unknown"),
    followup_stage: card.followup_stage || "Follow-up",
    lead_time_percent:
      card.lead_time_percent == null ? null : Number(card.lead_time_percent),
    followup_activity: card.followup_activity || "Follow up with vendor",
    communication_method: card.communication_method || "Call / Email",
    due_date: safeDate(card.due_date),
    status: "Pending",
    priority: toDbFollowupPriority(card.priority || "Normal"),
    email_status: cleanText(card.email_status || "Not Sent"),
    call_status: cleanText(card.call_status || "Not Required"),
    followup_type: card.followup_type || "Lead Time Follow-up",
  };

  const data = await insertFollowupRow(payload);
  state.followups = [
    ...(state.followups || []).filter(
      (item) => cleanText(item.id) !== cleanText(data.id),
    ),
    data,
  ];
  return data;
}

function getFollowupTypeLabel(card = {}) {
  const raw = cleanText(card.followup_type || card.type || "");
  const stage = normalizeKey(card.followup_stage || "");
  const activity = normalizeKey(card.followup_activity || "");
  const rawKey = normalizeKey(raw);
  if (rawKey.includes("SCHEDULED")) return raw || "Scheduled Follow-up";
  if (
    rawKey.includes("DAILY DELAY") ||
    stage.includes("DELAY") ||
    activity.includes("DELAY")
  )
    return "Daily Delay Follow-up";
  if (rawKey.includes("MANUAL")) return "Manual Follow-up";
  return raw || "Lead Time Follow-up";
}

function isDelayedFollowupContext(
  card = {},
  po = {},
  asOfDate = todayDateOnly(),
) {
  const stage = normalizeKey(card.followup_stage || "");
  const activity = normalizeKey(card.followup_activity || "");
  const type = normalizeKey(card.followup_type || "");
  const deliveryStatus = normalizeDeliveryStatus(
    po?.deliveryStatus || card.delivery_status || "",
  );
  const deliveryDate = parseDateOnly(
    po?.deliveryDate || card.po_delivery_date || card.delivery_date || "",
  );
  return (
    deliveryStatus === "Delayed" ||
    stage.includes("DELAY") ||
    type.includes("DELAY") ||
    activity.includes("DELAY") ||
    Boolean(deliveryDate && asOfDate && deliveryDate < asOfDate)
  );
}
function isFollowupCycleClosed(closeReason = "", deliveryStatus = "") {
  const reason = cleanText(closeReason)
    .toUpperCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const status = cleanText(deliveryStatus)
    .toUpperCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const closedReasons = new Set([
    "DELIVERED",
    "PO CANCELLED",
    "NO FURTHER FOLLOW UP REQUIRED",
    "NO FURTHER FOLLOWUP REQUIRED",
    "DUPLICATE PO",
    "WRONG ENTRY",
  ]);

  return status === "DELIVERED" || closedReasons.has(reason);
}
function buildNextFollowupCandidate({
  persisted = {},
  card = {},
  po = {},
  completion = {},
} = {}) {
  const poNumber = cleanText(
    persisted.po_number || card.po_number || po.poNumber,
  );
  if (!poNumber) return null;
  if (isFollowupCycleClosed(completion.closeReason, po?.deliveryStatus || card.delivery_status || persisted.delivery_status || "")) return null;

  const selectedNextDate = parseDateOnly(completion.nextFollowupDate);
  const completedDate =
    parseDateOnly(completion.completedAt) || todayDateOnly();
  const delayedContext = isDelayedFollowupContext(card, po, completedDate);
  let dueDate = null;
  let followupType = "";
  let stage = "";
  let activity = "";
  let priority = "Normal";
  let method = card.communication_method || "Call + Email";

  if (selectedNextDate) {
    dueDate = selectedNextDate;
    followupType = "Scheduled Follow-up";
    stage = delayedContext
      ? "Scheduled Delay Follow-up"
      : "Scheduled Follow-up";
    activity =
      "Follow up as per the next follow-up date committed during the previous update.";
    priority = delayedContext ? "High" : "Normal";
  } else if (delayedContext) {
    dueDate = addDays(completedDate, 1);
    followupType = "Daily Delay Follow-up";
    stage = "Daily Delay Follow-up";
    activity =
      "Daily delay follow-up until material is received or a revised next follow-up date is set.";
    priority = "High";
    method = "Mandatory Call + Email";
  } else {
    return null;
  }

  return {
    po_number: poNumber,
    vendor_name:
      persisted.vendor_name ||
      card.vendor_name ||
      po.vendorName ||
      "Unknown Vendor",
    vendor_email:
      persisted.vendor_email ||
      card.vendor_email ||
      po.vendorEmail ||
      state.vendorContacts?.[po.vendorName]?.email ||
      null,
    vendor_phone:
      persisted.vendor_phone ||
      card.vendor_phone ||
      po.vendorPhone ||
      state.vendorContacts?.[po.vendorName]?.phone ||
      null,
    material_type: normalizeMaterialType(
      persisted.material_type ||
        card.material_type ||
        po.materialType ||
        "Unknown",
    ),
    followup_stage: stage,
    lead_time_percent:
      persisted.lead_time_percent == null
        ? card.lead_time_percent == null
          ? null
          : Number(card.lead_time_percent)
        : Number(persisted.lead_time_percent),
    followup_activity: activity,
    communication_method: method,
    due_date: dateToIso(dueDate),
    status: "Pending",
    priority: toDbFollowupPriority(priority),
    email_status: "Not Sent",
    call_status: method.toLowerCase().includes("call")
      ? "Pending"
      : "Not Required",
    followup_type: followupType,
    parent_followup_id: cleanText(persisted.id || card.id) || null,
  };
}

async function insertFollowupRow(payload) {
  if (!useSupabase) return null;
  const first = await supabaseClient
    .from("po_followups")
    .insert(payload)
    .select("*")
    .single();
  if (!first.error) return first.data;
  const message = String(first.error.message || "");
  const optionalColumns = [
    "followup_type",
    "parent_followup_id",
    "close_reason",
  ];
  if (!optionalColumns.some((column) => message.includes(column)))
    throw first.error;
  const fallbackPayload = { ...payload };
  optionalColumns.forEach((column) => delete fallbackPayload[column]);
  const second = await supabaseClient
    .from("po_followups")
    .insert(fallbackPayload)
    .select("*")
    .single();
  if (second.error) throw second.error;
  return second.data;
}

async function createNextFollowupAfterCompletion({
  persisted = {},
  card = {},
  po = {},
  completion = {},
} = {}) {
  const nextPayload = buildNextFollowupCandidate({
    persisted,
    card,
    po,
    completion,
  });
  if (!nextPayload) return null;

  if (!useSupabase) {
    const localRow = {
      ...nextPayload,
      id: uid("followup"),
      created_at: new Date().toISOString(),
      isVirtual: false,
    };
    state.followups.push(localRow);
    return localRow;
  }

  const { data: existing, error: existingError } = await supabaseClient
    .from("po_followups")
    .select("*")
    .eq("po_number", nextPayload.po_number)
    .eq("due_date", nextPayload.due_date)
    .eq("status", "Pending")
    .limit(1)
    .maybeSingle();
  if (existingError && existingError.code !== "PGRST116") throw existingError;
  if (existing) return existing;

  const inserted = await insertFollowupRow(nextPayload);
  await insertPoActivityEvent({
    po_number: nextPayload.po_number,
    event_type: "followup_generated",
    event_title: nextPayload.followup_type || "Follow-up Generated",
    event_description: `${nextPayload.followup_stage}: ${nextPayload.followup_activity}`,
    actor: "Procurement Hub",
    metadata: {
      material_type: nextPayload.material_type,
      due_date: nextPayload.due_date,
      followup_type: nextPayload.followup_type,
      parent_followup_id: nextPayload.parent_followup_id,
    },
  });
  return inserted;
}

function openCompleteFollowupModal(followupId, poKey) {
  const { card, po } = getFollowupByIdOrPo(followupId, poKey);
  if (!card) {
    alert("Follow-up card not found. Refresh once and try again.");
    return;
  }

  completingFollowupContext = {
    followupId: cleanText(followupId),
    poKey,
    card,
    po,
  };

  const form = document.getElementById("completeFollowupForm");
  if (!form) return;
  form.reset();
  form.elements.followupId.value = cleanText(followupId);
  form.elements.poKey.value = cleanText(poKey || card.poKey || card.po_number);
  form.elements.completionMethod.value = cleanText(
    card.communication_method || "Call + Email",
  ).includes("Call")
    ? "Call + Email"
    : "Email";
  form.elements.edd.value = safeDate(po?.edd || card.edd || "") || "";
  form.elements.delayReason.value = cleanText(
    po?.delayReason || card.delay_reason || "",
  );
  form.elements.nextFollowupDate.value = "";
  if (form.elements.closeReason) form.elements.closeReason.value = "";

  document.getElementById("completeFollowupTitle").textContent =
    `Complete ${card.po_number || poKey}`;
  document.getElementById("completeFollowupSubtext").textContent =
    `${card.vendor_name || po?.vendorName || "Vendor"} • ${card.followup_stage || "Follow-up"}`;
  document.getElementById("completeFollowupStage").textContent =
    card.followup_stage || "Follow-up";
  document.getElementById("completeFollowupActivity").textContent =
    card.followup_activity || "Follow up with vendor";
  document.getElementById("completeFollowupDue").textContent = formatDate(
    card.due_date,
  );
  document.getElementById("completeFollowupDelivery").textContent = formatDate(
    po?.deliveryDate || card.po_delivery_date || "",
  );

  document
    .getElementById("completeFollowupBackdrop")
    .classList.remove("hidden");
}

function closeCompleteFollowupModal() {
  document.getElementById("completeFollowupBackdrop")?.classList.add("hidden");
  completingFollowupContext = null;
}

function applyFollowupCompletionLocally(followupRow, completion) {
  const id = cleanText(followupRow.id);
  const poNumber = cleanText(followupRow.po_number || completion.poNumber);
  const closesAsDelivered =
    normalizeDeliveryStatus(completion.closeReason) === "Delivered";
  const deliveredDate =
    completion.deliveredDate || (closesAsDelivered ? todayIsoDate() : "");
  const updated = {
    ...followupRow,
    status: "Completed",
    completed_at: completion.completedAt,
    completed_by: completion.doneBy,
    call_status: completion.callStatus,
    notes:
      completion.updateReceived || completion.notes || followupRow.notes || "",
    close_reason: completion.closeReason || followupRow.close_reason || "",
  };

  state.followups = (state.followups || []).filter((item) => {
    if (id && cleanText(item.id) === id) return false;
    if (id) return true;
    return !(
      cleanText(item.po_number) === poNumber &&
      cleanText(item.followup_stage) === cleanText(followupRow.followup_stage)
    );
  });
  state.followups.push(updated);

  const patchPoRow = (row) => {
    if (!row || cleanText(row.poNumber) !== poNumber) return row;
    if (completion.edd) row.edd = completion.edd;
    if (completion.delayReason) row.delayReason = completion.delayReason;
    if (closesAsDelivered) {
      row.deliveryStatus = "Delivered";
      row.deliveredDate = row.deliveredDate || deliveredDate;
    }
    return row;
  };

  baseRows.forEach(patchPoRow);
  state.manualRows.forEach(patchPoRow);
  baseRows.forEach((row) => {
    if (cleanText(row.poNumber) !== poNumber) return;
    state.rowOverrides[row.id] = {
      ...(state.rowOverrides[row.id] || {}),
      ...(completion.edd ? { edd: completion.edd } : {}),
      ...(completion.delayReason
        ? { delayReason: completion.delayReason }
        : {}),
      ...(closesAsDelivered
        ? {
            deliveryStatus: "Delivered",
            deliveredDate:
              state.rowOverrides[row.id]?.deliveredDate ||
              row.deliveredDate ||
              deliveredDate,
          }
        : {}),
    };
  });
  if (closesAsDelivered) {
    state.activityEvents.push({
      po_number: poNumber,
      event_type: "delivery_status_changed",
      event_title: "Delivery Status Changed",
      event_description: "Delivery status changed to Delivered from follow-up completion.",
      old_value: "",
      new_value: "Delivered",
      actor: completion.doneBy || "Procurement Hub",
      source: "Follow-ups",
      metadata: {
        delivered_date: deliveredDate,
        close_reason: completion.closeReason,
      },
      created_at: completion.completedAt || new Date().toISOString(),
    });
  }
  saveState();
}

async function insertPoActivityEvent(event) {
  if (!useSupabase) return;
  const basePayload = {
    po_number: event.po_number,
    event_type: event.event_type,
    event_title: event.event_title,
    event_description: event.event_description,
    old_value: event.old_value || null,
    new_value: event.new_value || null,
    source: "Procurement Hub",
    metadata: event.metadata || {},
  };

  const withActor = { ...basePayload, actor: event.actor || "" };
  const first = await supabaseClient
    .from("po_activity_events")
    .insert(withActor);
  if (!first.error) return;

  const message = String(first.error.message || "");
  if (!message.includes("actor")) {
    console.warn("Activity event insert failed", first.error);
    return;
  }

  const withActorName = { ...basePayload, actor_name: event.actor || "" };
  const second = await supabaseClient
    .from("po_activity_events")
    .insert(withActorName);
  if (second.error) console.warn("Activity event insert failed", second.error);
}

async function completeFollowup(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent || "Save Complete";

  const context =
    completingFollowupContext ||
    getFollowupByIdOrPo(
      form.elements.followupId.value,
      form.elements.poKey.value,
    );
  const card = context.card;
  if (!card) {
    alert("Follow-up card not found. Refresh once and try again.");
    return;
  }

  const doneBy = cleanText(form.elements.doneBy.value);
  const vendorContactPerson = cleanText(
    form.elements.vendorContactPerson.value,
  );
  const completionMethod = cleanText(form.elements.completionMethod.value);
  const updateReceived = cleanText(form.elements.updateReceived.value);
  const edd = safeDate(form.elements.edd.value);
  const delayReason = cleanText(form.elements.delayReason.value);
  const nextFollowupDate = safeDate(form.elements.nextFollowupDate.value);
  const closeReason = cleanText(form.elements.closeReason?.value || "");
  const closesAsDelivered =
    normalizeDeliveryStatus(closeReason) === "Delivered";
  const deliveredDate = closesAsDelivered
    ? safeDate(
        context.po?.deliveredDate ||
          card.delivered_date ||
          card.deliveredDate,
      ) || todayIsoDate()
    : "";
  const notes = cleanText(form.elements.notes.value);

  if (!doneBy) {
    alert("Enter who completed the follow-up.");
    return;
  }
  if (!updateReceived) {
    alert("Enter the update received from the vendor.");
    return;
  }

  const completedAt = new Date().toISOString();
  const callStatus =
    completionMethod.toLowerCase().includes("call") ||
    !normalizeKey(card.call_status).includes("NOT REQUIRED")
      ? "Completed"
      : card.call_status || "Not Required";

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Saving...";
    }

    const persisted = await ensureFollowupPersisted(card);
    const followupId = cleanText(persisted.id);
    const poNumber = cleanText(persisted.po_number || card.po_number);

    const completion = {
      poNumber,
      doneBy,
      vendorContactPerson,
      completionMethod,
      updateReceived,
      edd,
      delayReason,
      nextFollowupDate,
      closeReason,
      deliveredDate,
      notes,
      completedAt,
      callStatus,
    };

    if (useSupabase) {
      const followupUpdate = {
        status: "Completed",
        completed_at: completedAt,
        completed_by: doneBy,
        call_status: callStatus,
        notes: updateReceived || notes || null,
        close_reason: closeReason || null,
        updated_at: completedAt,
      };
      const { error: followupError } = await supabaseClient
        .from("po_followups")
        .update(followupUpdate)
        .eq("id", followupId);
      if (followupError) throw followupError;

      const logPayload = {
        followup_id: followupId || null,
        po_number: poNumber,
        action_type: "Completed",
        update_received: updateReceived,
        vendor_contact_person: vendorContactPerson || null,
        done_by: doneBy,
        communication_method: completionMethod,
        edd: edd || null,
        delay_reason: delayReason || null,
        next_followup_date: nextFollowupDate || null,
        close_reason: closeReason || null,
        notes: notes || null,
      };
      const { error: logError } = await supabaseClient
        .from("po_followup_logs")
        .insert(logPayload);
      if (logError) throw logError;

      if (edd || delayReason || closesAsDelivered) {
        const poPatch = {};
        if (edd) poPatch.edd = edd;
        if (delayReason) poPatch.delay_reason = delayReason;
        if (closesAsDelivered) {
          poPatch.delivery_status = "Delivered";
          poPatch.delivered_date = deliveredDate;
        }
        await updateSupabaseEqWithOptionalColumns(
          "purchase_orders",
          poPatch,
          "po_number",
          poNumber,
          ["delivered_date"],
        );
        if (closesAsDelivered) {
          await updateSupabaseEqWithOptionalColumns(
            "po_lines",
            {
              delivery_status: "Delivered",
              delivered_date: deliveredDate,
            },
            "po_number",
            poNumber,
            ["delivered_date"],
          );
        }
      }

      await insertPoActivityEvent({
        po_number: poNumber,
        event_type: "followup_completed",
        event_title: "Follow-up Completed",
        event_description: `${persisted.followup_stage || card.followup_stage || "Follow-up"} completed by ${doneBy}. ${updateReceived}`,
        actor: doneBy,
        metadata: {
          followup_id: followupId,
          followup_stage: persisted.followup_stage || card.followup_stage,
          vendor_contact_person: vendorContactPerson,
          communication_method: completionMethod,
          edd,
          delay_reason: delayReason,
          next_followup_date: nextFollowupDate,
          close_reason: closeReason,
          delivered_date: deliveredDate || null,
        },
      });

      const nextFollowup = await createNextFollowupAfterCompletion({
        persisted,
        card,
        po: context.po,
        completion,
      });
      if (nextFollowup) {
        const nextDate = safeDate(nextFollowup.due_date);
        await supabaseClient
          .from("po_followup_logs")
          .update({ created_next_followup_date: nextDate || null })
          .eq("followup_id", followupId)
          .eq("po_number", poNumber);
      }
    } else {
      await createNextFollowupAfterCompletion({
        persisted: { ...persisted, ...card },
        card,
        po: context.po,
        completion,
      });
    }

    applyFollowupCompletionLocally({ ...persisted, ...card }, completion);
    if (useSupabase) await loadRemoteStateFromSupabase();
    closeCompleteFollowupModal();
    renderAll();
    alert("Follow-up completed and saved.");
  } catch (error) {
    console.error("Complete follow-up failed", error);
    alert(`Complete follow-up failed: ${error.message || error}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}



const FOLLOWUP_MAIL_TEMPLATES = {
  RTO_50: {
    label: 'RTO 50% Readiness Check',
    subject: 'RTO readiness check required',
    intro: 'This is the 50% RTO follow-up for the below purchase order.',
    ask: [
      'confirm whether the ordered items are ready or on track',
      'share any pending issue affecting readiness',
      'confirm expected dispatch timeline'
    ]
  },
  RTO_75: {
    label: 'RTO 75% Dispatch Planning',
    subject: 'RTO dispatch planning confirmation required',
    intro: 'This is the 75% RTO follow-up to lock dispatch planning.',
    ask: [
      'confirm dispatch date and expected time',
      'share transporter / vehicle planning status if available',
      'confirm whether any packing or billing activity is pending'
    ]
  },
  RTO_95: {
    label: 'RTO 95% Next-Day Delivery Confirmation',
    subject: 'Urgent RTO next-day delivery confirmation required',
    intro: 'This is the 95% RTO follow-up. Please confirm next-day delivery readiness on priority.',
    ask: [
      'confirm final dispatch readiness',
      'share invoice / LR / transport details if already arranged',
      'confirm expected delivery date and ETA'
    ]
  },
  RTO_100: {
    label: 'RTO 100% Delivery-Day Status',
    subject: 'RTO delivery-day status confirmation required',
    intro: 'This is the 100% RTO follow-up for delivery-day status confirmation.',
    ask: [
      'confirm whether material has been dispatched or delivered',
      'share current material movement status and ETA',
      'share pending documents, if any'
    ]
  },
  RTO_DELAY: {
    label: 'RTO Delay Escalation',
    subject: 'RTO delayed PO - revised delivery date required',
    intro: 'The RTO PO is delayed. Please share a clear revised delivery update immediately.',
    ask: [
      'reason for delay',
      'revised estimated delivery date',
      'current dispatch / transport status',
      'support required from our side, if any'
    ]
  },
  MTO_25: {
    label: 'MTO 25% Raw Material / Kickoff Check',
    subject: 'MTO raw material and production kickoff update required',
    intro: 'This is the 25% MTO follow-up for raw material procurement and production kickoff.',
    ask: [
      'confirm raw material availability / procurement status',
      'confirm whether manufacturing has started',
      'share any risk that may affect committed delivery'
    ]
  },
  MTO_50: {
    label: 'MTO 50% Manufacturing Progress Check',
    subject: 'MTO manufacturing progress update required',
    intro: 'This is the 50% MTO follow-up for manufacturing progress confirmation.',
    ask: [
      'share current manufacturing progress percentage',
      'confirm whether production is on schedule',
      'highlight any dependency or expected delay'
    ]
  },
  MTO_75: {
    label: 'MTO 75% Production / QC Readiness Check',
    subject: 'MTO production and QC readiness update required',
    intro: 'This is the 75% MTO follow-up for production completion and QC readiness.',
    ask: [
      'confirm production completion status',
      'confirm QC / inspection readiness',
      'share expected packing and dispatch plan'
    ]
  },
  MTO_90: {
    label: 'MTO 90% Packing / Dispatch Readiness Check',
    subject: 'MTO packing and dispatch readiness confirmation required',
    intro: 'This is the 90% MTO follow-up to confirm packing and dispatch readiness.',
    ask: [
      'confirm packing status',
      'confirm dispatch readiness and logistics planning',
      'share expected dispatch date and documents timeline'
    ]
  },
  MTO_95: {
    label: 'MTO 95% Next-Day Delivery Confirmation',
    subject: 'Urgent MTO next-day delivery confirmation required',
    intro: 'This is the 95% MTO follow-up. Please confirm next-day delivery commitment on priority.',
    ask: [
      'confirm dispatch / delivery commitment',
      'share final inspection / QC closure status',
      'share transport details if available'
    ]
  },
  MTO_100: {
    label: 'MTO 100% Delivery-Day Status',
    subject: 'MTO delivery-day status confirmation required',
    intro: 'This is the 100% MTO follow-up for delivery-day status confirmation.',
    ask: [
      'confirm whether material has been dispatched or delivered',
      'share material movement status and ETA',
      'share invoice / LR / packing list if available'
    ]
  },
  MTO_DELAY: {
    label: 'MTO Delay Escalation',
    subject: 'MTO delayed PO - revised delivery plan required',
    intro: 'The MTO PO is delayed. Please share a revised production and delivery plan immediately.',
    ask: [
      'reason for delay',
      'current production / QC / packing status',
      'revised estimated delivery date',
      'corrective action plan to avoid further delay'
    ]
  },
  UNKNOWN_50: {
    label: 'General 50% Readiness Check',
    subject: 'PO readiness update required',
    intro: 'This is the 50% follow-up for the below purchase order.',
    ask: [
      'confirm current readiness status',
      'confirm expected dispatch timeline',
      'share any delivery risk, if any'
    ]
  },
  UNKNOWN_75: {
    label: 'General 75% Dispatch Check',
    subject: 'PO dispatch update required',
    intro: 'This is the 75% follow-up to confirm dispatch planning.',
    ask: [
      'confirm dispatch schedule',
      'share transport planning status',
      'confirm expected delivery date'
    ]
  },
  UNKNOWN_100: {
    label: 'General 100% Delivery Status',
    subject: 'PO delivery status confirmation required',
    intro: 'This is the 100% follow-up for delivery-day status confirmation.',
    ask: [
      'confirm dispatch / delivery status',
      'share ETA and transport details',
      'share pending documents, if any'
    ]
  },
  UNKNOWN_DELAY: {
    label: 'General Delay Follow-up',
    subject: 'Delayed PO - revised delivery date required',
    intro: 'The PO is delayed. Please share revised delivery details immediately.',
    ask: [
      'reason for delay',
      'revised estimated delivery date',
      'current material / dispatch status'
    ]
  },
  SCHEDULED: {
    label: 'Scheduled Follow-up',
    subject: 'Scheduled PO follow-up update required',
    intro: 'This is the scheduled follow-up based on the previous vendor update.',
    ask: [
      'share the latest status as committed in the previous update',
      'confirm whether the next delivery milestone is on track',
      'share revised timeline if there is any change'
    ]
  },
  DAILY_DELAY: {
    label: 'Daily Delay Follow-up',
    subject: 'Daily delayed PO follow-up - update required',
    intro: 'This is the daily delay follow-up. Please provide today\'s latest update.',
    ask: [
      'today\'s current status',
      'reason if the delay is still continuing',
      'revised estimated delivery date / ETA',
      'action being taken to close the delay'
    ]
  },
  DEFAULT: {
    label: 'General Vendor Follow-up',
    subject: 'Vendor follow-up update required',
    intro: 'This is a follow-up for the below purchase order.',
    ask: [
      'share current PO status',
      'confirm dispatch / delivery timeline',
      'highlight any pending issue'
    ]
  }
};

function getFollowupStageBucket(card = {}, po = {}) {
  const material = normalizeMaterialType(card?.material_type || po?.materialType || 'Unknown');
  const stageKey = normalizeKey(card?.followup_key || card?.followup_stage || '');
  const typeKey = normalizeKey(card?.followup_type || '');
  const activityKey = normalizeKey(card?.followup_activity || '');
  if (typeKey.includes('SCHEDULED')) return 'SCHEDULED';
  if (typeKey.includes('DAILY DELAY') || stageKey.includes('DELAY') || activityKey.includes('DELAY')) return 'DAILY_DELAY';
  const percentMatch = stageKey.match(/(^|[^0-9])(25|50|75|90|95|100)(%|[^0-9]|$)/);
  if (percentMatch) return `${material}_${percentMatch[2]}`;
  return `${material}_FOLLOWUP`;
}

function getFollowupTemplateDefinition(card = {}, po = {}) {
  const bucket = getFollowupStageBucket(card, po);
  const material = normalizeMaterialType(card?.material_type || po?.materialType || 'Unknown');
  if (FOLLOWUP_MAIL_TEMPLATES[bucket]) return { key: bucket, ...FOLLOWUP_MAIL_TEMPLATES[bucket] };
  const fallbackDelayKey = `${material}_DELAY`;
  if (normalizeKey(card?.followup_stage || card?.followup_activity || '').includes('DELAY') && FOLLOWUP_MAIL_TEMPLATES[fallbackDelayKey]) {
    return { key: fallbackDelayKey, ...FOLLOWUP_MAIL_TEMPLATES[fallbackDelayKey] };
  }
  const defaultKey = material === 'RTO' ? 'UNKNOWN_50' : material === 'MTO' ? 'MTO_50' : 'DEFAULT';
  return { key: defaultKey, ...FOLLOWUP_MAIL_TEMPLATES[defaultKey] };
}

function getFollowupTemplateKey(card, po) {
  return getFollowupTemplateDefinition(card, po).key;
}

function buildFollowupMailTemplate(card, po) {
  const poNumber = cleanText(card?.po_number || po?.poNumber || '');
  const vendorName = cleanText(card?.vendor_name || po?.vendorName || 'Vendor');
  const materialType = normalizeMaterialType(card?.material_type || po?.materialType || 'Unknown');
  const stage = cleanText(card?.followup_stage || 'Vendor Follow-up');
  const activity = cleanText(card?.followup_activity || 'Please confirm current PO status and delivery timeline.');
  const communication = cleanText(card?.communication_method || 'Email');
  const poDate = formatDate(po?.poDate || card?.po_date || '');
  const deliveryDate = formatDate(po?.deliveryDate || card?.po_delivery_date || '');
  const followupDue = formatDate(card?.due_date || '');
  const edd = formatDate(po?.edd || card?.edd || '');
  const template = getFollowupTemplateDefinition(card, po);
  const subject = `${template.subject}: PO ${poNumber}${stage ? ` - ${stage}` : ''}`;
  const askLines = (template.ask || []).map(item => `- ${item}`);
  const body = [
    `Dear ${vendorName},`,
    '',
    template.intro,
    '',
    'PO Details:',
    `- PO Number: ${poNumber}`,
    `- Material Type: ${materialType}`,
    `- Follow-up Stage: ${stage}`,
    `- Required Action: ${activity}`,
    `- Communication Method: ${communication}`,
    `- PO Date: ${poDate}`,
    `- Delivery Date: ${deliveryDate}`,
    `- Follow-up Due Date: ${followupDue}`,
    edd !== '—' ? `- Current EDD: ${edd}` : '',
    '',
    'Please confirm the following:',
    ...askLines,
    '',
    'Kindly reply on priority with the latest update.',
    '',
    'Regards,',
    'Stack n Stock Procurement Team'
  ].filter(line => line !== '').join('\n');
  return { subject, body, templateKey: template.key };
}

function getVendorContactByName(vendorName) {
  const wanted = normalizeKey(vendorName);
  if (!wanted) return {};
  const direct = state.vendorContacts?.[cleanText(vendorName)];
  if (direct) return direct;
  const matchedKey = Object.keys(state.vendorContacts || {}).find(key => normalizeKey(key) === wanted);
  return matchedKey ? state.vendorContacts[matchedKey] : {};
}

function getFollowupVendorEmail(card, po) {
  const vendorName = cleanText(card?.vendor_name || po?.vendorName || '');
  const contact = getVendorContactByName(vendorName);
  return cleanText(
    card?.vendor_email
    || po?.vendorEmail
    || contact?.email
    || ''
  );
}


function openFollowupMailModal(followupId, poKey) {
  const { card, po } = getFollowupByIdOrPo(followupId, poKey);
  if (!card) {
    alert("Follow-up card not found. Refresh once and try again.");
    return;
  }
  mailingFollowupContext = {
    followupId: cleanText(followupId),
    poKey,
    card,
    po,
  };
  const form = document.getElementById("followupMailForm");
  if (!form) return;
  form.reset();
  const { subject, body, templateKey } = buildFollowupMailTemplate(card, po);
  form.elements.followupId.value = cleanText(followupId);
  form.elements.poKey.value = cleanText(poKey || card.poKey || card.po_number);
  form.elements.templateKey.value = templateKey;
  form.elements.to.value = getFollowupVendorEmail(card, po);
  form.elements.cc.value = '';
  const fromInput = form.elements.namedItem('from');
  if (fromInput) fromInput.value = followupMailConfig.fromEmail;
  form.elements.queuedBy.value = '';
  form.elements.queuedBy.placeholder = 'Enter sender name';
  form.elements.subject.value = subject;
  form.elements.body.value = body;
  document.getElementById('followupMailTitle').textContent = `Send Mail - ${card.po_number || poKey}`;
  document.getElementById('followupMailSubtext').textContent = `${card.vendor_name || po?.vendorName || 'Vendor'} • ${card.followup_stage || 'Follow-up'}`;
  document.getElementById('followupMailStage').textContent = card.followup_stage || 'Follow-up';
  document.getElementById('followupMailAction').textContent = card.followup_activity || 'Follow up with vendor';
  document.getElementById('followupMailTemplate').textContent = templateKey;
  document.getElementById('followupMailDelivery').textContent = formatDate(po?.deliveryDate || card.po_delivery_date || '');
  const webhookStatusInput = document.getElementById('followupMailWebhookStatus');
  if (webhookStatusInput) webhookStatusInput.value = followupMailConfig.webhookEnabled ? 'Webhook enabled' : 'Webhook disabled';
  document.getElementById('followupMailBackdrop')?.classList.remove('hidden');
}

function closeFollowupMailModal() {
  document.getElementById("followupMailBackdrop")?.classList.add("hidden");
  mailingFollowupContext = null;
}


function applyFollowupMailQueuedLocally(followupRow, queuePayload) {
  const id = cleanText(followupRow.id);
  const poNumber = cleanText(followupRow.po_number || queuePayload.po_number);
  const stage = cleanText(followupRow.followup_stage || queuePayload.followup_stage);
  const updated = { ...followupRow, email_status: 'Pending', latestUpdate: `Mail queued from ${queuePayload.from_email || followupMailConfig.fromEmail} for Zoho Flow.` };
  state.followups = (state.followups || []).filter(item => {
    if (id && cleanText(item.id) === id) return false;
    if (id) return true;
    return !(
      cleanText(item.po_number) === poNumber &&
      cleanText(item.followup_stage) === stage
    );
  });
  state.followups.push(updated);
}

function buildZohoWebhookPayload(queuePayload, card = {}, po = {}) {
  return {
    id: queuePayload.id || null,
    followup_id: queuePayload.followup_id || null,
    po_number: queuePayload.po_number,
    vendor_name: queuePayload.vendor_name,
    to_email: queuePayload.vendor_email,
    cc_email: queuePayload.cc_email || '',
    from_email: queuePayload.from_email || followupMailConfig.fromEmail,
    subject: queuePayload.subject,
    body: queuePayload.body,
    material_type: queuePayload.material_type,
    followup_stage: queuePayload.followup_stage,
    template_key: queuePayload.template_key,
    queued_by: queuePayload.queued_by || queuePayload.created_by || '',
    delivery_date: po?.deliveryDate || card?.po_delivery_date || '',
    due_date: card?.due_date || '',
    edd: po?.edd || card?.edd || ''
  };
}

async function triggerZohoFollowupWebhook(queuePayload, card = {}, po = {}) {
  if (!followupMailConfig.webhookEnabled) return { skipped: true };
  const url = followupMailConfig.webhookUrl;
  if (!url) return { skipped: true };
  const payload = buildZohoWebhookPayload(queuePayload, card, po);
  const response = await fetch(url, {
    method: 'POST',
    headers: followupMailConfig.webhookMode === 'text'
      ? { 'Content-Type': 'text/plain' }
      : { 'Content-Type': 'application/json' },
    body: followupMailConfig.webhookMode === 'text' ? JSON.stringify(payload) : JSON.stringify(payload)
  });
  const responseText = await response.text().catch(() => '');
  if (!response.ok) {
    throw new Error(`Zoho webhook failed (${response.status}): ${responseText || response.statusText}`);
  }
  return { ok: true, status: response.status, responseText };
}

async function insertVendorEmailQueueRow(queuePayload) {
  const first = await supabaseClient.from('vendor_email_queue').insert(queuePayload).select('*').single();
  if (!first.error) return first.data;
  const message = String(first.error.message || '');
  const optionalColumns = ['from_email', 'webhook_status', 'webhook_response', 'webhook_last_attempt_at', 'queued_by'];
  if (!optionalColumns.some(column => message.includes(column))) throw first.error;
  const fallbackPayload = { ...queuePayload };
  optionalColumns.forEach(column => delete fallbackPayload[column]);
  const second = await supabaseClient.from('vendor_email_queue').insert(fallbackPayload).select('*').single();
  if (second.error) throw second.error;
  return second.data;
}


async function queueFollowupMail(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent || "Queue Mail";
  const context =
    mailingFollowupContext ||
    getFollowupByIdOrPo(
      form.elements.followupId.value,
      form.elements.poKey.value,
    );
  const card = context.card;
  const po = context.po;
  if (!card) {
    alert("Follow-up card not found. Refresh once and try again.");
    return;
  }
  if (!useSupabase) {
    alert(
      "Mail queue requires Supabase because Zoho Flow reads vendor_email_queue.",
    );
    return;
  }
  const to = cleanText(form.elements.to.value);
  const cc = cleanText(form.elements.cc.value);
  const fromEmail = cleanText(form.elements.namedItem('from')?.value || followupMailConfig.fromEmail) || followupMailConfig.fromEmail;
  const queuedBy = cleanText(form.elements.queuedBy.value);
  const subject = cleanText(form.elements.subject.value);
  const body = cleanText(form.elements.body.value);
  const templateKey = cleanText(
    form.elements.templateKey.value || getFollowupTemplateKey(card, po),
  );
  if (!to) {
    alert('Vendor email is required before queueing mail. Add it in Vendor Details or enter it manually.');
    return;
  }
  if (!queuedBy) {
    alert('Enter the sender name in Queued by. From email will remain sourcing@stacknstock.in.');
    return;
  }
  if (!subject) {
    alert("Email subject is required.");
    return;
  }
  if (!body) {
    alert("Email body is required.");
    return;
  }
  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = followupMailConfig.webhookEnabled ? 'Queueing + Webhook...' : 'Queueing...';
    }
    const persisted = await ensureFollowupPersisted(card);
    const followupId = cleanText(persisted.id);
    const poNumber = cleanText(persisted.po_number || card.po_number);
    const vendorName = cleanText(
      persisted.vendor_name ||
        card.vendor_name ||
        po?.vendorName ||
        "Unknown Vendor",
    );
    const materialType = normalizeMaterialType(
      persisted.material_type ||
        card.material_type ||
        po?.materialType ||
        "Unknown",
    );
    const followupStage = cleanText(
      persisted.followup_stage || card.followup_stage || "Follow-up",
    );
    const queuePayload = {
      followup_id: followupId || null,
      po_number: poNumber,
      vendor_name: vendorName,
      vendor_email: to,
      cc_email: cc || null,
      from_email: fromEmail,
      subject,
      body,
      material_type: materialType,
      followup_stage: followupStage,
      template_key: templateKey,
      status: 'Pending',
      webhook_status: followupMailConfig.webhookEnabled ? 'Pending' : 'Disabled',
      webhook_response: null,
      webhook_last_attempt_at: followupMailConfig.webhookEnabled ? new Date().toISOString() : null,
      queued_by: queuedBy,
      created_by: queuedBy || null
    };
    const insertedQueue = await insertVendorEmailQueueRow(queuePayload);
    let webhookTriggered = false;
    let webhookResponseText = '';
    if (followupMailConfig.webhookEnabled) {
      try {
        const webhookResult = await triggerZohoFollowupWebhook({ ...queuePayload, id: insertedQueue?.id }, card, po);
        webhookTriggered = Boolean(webhookResult?.ok);
        webhookResponseText = webhookResult?.responseText || '';
        await supabaseClient
          .from('vendor_email_queue')
          .update({ webhook_status: 'Triggered', webhook_response: webhookResponseText || null, webhook_last_attempt_at: new Date().toISOString() })
          .eq('id', insertedQueue.id);
      } catch (webhookError) {
        await supabaseClient
          .from('vendor_email_queue')
          .update({ webhook_status: 'Failed', webhook_response: String(webhookError?.message || webhookError), webhook_last_attempt_at: new Date().toISOString() })
          .eq('id', insertedQueue.id);
        throw webhookError;
      }
    }
    const { error: followupError } = await supabaseClient.from('po_followups').update({ email_status: 'Pending', updated_at: new Date().toISOString() }).eq('id', followupId);
    if (followupError) throw followupError;
    const logPayload = { followup_id: followupId || null, po_number: poNumber, action_type: 'Email Queued', update_received: `Mail queued to ${to}${webhookTriggered ? ' and Zoho webhook triggered' : ''}`, done_by: queuedBy || null, communication_method: 'Email', notes: subject };
    const { error: logError } = await supabaseClient.from('po_followup_logs').insert(logPayload);
    if (logError) throw logError;
    await insertPoActivityEvent({ po_number: poNumber, event_type: 'email_queued', event_title: webhookTriggered ? 'Follow-up Email Webhook Triggered' : 'Follow-up Email Queued', event_description: `${followupStage} email queued to ${to}${webhookTriggered ? ' and sent to Zoho Flow webhook' : ''}.`, actor: queuedBy || '', metadata: { followup_id: followupId, followup_stage: followupStage, vendor_email: to, cc_email: cc, from_email: fromEmail, template_key: templateKey, webhook_enabled: followupMailConfig.webhookEnabled, webhook_triggered: webhookTriggered } });
    applyFollowupMailQueuedLocally({ ...persisted, ...card }, queuePayload);
    if (useSupabase) await loadRemoteStateFromSupabase();
    closeFollowupMailModal();
    renderAll();
    alert(followupMailConfig.webhookEnabled ? 'Mail queued and Zoho Flow webhook triggered.' : 'Mail queued. Zoho Flow will send it from vendor_email_queue.');
  } catch (error) {
    console.error("Queue follow-up mail failed", error);
    alert(`Queue mail failed: ${error.message || error}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

function setSelectOptions(
  id,
  options,
  selectedValue,
  placeholderLabel = "All",
) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = "";
  options.forEach((option) => {
    const opt = document.createElement("option");
    if (typeof option === "string") {
      opt.value = option;
      opt.textContent = option;
    } else {
      opt.value = option.value;
      opt.textContent = option.label;
    }
    if (opt.value === selectedValue) opt.selected = true;
    el.appendChild(opt);
  });
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function daysBetween(start, end) {
  const dayMs = 24 * 60 * 60 * 1000;
  const a = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const b = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((b - a) / dayMs);
}

function compactMoney(value) {
  const amount = number(value);
  const abs = Math.abs(amount);
  if (abs >= 10000000) return `Rs\u00a0${(amount / 10000000).toFixed(2)}\u00a0Cr`;
  if (abs >= 100000) return `Rs\u00a0${(amount / 100000).toFixed(2)}\u00a0L`;
  if (abs >= 1000) return `Rs\u00a0${(amount / 1000).toFixed(1)}\u00a0K`;
  return money(amount);
}

function activePOs(pos) {
  return pos.filter((po) => {
    const status = normalizeKey(po.poStatus);
    return status !== "CLOSED" && status !== "CANCELLED";
  });
}

function getDeliveryDate(po) {
  return parseDateOnly(po?.deliveryDate);
}

function upcomingPOs(pos) {
  const today = todayDateOnly();
  const limit = addDays(today, 7);
  return pos
    .filter((po) => {
      if (displayDeliveryStatus(po) === "Delivered") return false;
      const due = getDeliveryDate(po);
      return due && due >= today && due <= limit;
    })
    .sort((a, b) => getDeliveryDate(a) - getDeliveryDate(b));
}

function delayedPOs(pos) {
  return pos
    .filter((po) => isPoDelayed(po))
    .sort((a, b) => getDelayDays(b) - getDelayDays(a));
}

function getDelayDays(po) {
  const due = getDeliveryDate(po);
  if (!due) return 0;
  return Math.max(0, daysBetween(due, todayDateOnly()));
}

function getDelaySeverity(delayDays) {
  if (delayDays > 7) return "Overdue";
  if (delayDays >= 3) return "At Risk";
  return "Monitor";
}

function getDaysLeftLabel(po) {
  const due = getDeliveryDate(po);
  if (!due) return "No date";
  const days = daysBetween(todayDateOnly(), due);
  if (days < 0) return `${Math.abs(days)}d late`;
  if (days === 0) return "Today";
  if (days === 1) return "1 Day";
  return `${days} Days`;
}

function daysLeftClass(po) {
  const due = getDeliveryDate(po);
  if (!due) return "neutral";
  const days = daysBetween(todayDateOnly(), due);
  if (days <= 1) return "danger";
  if (days <= 3) return "warning";
  if (days <= 7) return "notice";
  return "good";
}

function pendingApprovalPOs(pos) {
  return activePOs(pos)
    .filter((po) => normalizeKey(po.poStatus) === "ISSUED")
    .sort((a, b) => number(b.poTotal) - number(a.poTotal));
}

function countBy(items, getLabel) {
  return items.reduce((acc, item) => {
    const key = getLabel(item) || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function getPaymentTotals(pos) {
  return pos.reduce(
    (acc, po) => {
      const derived = derivePaymentState(
        number(po.poTotal),
        number(po.amountPaid),
        po.balanceDue,
      );
      acc.totalValue += number(po.poTotal);
      acc.totalSpent += number(derived.amountPaid);
      acc.totalOutstanding += number(derived.balanceDue);
      return acc;
    },
    { totalValue: 0, totalSpent: 0, totalOutstanding: 0 },
  );
}

function donutSummaryHtml({
  totalLabel,
  totalValue,
  items,
  valueFormatter = formatNumber,
}) {
  const colors = ["#29a34a", "#1f8edb", "#f5c400", "#f04f4f", "#8f5bd6"];
  const total = items.reduce((sum, item) => sum + number(item.value), 0) || 1;
  let cursor = 0;
  const stops = items
    .map((item, index) => {
      const start = cursor;
      const end = cursor + (number(item.value) / total) * 100;
      cursor = end;
      const color = item.color || colors[index % colors.length];
      return `${color} ${start}% ${end}%`;
    })
    .join(", ");
  const gradient = stops || "#2a2a2a 0% 100%";
  return `
    <div class="donut-chart" style="background:conic-gradient(${gradient});">
      <div>
        <strong>${escapeHtml(totalValue)}</strong>
        <span>${escapeHtml(totalLabel)}</span>
      </div>
    </div>
    <div class="donut-legend">
      ${items
        .map((item, index) => {
          const color = item.color || colors[index % colors.length];
          const percent = Math.round((number(item.value) / total) * 100);
          return `
            <div class="legend-row">
              <span class="legend-dot" style="background:${color}"></span>
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(valueFormatter(item.value))} (${percent}%)</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function paymentSummaryHtml({ totalSpent, totalValue, totalOutstanding }) {
  const safeTotal = Math.max(1, number(totalValue));
  const spentPercent = Math.round((number(totalSpent) / safeTotal) * 100);
  const outstandingPercent = Math.max(0, 100 - spentPercent);
  const gradient = `#29a34a 0% ${spentPercent}%, #f5c400 ${spentPercent}% 100%`;

  return `
    <div class="payment-donut-wrap">
      <div class="donut-chart payment-spend-chart" style="background:conic-gradient(${gradient});">
        <div>
          <strong>${escapeHtml(compactMoney(totalSpent))}</strong>
          <span>Total Spent</span>
        </div>
      </div>
      <div class="payment-clearance">${escapeHtml(formatNumber(spentPercent))}% cleared</div>
    </div>
    <div class="payment-breakdown">
      <div class="payment-breakdown-row primary">
        <span><i style="background:#29a34a"></i>Total spent</span>
        <strong>${escapeHtml(compactMoney(totalSpent))}</strong>
      </div>
      <div class="payment-breakdown-row">
        <span><i style="background:#f5c400"></i>Total PO value</span>
        <strong>${escapeHtml(compactMoney(totalValue))}</strong>
      </div>
      <div class="payment-breakdown-row muted">
        <span><i style="background:rgba(255,255,255,.32)"></i>Balance due</span>
        <strong>${escapeHtml(compactMoney(totalOutstanding))}<small>${escapeHtml(formatNumber(outstandingPercent))}%</small></strong>
      </div>
    </div>
  `;
}

function kpiIconSvg(icon) {
  const icons = {
    file: `
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <path d="M14 2v6h6"></path>
      <path d="M8 13h8"></path>
      <path d="M8 17h6"></path>
    `,
    truck: `
      <path d="M10 17h4V5H2v12h3"></path>
      <path d="M14 8h4l4 4v5h-3"></path>
      <circle cx="7" cy="17" r="2"></circle>
      <circle cx="17" cy="17" r="2"></circle>
    `,
    alert: `
      <path d="m21.7 18-8.9-15a1 1 0 0 0-1.7 0L2.3 18a1 1 0 0 0 .9 1.5h17.6a1 1 0 0 0 .9-1.5z"></path>
      <path d="M12 8v5"></path>
      <path d="M12 17h.01"></path>
    `,
    shield: `
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9 12 2 2 4-5"></path>
    `,
    wallet: `
      <path d="M19 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 12h4"></path>
      <path d="M10 12c2 0 2-4 0-4H8"></path>
      <path d="M8 8h5"></path>
      <path d="M8 10h5"></path>
    `,
  };
  return `
    <svg class="kpi-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${icons[icon] || icons.file}
    </svg>
  `;
}

function overviewTableHtml(headers, rows, emptyText) {
  if (!rows.length)
    return `<div class="empty-state">${escapeHtml(emptyText)}</div>`;
  return `
    <table>
      <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows
          .map(
            (row) =>
              `<tr>${row
                .map((cell) =>
                  String(cell).startsWith("<")
                    ? `<td>${cell}</td>`
                    : `<td>${escapeHtml(cell)}</td>`,
                )
                .join("")}</tr>`,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderCommandKpis({ pos }) {
  const active = activePOs(pos);
  const upcoming = upcomingPOs(pos);
  const delayed = delayedPOs(pos);
  const approvals = pendingApprovalPOs(pos);
  const paymentTotals = getPaymentTotals(pos);
  const cards = [
    {
      label: "Total Active POs",
      value: formatNumber(active.length),
      note: `${pos.length} total purchase orders`,
      tone: "blue",
      icon: "file",
    },
    {
      label: "Upcoming Deliveries",
      value: formatNumber(upcoming.length),
      note: "Due within 7 days",
      tone: "green",
      icon: "truck",
    },
    {
      label: "Delayed POs",
      value: formatNumber(delayed.length),
      note: "Need follow-up attention",
      tone: "red",
      icon: "alert",
    },
    {
      label: "Pending Approvals",
      value: formatNumber(approvals.length),
      note: "Issued POs awaiting closure",
      tone: "purple",
      icon: "shield",
    },
    {
      label: "Total Spent",
      value: compactMoney(paymentTotals.totalSpent),
      note: "Paid across purchase orders",
      tone: "green",
      icon: "wallet",
    },
  ];
  document.getElementById("kpiGrid").innerHTML = cards
    .map(
      (card) => {
        const valueText = String(card.value || "");
        const valueClass = valueText.length > 7 ? " kpi-value-compact" : "";
        return `
    <article class="kpi-card kpi-${escapeHtml(card.tone)}">
      <div class="kpi-icon">${kpiIconSvg(card.icon)}</div>
      <div class="kpi-content">
        <div class="kpi-label">
          <span title="${escapeHtml(card.label)}">${escapeHtml(card.label)}</span>
        </div>
        <div class="kpi-value${valueClass}">${escapeHtml(card.value)}</div>
        <div class="kpi-note">${escapeHtml(card.note)}</div>
      </div>
    </article>
  `;
      },
    )
    .join("");
}

function renderCommandOverview({ pos, vendors }) {
  const maxSpend =
    Math.max(...vendors.map((vendor) => vendor.totalSpend), 0) || 1;
  const totalVendorSpend = vendors.reduce(
    (sum, vendor) => sum + number(vendor.totalSpend),
    0,
  );
  const topVendors = sortData(vendors, "totalSpend-desc").slice(0, 5);

  document.getElementById("vendorSpendBars").innerHTML =
    topVendors
      .map(
        (vendor) => `
    <div class="bar-row">
      <div class="bar-label">
        <span>${escapeHtml(vendor.vendorName)}</span>
        <span>${compactMoney(vendor.totalSpend)}</span>
        <span>${Math.round((number(vendor.totalSpend) / (totalVendorSpend || 1)) * 100)}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.max((vendor.totalSpend / maxSpend) * 100, 3)}%"></div>
      </div>
    </div>
  `,
      )
      .join("") || `<div class="empty-state">No vendor spend data.</div>`;

  const poStatusCounts = countBy(pos, (po) => {
    if (isPoDelayed(po)) return "Delayed";
    const status = normalizeKey(po.poStatus);
    if (status === "CLOSED") return "Closed";
    if (status === "BILLED") return "Confirmed";
    if (status === "ISSUED") return "In Progress";
    return cleanText(po.poStatus) || "Pending";
  });
  const poStatusItems = [
    ["Confirmed", "#29a34a"],
    ["In Progress", "#1f8edb"],
    ["Pending", "#f5c400"],
    ["Delayed", "#f04f4f"],
    ["Closed", "#8f5bd6"],
  ]
    .map(([label, color]) => ({
      label,
      color,
      value: poStatusCounts[label] || 0,
    }))
    .filter((item) => item.value > 0);
  document.getElementById("poStatusSummary").innerHTML = donutSummaryHtml({
    totalLabel: "Total POs",
    totalValue: formatNumber(pos.length),
    items: poStatusItems,
  });

  const paymentTotals = getPaymentTotals(pos);
  document.getElementById("paymentSummary").innerHTML =
    paymentSummaryHtml(paymentTotals);

  const upcoming = upcomingPOs(pos).slice(0, 5);
  document.getElementById("upcomingDeliveries").innerHTML = overviewTableHtml(
    ["PO Number", "Vendor", "Item / Description", "Due Date", "Days Left"],
    upcoming.map((po) => [
      po.poNumber,
      po.vendorName,
      po.groupedItems?.[0]?.itemDesc || po.items?.[0]?.itemDesc || "Material",
      formatDate(po.deliveryDate),
      `<span class="days-pill ${daysLeftClass(po)}">${escapeHtml(getDaysLeftLabel(po))}</span>`,
    ]),
    "No deliveries due in the next 7 days.",
  );

  const delayed = delayedPOs(pos).slice(0, 5);
  document.getElementById("delayedPOs").innerHTML = overviewTableHtml(
    ["PO Number", "Vendor", "Delay Days", "Status"],
    delayed.map((po) => {
      const delayDays = getDelayDays(po);
      const severity = getDelaySeverity(delayDays);
      return [
        po.poNumber,
        po.vendorName,
        formatNumber(delayDays),
        `<span class="risk-pill ${normalizeKey(severity).toLowerCase()}">${escapeHtml(severity)}</span>`,
      ];
    }),
    "No delayed purchase orders.",
  );

  const approvals = pendingApprovalPOs(pos).slice(0, 5);
  document.getElementById("pendingApprovals").innerHTML = overviewTableHtml(
    ["PO Number", "Requested By", "Amount"],
    approvals.map((po) => [po.poNumber, po.vendorName, compactMoney(po.poTotal)]),
    "No pending approval-style POs.",
  );

  renderRecentActivity(pos);
  renderQuickInsights(pos, vendors);
}

function renderRecentActivity(pos) {
  const activities = [];
  delayedPOs(pos)
    .slice(0, 2)
    .forEach((po) =>
      activities.push({
        tone: "red",
        title: `${po.poNumber} marked as Delayed`,
        meta: po.vendorName,
        time: `${getDelayDays(po)} days late`,
      }),
    );
  sortData(pos, "poDate-desc")
    .slice(0, 3)
    .forEach((po) =>
      activities.push({
        tone: paymentProgressStatus(po) === "Paid" ? "green" : "blue",
        title:
          paymentProgressStatus(po) === "Paid"
            ? `${po.poNumber} payment completed`
            : `Invoice received for ${po.poNumber}`,
        meta: po.vendorName,
        time: formatDate(po.poDate),
      }),
    );
  (state.followups || [])
    .slice(0, 2)
    .forEach((row) =>
      activities.push({
        tone: "purple",
        title: "Follow-up reminder sent",
        meta: `${row.vendor_name || row.vendorName || "Vendor"} (${row.po_number || row.poNumber || "PO"})`,
        time: row.due_date ? formatDate(row.due_date) : "Follow-up",
      }),
    );

  document.getElementById("recentActivity").innerHTML = activities.length
    ? activities
        .slice(0, 4)
        .map(
          (activity) => `
        <div class="activity-card">
          <span class="activity-icon ${escapeHtml(activity.tone)}">${escapeHtml(activity.title.slice(0, 1))}</span>
          <div>
            <strong>${escapeHtml(activity.title)}</strong>
            <small>${escapeHtml(activity.meta)}</small>
            <span>${escapeHtml(activity.time)}</span>
          </div>
        </div>
      `,
        )
        .join("")
    : '<div class="empty-state">No recent activity yet.</div>';
}

function renderQuickInsights(pos, vendors) {
  const datedLeadTimes = pos
    .map((po) => {
      const start = parseDateOnly(po.poDate);
      const end = getDeliveryDate(po);
      return start && end ? Math.max(0, daysBetween(start, end)) : null;
    })
    .filter((value) => value !== null);
  const avgLeadTime = datedLeadTimes.length
    ? datedLeadTimes.reduce((sum, value) => sum + value, 0) /
      datedLeadTimes.length
    : 0;
  const onTimeRate = pos.length
    ? Math.round(((pos.length - delayedPOs(pos).length) / pos.length) * 100)
    : 0;
  const delayVendorCounts = countBy(delayedPOs(pos), (po) => po.vendorName);
  const mostDelayedVendor =
    Object.entries(delayVendorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "None";
  const activeValue = activePOs(pos).reduce(
    (sum, po) => sum + number(po.poTotal),
    0,
  );
  const insights = [
    ["Average Lead Time", `${avgLeadTime.toFixed(1)} Days`],
    ["On-Time Delivery Rate", `${onTimeRate}%`],
    ["Most Delayed Vendor", mostDelayedVendor],
    ["Total Vendors", formatNumber(vendors.length)],
    ["Active POs Value", compactMoney(activeValue)],
  ];
  document.getElementById("quickInsights").innerHTML = insights
    .map(
      ([label, value]) => `
      <div class="insight-row">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `,
    )
    .join("");
}

function renderKpis({ pos, vendors, products, rows }) {
  const totalPOValue = pos.reduce((sum, po) => sum + number(po.poTotal), 0);
  const openPaymentValue = pos.reduce((sum, po) => {
    const derived = derivePaymentState(
      number(po.poTotal),
      number(po.amountPaid),
      po.balanceDue,
    );
    return sum + Math.max(0, number(derived.balanceDue));
  }, 0);
  const deliveredCount = pos.filter(
    (po) => po.deliveryStatus === "Delivered",
  ).length;
  const partialPaymentCount = pos.filter(
    (po) => paymentProgressStatus(po) === "Partially Paid",
  ).length;
  const cards = [
    {
      label: "Total PO Value",
      value: money(totalPOValue),
      note: `${pos.length} purchase orders`,
    },
    {
      label: "Open Payment Value",
      value: money(openPaymentValue),
      note: "Calculated from balance due",
    },
    {
      label: "Delivered POs",
      value: formatNumber(deliveredCount),
      note: "Delivered at PO level",
    },
    {
      label: "Partially Paid POs",
      value: formatNumber(partialPaymentCount),
      note: "Need payment follow-up",
    },
    {
      label: "Line Items in History",
      value: formatNumber(rows.length),
      note: `${products.length} products · ${vendors.length} vendors`,
    },
  ];
  document.getElementById("kpiGrid").innerHTML = cards
    .map(
      (card) => `
    <article class="kpi-card">
      <div class="kpi-label">${escapeHtml(card.label)}</div>
      <div class="kpi-value">${escapeHtml(card.value)}</div>
      <div class="kpi-note">${escapeHtml(card.note)}</div>
    </article>
  `,
    )
    .join("");
}

function renderOverview({ pos, vendors }) {
  const recent = sortData(pos, "poDate-desc").slice(0, 6);
  document.getElementById("recentPOs").innerHTML = recent.length
    ? recent
        .map(
          (po) => `
    <div class="mini-card">
      <h4>
        <span>${escapeHtml(po.poNumber)}</span>
        <span class="badge ${badgeClass(po.paymentStatus)}">${escapeHtml(po.paymentStatus)}</span>
      </h4>
      <div class="meta-row">
        <span>${escapeHtml(po.vendorName)}</span>
        <span>${formatDate(po.poDate)}</span>
        <span>${po.productCount || po.itemCount} products</span>
        <span>${money(po.poTotal)}</span>
      </div>
      <div class="inline-actions">
        <button class="text-link" data-action="view-products" data-po="${escapeHtml(po.poKey)}">${po.itemCount} Products</button>
        <button class="ghost-btn small-btn" data-action="status-timeline" data-po="${escapeHtml(po.poKey)}">Status</button>
        <button class="ghost-btn small-btn" data-action="edit-po" data-po="${escapeHtml(po.poKey)}">Edit PO</button>
      </div>
    </div>
  `,
        )
        .join("")
    : `<div class="empty-state">No purchase orders available.</div>`;

  const maxSpend =
    Math.max(...vendors.map((vendor) => vendor.totalSpend), 0) || 1;
  document.getElementById("vendorSpendBars").innerHTML =
    sortData(vendors, "totalSpend-desc")
      .slice(0, 7)
      .map(
        (vendor) => `
    <div class="bar-row">
      <div class="bar-label">
        <span>${escapeHtml(vendor.vendorName)}</span>
        <span>${money(vendor.totalSpend)}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.max((vendor.totalSpend / maxSpend) * 100, 3)}%"></div>
      </div>
    </div>
  `,
      )
      .join("") || `<div class="empty-state">No vendor spend data.</div>`;
}

function statusDisplayValue(item, field) {
  if (field === "deliveryStatus") return displayDeliveryStatus(item);
  return item?.[field] || "Unknown";
}

function renderStatusMix(pos, mountId, field) {
  const counts = pos.reduce((acc, po) => {
    const key = statusDisplayValue(po, field) || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const html =
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([label, count]) => `
    <div class="status-card">
      <div class="badge ${badgeClass(label)}">${escapeHtml(label)}</div>
      <strong>${formatNumber(count)}</strong>
    </div>
  `,
      )
      .join("") || '<div class="empty-state">No data.</div>';
  document.getElementById(mountId).innerHTML = html;
}

function getPoByKeyOrNumber(poKey) {
  const derived = buildDerived();
  return (
    derived.pos.find((po) => po.poKey === poKey || po.poNumber === poKey) ||
    null
  );
}

function normalizeTimelineDate(value) {
  if (!value) return null;
  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;
  const parsed = parseDateOnly(value);
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;
}

function timelineDateLabel(value) {
  const date = normalizeTimelineDate(value);
  if (!date) return "Date not available";
  const hasTime = String(value || "").includes("T");
  const dateText = formatDate(dateToIso(date));
  if (!hasTime) return dateText;
  return `${dateText} • ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function getTimelineIcon(type = "") {
  const key = normalizeKey(type);
  if (key.includes("COMPLETE")) return "✓";
  if (key.includes("EMAIL")) return "✉";
  if (key.includes("CALL")) return "☎";
  if (key.includes("EDD") || key.includes("DELIVERY")) return "↗";
  if (key.includes("PAYMENT")) return "₹";
  if (key.includes("QUEUE") || key.includes("SYNC")) return "↻";
  if (key.includes("FOLLOWUP") || key.includes("FOLLOW-UP")) return "!";
  if (key.includes("CREATE")) return "+";
  return "•";
}

function buildPoStatusTimeline(po) {
  if (!po) return [];
  const poNumber = cleanText(po.poNumber);
  const events = [];

  const addEvent = (event) => {
    if (!event || !event.title) return;
    events.push({
      date:
        event.date || event.created_at || event.createdAt || po.poDate || "",
      type: event.type || event.event_type || "status",
      title: event.title || event.event_title,
      description: event.description || event.event_description || "",
      actor: event.actor || event.actor_name || "",
      source: event.source || "Procurement Hub",
      oldValue: event.oldValue || event.old_value || "",
      newValue: event.newValue || event.new_value || "",
      metadata: event.metadata || {},
    });
  };

  addEvent({
    date: po.poDate,
    type: "po_created",
    title: "PO Created",
    description: `${po.vendorName || "Vendor"} • ${money(po.poTotal || 0)} • ${po.productCount || po.itemCount || 0} product${(po.productCount || po.itemCount || 0) === 1 ? "" : "s"}`,
    source: "Purchase Orders",
  });

  (state.activityEvents || [])
    .filter((event) => cleanText(event.po_number) === poNumber)
    .forEach((event) =>
      addEvent({
        date: event.created_at,
        type: event.event_type,
        title: event.event_title,
        description: event.event_description,
        actor: event.actor || event.actor_name,
        source: event.source,
        oldValue: event.old_value,
        newValue: event.new_value,
        metadata: event.metadata,
      }),
    );

  (state.followups || [])
    .filter(
      (row) =>
        cleanText(row.po_number) === poNumber &&
        !isAcknowledgementFollowup(row),
    )
    .forEach((row) => {
      const status = cleanText(row.status || "Pending");
      const isCompleted = normalizeKey(status).includes("COMPLETE");
      addEvent({
        date: isCompleted
          ? row.completed_at || row.updated_at || row.created_at
          : row.due_date || row.created_at,
        type: isCompleted ? "followup_completed" : "followup_generated",
        title: isCompleted ? "Follow-up Completed" : "Follow-up Generated",
        description: `${row.followup_stage || "Follow-up"}: ${row.followup_activity || "Vendor follow-up"}${row.completed_by ? ` • Done by ${row.completed_by}` : ""}`,
        actor: row.completed_by || "",
        source: "Follow-ups",
        metadata: {
          status,
          email_status: row.email_status,
          call_status: row.call_status,
        },
      });
    });

  if (po.edd) {
    addEvent({
      date: po.edd,
      type: "edd_updated",
      title: "EDD Available",
      description: `Revised Estimated Delivery Date set to ${formatDate(po.edd)}${po.delayReason ? ` • Reason: ${po.delayReason}` : ""}`,
      source: "Purchase Orders",
    });
  }

  if (po.deliveredDate) {
    addEvent({
      date: po.deliveredDate,
      type: "delivery_completed",
      title: "Delivered Date",
      description: `Material delivered on ${formatDate(po.deliveredDate)}`,
      source: "Purchase Orders",
    });
  }

  const deliveryStatusDescription =
    `${displayDeliveryStatus(po)}` +
    `${po.deliveryDate ? ` - Expected: ${formatDate(po.deliveryDate)}` : ""}` +
    `${po.deliveredDate ? ` - Delivered: ${formatDate(po.deliveredDate)}` : ""}`;

  addEvent({
    date: po.deliveredDate || po.deliveryDate || po.poDate,
    type: "delivery_status",
    title: "Current Delivery Status",
    description: `${displayDeliveryStatus(po)}${po.deliveryDate ? ` • Delivery date: ${formatDate(po.deliveryDate)}` : ""}`,
    description: deliveryStatusDescription,
    source: "Purchase Orders",
  });

  addEvent({
    date: po.poDate,
    type: "payment_status",
    title: "Current Payment Status",
    description: `${po.paymentStatus || "Pending"} • Paid: ${money(po.amountPaid || 0)} • Balance: ${money(po.balanceDue || 0)}`,
    source: "Purchase Orders",
  });

  const seen = new Set();
  return events
    .filter((event) => {
      const key = [event.type, event.title, event.description, event.date]
        .map(cleanText)
        .join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => {
      const ad = normalizeTimelineDate(a.date)?.getTime() || 0;
      const bd = normalizeTimelineDate(b.date)?.getTime() || 0;
      return ad - bd;
    });
}

function openPoStatusTimeline(poKey) {
  const po = getPoByKeyOrNumber(poKey);
  if (!po) {
    alert("PO not found. Refresh once and try again.");
    return;
  }

  const events = buildPoStatusTimeline(po);
  const title = document.getElementById("statusTimelineTitle");
  const subtext = document.getElementById("statusTimelineSubtext");
  const summary = document.getElementById("statusTimelineSummary");
  const body = document.getElementById("statusTimelineContent");
  if (!title || !subtext || !summary || !body) return;

  title.textContent = `${po.poNumber} Status Timeline`;
  subtext.textContent = `${po.vendorName || "Vendor"} • ${po.materialType || "Unknown"} • ${money(po.poTotal || 0)}`;
  summary.innerHTML = `
    <span class="timeline-summary-chip"><strong>${escapeHtml(displayDeliveryStatus(po))}</strong><small>Delivery</small></span>
    <span class="timeline-summary-chip"><strong>${escapeHtml(po.paymentStatus || "Pending")}</strong><small>Payment</small></span>
    <span class="timeline-summary-chip"><strong>${escapeHtml(po.poStatus || "Issued")}</strong><small>PO Status</small></span>
    <span class="timeline-summary-chip"><strong>${events.length}</strong><small>Events</small></span>
  `;

  body.innerHTML = events.length
    ? `
    <div class="status-timeline-list">
      ${events
        .map(
          (event) => `
        <div class="timeline-item timeline-${escapeHtml(
          normalizeKey(event.type)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-"),
        )}">
          <div class="timeline-marker">${escapeHtml(getTimelineIcon(event.type))}</div>
          <div class="timeline-card">
            <div class="timeline-card-head">
              <div>
                <h4>${escapeHtml(event.title)}</h4>
                <p>${escapeHtml(timelineDateLabel(event.date))}</p>
              </div>
              <span>${escapeHtml(event.source || "Procurement Hub")}</span>
            </div>
            ${event.description ? `<div class="timeline-desc">${escapeHtml(event.description)}</div>` : ""}
            ${event.oldValue || event.newValue ? `<div class="timeline-change"><span>Old: ${escapeHtml(event.oldValue || "—")}</span><span>New: ${escapeHtml(event.newValue || "—")}</span></div>` : ""}
            ${event.actor ? `<div class="timeline-actor">By ${escapeHtml(event.actor)}</div>` : ""}
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `
    : '<div class="empty-state">No timeline events found for this PO.</div>';

  document.getElementById("statusTimelineBackdrop")?.classList.remove("hidden");
}

function closePoStatusTimeline() {
  document.getElementById("statusTimelineBackdrop")?.classList.add("hidden");
}

function getPoSortState() {
  const [key = "", dir = "desc"] = String(state.filters.poSort || "").split("-");
  return { key, dir: dir === "asc" ? "asc" : "desc" };
}

function setPoBoardSort(key) {
  if (!PO_BOARD_SORTS[key]) return;
  const current = getPoSortState();
  const nextDir =
    current.key === key
      ? current.dir === "asc"
        ? "desc"
        : "asc"
      : PO_BOARD_SORTS[key].defaultDir;
  state.filters.poSort = `${key}-${nextDir}`;
  renderAll();
}

function updatePoSortHeaders() {
  const current = getPoSortState();
  document.querySelectorAll("[data-po-sort-key]").forEach((button) => {
    const key = button.dataset.poSortKey;
    const isActive = key === current.key;
    button.classList.toggle("active", isActive);
    button.dataset.sortDir = isActive ? current.dir : "";
    button.setAttribute(
      "aria-sort",
      isActive ? (current.dir === "asc" ? "ascending" : "descending") : "none",
    );
    const indicator = button.querySelector("span");
    if (indicator) indicator.textContent = isActive ? (current.dir === "asc" ? "^" : "v") : "-";
  });
}

function renderPoDeliveryDates(po) {
  const expectedText = formatDate(po.deliveryDate);
  const deliveredText = po.deliveredDate ? formatDate(po.deliveredDate) : "Not set";
  const deliveredLine =
    displayDeliveryStatus(po) === "Delivered"
      ? `<div class="small-text"><strong>Delivered</strong>: ${escapeHtml(deliveredText)}</div>`
      : "";
  const eddLine = isPoDelayed(po)
    ? `<div class="small-text"><strong>EDD</strong> <span class="info-icon" title="Revised Estimated Delivery Date">i</span>: ${po.edd ? formatDate(po.edd) : "Not set"}</div>`
    : "";
  return `
    <div class="small-text"><strong>Expected</strong>: ${escapeHtml(expectedText)}</div>
    ${deliveredLine}
    ${eddLine}
  `;
}

function renderPurchaseOrders({ pos }) {
  const vendors = [
    "all",
    ...new Set(pos.map((po) => po.vendorName).filter(Boolean)),
  ].sort();
  const paymentStatuses = [
    "all",
    ...new Set(pos.map((po) => paymentProgressStatus(po)).filter(Boolean)),
  ];
  const poStatuses = [
    "all",
    ...new Set(pos.map((po) => po.poStatus).filter(Boolean)),
  ];
  const baseDeliveryStatuses = [
    "Unknown",
    "In Transit",
    "Partially Delivered",
    "Delivered",
    "Delayed",
  ];
  const dynamicDeliveryStatuses = pos
    .map(displayDeliveryStatus)
    .filter(Boolean);
  const deliveryStatuses = [
    "all",
    ...baseDeliveryStatuses.filter(
      (v) =>
        dynamicDeliveryStatuses.includes(v) ||
        v === "In Transit" ||
        v === "Unknown" ||
        v === "Partially Delivered" ||
        v === "Delivered" ||
        v === "Delayed",
    ),
  ];
  const selectedDeliveryFilter = deliveryStatuses.includes(
    state.filters.poDelivery,
  )
    ? state.filters.poDelivery
    : "all";
  state.filters.poDelivery = selectedDeliveryFilter;
  if (!PO_SORTS.some((option) => option.value === state.filters.poSort)) {
    state.filters.poSort = "poDate-desc";
  }
  updatePoSortHeaders();

  setSelectOptions(
    "poVendorFilter",
    vendors.map((v) =>
      v === "all"
        ? { value: "all", label: "All Vendors" }
        : { value: v, label: v },
    ),
    state.filters.poVendor,
  );
  setSelectOptions(
    "poPaymentFilter",
    paymentStatuses.map((v) =>
      v === "all"
        ? { value: "all", label: "All Payments" }
        : { value: v, label: v },
    ),
    state.filters.poPayment,
  );
  setSelectOptions(
    "poStatusFilter",
    poStatuses.map((v) =>
      v === "all"
        ? { value: "all", label: "All PO Status" }
        : { value: v, label: v },
    ),
    state.filters.poStatus,
  );
  setSelectOptions(
    "poDeliveryFilter",
    deliveryStatuses.map((v) =>
      v === "all"
        ? { value: "all", label: "All Delivery" }
        : { value: v, label: v },
    ),
    selectedDeliveryFilter,
  );
  setSelectOptions("poSortSelect", PO_SORTS, state.filters.poSort);

  let filtered = pos.filter((po) => {
    const search = state.filters.poSearch.toLowerCase();
    if (search && !po.searchBlob.includes(search)) return false;
    if (
      state.filters.poVendor !== "all" &&
      po.vendorName !== state.filters.poVendor
    )
      return false;
    if (
      state.filters.poPayment !== "all" &&
      paymentProgressStatus(po) !== state.filters.poPayment
    )
      return false;
    if (
      state.filters.poStatus !== "all" &&
      po.poStatus !== state.filters.poStatus
    )
      return false;
    if (
      state.filters.poDelivery !== "all" &&
      displayDeliveryStatus(po) !== state.filters.poDelivery
    )
      return false;
    return true;
  });

  filtered = sortData(filtered, state.filters.poSort);

  const html = filtered.length
    ? filtered
        .map(
          (po) => `
    <article class="po-row">
      <div class="po-main">
        <div class="po-number">${escapeHtml(po.poNumber)}</div>
        <div class="po-date">${formatDate(po.poDate)}</div>
      </div>
      <div class="metric-block">
        <div class="vendor-name">${escapeHtml(po.vendorName)}</div>
        <div class="vendor-sub">${escapeHtml(po.gstin || "No GSTIN")} · ${escapeHtml(po.source || "No source")}</div>
        <div class="badge material-type-badge">${escapeHtml(po.materialType || "Unknown")}</div>
      </div>
      <div class="metric-block">
        <div class="metric-label">Products</div>
        <button class="text-link" data-action="view-products" data-po="${escapeHtml(po.poKey)}">${po.productCount || po.itemCount} product${(po.productCount || po.itemCount) === 1 ? "" : "s"}</button>
      </div>
      <div class="metric-block">
        <div class="metric-label">PO Total</div>
        <div class="metric-value total-value">${money(po.poTotal)}</div>
      </div>
      <div class="metric-block payment-metric-block">
        <div class="metric-label">Payment</div>
        ${renderPaymentProgress(po)}
      </div>
      <div class="metric-block">
        <div class="metric-label">PO Status</div>
        <div class="badge ${badgeClass(po.poStatus)}">${escapeHtml(po.poStatus)}</div>
      </div>
      <div class="metric-block">
        <div class="metric-label">Delivery</div>
        <div class="badge ${displayDeliveryBadgeClass(po)}">${escapeHtml(displayDeliveryStatus(po))}</div>
        ${renderPoDeliveryDates(po)}
      </div>
      <div class="action-stack">
        <button class="ghost-btn small-btn" data-action="view-products" data-po="${escapeHtml(po.poKey)}">Products</button>
        <button class="ghost-btn small-btn status-btn" data-action="status-timeline" data-po="${escapeHtml(po.poKey)}">Status</button>
        <button class="primary-btn small-btn" data-action="edit-po" data-po="${escapeHtml(po.poKey)}">Edit PO</button>
        <button class="danger-btn small-btn" data-action="delete-po" data-po="${escapeHtml(po.poKey)}">Delete</button>
      </div>
    </article>
  `,
        )
        .join("")
    : `<div class="empty-state">No purchase orders found for the current filters.</div>`;

  document.getElementById("poList").innerHTML = html;
}

function renderTableHead(mountId, columns) {
  document.getElementById(mountId).innerHTML =
    `<tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>`;
}

function renderProducts({ products }) {
  setSelectOptions(
    "productSortSelect",
    PRODUCT_SORTS,
    state.filters.productSort,
  );

  let filtered = products.filter((product) => {
    const search = state.filters.productSearch.toLowerCase();
    return !search || product.productName.toLowerCase().includes(search);
  });

  filtered = sortData(filtered, state.filters.productSort);
  renderTableHead("productTableHead", PRODUCT_COLUMNS);
  document.getElementById("productTableBody").innerHTML =
    filtered
      .map(
        (product) => `
    <tr class="row-selectable" data-product="${escapeHtml(product.productName)}">
      <td class="truncate">${escapeHtml(product.productName)}</td>
      <td>${formatNumber(product.vendorCount)}</td>
      <td>${escapeHtml(product.bestVendor || "—")}</td>
      <td>${product.bestPrice ? money(product.bestPrice) : "—"}</td>
      <td>${product.avgPrice ? money(product.avgPrice) : "—"}</td>
      <td>${formatNumber(product.totalQty)}</td>
      <td>${money(product.totalSpend)}</td>
      <td>${formatDate(product.lastOrderDate)}</td>
    </tr>
  `,
      )
      .join("") ||
    `<tr><td colspan="8" class="empty-state">No products found.</td></tr>`;
}

function renderProductMaster() {
  const tableHead = document.getElementById("productMasterTableHead");
  const tableBody = document.getElementById("productMasterTableBody");
  const categoryFilter = document.getElementById("productMasterCategoryFilter");
  const statusFilter = document.getElementById("productMasterStatusFilter");
  const searchInput = document.getElementById("productMasterSearch");
  const readonlyNotice = document.getElementById("productMasterReadonlyNotice");
  const readonlyNoticeText = document.getElementById("productMasterReadonlyNoticeText");
  const addBtn = document.getElementById("openAddProductMasterBtn");
  const openLoginBtn = document.getElementById("openAdminLoginBtn");
  const adminSessionInfo = document.getElementById("adminSessionInfo");
  const adminUserTag = document.getElementById("adminUserTag");

  if (!tableHead || !tableBody) return;

  const isAuthAdmin = isProductMasterAuth();
  const isAuth = isAuthAdmin;
  const isAuthedNonAdmin = state.isAuthenticatedUser && !state.productMasterCanWrite;

  if (readonlyNotice) {
    if (isAuthAdmin) {
      readonlyNotice.classList.add("hidden");
    } else {
      readonlyNotice.classList.remove("hidden");
      if (readonlyNoticeText) {
        readonlyNoticeText.textContent = isAuthedNonAdmin
          ? "Product Master is read-only. This account does not have Procurement Admin access."
          : "Product Master is read-only. Administrator access is required to make changes.";
      }
    }
  }

  if (openLoginBtn) {
    openLoginBtn.classList.toggle("hidden", state.isAuthenticatedUser);
  }

  if (adminSessionInfo) {
    if (state.isAuthenticatedUser) {
      adminSessionInfo.classList.remove("hidden");
      if (adminUserTag) {
        const email = state.authSession?.user?.email || "User";
        adminUserTag.textContent = isAuthAdmin ? `Admin • ${email}` : email;
        adminUserTag.classList.toggle("non-admin", !isAuthAdmin);
      }
    } else {
      adminSessionInfo.classList.add("hidden");
    }
  }

  if (addBtn) {
    if (isAuthAdmin) {
      addBtn.removeAttribute("disabled");
      addBtn.removeAttribute("title");
    } else {
      addBtn.setAttribute("disabled", "true");
      addBtn.setAttribute("title", isAuthedNonAdmin
        ? "This account does not have Procurement Admin access."
        : "Product Master is read-only. Administrator access is required to make changes.");
    }
  }

  if (categoryFilter) {
    const categories = Array.from(
      new Set(
        (state.products || [])
          .map((p) => cleanText(p.category))
          .filter(Boolean),
      ),
    ).sort();
    const currentCategory = state.filters.productMasterCategory || "all";
    categoryFilter.innerHTML =
      `<option value="all">All Categories</option>` +
      categories
        .map(
          (cat) =>
            `<option value="${escapeHtml(cat)}" ${cat === currentCategory ? "selected" : ""}>${escapeHtml(cat)}</option>`,
        )
        .join("");
  }

  if (statusFilter) {
    statusFilter.value = state.filters.productMasterStatus || "all";
  }
  if (searchInput && searchInput.value !== (state.filters.productMasterSearch || "")) {
    searchInput.value = state.filters.productMasterSearch || "";
  }

  const query = (state.filters.productMasterSearch || "").toLowerCase().trim();
  const selectedCat = state.filters.productMasterCategory || "all";
  const selectedStatus = state.filters.productMasterStatus || "all";

  let filtered = (state.products || []).filter((p) => {
    if (selectedStatus !== "all" && (p.status || "Active") !== selectedStatus) return false;
    if (selectedCat !== "all" && cleanText(p.category) !== selectedCat) return false;
    if (query) {
      const searchBlob = `${p.productCode || ""} ${p.productName || ""} ${p.category || ""} ${p.brand || ""} ${p.manufacturerPartNo || ""} ${p.specification || ""}`.toLowerCase();
      if (!searchBlob.includes(query)) return false;
    }
    return true;
  });

  renderTableHead("productMasterTableHead", PRODUCT_MASTER_COLUMNS);

  if (!filtered.length) {
    tableBody.innerHTML = `<tr><td colspan="9" class="empty-state">No master products found matching the criteria.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filtered
    .map((p) => {
      const statusClass = (p.status || "Active") === "Active" ? "status-active" : "status-inactive";
      const actionButtons = isAuth
        ? `
            <button class="ghost-btn small-btn" data-product-master-action="details" data-product-id="${escapeHtml(p.productId)}" type="button">Details</button>
            <button class="ghost-btn small-btn" data-product-master-action="edit" data-product-id="${escapeHtml(p.productId)}" type="button">Edit</button>
            <button class="ghost-btn small-btn" data-product-master-action="toggle-status" data-product-id="${escapeHtml(p.productId)}" type="button">${p.status === "Inactive" ? "Reactivate" : "Deactivate"}</button>
          `
        : `
            <button class="ghost-btn small-btn" data-product-master-action="details" data-product-id="${escapeHtml(p.productId)}" type="button">Details</button>
          `;

      return `
        <tr class="row-selectable" data-product-id="${escapeHtml(p.productId)}">
          <td><span class="product-code-tag">${escapeHtml(p.productCode || "—")}</span></td>
          <td><strong>${escapeHtml(p.productName)}</strong></td>
          <td>${escapeHtml(p.category || "—")}</td>
          <td>${escapeHtml(p.brand || "—")}</td>
          <td>${escapeHtml(p.manufacturerPartNo || "—")}</td>
          <td>${escapeHtml(p.defaultUom || "Nos")}</td>
          <td>${p.defaultTaxPercent != null ? `${p.defaultTaxPercent}%` : "18%"}</td>
          <td><span class="badge ${statusClass}">${escapeHtml(p.status || "Active")}</span></td>
          <td>
            <div class="action-stack" style="flex-direction:row;gap:6px;min-width:${isAuth ? "210px" : "90px"};">
              ${actionButtons}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderProductsWorkspace(derived) {
  const masterSubTabBtn = document.querySelector('[data-products-subtab="master"]');
  const unmappedSubTabBtn = document.querySelector('[data-products-subtab="unmapped"]');
  const histSubTabBtn = document.querySelector('[data-products-subtab="historical"]');
  const masterPanel = document.getElementById("productMasterSubPanel");
  const unmappedPanel = document.getElementById("unmappedProductsSubPanel");
  const histPanel = document.getElementById("historicalProductsSubPanel");

  const currentSubTab = state.productsSubTab || "master";

  if (masterSubTabBtn) masterSubTabBtn.classList.toggle("active", currentSubTab === "master");
  if (unmappedSubTabBtn) unmappedSubTabBtn.classList.toggle("active", currentSubTab === "unmapped");
  if (histSubTabBtn) histSubTabBtn.classList.toggle("active", currentSubTab === "historical");

  if (masterPanel) masterPanel.classList.toggle("hidden", currentSubTab !== "master");
  if (unmappedPanel) unmappedPanel.classList.toggle("hidden", currentSubTab !== "unmapped");
  if (histPanel) histPanel.classList.toggle("hidden", currentSubTab !== "historical");

  renderProductMaster();
  renderUnmappedProducts(derived);
  renderProducts(derived);
}

function buildUnmappedProductsSummary(rows = allRows()) {
  const unmappedGroups = new Map();
  let mappedLines = 0;
  let remainingLines = 0;
  const mappedDescriptions = new Set();
  const unmappedDescriptions = new Set();

  rows.forEach((row) => {
    if (row.isCharge || row.lineType === "charge" || row.__deleted) return;
    const rawDesc = cleanText(row.itemDesc);
    if (!rawDesc) return;
    const normalizedKey = normalizeProductMasterName(rawDesc);
    if (!normalizedKey) return;

    if (row.productId) {
      mappedLines++;
      mappedDescriptions.add(normalizedKey);
      return;
    }

    remainingLines++;
    unmappedDescriptions.add(normalizedKey);

    if (!unmappedGroups.has(normalizedKey)) {
      unmappedGroups.set(normalizedKey, {
        normalizedKey,
        sampleDesc: rawDesc,
        allDescriptions: new Set([rawDesc]),
        uom: row.uom || "Nos",
        allUoms: new Set([row.uom || "Nos"]),
        poNumbers: new Set([row.poNumber]),
        vendorNames: new Set([cleanText(row.vendorName) || "Unknown Vendor"]),
        totalQty: 0,
        lastPurchased: row.poDate || "",
        lineIds: [],
        suggestedProduct: null,
      });
    }

    const grp = unmappedGroups.get(normalizedKey);
    grp.allDescriptions.add(rawDesc);
    if (row.uom) grp.allUoms.add(row.uom);
    if (row.poNumber) grp.poNumbers.add(row.poNumber);
    if (row.vendorName) grp.vendorNames.add(cleanText(row.vendorName));
    grp.totalQty += number(row.quantityOrdered);
    if (new Date(row.poDate || 0).getTime() > new Date(grp.lastPurchased || 0).getTime()) {
      grp.lastPurchased = row.poDate;
    }
    grp.lineIds.push(row.id);
  });

  unmappedGroups.forEach((grp) => {
    let match = (state.products || []).find(
      (p) => normalizeProductMasterName(p.productName) === grp.normalizedKey,
    );
    if (!match && state.productAliases) {
      const aliasMatch = state.productAliases.find(
        (a) => normalizeProductMasterName(a.aliasText) === grp.normalizedKey,
      );
      if (aliasMatch) {
        match = (state.products || []).find((p) => p.productId === aliasMatch.productId);
      }
    }
    grp.suggestedProduct = match || null;
  });

  const groups = Array.from(unmappedGroups.values()).sort(
    (a, b) => b.lineIds.length - a.lineIds.length || a.sampleDesc.localeCompare(b.sampleDesc),
  );

  return {
    groups,
    stats: {
      unmappedCount: unmappedGroups.size,
      mappedCount: mappedDescriptions.size,
      mappedLines,
      remainingLines,
    },
  };
}

function renderUnmappedProducts(derived) {
  const tableBody = document.getElementById("unmappedProductsTableBody");
  const searchInput = document.getElementById("unmappedProductSearch");
  const readonlyNotice = document.getElementById("unmappedReadonlyNotice");
  const readonlyNoticeText = document.getElementById("unmappedReadonlyNoticeText");

  const statUnmapped = document.getElementById("statUnmappedDescriptions");
  const statMapped = document.getElementById("statMappedDescriptions");
  const statMappedLines = document.getElementById("statMappedLines");
  const statRemainingLines = document.getElementById("statRemainingLines");

  if (!tableBody) return;

  const { groups, stats } = buildUnmappedProductsSummary();

  if (statUnmapped) statUnmapped.textContent = stats.unmappedCount;
  if (statMapped) statMapped.textContent = stats.mappedCount;
  if (statMappedLines) statMappedLines.textContent = stats.mappedLines;
  if (statRemainingLines) statRemainingLines.textContent = stats.remainingLines;

  const isAuthAdmin = isProductMasterAuth();
  const isAuthedNonAdmin = state.isAuthenticatedUser && !state.productMasterCanWrite;

  if (readonlyNotice) {
    if (isAuthAdmin) {
      readonlyNotice.classList.add("hidden");
    } else {
      readonlyNotice.classList.remove("hidden");
      if (readonlyNoticeText) {
        readonlyNoticeText.textContent = isAuthedNonAdmin
          ? "Product Master is read-only. This account does not have Procurement Admin access."
          : "Product Master is read-only. Administrator access is required to map products.";
      }
    }
  }

  if (searchInput && searchInput.value !== (state.filters.unmappedProductSearch || "")) {
    searchInput.value = state.filters.unmappedProductSearch || "";
  }

  const query = (state.filters.unmappedProductSearch || "").toLowerCase().trim();
  let filtered = groups;
  if (query) {
    filtered = groups.filter((g) => {
      const poList = Array.from(g.poNumbers).join(" ");
      const vendorList = Array.from(g.vendorNames).join(" ");
      const blob = `${g.sampleDesc} ${g.uom} ${poList} ${vendorList} ${g.suggestedProduct?.productCode || ""} ${g.suggestedProduct?.productName || ""}`.toLowerCase();
      return blob.includes(query);
    });
  }

  if (!filtered.length) {
    tableBody.innerHTML = `<tr><td colspan="8" class="empty-state">No unmapped product descriptions found.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filtered
    .map((grp) => {
      const suggestionHtml = grp.suggestedProduct
        ? `<span class="suggested-match-badge" title="Exact match: ${escapeHtml(grp.suggestedProduct.productName)}">
             💡 ${escapeHtml(grp.suggestedProduct.productCode)} — ${escapeHtml(grp.suggestedProduct.productName)}
           </span>`
        : `<span class="muted-text">—</span>`;

      const actionDisabled = !isAuthAdmin
        ? `disabled title="${isAuthedNonAdmin ? 'This account does not have Procurement Admin access.' : 'Administrator access is required to map products.'}"`
        : "";

      return `
        <tr>
          <td>
            <strong class="item-title">${escapeHtml(grp.sampleDesc)}</strong>
            ${grp.allDescriptions.size > 1 ? `<span class="muted-text" style="font-size:11px;display:block;">${grp.allDescriptions.size} variant spellings</span>` : ""}
          </td>
          <td><span class="badge badge-uom">${escapeHtml(grp.uom || "Nos")}</span></td>
          <td><strong>${grp.poNumbers.size}</strong> <span class="muted-text">(${grp.lineIds.length} lines)</span></td>
          <td><strong>${grp.vendorNames.size}</strong></td>
          <td>${formatNumber(grp.totalQty)}</td>
          <td>${formatDate(grp.lastPurchased)}</td>
          <td>${suggestionHtml}</td>
          <td>
            <div class="map-btn-group">
              <button class="primary-btn small-btn" data-unmapped-action="map" data-unmapped-key="${escapeHtml(grp.normalizedKey)}" type="button" ${actionDisabled}>
                Map to Existing
              </button>
              <button class="ghost-btn small-btn" data-unmapped-action="create" data-unmapped-key="${escapeHtml(grp.normalizedKey)}" type="button" ${actionDisabled}>
                Create New Product
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function openMapProductModal(normalizedKey) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to map products.");
    return;
  }

  const { groups } = buildUnmappedProductsSummary();
  const group = groups.find((g) => g.normalizedKey === normalizedKey);
  if (!group) return;

  state.activeMappingGroup = group;

  const modal = document.getElementById("mapProductModalBackdrop");
  const form = document.getElementById("mapProductForm");
  const sourceDesc = document.getElementById("mapSourceDescription");
  const sourceMeta = document.getElementById("mapSourceMeta");
  const select = document.getElementById("mapTargetProductSelect");
  const errBox = document.getElementById("mapProductError");

  if (!modal || !form || !select) return;

  if (errBox) {
    errBox.textContent = "";
    errBox.classList.add("hidden");
  }

  if (sourceDesc) sourceDesc.textContent = group.sampleDesc;
  if (sourceMeta) {
    sourceMeta.textContent = `${group.lineIds.length} PO line(s) across ${group.poNumbers.size} purchase order(s)`;
  }

  const sortedProducts = [...(state.products || [])].sort((a, b) => {
    if ((a.status || "Active") !== (b.status || "Active")) {
      return (a.status || "Active") === "Active" ? -1 : 1;
    }
    return (a.productName || "").localeCompare(b.productName || "");
  });

  select.innerHTML =
    `<option value="">-- Choose Canonical Master Product (${sortedProducts.length} available) --</option>` +
    sortedProducts
      .map((p) => {
        const isSuggested = group.suggestedProduct?.productId === p.productId;
        const tag = isSuggested ? " [Suggested Match]" : "";
        return `<option value="${escapeHtml(p.productId)}" ${isSuggested ? "selected" : ""}>
          ${escapeHtml(p.productCode)} — ${escapeHtml(p.productName)} (${escapeHtml(p.category || "General")})${tag}
        </option>`;
      })
      .join("");

  updateMapTargetPreview(select.value);
  modal.classList.remove("hidden");
}

function updateMapTargetPreview(productId) {
  const preview = document.getElementById("mapTargetPreview");
  const codeEl = document.getElementById("mapTargetCode");
  const nameEl = document.getElementById("mapTargetName");
  const catEl = document.getElementById("mapTargetCategory");
  if (!preview) return;

  const product = (state.products || []).find((p) => p.productId === productId);
  if (!product) {
    preview.classList.add("hidden");
    return;
  }

  if (codeEl) codeEl.textContent = product.productCode || "SNS-P-00000";
  if (nameEl) nameEl.textContent = product.productName || "Product";
  if (catEl) catEl.textContent = `${product.category || "General"}${product.brand ? " • " + product.brand : ""}`;
  preview.classList.remove("hidden");
}

function closeMapProductModal() {
  const modal = document.getElementById("mapProductModalBackdrop");
  if (modal) modal.classList.add("hidden");
  state.activeMappingGroup = null;
}

async function mapHistoricalLinesToProduct(group, targetProductId) {
  if (!group || !targetProductId) return false;
  const product = (state.products || []).find((p) => p.productId === targetProductId);
  if (!product) {
    alert("Selected target product not found.");
    return false;
  }

  const existingAlias = (state.productAliases || []).find(
    (a) => normalizeProductMasterName(a.aliasText) === group.normalizedKey,
  );
  if (existingAlias && existingAlias.productId !== targetProductId) {
    const otherProduct = (state.products || []).find((p) => p.productId === existingAlias.productId);
    throw new Error(
      `Cannot map: This description is already mapped as an alias to another product (${otherProduct?.productCode || "Another Product"} - ${otherProduct?.productName || ""}).`,
    );
  }

  if (useSupabase && supabaseClient) {
    const { error: lineUpdateError } = await supabaseClient
      .from("po_lines")
      .update({ product_id: targetProductId })
      .in("line_id", group.lineIds);

    if (lineUpdateError) {
      throw lineUpdateError;
    }
  }

  const lineIdSet = new Set(group.lineIds);
  baseRows.forEach((row) => {
    if (lineIdSet.has(row.id)) {
      row.productId = targetProductId;
    }
  });
  (state.manualRows || []).forEach((row) => {
    if (lineIdSet.has(row.id)) {
      row.productId = targetProductId;
    }
  });
  if (state.rowOverrides) {
    Object.keys(state.rowOverrides).forEach((rowId) => {
      if (lineIdSet.has(rowId)) {
        state.rowOverrides[rowId] = {
          ...state.rowOverrides[rowId],
          productId: targetProductId,
        };
      }
    });
  }
  saveState();

  const hasAliasForTarget = (state.productAliases || []).some(
    (a) => a.productId === targetProductId && normalizeProductMasterName(a.aliasText) === group.normalizedKey,
  );

  if (!hasAliasForTarget) {
    await addAliasToProduct(targetProductId, group.sampleDesc);
  }

  return true;
}

async function handleMapProductForm(event) {
  if (event) event.preventDefault();
  const form = document.getElementById("mapProductForm");
  const errBox = document.getElementById("mapProductError");
  const submitBtn = document.getElementById("confirmMapProductBtn");
  if (!form || !state.activeMappingGroup) return;

  const targetProductId = form.elements.targetProductId.value;
  if (!targetProductId) {
    if (errBox) {
      errBox.textContent = "Please select a canonical Master Product.";
      errBox.classList.remove("hidden");
    }
    return;
  }

  if (errBox) {
    errBox.textContent = "";
    errBox.classList.add("hidden");
  }
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Mapping...";
  }

  try {
    await mapHistoricalLinesToProduct(state.activeMappingGroup, targetProductId);
    closeMapProductModal();
    renderAll();
  } catch (err) {
    if (errBox) {
      errBox.textContent = err.message || "Failed to map historical lines.";
      errBox.classList.remove("hidden");
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Confirm Mapping";
    }
  }
}

function handleCreateNewProductFromUnmapped(normalizedKey) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to create products.");
    return;
  }

  const { groups } = buildUnmappedProductsSummary();
  const group = groups.find((g) => g.normalizedKey === normalizedKey);
  if (!group) return;

  state.pendingHistoricalMapping = group;
  openProductMasterModal({
    productName: group.sampleDesc,
    defaultUom: group.uom || "Nos",
  });
}

function openProductMasterModal(product = null) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to make changes.");
    return;
  }

  const modal = document.getElementById("productMasterModalBackdrop");
  const form = document.getElementById("productMasterForm");
  const title = document.getElementById("productMasterModalTitle");
  const subtext = document.getElementById("productMasterModalSubtext");
  if (!modal || !form) return;

  form.reset();

  if (product && product.productId) {
    title.textContent = `Edit ${product.productCode || "Product"}`;
    subtext.textContent = `Update canonical specifications and attributes for ${product.productName}.`;
    form.elements.productId.value = product.productId || "";
    form.elements.productCode.value = product.productCode || "";
    form.elements.status.value = product.status || "Active";
    form.elements.productName.value = product.productName || "";
    form.elements.category.value = product.category || "";
    form.elements.subcategory.value = product.subcategory || "";
    form.elements.brand.value = product.brand || "";
    form.elements.manufacturerPartNo.value = product.manufacturerPartNo || "";
    form.elements.defaultUom.value = product.defaultUom || "Nos";
    form.elements.hsnCode.value = product.hsnCode || "";
    form.elements.defaultTaxPercent.value = product.defaultTaxPercent ?? 18;
    form.elements.defaultMaterialType.value = product.defaultMaterialType || "Unknown";
    form.elements.specification.value = product.specification || "";
    form.elements.notes.value = product.notes || "";
  } else {
    title.textContent = state.pendingHistoricalMapping
      ? "Create & Map Master Product"
      : "Add Master Product";
    subtext.textContent = state.pendingHistoricalMapping
      ? `Create canonical product and automatically map ${state.pendingHistoricalMapping.lineIds.length} historical line(s).`
      : "Define canonical product identity, specifications, and default attributes.";
    form.elements.productId.value = "";
    form.elements.productCode.value = "Generated on save";
    form.elements.status.value = "Active";
    form.elements.productName.value = product?.productName || "";
    form.elements.category.value = product?.category || "";
    form.elements.subcategory.value = product?.subcategory || "";
    form.elements.brand.value = product?.brand || "";
    form.elements.manufacturerPartNo.value = product?.manufacturerPartNo || "";
    form.elements.defaultUom.value = product?.defaultUom || "Nos";
    form.elements.hsnCode.value = "";
    form.elements.defaultTaxPercent.value = "18";
    form.elements.defaultMaterialType.value = product?.defaultMaterialType || "Unknown";
    form.elements.specification.value = "";
    form.elements.notes.value = "";
  }

  modal.classList.remove("hidden");
}

function closeProductMasterModal() {
  const modal = document.getElementById("productMasterModalBackdrop");
  if (modal) modal.classList.add("hidden");
  state.pendingHistoricalMapping = null;
}

async function createProduct(payload) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to make changes.");
    return null;
  }

  const dbPayload = {
    product_name: cleanText(payload.productName),
    category: cleanText(payload.category) || null,
    subcategory: cleanText(payload.subcategory) || null,
    brand: cleanText(payload.brand) || null,
    manufacturer_part_no: cleanText(payload.manufacturerPartNo) || null,
    specification: cleanText(payload.specification) || null,
    default_uom: cleanText(payload.defaultUom || "Nos") || "Nos",
    hsn_code: cleanText(payload.hsnCode) || null,
    default_tax_percent: payload.defaultTaxPercent != null ? Number(payload.defaultTaxPercent) : 18.0,
    default_material_type: cleanText(payload.defaultMaterialType || "Unknown") || "Unknown",
    status: payload.status === "Inactive" ? "Inactive" : "Active",
    notes: cleanText(payload.notes) || null,
  };

  if (useSupabase) {
    const { data, error } = await supabaseClient
      .from("products")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error("Failed to create product in Supabase", error);
      alert(`Failed to create product: ${error.message || error}`);
      return null;
    }

    const newProduct = {
      productId: data.product_id,
      productCode: data.product_code,
      productName: data.product_name,
      normalizedName: data.normalized_name,
      category: data.category || "",
      subcategory: data.subcategory || "",
      brand: data.brand || "",
      manufacturerPartNo: data.manufacturer_part_no || "",
      specification: data.specification || "",
      defaultUom: data.default_uom || "Nos",
      hsnCode: data.hsn_code || "",
      defaultTaxPercent: Number(data.default_tax_percent ?? 18),
      defaultMaterialType: data.default_material_type || "Unknown",
      status: data.status || "Active",
      notes: data.notes || "",
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
    state.products = [...(state.products || []), newProduct];
    saveState();
    return newProduct;
  } else {
    const fallbackId = uid("PRD");
    const fallbackCode = `SNS-P-${String((state.products || []).length + 1).padStart(5, "0")}`;
    const newProduct = {
      productId: fallbackId,
      productCode: fallbackCode,
      productName: dbPayload.product_name,
      normalizedName: dbPayload.product_name.toLowerCase(),
      category: dbPayload.category || "",
      subcategory: dbPayload.subcategory || "",
      brand: dbPayload.brand || "",
      manufacturerPartNo: dbPayload.manufacturer_part_no || "",
      specification: dbPayload.specification || "",
      defaultUom: dbPayload.default_uom,
      hsnCode: dbPayload.hsn_code || "",
      defaultTaxPercent: dbPayload.default_tax_percent,
      defaultMaterialType: dbPayload.default_material_type,
      status: dbPayload.status,
      notes: dbPayload.notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.products = [...(state.products || []), newProduct];
    saveState();
    return newProduct;
  }
}

async function updateProduct(productId, payload) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to make changes.");
    return null;
  }

  const dbPayload = {
    product_name: cleanText(payload.productName),
    category: cleanText(payload.category) || null,
    subcategory: cleanText(payload.subcategory) || null,
    brand: cleanText(payload.brand) || null,
    manufacturer_part_no: cleanText(payload.manufacturerPartNo) || null,
    specification: cleanText(payload.specification) || null,
    default_uom: cleanText(payload.defaultUom || "Nos") || "Nos",
    hsn_code: cleanText(payload.hsnCode) || null,
    default_tax_percent: payload.defaultTaxPercent != null ? Number(payload.defaultTaxPercent) : 18.0,
    default_material_type: cleanText(payload.defaultMaterialType || "Unknown") || "Unknown",
    status: payload.status === "Inactive" ? "Inactive" : "Active",
    notes: cleanText(payload.notes) || null,
  };

  if (useSupabase) {
    const { data, error } = await supabaseClient
      .from("products")
      .update(dbPayload)
      .eq("product_id", productId)
      .select()
      .single();

    if (error) {
      console.error("Failed to update product in Supabase", error);
      alert(`Failed to update product: ${error.message || error}`);
      return null;
    }

    const idx = (state.products || []).findIndex((p) => p.productId === productId);
    if (idx !== -1) {
      state.products[idx] = {
        ...state.products[idx],
        productName: data.product_name,
        normalizedName: data.normalized_name,
        category: data.category || "",
        subcategory: data.subcategory || "",
        brand: data.brand || "",
        manufacturerPartNo: data.manufacturer_part_no || "",
        specification: data.specification || "",
        defaultUom: data.default_uom || "Nos",
        hsnCode: data.hsn_code || "",
        defaultTaxPercent: Number(data.default_tax_percent ?? 18),
        defaultMaterialType: data.default_material_type || "Unknown",
        status: data.status || "Active",
        notes: data.notes || "",
        updatedAt: data.updated_at,
      };
      saveState();
    }
    return state.products[idx];
  } else {
    const idx = (state.products || []).findIndex((p) => p.productId === productId);
    if (idx !== -1) {
      state.products[idx] = {
        ...state.products[idx],
        productName: dbPayload.product_name,
        normalizedName: dbPayload.product_name.toLowerCase(),
        category: dbPayload.category || "",
        subcategory: dbPayload.subcategory || "",
        brand: dbPayload.brand || "",
        manufacturerPartNo: dbPayload.manufacturer_part_no || "",
        specification: dbPayload.specification || "",
        defaultUom: dbPayload.default_uom,
        hsnCode: dbPayload.hsn_code || "",
        defaultTaxPercent: dbPayload.default_tax_percent,
        defaultMaterialType: dbPayload.default_material_type,
        status: dbPayload.status,
        notes: dbPayload.notes || "",
        updatedAt: new Date().toISOString(),
      };
      saveState();
    }
    return state.products[idx];
  }
}

async function saveProductMasterForm(event) {
  if (event) event.preventDefault();
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to make changes.");
    return;
  }

  const form = document.getElementById("productMasterForm");
  if (!form) return;

  const productId = form.elements.productId.value;
  const productName = cleanText(form.elements.productName.value);
  if (!productName) {
    alert("Product Name is required.");
    return;
  }

  const taxPercentVal = parseFloat(form.elements.defaultTaxPercent.value);
  const defaultTaxPercent = isNaN(taxPercentVal) ? 18 : Math.max(0, Math.min(100, taxPercentVal));

  const payload = {
    productName,
    category: cleanText(form.elements.category.value),
    subcategory: cleanText(form.elements.subcategory.value),
    brand: cleanText(form.elements.brand.value),
    manufacturerPartNo: cleanText(form.elements.manufacturerPartNo.value),
    defaultUom: cleanText(form.elements.defaultUom.value) || "Nos",
    hsnCode: cleanText(form.elements.hsnCode.value),
    defaultTaxPercent,
    defaultMaterialType: cleanText(form.elements.defaultMaterialType.value) || "Unknown",
    status: form.elements.status.value === "Inactive" ? "Inactive" : "Active",
    specification: cleanText(form.elements.specification.value),
    notes: cleanText(form.elements.notes.value),
  };

  if (!productId) {
    // Duplicate warning before creation
    const normName = productName.toLowerCase();
    const rawPartNo = payload.manufacturerPartNo;
    const normPartNo = rawPartNo ? rawPartNo.toLowerCase() : "";

    const duplicateName = (state.products || []).find(
      (p) => (p.normalizedName || p.productName.toLowerCase()) === normName,
    );
    const duplicatePartNo = rawPartNo
      ? (state.products || []).find(
          (p) => p.manufacturerPartNo && p.manufacturerPartNo.toLowerCase() === normPartNo,
        )
      : null;

    if (duplicateName || duplicatePartNo) {
      const match = duplicateName || duplicatePartNo;
      const reason = duplicateName ? `name "${productName}"` : `part number "${rawPartNo}"`;
      const proceed = confirm(
        `Warning: A product with matching ${reason} already exists in the catalog (${match.productCode}: ${match.productName}).\n\nDo you want to proceed and create this product anyway?`,
      );
      if (!proceed) return;
    }

    const created = await createProduct(payload);
    if (created) {
      if (state.pendingHistoricalMapping) {
        try {
          await mapHistoricalLinesToProduct(state.pendingHistoricalMapping, created.productId);
        } catch (mapErr) {
          alert(`Product created, but mapping failed: ${mapErr.message}`);
        }
        state.pendingHistoricalMapping = null;
      }
      closeProductMasterModal();
      renderAll();
    }
  } else {
    const updated = await updateProduct(productId, payload);
    if (updated) {
      closeProductMasterModal();
      renderAll();
    }
  }
}

async function toggleProductStatus(productId) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to make changes.");
    return;
  }

  const product = (state.products || []).find((p) => p.productId === productId);
  if (!product) return;
  const nextStatus = product.status === "Active" ? "Inactive" : "Active";

  if (useSupabase) {
    const { data, error } = await supabaseClient
      .from("products")
      .update({ status: nextStatus })
      .eq("product_id", productId)
      .select()
      .single();

    if (error) {
      console.error("Failed to toggle product status in Supabase", error);
      alert(`Failed to change product status: ${error.message || error}`);
      return;
    }
    product.status = data.status;
    product.updatedAt = data.updated_at;
  } else {
    product.status = nextStatus;
    product.updatedAt = new Date().toISOString();
  }
  saveState();
  renderAll();
}

function openProductMasterDetailModal(productId) {
  const modal = document.getElementById("productMasterDetailModalBackdrop");
  const product = (state.products || []).find((p) => p.productId === productId);
  if (!modal || !product) return;

  state.selectedMasterProductId = productId;
  state.selectedMasterDetailTab = "overview";

  document.getElementById("productMasterDetailTitle").textContent = product.productName;
  document.getElementById("productMasterDetailCode").textContent = `${product.productCode} • ${product.status}`;

  const aliasProductIdInput = document.getElementById("aliasProductId");
  if (aliasProductIdInput) aliasProductIdInput.value = productId;

  renderProductMasterDetailContent(product);
  modal.classList.remove("hidden");
}

function closeProductMasterDetailModal() {
  const modal = document.getElementById("productMasterDetailModalBackdrop");
  if (modal) modal.classList.add("hidden");
}

function renderProductMasterDetailContent(product) {
  const overviewMount = document.getElementById("productDetailOverviewContent");
  const aliasesMount = document.getElementById("aliasChipsList");
  const aliasCountBadge = document.getElementById("aliasCountBadge");
  const overviewTabBtn = document.getElementById("pDetailTabOverview");
  const aliasesTabBtn = document.getElementById("pDetailTabAliases");
  const overviewSec = document.getElementById("productDetailOverviewSection");
  const aliasesSec = document.getElementById("productDetailAliasesSection");
  const aliasNotice = document.getElementById("aliasReadonlyNotice");
  const addAliasForm = document.getElementById("addAliasForm");

  const isOverview = state.selectedMasterDetailTab === "overview";
  if (overviewTabBtn) overviewTabBtn.classList.toggle("active", isOverview);
  if (aliasesTabBtn) aliasesTabBtn.classList.toggle("active", !isOverview);
  if (overviewSec) overviewSec.classList.toggle("hidden", !isOverview);
  if (aliasesSec) aliasesSec.classList.toggle("hidden", isOverview);

  const isAuth = isProductMasterAuth();
  const isAuthedNonAdmin = state.isAuthenticatedUser && !state.productMasterCanWrite;
  if (aliasNotice) {
    aliasNotice.classList.toggle("hidden", isAuth);
    aliasNotice.innerHTML = `<span class="notice-icon">ℹ</span> ${
      isAuthedNonAdmin
        ? "Alias editing is read-only. This account does not have Procurement Admin access."
        : "Alias editing is read-only. Administrator access is required to add or remove aliases."
    }`;
  }
  if (addAliasForm) addAliasForm.classList.toggle("hidden", !isAuth);

  if (overviewMount) {
    overviewMount.innerHTML = `
      <div class="product-overview-grid">
        <div class="product-overview-cell">
          <span>Product Code</span>
          <strong>${escapeHtml(product.productCode)}</strong>
        </div>
        <div class="product-overview-cell">
          <span>Status</span>
          <strong><span class="badge ${(product.status || "Active") === "Active" ? "status-active" : "status-inactive"}">${escapeHtml(product.status || "Active")}</span></strong>
        </div>
        <div class="product-overview-cell">
          <span>Category</span>
          <strong>${escapeHtml(product.category || "—")}</strong>
        </div>
        <div class="product-overview-cell">
          <span>Subcategory</span>
          <strong>${escapeHtml(product.subcategory || "—")}</strong>
        </div>
        <div class="product-overview-cell">
          <span>Brand / Make</span>
          <strong>${escapeHtml(product.brand || "—")}</strong>
        </div>
        <div class="product-overview-cell">
          <span>Part Number</span>
          <strong>${escapeHtml(product.manufacturerPartNo || "—")}</strong>
        </div>
        <div class="product-overview-cell">
          <span>Default UOM</span>
          <strong>${escapeHtml(product.defaultUom || "Nos")}</strong>
        </div>
        <div class="product-overview-cell">
          <span>Default Tax %</span>
          <strong>${product.defaultTaxPercent != null ? `${product.defaultTaxPercent}%` : "18%"}</strong>
        </div>
        <div class="product-overview-cell">
          <span>HSN Code</span>
          <strong>${escapeHtml(product.hsnCode || "—")}</strong>
        </div>
        <div class="product-overview-cell">
          <span>Material Type</span>
          <strong>${escapeHtml(product.defaultMaterialType || "Unknown")}</strong>
        </div>
        ${product.specification ? `
          <div class="product-overview-cell full-width">
            <span>Specification</span>
            <strong>${escapeHtml(product.specification)}</strong>
          </div>
        ` : ""}
        ${product.notes ? `
          <div class="product-overview-cell full-width">
            <span>Notes</span>
            <strong>${escapeHtml(product.notes)}</strong>
          </div>
        ` : ""}
      </div>
    `;
  }

  const aliases = (state.productAliases || []).filter((a) => a.productId === product.productId);
  if (aliasCountBadge) aliasCountBadge.textContent = String(aliases.length);

  if (aliasesMount) {
    if (!aliases.length) {
      aliasesMount.innerHTML = `<div class="empty-state" style="padding:12px;font-size:12px;">No aliases mapped yet for this product.${isAuth ? " Add one above." : ""}</div>`;
    } else {
      aliasesMount.innerHTML = aliases
        .map(
          (a) => `
        <div class="alias-chip">
          <span>${escapeHtml(a.aliasText)}</span>
          ${isAuth ? `<button type="button" class="remove-alias-btn" data-alias-id="${escapeHtml(a.aliasId)}" title="Remove alias">&times;</button>` : ""}
        </div>
      `,
        )
        .join("");
    }
  }
}

async function addAliasToProduct(productId, aliasText) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to make changes.");
    return;
  }

  const text = cleanText(aliasText);
  if (!text) return;
  const normalized = text.toLowerCase();

  const existingGlobal = (state.productAliases || []).find(
    (a) => (a.normalizedAlias || a.aliasText.toLowerCase()) === normalized,
  );
  if (existingGlobal) {
    if (existingGlobal.productId === productId) {
      alert(`The alias "${text}" is already mapped to this product.`);
    } else {
      const parentProduct = (state.products || []).find((p) => p.productId === existingGlobal.productId);
      const parentName = parentProduct ? `${parentProduct.productCode} (${parentProduct.productName})` : "another product";
      alert(`The alias "${text}" is already mapped to ${parentName}. Aliases must be unique across all products.`);
    }
    return;
  }

  const dbPayload = {
    product_id: productId,
    alias_text: text,
    source: "Manual",
    notes: null,
  };

  if (useSupabase) {
    const { data, error } = await supabaseClient
      .from("product_aliases")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error("Failed to add product alias in Supabase", error);
      alert(`Failed to add alias: ${error.message || error}`);
      return;
    }

    const newAlias = {
      aliasId: data.alias_id,
      productId: data.product_id,
      aliasText: data.alias_text,
      normalizedAlias: data.normalized_alias,
      source: data.source || "Manual",
      notes: data.notes || "",
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
    state.productAliases = [...(state.productAliases || []), newAlias];
  } else {
    const newAlias = {
      aliasId: uid("ALS"),
      productId,
      aliasText: text,
      normalizedAlias: normalized,
      source: "Manual",
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.productAliases = [...(state.productAliases || []), newAlias];
  }

  saveState();
  const product = (state.products || []).find((p) => p.productId === productId);
  if (product) renderProductMasterDetailContent(product);
}

async function removeAlias(aliasId) {
  if (!isProductMasterAuth()) {
    alert("Product Master is read-only. Administrator access is required to make changes.");
    return;
  }

  const alias = (state.productAliases || []).find((a) => a.aliasId === aliasId);
  if (!alias) return;

  if (useSupabase) {
    const { error } = await supabaseClient
      .from("product_aliases")
      .delete()
      .eq("alias_id", aliasId);

    if (error) {
      console.error("Failed to delete alias from Supabase", error);
      alert(`Failed to delete alias: ${error.message || error}`);
      return;
    }
  }

  state.productAliases = (state.productAliases || []).filter((a) => a.aliasId !== aliasId);
  saveState();

  if (state.selectedMasterProductId) {
    const product = (state.products || []).find((p) => p.productId === state.selectedMasterProductId);
    if (product) renderProductMasterDetailContent(product);
  }
}

function ensureSelectedVendor(vendors) {
  if (!vendors.length) {
    state.selectedVendor = null;
    return;
  }
  const exists = vendors.some(
    (vendor) => vendor.vendorName === state.selectedVendor,
  );
  if (!exists) state.selectedVendor = vendors[0].vendorName;
}

function renderVendors({ vendors }) {
  setSelectOptions("vendorSortSelect", VENDOR_SORTS, state.filters.vendorSort);
  let filtered = vendors.filter((vendor) => {
    const search = state.filters.vendorSearch.toLowerCase();
    return (
      !search ||
      [vendor.vendorName, vendor.gstin, vendor.source]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  });

  filtered = sortData(filtered, state.filters.vendorSort);
  ensureSelectedVendor(filtered);
  renderTableHead("vendorTableHead", VENDOR_COLUMNS);
  document.getElementById("vendorTableBody").innerHTML =
    filtered
      .map(
        (vendor) => `
    <tr class="row-selectable ${vendor.vendorName === state.selectedVendor ? "selection-row" : ""}" data-vendor="${escapeHtml(vendor.vendorName)}">
      <td>${escapeHtml(vendor.vendorName)}</td>
      <td>${escapeHtml(vendor.source || "—")}</td>
      <td>${escapeHtml(vendor.gstin || "—")}</td>
      <td>${formatNumber(vendor.poCount)}</td>
      <td>${formatNumber(vendor.productCount)}</td>
      <td>${money(vendor.totalSpend)}</td>
      <td>${formatDate(vendor.lastOrderDate)}</td>
    </tr>
  `,
      )
      .join("") ||
    `<tr><td colspan="7" class="empty-state">No vendors found.</td></tr>`;

  renderVendorForm(vendors);
}

function renderVendorForm(vendors) {
  const vendor = vendors.find(
    (item) => item.vendorName === state.selectedVendor,
  );
  const mount = document.getElementById("vendorForm");
  const label = document.getElementById("selectedVendorLabel");
  if (!vendor) {
    mount.innerHTML =
      '<div class="empty-state">Select a vendor to edit contact details.</div>';
    label.textContent = "Select a vendor";
    return;
  }
  label.textContent = vendor.vendorName;
  const contact = vendor.contacts || {};
  mount.innerHTML = `
    <label class="field">
      <span>Vendor Name</span>
      <input class="control-input" name="vendorName" value="${escapeHtml(vendor.vendorName)}" readonly />
    </label>
    <label class="field">
      <span>Source</span>
      <input class="control-input" name="source" value="${escapeHtml(contact.source || vendor.source || "")}" />
    </label>
    <label class="field">
      <span>Category</span>
      <select class="control-input" name="vendorCategory">
        ${AUDIT_SELECT_OPTIONS.vendorCategory.map((value) => `<option${value === (contact.vendorCategory || "") ? " selected" : ""}>${escapeHtml(value)}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span>Currency</span>
      <select class="control-input" name="currencyCode">
        ${AUDIT_SELECT_OPTIONS.currency.map((value) => `<option${value === (contact.currencyCode || "INR") ? " selected" : ""}>${escapeHtml(value)}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span>GSTIN</span>
      <input class="control-input" name="gstin" value="${escapeHtml(contact.gstin || vendor.gstin || "")}" />
    </label>
    <label class="field">
      <span>Contact Person 1</span>
      <input class="control-input" name="contactPerson" value="${escapeHtml(contact.contactPerson || "")}" />
    </label>
    <label class="field">
      <span>Contact Person 2</span>
      <input class="control-input" name="contactPerson2" value="${escapeHtml(contact.contactPerson2 || "")}" />
    </label>
    <label class="field">
      <span>Phone 1</span>
      <input class="control-input" name="phone" value="${escapeHtml(contact.phone || "")}" />
    </label>
    <label class="field">
      <span>Phone 2</span>
      <input class="control-input" name="phone2" value="${escapeHtml(contact.phone2 || "")}" />
    </label>
    <label class="field">
      <span>Email</span>
      <input class="control-input" name="email" value="${escapeHtml(contact.email || "")}" />
    </label>
    <label class="field">
      <span>Website</span>
      <input class="control-input" name="website" value="${escapeHtml(contact.website || "")}" />
    </label>
    <label class="field">
      <span>City</span>
      <input class="control-input" name="city" value="${escapeHtml(contact.city || "")}" />
    </label>
    <label class="field">
      <span>Default Lead Time (days)</span>
      <input class="control-input" name="defaultLeadTimeDays" value="${escapeHtml(contact.defaultLeadTimeDays || "")}" />
    </label>
    <label class="field">
      <span>Vendor Rating</span>
      <input class="control-input" name="rating" value="${escapeHtml(contact.rating || "")}" />
    </label>
    <label class="field-full">
      <span>Notes</span>
      <textarea name="notes">${escapeHtml(contact.notes || "")}</textarea>
    </label>
    <div class="form-actions vendor-actions">
      <button type="submit" class="primary-btn">Save Vendor Details</button>
      <button type="button" class="danger-btn small-btn" id="deleteVendorBtn">Delete Vendor</button>
    </div>
  `;
}

function ensureSelectedMetricProduct(products) {
  if (!products.length) {
    state.selectedMetricProduct = null;
    state.showMetricVendorForm = false;
    return;
  }
  const exists = products.some(
    (product) => product.productName === state.selectedMetricProduct,
  );
  if (!exists) state.selectedMetricProduct = products[0].productName;
}

function renderMetricProducts({ products, productVendorMetrics }) {
  setSelectOptions("metricSortSelect", METRIC_SORTS, state.filters.metricSort);
  let filtered = products.filter((product) => {
    const search = state.filters.metricProductSearch.toLowerCase();
    return !search || product.productName.toLowerCase().includes(search);
  });
  filtered = sortData(filtered, state.filters.metricSort);
  ensureSelectedMetricProduct(filtered);
  renderTableHead("metricProductTableHead", METRIC_PRODUCT_COLUMNS);
  document.getElementById("metricProductTableBody").innerHTML =
    filtered
      .map(
        (product) => `
    <tr class="row-selectable ${product.productName === state.selectedMetricProduct ? "selection-row" : ""}" data-metric-product="${escapeHtml(product.productName)}">
      <td class="truncate">${escapeHtml(product.productName)}</td>
      <td>${formatNumber(product.vendorCount)}</td>
      <td>${product.bestPrice ? money(product.bestPrice) : "—"}</td>
      <td>${formatDate(product.lastOrderDate)}</td>
    </tr>
  `,
      )
      .join("") ||
    `<tr><td colspan="4" class="empty-state">No products found.</td></tr>`;

  renderMetricEditor(productVendorMetrics);
}

function renderMetricEditor(productVendorMetrics) {
  const mount = document.getElementById("metricEditor");
  const label = document.getElementById("selectedMetricProductLabel");
  const productName = state.selectedMetricProduct;
  if (!productName) {
    mount.innerHTML =
      '<div class="empty-state">Select a product to compare vendors.</div>';
    label.textContent = "Select a product";
    return;
  }
  label.textContent = productName;

  const derived = buildDerived();
  const vendorOptions = sortData(derived.vendors, "vendorName-asc");

  const rows = productVendorMetrics
    .filter((metric) => metric.productName === productName)
    .sort((a, b) => {
      const aRank =
        number(
          a.quotedPriceNumber || a.historicalBestPrice || a.latestPrice || 0,
        ) || Number.MAX_SAFE_INTEGER;
      const bRank =
        number(
          b.quotedPriceNumber || b.historicalBestPrice || b.latestPrice || 0,
        ) || Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    });

  const datalistId = `metricVendorList-${normalizeKey(productName).replace(/[^A-Z0-9]+/g, "-")}`;

  mount.innerHTML = `
    <div class="metric-topbar">
      <div class="metric-note">Compare historical vendors and add extra vendors for this product even before raising a PO.</div>
      <div class="group-note">${formatNumber(rows.length)} vendor option${rows.length === 1 ? "" : "s"}</div>
    </div>
    ${
      state.showMetricVendorForm
        ? `
      <form class="metric-add-form" id="metricAddForm">
        <div class="metric-add-grid">
          <label class="field">
            <span>Product</span>
            <input class="control-input" name="productName" value="${escapeHtml(productName)}" readonly />
          </label>
          <label class="field">
            <span>Vendor Name</span>
            <input class="control-input" name="vendorName" list="${datalistId}" placeholder="Add vendor for this product" required />
          </label>
          <label class="field">
            <span>Source</span>
            <input class="control-input" name="source" placeholder="KL / MH / GJ..." />
          </label>
          <label class="field">
            <span>GSTIN</span>
            <input class="control-input" name="gstin" placeholder="GSTIN" />
          </label>
          <label class="field">
            <span>Quoted Price</span>
            <input class="control-input" name="quotedPrice" type="number" min="0" step="0.01" placeholder="0.00" />
          </label>
          <label class="field">
            <span>Lead Time (days)</span>
            <input class="control-input" name="leadTimeDays" placeholder="Lead time" />
          </label>
          <label class="field">
            <span>MOQ</span>
            <input class="control-input" name="moq" placeholder="MOQ" />
          </label>
          <label class="field">
            <span>Rating</span>
            <input class="control-input" name="rating" placeholder="Rating" />
          </label>
          <label class="field-full">
            <span>Notes</span>
            <textarea name="notes" placeholder="Notes for this product-vendor option"></textarea>
          </label>
        </div>
        <datalist id="${datalistId}">
          ${vendorOptions.map((vendor) => `<option value="${escapeHtml(vendor.vendorName)}"></option>`).join("")}
        </datalist>
        <div class="form-actions">
          <button type="button" class="ghost-btn" data-action="cancel-add-metric-vendor">Cancel</button>
          <button type="submit" class="primary-btn">Save Vendor Option</button>
        </div>
      </form>
    `
        : ""
    }

    ${
      rows.length
        ? `<div class="metric-editor">${rows
            .map((metric) => {
              const metricKey = metricStorageKey(
                metric.productName,
                metric.vendorName,
              );
              const saved = state.productVendorMetrics[metricKey] || {};
              const displayPrice =
                number(saved.quotedPrice) ||
                metric.quotedPriceNumber ||
                metric.historicalBestPrice ||
                metric.latestPrice ||
                0;
              return `
        <form class="metric-card" data-metric-key="${escapeHtml(metricKey)}">
          <div class="metric-card-head">
            <div>
              <h4>${escapeHtml(metric.vendorName)}</h4>
              <div class="metric-subtle">${escapeHtml(metric.source || "No source")} ${metric.gstin ? `· ${escapeHtml(metric.gstin)}` : ""}</div>
            </div>
            <div class="group-note">${metric.hasHistory ? "History linked" : "Added manually"}</div>
          </div>
          <div class="meta-row">
            <span>Best historical rate: ${metric.historicalBestPrice ? money(metric.historicalBestPrice) : "—"}</span>
            <span>Latest rate: ${metric.latestPrice ? money(metric.latestPrice) : "—"}</span>
            <span>Current compare rate: ${displayPrice ? money(displayPrice) : "—"}</span>
            <span>POs: ${formatNumber(metric.poCount)}</span>
            <span>Last order: ${formatDate(metric.lastOrderDate)}</span>
          </div>
          <div class="metric-grid">
            <label class="field">
              <span>Quoted Price</span>
              <input class="control-input" name="quotedPrice" value="${escapeHtml(saved.quotedPrice || metric.quotedPrice || "")}" />
            </label>
            <label class="field">
              <span>Lead Time (days)</span>
              <input class="control-input" name="leadTimeDays" value="${escapeHtml(saved.leadTimeDays || metric.leadTimeDays || "")}" />
            </label>
            <label class="field">
              <span>MOQ</span>
              <input class="control-input" name="moq" value="${escapeHtml(saved.moq || metric.moq || "")}" />
            </label>
            <label class="field">
              <span>Rating</span>
              <input class="control-input" name="rating" value="${escapeHtml(saved.rating || metric.rating || "")}" />
            </label>
            <label class="field-full">
              <span>Notes</span>
              <textarea name="notes">${escapeHtml(saved.notes || metric.notes || "")}</textarea>
            </label>
          </div>
          <div class="form-actions">
            <button type="submit" class="primary-btn small-btn">Save Metrics</button>
          </div>
        </form>
      `;
            })
            .join("")}</div>`
        : `<div class="empty-state">No vendors found for this product yet. Add one to start comparison.</div>`
    }
  `;
}

function getDerivedAndGroupedPo(poKey) {
  const derived = buildDerived();
  const po = derived.pos.find(
    (item) => item.poKey === poKey || item.poNumber === poKey,
  );
  return { derived, po };
}

function createLineItemCard(values = {}) {
  const index = document.querySelectorAll(".line-item-card").length + 1;
  const wrapper = document.createElement("div");
  const lineType = inferLineType(values.itemDesc, values.lineType);
  wrapper.className = "line-item-card";
  wrapper.innerHTML = `
    <div class="line-item-top">
      <div class="line-title">${getLineTypeLabel(lineType)} ${index}</div>
      <button type="button" class="danger-btn small-btn" data-line-remove>Remove</button>
    </div>
    <div class="line-item-grid">
      <label class="field">
        <span>Line Type</span>
        <select class="control-input" name="lineType">
          <option value="product" ${lineType === "product" ? "selected" : ""}>Product</option>
          <option value="charge" ${lineType === "charge" ? "selected" : ""}>Charge</option>
        </select>
      </label>
      <label class="field">
        <span>Description</span>
        <input class="control-input" name="itemDesc" value="${escapeHtml(values.itemDesc || "")}" placeholder="Item or charge description" required />
      </label>
      <label class="field">
        <span>Qty</span>
        <input class="control-input" type="number" min="0" step="0.001" name="quantityOrdered" value="${escapeHtml(values.quantityOrdered ?? 1)}" required />
      </label>
      <label class="field">
        <span>UOM</span>
        <input class="control-input" list="uomOptions" name="uom" value="${escapeHtml(normalizeUom(values.uom || "Nos"))}" placeholder="Nos / Mtr / Kg" />
      </label>
      <label class="field">
        <span>Unit Price</span>
        <input class="control-input" type="number" min="0" step="0.01" name="itemPrice" value="${escapeHtml(values.itemPrice ?? "")}" required />
      </label>
      <label class="field">
        <span>Tax %</span>
        <input class="control-input" type="number" min="0" step="0.01" name="itemTaxPercent" value="${escapeHtml(values.itemTaxPercent ?? 18)}" />
      </label>
      <div class="metric-block">
        <div class="metric-label">Line Total</div>
        <div class="metric-value" data-line-total>${money(
          materializeRow({
            quantityOrdered: values.quantityOrdered ?? 1,
            itemPrice: values.itemPrice ?? 0,
            itemTaxPercent: values.itemTaxPercent ?? 18,
            itemTotal: values.itemTotal ?? 0,
            itemTaxAmount: values.itemTaxAmount ?? 0,
            lineGrandTotal: values.lineGrandTotal ?? 0,
            itemDesc: values.itemDesc || "",
            lineType,
          }).lineGrandTotal,
        )}</div>
      </div>
    </div>
  `;
  return wrapper;
}

function syncDeliveredDateField({ stampIfEmpty = false } = {}) {
  const form = document.getElementById("poForm");
  const field = document.getElementById("deliveredDateField");
  const input = form?.elements?.deliveredDate;
  const statusInput = form?.elements?.deliveryStatus;
  if (!field || !input || !statusInput) return;

  const isDelivered =
    normalizeDeliveryStatus(statusInput.value) === "Delivered";
  field.classList.toggle("hidden", !isDelivered);
  if (isDelivered && stampIfEmpty && !input.value) input.value = todayIsoDate();
  if (!isDelivered) input.value = "";
}

function openPoModal(po = null, options = {}) {
  state.editingPoKey = po?.poKey || null;
  const modal = document.getElementById("poModalBackdrop");
  const title = document.getElementById("poModalTitle");
  const subtext = document.getElementById("poModalSubtext");
  const form = document.getElementById("poForm");
  const linesMount = document.getElementById("poLineItems");

  form.reset();
  linesMount.innerHTML = "";
  if (po) {
    title.textContent = `Edit ${po.poNumber}`;
    subtext.textContent = `Update PO header details, amount paid, amount/percent discount, adjustment, products, and charge lines for ${po.vendorName}.`;
    form.elements.poDate.value = po.poDate || "";
    form.elements.poNumber.value = po.poNumber || "";
    form.elements.vendorName.value = po.vendorName || "";
    form.elements.source.value = po.source || "";
    form.elements.gstin.value = po.gstin || "";
    if (form.elements.materialType)
      form.elements.materialType.value = normalizeMaterialType(
        po.materialType || "Unknown",
      );
    if (form.elements.edd) form.elements.edd.value = po.edd || "";
    form.elements.deliveryDate.value = po.deliveryDate || "";
    if (form.elements.deliveredDate)
      form.elements.deliveredDate.value = po.deliveredDate || "";
    const discountTypeInput = document.getElementById("summaryDiscountType");
    const discountValueInput = document.getElementById("summaryDiscountInput");
    const adjustmentInput = document.getElementById("summaryAdjustmentInput");
    const amountPaidInput = document.getElementById("summaryAmountPaidInput");
    if (discountTypeInput)
      discountTypeInput.value = po.discountType || "amount";
    if (discountValueInput)
      discountValueInput.value = String(number(po.discountInputValue || 0));
    if (adjustmentInput)
      adjustmentInput.value = String(number(po.adjustmentAmount || 0));
    if (amountPaidInput)
      amountPaidInput.value = String(number(po.amountPaid || 0));
    form.elements.paymentStatus.value = [
      "Paid",
      "Partially Paid",
      "Pending",
      "Unknown",
    ].includes(po.paymentStatus)
      ? po.paymentStatus
      : "Unknown";
    form.elements.poStatus.value = [
      "Issued",
      "Billed",
      "Closed",
      "Unknown",
    ].includes(po.poStatus)
      ? po.poStatus
      : "Unknown";
    form.elements.deliveryStatus.value = [
      "Unknown",
      "In Transit",
      "Partially Delivered",
      "Delivered",
    ].includes(po.deliveryStatus)
      ? po.deliveryStatus
      : "Unknown";
    form.elements.terms.value = po.terms || "";
    po.items.forEach((item) =>
      linesMount.appendChild(createLineItemCard(item)),
    );
  } else {
    title.textContent = "Add Purchase Order";
    subtext.textContent =
      "Create one PO with amount paid, amount/percent discount, adjustment, product lines, and charge lines.";
    const discountTypeInput = document.getElementById("summaryDiscountType");
    const discountInput = document.getElementById("summaryDiscountInput");
    const adjustmentInput = document.getElementById("summaryAdjustmentInput");
    const amountPaidInput = document.getElementById("summaryAmountPaidInput");
    if (discountTypeInput) discountTypeInput.value = "amount";
    if (discountInput) discountInput.value = "0";
    if (adjustmentInput) adjustmentInput.value = "0";
    if (amountPaidInput) amountPaidInput.value = "0";
    form.elements.paymentStatus.value = "Pending";
    form.elements.poStatus.value = "Issued";
    form.elements.deliveryStatus.value = "Unknown";
    if (form.elements.materialType)
      form.elements.materialType.value = "Unknown";
    if (form.elements.edd) form.elements.edd.value = "";
    if (form.elements.deliveredDate) form.elements.deliveredDate.value = "";
    if (options.poNumber) form.elements.poNumber.value = options.poNumber;
    linesMount.appendChild(
      createLineItemCard({ quantityOrdered: 1, itemTaxPercent: 18 }),
    );
  }
  const eddField = document.getElementById("eddField");
  if (eddField) eddField.classList.toggle("hidden", !(po && isPoDelayed(po)));
  syncDeliveredDateField();
  refreshLineIndexes();
  recalcPoSummary();
  modal.classList.remove("hidden");
}

function closePoModal() {
  document.getElementById("poModalBackdrop").classList.add("hidden");
  state.editingPoKey = null;
}

function refreshLineIndexes() {
  document.querySelectorAll(".line-item-card").forEach((card, idx) => {
    const title = card.querySelector(".line-title");
    const lineType = cleanText(
      card.querySelector('[name="lineType"]')?.value || "product",
    ).toLowerCase();
    if (title) title.textContent = `${getLineTypeLabel(lineType)} ${idx + 1}`;
  });
}

function recalcPoSummary() {
  const lines = Array.from(document.querySelectorAll(".line-item-card")).map(
    (card) => ({
      quantityOrdered: number(
        card.querySelector('[name="quantityOrdered"]')?.value,
      ),
      uom: normalizeUom(card.querySelector('[name="uom"]')?.value),
      itemPrice: number(card.querySelector('[name="itemPrice"]')?.value),
      itemTaxPercent: number(
        card.querySelector('[name="itemTaxPercent"]')?.value,
      ),
    }),
  );
  const { discountType, discountInputValue, adjustmentAmount } =
    getDiscountStateFromInputs();
  const breakdown = calculatePoBreakdown(
    lines,
    discountType,
    discountInputValue,
    adjustmentAmount,
  );
  const amountPaidInputEl = document.getElementById("summaryAmountPaidInput");
  const typedAmountPaid = number(amountPaidInputEl?.value);
  const paymentState = derivePaymentState(
    breakdown.grandTotal,
    typedAmountPaid,
  );

  document.querySelectorAll(".line-item-card").forEach((card, index) => {
    const totalMount = card.querySelector("[data-line-total]");
    if (totalMount)
      totalMount.textContent = money(
        breakdown.lines[index]?.lineGrandTotal || 0,
      );
  });

  const itemTotalEl = document.getElementById("summaryItemTotal");
  const discountTotalEl = document.getElementById("summaryDiscountTotal");
  const taxTotalEl = document.getElementById("summaryTaxTotal");
  const balanceDueEl = document.getElementById("summaryBalanceDue");
  if (itemTotalEl) itemTotalEl.textContent = money(breakdown.itemSubtotal);
  if (discountTotalEl)
    discountTotalEl.textContent = money(breakdown.discountValue);
  if (taxTotalEl) taxTotalEl.textContent = money(breakdown.taxTotal);
  if (balanceDueEl) balanceDueEl.textContent = money(paymentState.balanceDue);

  const discountTypeInput = document.getElementById("summaryDiscountType");
  const discountInput = document.getElementById("summaryDiscountInput");
  const adjustmentInput = document.getElementById("summaryAdjustmentInput");
  if (discountTypeInput && document.activeElement !== discountTypeInput)
    discountTypeInput.value = breakdown.discountType;
  if (discountInput && document.activeElement !== discountInput)
    discountInput.value = String(breakdown.discountInputValue);
  if (adjustmentInput && document.activeElement !== adjustmentInput)
    adjustmentInput.value = String(breakdown.adjustmentAmount);
  if (amountPaidInputEl && document.activeElement !== amountPaidInputEl)
    amountPaidInputEl.value = String(paymentState.amountPaid);

  const paymentStatusEl = document.querySelector(
    '#poForm [name="paymentStatus"]',
  );
  if (paymentStatusEl) paymentStatusEl.value = paymentState.paymentStatus;

  const poTotalEl = document.getElementById("summaryPoTotal");
  if (poTotalEl) poTotalEl.textContent = money(breakdown.grandTotal);
}

function collectPoFormPayload(existingPo = null) {
  const form = document.getElementById("poForm");
  const poDate = form.elements.poDate.value;
  const poNumber = cleanText(form.elements.poNumber.value) || uid("PO");
  const vendorName = cleanText(form.elements.vendorName.value);
  const source = cleanText(form.elements.source.value);
  const gstin = cleanText(form.elements.gstin.value);
  const deliveryDate = form.elements.deliveryDate.value;
  const materialType = normalizeMaterialType(
    form.elements.materialType?.value || "Unknown",
  );
  const edd = form.elements.edd?.value || "";
  const { discountType, discountInputValue, adjustmentAmount } =
    getDiscountStateFromInputs();
  const amountPaidInput = number(
    document.getElementById("summaryAmountPaidInput")?.value,
  );
  const paymentStatus = normalizePaymentStatus(
    form.elements.paymentStatus.value,
  );
  const poStatus = normalizePoStatus(form.elements.poStatus.value);
  const deliveryStatus = normalizeDeliveryStatus(
    form.elements.deliveryStatus.value,
  );
  const previousDeliveryStatus = normalizeDeliveryStatus(
    existingPo?.deliveryStatus,
  );
  const deliveredDateInput = safeDate(form.elements.deliveredDate?.value);
  const deliveredDate =
    deliveryStatus === "Delivered"
      ? deliveredDateInput ||
        safeDate(existingPo?.deliveredDate) ||
        (previousDeliveryStatus !== "Delivered" ? todayIsoDate() : "")
      : "";
  const terms = form.elements.terms.value || "";
  const lineCards = Array.from(document.querySelectorAll(".line-item-card"));
  const rawLines = lineCards
    .map((card) => {
      const itemDesc = cleanText(
        card.querySelector('[name="itemDesc"]')?.value,
      );
      const quantityOrdered = number(
        card.querySelector('[name="quantityOrdered"]')?.value,
      );
      const itemPrice = number(card.querySelector('[name="itemPrice"]')?.value);
      const itemTaxPercent = number(
        card.querySelector('[name="itemTaxPercent"]')?.value,
      );
      const lineType = inferLineType(
        itemDesc,
        card.querySelector('[name="lineType"]')?.value,
      );
      return {
        itemDesc,
        quantityOrdered,
        uom: normalizeUom(card.querySelector('[name="uom"]')?.value),
        itemPrice,
        itemTaxPercent,
        lineType,
      };
    })
    .filter((line) => line.itemDesc);

  if (!vendorName || !poDate || !rawLines.length) {
    alert("Please fill PO date, vendor name, and at least one PO line.");
    return null;
  }
  if (poNumberExistsForAnotherPO(poNumber, existingPo)) {
    alert(`${poNumber} already exists. Please use an available PO number.`);
    return null;
  }

  const breakdown = calculatePoBreakdown(
    rawLines,
    discountType,
    discountInputValue,
    adjustmentAmount,
  );
  const paymentState = derivePaymentState(
    breakdown.grandTotal,
    amountPaidInput,
  );
  const originalItems = existingPo?.items || [];
  const usedBaseIds = new Set();
  const updatedRows = breakdown.lines.map((line, index) => {
    const base = originalItems[index];
    if (base?.id) usedBaseIds.add(base.id);
    return {
      id: base?.id || uid("manual"),
      poDate,
      deliveryDate,
      deliveredDate,
      edd,
      materialType,
      deliveryStatus,
      poNumber,
      reference: base?.reference || "",
      poStatus,
      vendorName,
      hsnSac: base?.hsnSac || "",
      source,
      gstin,
      referenceNo: base?.referenceNo || "",
      terms,
      itemPrice: line.itemPrice,
      itemDesc: line.itemDesc,
      quantityOrdered: line.quantityOrdered,
      uom: normalizeUom(line.uom || "Nos"),
      itemTax: line.itemTaxPercent ? `GST${line.itemTaxPercent}` : "",
      itemTaxPercent: line.itemTaxPercent,
      itemTaxAmount: line.itemTaxAmount,
      itemTotal: line.itemTotal,
      lineGrandTotal: line.lineGrandTotal,
      lineType: line.lineType,
      total: index === 0 ? breakdown.grandTotal : null,
      paymentStatus,
      balanceDue: paymentState.balanceDue,
      discountAmount: breakdown.discountValue,
      discountType: breakdown.discountType,
      discountInputValue: breakdown.discountInputValue,
      adjustmentAmount: breakdown.adjustmentAmount,
      amountPaid: paymentState.amountPaid,
      manual: base?.manual || !base,
    };
  });

  const removedRows = originalItems.filter((item) => !usedBaseIds.has(item.id));

  return {
    updatedRows,
    removedRows,
    poNumber,
    vendorName,
    source,
    gstin,
    materialType,
    edd,
  };
}

function recordDeliveryStatusChange(existingPo, payload) {
  if (!payload) return;
  const nextRow = payload.updatedRows?.[0] || {};
  const previousStatus = normalizeDeliveryStatus(existingPo?.deliveryStatus);
  const nextStatus = normalizeDeliveryStatus(nextRow.deliveryStatus);
  if (previousStatus === nextStatus) return;
  if (!existingPo && nextStatus === "Unknown") return;

  const deliveredDate =
    nextStatus === "Delivered"
      ? safeDate(nextRow.deliveredDate) || todayIsoDate()
      : "";
  const event = {
    po_number: payload.poNumber,
    event_type: "delivery_status_changed",
    event_title: "Delivery Status Changed",
    event_description: `Delivery status changed from ${previousStatus || "Unknown"} to ${nextStatus || "Unknown"}.`,
    old_value: previousStatus || "Unknown",
    new_value: nextStatus || "Unknown",
    actor: "Procurement Hub",
    source: "Purchase Orders",
    metadata: {
      delivered_date: deliveredDate || null,
    },
  };

  state.activityEvents.push({
    ...event,
    created_at: new Date().toISOString(),
  });

  if (useSupabase) {
    insertPoActivityEvent(event).catch((error) => {
      console.warn("Delivery status event could not be saved", error);
    });
  }
}

function applyPoChanges(existingPo, payload) {
  if (!payload) return;

  const nextPoStatus = payload.updatedRows?.[0]?.poStatus;
  if (nextPoStatus) {
    const poNumber = cleanText(payload.poNumber);
    baseRows.forEach((row) => {
      if (cleanText(row.poNumber) === poNumber) {
        state.rowOverrides[row.id] = {
          ...(state.rowOverrides[row.id] || {}),
          poStatus: nextPoStatus,
        };
      }
    });
    (state.manualRows || []).forEach((row) => {
      if (cleanText(row.poNumber) === poNumber) {
        row.poStatus = nextPoStatus;
      }
    });
  }

  payload.updatedRows.forEach((row) => {
    if (row.manual) {
      const index = state.manualRows.findIndex((item) => item.id === row.id);
      if (index >= 0)
        state.manualRows[index] = {
          ...state.manualRows[index],
          ...row,
          manual: true,
        };
      else state.manualRows.push({ ...row, manual: true });
    } else {
      state.rowOverrides[row.id] = { ...state.rowOverrides[row.id], ...row };
    }
  });

  payload.removedRows.forEach((row) => {
    if (row.manual) {
      state.manualRows = state.manualRows.filter((item) => item.id !== row.id);
    } else {
      state.rowOverrides[row.id] = {
        ...(state.rowOverrides[row.id] || {}),
        __deleted: true,
      };
    }
  });

  const vendorKey = payload.vendorName;
  if (vendorKey) {
    const current = state.vendorContacts[vendorKey] || {};
    state.vendorContacts[vendorKey] = {
      vendorName: vendorKey,
      source: payload.source || current.source || "",
      gstin: payload.gstin || current.gstin || "",
      contactPerson: current.contactPerson || "",
      phone: current.phone || "",
      email: current.email || "",
      website: current.website || "",
      city: current.city || "",
      defaultLeadTimeDays: current.defaultLeadTimeDays || "",
      rating: current.rating || "",
      notes: current.notes || "",
    };
  }

  recordDeliveryStatusChange(existingPo, payload);
  markPoNumberSubmitted(payload.poNumber);
  saveState();
  closePoModal();
  renderAll();
}

async function deletePurchaseOrder(poKey) {
  const { po } = getDerivedAndGroupedPo(poKey);
  if (!po) return;
  const poNumber = cleanText(po.poNumber);
  const ok = window.confirm(
    `Delete ${po.poNumber}? This will remove the full PO from the site.`,
  );
  if (!ok) return;

  const deleteLineIds = new Set(
    (po.items || []).map((item) => cleanText(item.id)).filter(Boolean),
  );
  allRows()
    .filter(
      (row) =>
        cleanText(row.poNumber) === poNumber ||
        deleteLineIds.has(cleanText(row.id)),
    )
    .forEach((row) => {
      deleteLineIds.add(cleanText(row.id));
    });

  state.manualRows = (state.manualRows || []).filter(
    (row) =>
      cleanText(row.poNumber) !== poNumber &&
      !deleteLineIds.has(cleanText(row.id)),
  );
  baseRows.forEach((row) => {
    if (
      cleanText(row.poNumber) !== poNumber &&
      !deleteLineIds.has(cleanText(row.id))
    )
      return;
    state.rowOverrides[row.id] = {
      ...(state.rowOverrides[row.id] || {}),
      __deleted: true,
    };
  });

  saveState();
  renderAll();
  if (!useSupabase) return;

  clearTimeout(remoteSyncTimer);
  try {
    await deletePoFromSupabase(poNumber);
    await loadRemoteStateFromSupabase();
    saveState();
    clearTimeout(remoteSyncTimer);
    renderAll();
  } catch (error) {
    console.error("Delete PO failed", error);
    alert(`Delete failed: ${error.message || error}`);
    await loadRemoteStateFromSupabase().catch(() => false);
    renderAll();
  }
}

function openProductDetailModal(poKey) {
  const { po } = getDerivedAndGroupedPo(poKey);
  if (!po) return;

  const groupedItems =
    Array.isArray(po.groupedItems) && po.groupedItems.length
      ? po.groupedItems
      : groupedPoItems((po.items || []).filter((item) => !item.isCharge));
  const groupedCharges =
    Array.isArray(po.groupedCharges) && po.groupedCharges.length
      ? po.groupedCharges
      : groupedPoItems((po.items || []).filter((item) => item.isCharge));

  document.getElementById("detailModalTitle").textContent =
    `${po.poNumber} · ${po.vendorName}`;
  document.getElementById("detailModalSubtext").textContent =
    `${groupedItems.length} grouped product${groupedItems.length === 1 ? "" : "s"} and ${groupedCharges.length} charge line${groupedCharges.length === 1 ? "" : "s"} inside this PO.`;
  document.getElementById("detailModalContent").innerHTML = `
    <div class="detail-summary">
      <div class="detail-card"><div class="k">PO Date</div><div class="v">${formatDate(po.poDate)}</div></div>
      <div class="detail-card"><div class="k">Item Total</div><div class="v">${money(po.itemSubtotal || 0)}</div></div>
      <div class="detail-card"><div class="k">Discount</div><div class="v">${money(po.discountAmount || 0)}${po.discountType === "percent" ? ` (${escapeHtml(String(po.discountInputValue || 0))}%)` : ""}</div></div>
      <div class="detail-card"><div class="k">Tax Total</div><div class="v">${money(po.taxTotal || 0)}</div></div>
      <div class="detail-card"><div class="k">Adjustment</div><div class="v">${money(po.adjustmentAmount || 0)}</div></div>
      <div class="detail-card"><div class="k">PO Total</div><div class="v">${money(po.poTotal)}</div></div>
      <div class="detail-card"><div class="k">Amount Paid</div><div class="v">${money(po.amountPaid || 0)}</div></div>
      <div class="detail-card"><div class="k">Balance Due</div><div class="v">${money(po.balanceDue || 0)}</div></div>
      <div class="detail-card"><div class="k">Payment</div><div class="v">${renderPaymentProgress(po)}</div></div>
      <div class="detail-card"><div class="k">Delivery</div><div class="v"><span class="badge ${displayDeliveryBadgeClass(po)}">${escapeHtml(displayDeliveryStatus(po))}</span>${renderPoDeliveryDates(po)}</div></div>
    </div>

    ${
      groupedItems.length
        ? `
      <div class="detail-section-title">Products</div>
      <div class="detail-items">
        ${groupedItems
          .map(
            (item, index) => `
          <div class="detail-item">
            <div class="detail-item-head">
              <div>
                <div class="line-title">Grouped Product ${index + 1}</div>
                <h4>${escapeHtml(item.itemDesc)}</h4>
              </div>
              <div class="metric-value">${money(item.lineGrandTotal)}</div>
            </div>
            <div class="meta-row">
              <span>Total Qty ${formatNumber(item.quantityOrdered)} ${escapeHtml(item.displayUom || "Nos")}</span>
              <span>Rate ${item.displayPrice}${item.displayUom && item.displayUom !== "Mixed" ? ` / ${escapeHtml(item.displayUom)}` : ""}</span>
              <span>Tax ${escapeHtml(item.displayTaxPercent)}${item.displayTaxPercent === "Mixed" ? "" : "%"}</span>
              <span>Item Total ${money(item.itemTotal)}</span>
              <span>Tax Amount ${money(item.itemTaxAmount)}</span>
            </div>
            ${
              item.lineCount > 1
                ? `
              <div class="detail-subitems">
                <div class="group-note">Clubbed from ${item.lineCount} lines in this PO</div>
                ${item.lines
                  .map(
                    (line, lineIndex) => `
                  <div class="detail-subline">
                    <div class="metric-subtle">Original line ${lineIndex + 1}</div>
                    <div class="meta-row">
                      <span>Qty ${formatNumber(line.quantityOrdered)} ${escapeHtml(line.uom || "Nos")}</span>
                      <span>Unit ${money(line.itemPrice)}${line.uom ? ` / ${escapeHtml(line.uom)}` : ""}</span>
                      <span>Tax ${formatNumber(line.itemTaxPercent)}%</span>
                      <span>Line Total ${money(line.lineGrandTotal)}</span>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      </div>
    `
        : `<div class="empty-state">No product lines in this PO.</div>`
    }

    ${
      groupedCharges.length
        ? `
      <div class="detail-section-title" style="margin-top:18px">Charges</div>
      <div class="detail-items">
        ${groupedCharges
          .map(
            (item, index) => `
          <div class="detail-item charge-item">
            <div class="detail-item-head">
              <div>
                <div class="line-title">Charge ${index + 1}</div>
                <h4>${escapeHtml(item.itemDesc)}</h4>
              </div>
              <div class="metric-value">${money(item.lineGrandTotal)}</div>
            </div>
            <div class="meta-row">
              <span>Qty ${formatNumber(item.quantityOrdered)} ${escapeHtml(item.displayUom || "Nos")}</span>
              <span>Rate ${item.displayPrice}${item.displayUom && item.displayUom !== "Mixed" ? ` / ${escapeHtml(item.displayUom)}` : ""}</span>
              <span>Tax ${escapeHtml(item.displayTaxPercent)}${item.displayTaxPercent === "Mixed" ? "" : "%"}</span>
              <span>Charge Total ${money(item.itemTotal)}</span>
              <span>Tax Amount ${money(item.itemTaxAmount)}</span>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
        : ""
    }

    <div class="detail-footer">
      <div class="meta-row">
        <span>Vendor: ${escapeHtml(po.vendorName)}</span>
        <span>GSTIN: ${escapeHtml(po.gstin || "—")}</span>
        <span>Source: ${escapeHtml(po.source || "—")}</span>
        <span>PO Status: ${escapeHtml(po.poStatus)}</span>
      </div>
      ${po.terms ? `<div class="small-text" style="margin-top:12px;white-space:pre-wrap;line-height:1.55">${escapeHtml(po.terms)}</div>` : ""}
      <div class="form-actions">
        <button class="primary-btn small-btn" data-action="edit-po-from-detail" data-po="${escapeHtml(po.poKey)}" type="button">Edit PO</button>
      </div>
    </div>
  `;

  document.getElementById("detailModalBackdrop").classList.remove("hidden");
}

function closeDetailModal() {
  document.getElementById("detailModalBackdrop").classList.add("hidden");
}

function exportLocalState() {
  const payload = {
    manualRows: state.manualRows,
    rowOverrides: state.rowOverrides,
    vendorContacts: state.vendorContacts,
    productVendorMetrics: state.productVendorMetrics,
    deletedVendors: state.deletedVendors,
    poTokenLog: state.poTokenLog,
    reusableQueue: state.reusableQueue,
    poMaster: state.poMaster,
    activeReservations: state.activeReservations,
    procurementAudit: state.procurementAudit,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  link.href = URL.createObjectURL(blob);
  link.download = `stack-n-stock-local-data-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function exportFullData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "Stack n Stock Procurement Dashboard",
    baseData: {
      rows: Array.isArray(window.STACKNSTOCK_DATA?.rows)
        ? window.STACKNSTOCK_DATA.rows
        : [],
      vendorSeeds: Array.isArray(window.STACKNSTOCK_DATA?.vendorSeeds)
        ? window.STACKNSTOCK_DATA.vendorSeeds
        : [],
    },
    localState: {
      manualRows: state.manualRows,
      rowOverrides: state.rowOverrides,
      vendorContacts: state.vendorContacts,
      productVendorMetrics: state.productVendorMetrics,
      deletedVendors: state.deletedVendors,
      poTokenLog: state.poTokenLog,
      reusableQueue: state.reusableQueue,
      poMaster: state.poMaster,
      activeReservations: state.activeReservations,
      procurementAudit: state.procurementAudit,
    },
    mergedView: {
      rows: allRows(),
      derived: buildDerived(),
    },
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  link.href = URL.createObjectURL(blob);
  link.download = `stack-n-stock-full-data-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function buildProcurementReportRows(derived = buildDerived()) {
  const poByNumber = new Map(
    (derived.pos || []).map((po) => [cleanText(po.poNumber), po]),
  );

  return allRows()
    .slice()
    .sort((a, b) => {
      const poCompare = comparePoNumbers(a.poNumber, b.poNumber);
      if (poCompare !== 0) return poCompare;
      return cleanText(a.itemDesc).localeCompare(cleanText(b.itemDesc), undefined, {
        numeric: true,
        sensitivity: "base",
      });
    })
    .map((row) => {
      const po = poByNumber.get(cleanText(row.poNumber)) || {};
      const lineType = inferLineType(row.itemDesc, row.lineType);
      const isCharge = lineType === "charge";
      const itemName = cleanText(row.itemDesc) || "Unnamed Item";
      const qty = number(row.quantityOrdered);
      const itemTotal = roundMoney(number(row.itemTotal) || qty * number(row.itemPrice));
      const taxAmount = roundMoney(number(row.itemTaxAmount));
      const lineTotal = roundMoney(number(row.lineGrandTotal) || itemTotal + taxAmount);
      const category = isCharge
        ? cleanText(row.materialType) || "Freight Cost"
        : cleanText(row.materialType) || "Procurement Item";
      return {
        itemName,
        amount: itemTotal || lineTotal,
        qty,
        category,
        sourceOfSupply: cleanText(row.source || po.source),
        vendorName: cleanText(row.vendorName || po.vendorName),
        poNumber: cleanText(row.poNumber || po.poNumber),
        freightCost: isCharge ? lineTotal : "",
        billNo: cleanText(row.billNo || row.billNumber || row.invoiceNo || ""),
        uom: normalizeUom(row.uom || "Nos"),
        qtyInt: Number.isFinite(qty) ? Math.trunc(qty) : "",
        poDate: cleanText(row.poDate || po.poDate),
        deliveryDate: cleanText(row.deliveryDate || po.deliveryDate),
        materialType: cleanText(row.materialType || po.materialType),
        unitRate: number(row.itemPrice),
        taxPercent: number(row.itemTaxPercent),
        taxAmount,
        lineTotal,
        poTotal: roundMoney(number(po.poTotal) || lineTotal),
        amountPaid: roundMoney(number(po.amountPaid)),
        balanceDue: roundMoney(number(po.balanceDue)),
        paymentStatus: normalizePaymentStatus(row.paymentStatus || po.paymentStatus),
        poStatus: normalizePoStatus(row.poStatus || po.poStatus),
        deliveryStatus: displayDeliveryStatus({
          deliveryStatus: row.deliveryStatus || po.deliveryStatus,
          deliveryDate: row.deliveryDate || po.deliveryDate,
          edd: row.edd || po.edd,
        }),
      };
    });
}

function reportDisplayValue(value, type) {
  if (value === null || value === undefined || value === "") return "";
  if (type === "money") return money(value);
  if (type === "number") return formatNumber(value);
  if (type === "percent") return `${formatNumber(value)}%`;
  if (type === "date") return formatDate(value);
  return cleanText(value);
}

function mechanicalPercent(part, whole) {
  const denominator = number(whole);
  if (!denominator) return 0;
  return roundMoney((number(part) / denominator) * 100);
}

function mechanicalAverage(values) {
  const numeric = values
    .map((value) => number(value))
    .filter((value) => Number.isFinite(value) && value !== 0);
  if (!numeric.length) return 0;
  return roundMoney(numeric.reduce((sum, value) => sum + value, 0) / numeric.length);
}

function leadTimeDays(poDate, deliveryDate) {
  const start = parseDateOnly(poDate);
  const end = parseDateOnly(deliveryDate);
  if (!start || !end) return "";
  return Math.max(0, Math.round((end - start) / 86400000));
}

function isMechanicalProcurementLine(row) {
  const text = normalizeKey(
    [
      row.itemDesc,
      row.materialType,
      row.hsnSac,
      row.terms,
      row.vendorName,
    ].join(" "),
  );
  if (!text || inferLineType(row.itemDesc, row.lineType) === "charge") return false;
  const customHint =
    /\b(MTO|CUSTOM|DRAWING|FABRICAT|WELD|MACHIN|ASSEMBLY|WINCH|GEARBOX|SHAFT|FRAME|BRACKET)\b/.test(
      text,
    ) || text.includes("AS PER DRAWING");
  const generalConsumable =
    /\b(NUT|BOLT|WASHER|SCREW|FASTENER|ADHESIVE|TAPE|GLUE|OIL|GREASE|PACKING|PAINT)\b/.test(
      text,
    );
  const mechanicalHint =
    /\b(WHEEL|BEARING|ROD|PLATE|PULLEY|BELT|WINCH|PIPE|JOINT|COLLAR|RING|ROLLER|MACHIN|FABRICAT|FRAME|BRACKET|HOUSING|ASSEMBLY|GEARBOX|SHAFT|COUPLING|CLAMP|GUIDE|RAIL|CHANNEL|BEAM|CASTING|BUSH|SPACER|LINEAR|TIMING|SPRING|MOTOR|LOCKING|SPROCKET|GEAR)\b/.test(
      text,
    );
  if (generalConsumable && !customHint) return false;
  return mechanicalHint || customHint;
}

function classifyMechanicalMaterial(row) {
  const text = normalizeKey(row.itemDesc);
  if (/\b(CASTING|CAST)\b/.test(text)) return "Casting";
  if (/\b(ASSEMBLY|GEARBOX|WINCH|LIFT|MODULE|UNIT)\b/.test(text))
    return "Assembly";
  if (/\b(SHEET|PLATE|BRACKET|FRAME|CHANNEL|BEAM|PANEL|WELDMENT|FABRICAT|BENDING|LASER)\b/.test(text))
    return "Sheet metal part";
  if (/\b(BEARING|LINEAR|GUIDE|RAIL|BUSH)\b/.test(text))
    return "Standard mechanical component";
  if (/\b(BELT|LOCKING DEVICE|COUPLING|CHAIN|SPROCKET)\b/.test(text))
    return "Bought-out mechanical item";
  if (/\b(MACHIN|WHEEL|ROD|SHAFT|ROLLER|COLLAR|RING|SPACER|CLAMP|PULLEY|GEAR|PIPE|JOINT)\b/.test(text))
    return "Machined part";
  return "Other / Needs Review";
}

function classifyMechanicalSourcing(row, po = {}) {
  const text = normalizeKey(
    [row.itemDesc, row.materialType, po.materialType, row.vendorName].join(" "),
  );
  if (text.includes("MTO")) return "Custom-made";
  if (text.includes("RTO")) return "Off-the-shelf";
  if (
    text.includes("AS PER DRAWING") ||
    /\b(CUSTOM|DRAWING|FABRICAT|WELDMENT|MACHINED|MACHINING|WINCH|GEARBOX|ASSEMBLY)\b/.test(text)
  )
    return "Custom-made";
  if (
    /\b(MISUMI|IGUS|SKF|BEARING|BELT|LOCKING DEVICE|STANDARD|CATALOG|COUPLING|CHAIN|SPROCKET)\b/.test(
      text,
    )
  )
    return "Off-the-shelf";
  return "Needs Review";
}

function mechanicalSourcingComment(row) {
  if (row.classification === "Custom-made")
    return "Review drawing tolerance, batch quantities, and alternate suppliers; evaluate standard equivalent.";
  if (row.classification === "Off-the-shelf")
    return "Consolidate demand and negotiate catalog pricing.";
  return "Clarify MTO/RTO status, add benchmark quote, and confirm backup vendor.";
}

function mechanicalRiskLevel(spendPercent, avgLeadTime, needsReviewCount, customCount) {
  if (spendPercent >= 20 || avgLeadTime >= 30 || customCount >= 5) return "High";
  if (spendPercent >= 8 || avgLeadTime >= 15 || needsReviewCount > 0) return "Medium";
  return "Low";
}

function mechanicalVendorAction(riskLevel, avgLeadTime, needsReviewCount, customCount) {
  if (riskLevel === "High" && avgLeadTime >= 30)
    return "Qualify alternate/local source and review lead-time reduction plan.";
  if (riskLevel === "High" || customCount >= 5)
    return "Run DFM/cost-reduction review and benchmark alternate suppliers.";
  if (needsReviewCount > 0)
    return "Complete MTO/RTO classification and benchmark price evidence.";
  return "Monitor pricing and consolidate future orders where practical.";
}

function mechanicalCategoryRecommendation(category) {
  if (category === "Custom-made")
    return "Standardize or convert high-spend custom items to catalog alternatives where possible.";
  if (category === "Off-the-shelf")
    return "Consolidate and negotiate catalog pricing.";
  return "Review item descriptions and map to MTO/RTO.";
}

function mechanicalOpportunityForLine(row) {
  if (row.classification === "Custom-made")
    return {
      opportunity: "Custom cost reduction / DFM review",
      action:
        "Review drawing tolerance, batch quantities, and alternate suppliers; evaluate standard equivalent.",
    };
  if (number(row.leadTimeDays) >= 30)
    return {
      opportunity: "Lead-time reduction",
      action: "Set min stock / blanket PO or find local alternate.",
    };
  if (row.classification === "Needs Review")
    return {
      opportunity: "Classification and price review",
      action: "Clarify MTO/RTO status and benchmark vendor quote.",
    };
  return {
    opportunity: "Catalog price negotiation",
    action: "Consolidate recurring demand and negotiate price break.",
  };
}

function buildMechanicalAnalysis(derived = buildDerived()) {
  const sourceRows = allRows();
  const pos = derived.pos || [];
  const poByNumber = new Map(pos.map((po) => [cleanText(po.poNumber), po]));
  const productRows = sourceRows.filter(
    (row) => inferLineType(row.itemDesc, row.lineType) !== "charge",
  );
  const chargeRows = sourceRows.filter(
    (row) => inferLineType(row.itemDesc, row.lineType) === "charge",
  );
  const totalBomValue = roundMoney(
    productRows.reduce(
      (sum, row) =>
        sum + (number(row.itemTotal) || number(row.itemPrice) * number(row.quantityOrdered)),
      0,
    ),
  );
  const chargeByPo = new Map();
  chargeRows.forEach((row) => {
    const poNumber = cleanText(row.poNumber);
    const chargeValue = number(row.lineGrandTotal) || lineGrandTotal(row);
    chargeByPo.set(poNumber, roundMoney((chargeByPo.get(poNumber) || 0) + chargeValue));
  });
  const rawMechanicalRows = productRows.filter(isMechanicalProcurementLine);
  const mechanicalBaseByPo = new Map();
  rawMechanicalRows.forEach((row) => {
    const poNumber = cleanText(row.poNumber);
    const base = number(row.itemTotal) || number(row.itemPrice) * number(row.quantityOrdered);
    mechanicalBaseByPo.set(poNumber, roundMoney((mechanicalBaseByPo.get(poNumber) || 0) + base));
  });
  const cleanedLines = rawMechanicalRows
    .map((row, index) => {
      const po = poByNumber.get(cleanText(row.poNumber)) || {};
      const qty = number(row.quantityOrdered);
      const unitPrice = number(row.itemPrice);
      const lineTotalBeforeTax = roundMoney(number(row.itemTotal) || qty * unitPrice);
      const taxAmount = roundMoney(number(row.itemTaxAmount) || lineTotalBeforeTax * (number(row.itemTaxPercent) / 100));
      const lineTotal = roundMoney(number(row.lineGrandTotal) || lineTotalBeforeTax + taxAmount);
      const poMechanicalBase = mechanicalBaseByPo.get(cleanText(row.poNumber)) || 0;
      const allocatedFreight = poMechanicalBase
        ? roundMoney((chargeByPo.get(cleanText(row.poNumber)) || 0) * (lineTotalBeforeTax / poMechanicalBase))
        : 0;
      const landedCost = roundMoney(lineTotal + allocatedFreight);
      const deliveryDate = cleanText(row.deliveryDate || po.deliveryDate);
      const poDate = cleanText(row.poDate || po.poDate);
      const materialType = classifyMechanicalMaterial(row);
      const classification = classifyMechanicalSourcing(row, po);
      const deliveryStatus = displayDeliveryStatus({
        deliveryStatus: row.deliveryStatus || po.deliveryStatus,
        deliveryDate,
        edd: row.edd || po.edd,
      });
      return {
        bomLine: index + 1,
        poNumber: cleanText(row.poNumber || po.poNumber),
        itemDescription: cleanText(row.itemDesc) || "Unnamed mechanical item",
        vendor: cleanText(row.vendorName || po.vendorName) || "Unknown Vendor",
        source: cleanText(row.source || po.source),
        materialType,
        classification,
        qtyPerBom: qty,
        poQty: qty,
        unitPrice,
        lineTotalBeforeTax,
        taxAmount,
        lineTotal,
        allocatedFreight,
        landedCost,
        poDate,
        deliveryDate,
        leadTimeDays: leadTimeDays(poDate, deliveryDate),
        mechanicalSpendPercent: 0,
        totalBomPercent: 0,
        paymentStatus: normalizePaymentStatus(row.paymentStatus || po.paymentStatus),
        poStatus: normalizePoStatus(row.poStatus || po.poStatus),
        deliveryStatus,
        sourcingComment: "",
      };
    })
    .sort((a, b) => b.landedCost - a.landedCost);

  const mechanicalLineTotal = roundMoney(
    cleanedLines.reduce((sum, row) => sum + number(row.lineTotalBeforeTax), 0),
  );
  const mechanicalTax = roundMoney(
    cleanedLines.reduce((sum, row) => sum + number(row.taxAmount), 0),
  );
  const allocatedFreight = roundMoney(
    cleanedLines.reduce((sum, row) => sum + number(row.allocatedFreight), 0),
  );
  const mechanicalLanded = roundMoney(
    cleanedLines.reduce((sum, row) => sum + number(row.landedCost), 0),
  );
  cleanedLines.forEach((row, index) => {
    row.bomLine = index + 1;
    row.mechanicalSpendPercent = mechanicalPercent(row.landedCost, mechanicalLanded);
    row.totalBomPercent = mechanicalPercent(row.landedCost, totalBomValue);
    row.sourcingComment = mechanicalSourcingComment(row);
  });

  const groupRows = (rows, keyFn) => {
    const groups = new Map();
    rows.forEach((row) => {
      const key = keyFn(row) || "Unknown";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    });
    return groups;
  };
  const countBy = (rows, keyFn) => {
    const counts = new Map();
    rows.forEach((row) => {
      const key = keyFn(row) || "Unknown";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => `${key}: ${count}`)
      .join(", ");
  };
  const sortedBySpend = (rows) =>
    rows.sort((a, b) => number(b.totalSpend) - number(a.totalSpend));
  const vendorSummary = sortedBySpend(
    [...groupRows(cleanedLines, (row) => row.vendor)].map(([vendor, rows]) => {
      const totalSpend = roundMoney(rows.reduce((sum, row) => sum + row.landedCost, 0));
      const avgLeadTime = mechanicalAverage(rows.map((row) => row.leadTimeDays));
      const needsReviewCount = rows.filter((row) => row.classification === "Needs Review").length;
      const customCount = rows.filter((row) => row.classification === "Custom-made").length;
      const riskLevel = mechanicalRiskLevel(
        mechanicalPercent(totalSpend, mechanicalLanded),
        avgLeadTime,
        needsReviewCount,
        customCount,
      );
      const paymentStatuses = new Set(rows.map((row) => row.paymentStatus).filter(Boolean));
      return {
        vendor,
        totalSpend,
        spendPercent: mechanicalPercent(totalSpend, mechanicalLanded),
        lineCount: rows.length,
        avgUnitPrice: mechanicalAverage(rows.map((row) => row.unitPrice)),
        totalTax: roundMoney(rows.reduce((sum, row) => sum + row.taxAmount, 0)),
        allocatedFreight: roundMoney(rows.reduce((sum, row) => sum + row.allocatedFreight, 0)),
        avgLeadTime,
        paymentStatus:
          paymentStatuses.size === 1 ? [...paymentStatuses][0] || "Unknown" : "Mixed",
        materialTypes: [...new Set(rows.map((row) => row.materialType))].sort().join(", "),
        customSplit: countBy(rows, (row) => row.classification),
        riskLevel,
        recommendedAction: mechanicalVendorAction(
          riskLevel,
          avgLeadTime,
          needsReviewCount,
          customCount,
        ),
      };
    }),
  );
  const materialAnalysis = sortedBySpend(
    [...groupRows(cleanedLines, (row) => row.materialType)].map(([materialType, rows]) => ({
      materialType,
      totalSpend: roundMoney(rows.reduce((sum, row) => sum + row.landedCost, 0)),
      spendPercent: mechanicalPercent(
        rows.reduce((sum, row) => sum + row.landedCost, 0),
        mechanicalLanded,
      ),
      lineCount: rows.length,
      avgUnitPrice: mechanicalAverage(rows.map((row) => row.unitPrice)),
      avgLeadTime: mechanicalAverage(rows.map((row) => row.leadTimeDays)),
      customSpend: roundMoney(
        rows
          .filter((row) => row.classification === "Custom-made")
          .reduce((sum, row) => sum + row.landedCost, 0),
      ),
      offTheShelfSpend: roundMoney(
        rows
          .filter((row) => row.classification === "Off-the-shelf")
          .reduce((sum, row) => sum + row.landedCost, 0),
      ),
      needsReviewSpend: roundMoney(
        rows
          .filter((row) => row.classification === "Needs Review")
          .reduce((sum, row) => sum + row.landedCost, 0),
      ),
    })),
  );
  const customVsOts = ["Custom-made", "Needs Review", "Off-the-shelf"].map((category) => {
    const rows = cleanedLines.filter((row) => row.classification === category);
    const totalSpend = roundMoney(rows.reduce((sum, row) => sum + row.landedCost, 0));
    return {
      category,
      totalSpend,
      spendPercent: mechanicalPercent(totalSpend, mechanicalLanded),
      lineCount: rows.length,
      avgUnitPrice: mechanicalAverage(rows.map((row) => row.unitPrice)),
      avgLeadTime: mechanicalAverage(rows.map((row) => row.leadTimeDays)),
      vendorCount: new Set(rows.map((row) => row.vendor)).size,
      recommendation: mechanicalCategoryRecommendation(category),
    };
  });
  const leadTime = vendorSummary
    .map((vendor) => {
      const rows = cleanedLines.filter((row) => row.vendor === vendor.vendor);
      const leadValues = rows
        .map((row) => number(row.leadTimeDays))
        .filter((value) => value > 0);
      return {
        vendor: vendor.vendor,
        avgLeadTime: vendor.avgLeadTime,
        minLeadTime: leadValues.length ? Math.min(...leadValues) : "",
        maxLeadTime: leadValues.length ? Math.max(...leadValues) : "",
        lineCount: rows.length,
        totalSpend: vendor.totalSpend,
        riskComment:
          vendor.avgLeadTime >= 30
            ? "Delay risk: qualify alternate/source locally"
            : "Normal lead time; monitor only",
      };
    })
    .sort((a, b) => number(b.avgLeadTime) - number(a.avgLeadTime));
  const taxFreight = vendorSummary.map((vendor) => {
    const rows = cleanedLines.filter((row) => row.vendor === vendor.vendor);
    const base = rows.reduce((sum, row) => sum + row.lineTotalBeforeTax, 0);
    return {
      vendor: vendor.vendor,
      totalTax: vendor.totalTax,
      taxPercentOfBase: mechanicalPercent(vendor.totalTax, base),
      allocatedFreight: vendor.allocatedFreight,
      freightPercentOfLanded: mechanicalPercent(vendor.allocatedFreight, vendor.totalSpend),
      lineCount: vendor.lineCount,
    };
  });
  const opportunities = cleanedLines
    .map((row) => {
      const opp = mechanicalOpportunityForLine(row);
      const score =
        row.landedCost +
        (row.classification === "Custom-made" ? 30000 : 0) +
        (row.classification === "Needs Review" ? 15000 : 0) +
        (number(row.leadTimeDays) >= 30 ? 20000 : 0);
      return {
        ...opp,
        score,
        itemDescription: row.itemDescription,
        vendor: row.vendor,
        classification: row.classification,
        materialType: row.materialType,
        landedCost: row.landedCost,
        leadTime: row.leadTimeDays,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((row, index) => ({ rank: index + 1, ...row }));
  const avgLeadTime = mechanicalAverage(cleanedLines.map((row) => row.leadTimeDays));
  const benchmarkStatus =
    mechanicalPercent(mechanicalLanded, totalBomValue) > 3
      ? "above benchmark; main action is cost reduction on custom/mechanical assemblies rather than consumables."
      : "within benchmark; continue monitoring mechanical sourcing and lead time.";
  const dashboardRows = [
    { section: "Metric", item: "Total BOM Value (ex-freight)", value: money(totalBomValue), comment: "All non-charge PO line base value." },
    { section: "Metric", item: "Mechanical Spend (line total)", value: money(mechanicalLineTotal), comment: "Mechanical base line value before tax/freight." },
    { section: "Metric", item: "Mechanical Spend (landed)", value: money(mechanicalLanded), comment: "Mechanical line total plus tax and allocated freight." },
    { section: "Metric", item: "Mechanical Spend % of BOM", value: `${formatNumber(mechanicalPercent(mechanicalLanded, totalBomValue))}%`, comment: `Benchmark is 2% to 3%; current result is ${benchmarkStatus}` },
    { section: "Metric", item: "Mechanical Tax", value: money(mechanicalTax), comment: "Tax recorded on mechanical lines." },
    { section: "Metric", item: "Allocated Freight", value: money(allocatedFreight), comment: "PO freight allocated to mechanical lines by base value." },
    { section: "Metric", item: "Avg Lead Time (days)", value: formatNumber(avgLeadTime), comment: "Delivery date minus PO date where available." },
    { section: "Metric", item: "Mechanical Lines", value: formatNumber(cleanedLines.length), comment: "Mechanical lines detected from current PO data." },
    ...vendorSummary.slice(0, 10).map((row) => ({ section: "Vendor Spend", item: row.vendor, value: money(row.totalSpend), comment: row.recommendedAction })),
    ...materialAnalysis.map((row) => ({ section: "Material Spend", item: row.materialType, value: money(row.totalSpend), comment: `${formatNumber(row.spendPercent)}% of mechanical landed spend.` })),
    ...customVsOts.map((row) => ({ section: "Custom vs OTS", item: row.category, value: money(row.totalSpend), comment: row.recommendation })),
    ...leadTime.slice(0, 10).map((row) => ({ section: "Lead Time Focus", item: row.vendor, value: `${formatNumber(row.avgLeadTime)} days`, comment: row.riskComment })),
  ];
  const cleaningNotes = [
    { area: "Mechanical inclusion", method: "Included wheels, bearings, rods, plates, pulleys, belts, winches, pipes, joints, collars, rings, rollers, machined/fabricated parts, frames, brackets, housings, assemblies and similar mechanical BOM items." },
    { area: "Consumable exclusion", method: "Excluded nuts, bolts, washers, screws, fasteners, adhesives, tapes, packing and low-value general hardware unless clearly custom-engineered." },
    { area: "Freight allocation", method: "PO-level freight lines are allocated only to mechanical lines in the same PO, in proportion to base line value before tax." },
    { area: "Custom classification", method: "MTO/custom/drawing/fabricated/machined/assembly cues are treated as Custom-made; RTO/catalog/vendor-standard cues are treated as Off-the-shelf; unclear rows are Needs Review." },
    { area: "Lead time", method: "Lead Time Days = Delivery Date - PO Date. Missing or unclear dates are not invented." },
    { area: "Payment mode limitation", method: "Payment mode is not provided in the current PO data. Payment Status is used only as a proxy and should not be confused with payment mode." },
    { area: "Benchmark", method: "Management benchmark used: mechanical sourcing spend expected at 2% to 3% of total BOM value." },
  ];
  return {
    summary: {
      totalBomValue,
      mechanicalLineTotal,
      mechanicalLanded,
      mechanicalSpendPercent: mechanicalPercent(mechanicalLanded, totalBomValue),
      mechanicalTax,
      allocatedFreight,
      avgLeadTime,
      lineCount: cleanedLines.length,
      benchmarkStatus,
    },
    dashboardCards: [
      { label: "Mechanical Landed", value: compactMoney(mechanicalLanded), note: `${formatNumber(cleanedLines.length)} lines` },
      { label: "Spend % of BOM", value: `${formatNumber(mechanicalPercent(mechanicalLanded, totalBomValue))}%`, note: "Benchmark 2% to 3%" },
      { label: "Custom Spend", value: compactMoney(customVsOts.find((row) => row.category === "Custom-made")?.totalSpend || 0), note: "DFM / standardization target" },
      { label: "Avg Lead Time", value: `${formatNumber(avgLeadTime)} d`, note: "Vendor delivery focus" },
    ],
    tables: {
      Dashboard: dashboardRows,
      "Cleaned Lines": cleanedLines,
      "Vendor Summary": vendorSummary,
      "Material Analysis": materialAnalysis,
      "Custom vs OTS": customVsOts,
      "Lead Time": leadTime,
      "Tax Freight": taxFreight,
      Opportunities: opportunities,
      "Cleaning Notes": cleaningNotes,
    },
  };
}

function renderMechanicalAnalysisDashboard(analysis) {
  const grid = document.getElementById("mechanicalDashboardGrid");
  if (!grid) return;
  grid.innerHTML = analysis.dashboardCards
    .map(
      (card) => `
        <article class="mechanical-summary-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <small>${escapeHtml(card.note)}</small>
        </article>
      `,
    )
    .join("");
}

function renderMechanicalAnalysisTabs(activeTab) {
  const tabs = document.getElementById("mechanicalAnalysisTabs");
  if (!tabs) return;
  tabs.innerHTML = MECHANICAL_ANALYSIS_TABS.map(
    (tab) => `
      <button class="report-tab ${tab === activeTab ? "active" : ""}" type="button" data-mechanical-tab="${escapeHtml(tab)}">
        ${escapeHtml(tab)}
      </button>
    `,
  ).join("");
}

function renderMechanicalAnalysisTable(analysis) {
  const activeTab = MECHANICAL_ANALYSIS_TABS.includes(state.mechanicalAnalysisTab)
    ? state.mechanicalAnalysisTab
    : "Dashboard";
  const columns = MECHANICAL_ANALYSIS_COLUMNS[activeTab] || [];
  const rows = analysis.tables[activeTab] || [];
  const head = document.getElementById("mechanicalAnalysisHead");
  const body = document.getElementById("mechanicalAnalysisBody");
  const table = document.querySelector(".mechanical-report-table");
  if (table) {
    const minWidth = columns.reduce(
      (sum, column) => sum + (column.width || 16) * 10,
      0,
    );
    table.style.minWidth = `${Math.max(980, minWidth)}px`;
  }
  if (head) {
    head.innerHTML = `
      <tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>
    `;
  }
  if (body) {
    body.innerHTML = rows.length
      ? rows
          .map(
            (row) => `
              <tr>
                ${columns
                  .map(
                    (column) =>
                      `<td>${escapeHtml(reportDisplayValue(row[column.key], column.type))}</td>`,
                  )
                  .join("")}
              </tr>
            `,
          )
          .join("")
      : `<tr><td colspan="${columns.length || 1}" class="empty-state">No mechanical analysis rows available.</td></tr>`;
  }
}

function renderMechanicalAnalysis(analysis) {
  const panel = document.getElementById("mechanicalAnalysisPanel");
  if (!panel) return;
  panel.classList.toggle("hidden", !state.showMechanicalAnalysis);
  if (!state.showMechanicalAnalysis) return;
  const summary = document.getElementById("mechanicalAnalysisSummary");
  if (summary) {
    summary.textContent = `${formatNumber(analysis.summary.lineCount)} mechanical lines, ${money(analysis.summary.mechanicalLanded)} landed spend, ${formatNumber(analysis.summary.mechanicalSpendPercent)}% of BOM.`;
  }
  renderMechanicalAnalysisDashboard(analysis);
  renderMechanicalAnalysisTabs(state.mechanicalAnalysisTab);
  renderMechanicalAnalysisTable(analysis);
}

function procurementAuditState() {
  state.procurementAudit = normalizeProcurementAuditState(
    state.procurementAudit,
  );
  return state.procurementAudit;
}

function auditPoMap(derived = buildDerived()) {
  return new Map(
    (derived.pos || []).map((po) => [cleanText(po.poNumber), po]),
  );
}

function auditLineMap() {
  return new Map(
    allRows()
      .filter((line) => inferLineType(line.itemDesc, line.lineType) !== "charge")
      .map((line) => [cleanText(line.id), line]),
  );
}

function auditVendorScore(record = {}) {
  const weights = {
    priceCompetitiveness: 0.2,
    quality: 0.2,
    deliveryReliability: 0.2,
    technicalCapability: 0.15,
    responsiveness: 0.1,
    paymentFlexibility: 0.05,
    documentationDiscipline: 0.1,
  };
  let weighted = 0;
  let usedWeight = 0;
  Object.entries(weights).forEach(([key, weight]) => {
    const score = Number(record[key]);
    if (!Number.isFinite(score) || score <= 0) return;
    weighted += score * weight;
    usedWeight += weight;
  });
  const overallScore = usedWeight ? Number((weighted / usedWeight).toFixed(2)) : "";
  let classification = "Not Assessed";
  if (overallScore !== "") {
    if (overallScore > 8) classification = "Preferred";
    else if (overallScore >= 6) classification = "Approved";
    else if (overallScore >= 4) classification = "Conditional";
    else classification = "Avoid";
  }
  return { overallScore, classification };
}

function buildProcurementAuditRows(tab, derived = buildDerived()) {
  const audit = procurementAuditState();
  const poMap = auditPoMap(derived);
  const lineMap = auditLineMap();
  const poVendor = (poNumber) =>
    cleanText(poMap.get(cleanText(poNumber))?.vendorName || "");
  const invoicesByPo = new Map();
  const paymentsByPo = new Map();
  const receiptsByPo = new Map();
  audit.invoices.forEach((row) => {
    const key = cleanText(row.poNumber);
    if (!invoicesByPo.has(key)) invoicesByPo.set(key, []);
    invoicesByPo.get(key).push(row);
  });
  audit.payments.forEach((row) => {
    const key = cleanText(row.poNumber);
    if (!paymentsByPo.has(key)) paymentsByPo.set(key, []);
    paymentsByPo.get(key).push(row);
  });
  audit.receipts.forEach((row) => {
    const key = cleanText(row.poNumber);
    if (!receiptsByPo.has(key)) receiptsByPo.set(key, []);
    receiptsByPo.get(key).push(row);
  });

  if (tab === "Vendor Master") {
    const names = new Set([
      ...Object.keys(state.vendorContacts || {}),
      ...(derived.vendors || []).map((row) => cleanText(row.vendorName)),
    ]);
    return [...names]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .map((vendorName) => {
        const contact = state.vendorContacts[vendorName] || {};
        const derivedVendor =
          (derived.vendors || []).find(
            (row) => normalizeKey(row.vendorName) === normalizeKey(vendorName),
          ) || {};
        return {
          __id: vendorName,
          vendorName,
          vendorCategory: contact.vendorCategory || "",
          contactPerson: contact.contactPerson || "",
          contactPerson2: contact.contactPerson2 || "",
          email: contact.email || "",
          phone: contact.phone || "",
          phone2: contact.phone2 || "",
          currencyCode: contact.currencyCode || "INR",
          source: contact.source || derivedVendor.source || "",
          gstin: contact.gstin || derivedVendor.gstin || "",
        };
      });
  }

  if (tab === "PO Master") {
    return (derived.pos || [])
      .slice()
      .sort((a, b) => comparePoNumbers(a.poNumber, b.poNumber))
      .map((po) => {
        const saved = audit.poMaster[cleanText(po.poNumber)] || {};
        const payments = paymentsByPo.get(cleanText(po.poNumber)) || [];
        const advancePaid = payments
          .filter((row) => normalizeKey(row.paymentType) === "ADVANCE")
          .reduce((sum, row) => sum + number(row.amount), 0);
        const balancePaid = payments
          .filter((row) => normalizeKey(row.paymentType) !== "ADVANCE")
          .reduce((sum, row) => sum + number(row.amount), 0);
        const receipts = receiptsByPo.get(cleanText(po.poNumber)) || [];
        return {
          __id: po.poNumber,
          poNumber: po.poNumber,
          poDate: po.poDate || "",
          vendorName: po.vendorName || "",
          purchaseCategory:
            saved.purchaseCategory ||
            state.vendorContacts[po.vendorName]?.vendorCategory ||
            "",
          poTotal: number(po.poTotal),
          gstIncluded: saved.gstIncluded || "",
          advancePaid:
            saved.advancePaid === "" || saved.advancePaid == null
              ? advancePaid
              : number(saved.advancePaid),
          balancePaid,
          paymentStatus: po.paymentStatus || "Pending",
          expectedDeliveryDate: po.deliveryDate || "",
          actualDeliveryDate: po.deliveredDate || "",
          deliveryStatus: displayDeliveryStatus(po),
          grnAvailable: receipts.some((row) => cleanText(row.grnNumber))
            ? "Yes"
            : "No",
          invoiceAvailable: (invoicesByPo.get(cleanText(po.poNumber)) || [])
            .some((row) => cleanText(row.invoiceNumber))
            ? "Yes"
            : "No",
          auditStatus: saved.auditStatus || "Pending",
          auditNotes: saved.auditNotes || "",
        };
      });
  }

  if (tab === "Line Item Audit") {
    return [...lineMap.values()]
      .sort((a, b) => {
        const poCompare = comparePoNumbers(a.poNumber, b.poNumber);
        return poCompare || cleanText(a.itemDesc).localeCompare(cleanText(b.itemDesc));
      })
      .map((line) => {
        const saved = audit.lineAudits[cleanText(line.id)] || {};
        const benchmark = number(saved.benchmarkUnitPrice);
        const actual = number(line.itemPrice);
        const priceVariance =
          saved.priceVariance !== "" && saved.priceVariance != null
            ? number(saved.priceVariance)
            : benchmark > 0
              ? Number((((actual - benchmark) / benchmark) * 100).toFixed(2))
              : "";
        return {
          __id: line.id,
          lineId: line.id,
          poNumber: line.poNumber || "",
          vendorName: line.vendorName || poVendor(line.poNumber),
          itemName: line.itemDesc || "",
          quantity: number(line.quantityOrdered),
          unitPrice: actual,
          totalValue: number(line.itemTotal) || actual * number(line.quantityOrdered),
          purchaseType: saved.purchaseType || "",
          auditType: saved.auditType || "",
          itemMaturity: saved.itemMaturity || "",
          vendorType: saved.vendorType || "",
          purchaseUrgency: saved.purchaseUrgency || "",
          quoteCount: saved.quoteCount ?? "",
          technicalValidation: saved.technicalValidation || "Pending",
          priceBenchmarkAvailable: saved.priceBenchmarkAvailable || "",
          benchmarkUnitPrice: saved.benchmarkUnitPrice ?? "",
          backupVendorAvailable: saved.backupVendorAvailable || "",
          riskLevel: saved.riskLevel || "",
          actionRequired: saved.actionRequired || "",
          priceVariance,
          deliveryVariance: saved.deliveryVariance ?? "",
          qualityVariance: saved.qualityVariance || "",
        };
      });
  }

  if (tab === "Vendor Audit") {
    return buildProcurementAuditRows("Vendor Master", derived).map((vendor) => {
      const saved = audit.vendorAudits[vendor.vendorName] || {};
      return {
        __id: vendor.vendorName,
        vendorName: vendor.vendorName,
        ...saved,
        ...auditVendorScore(saved),
      };
    });
  }

  if (tab === "KPI Summary") {
    return buildProcurementAuditKpis(derived).map((row, index) => ({
      __id: `kpi-${index}`,
      metric: row.metric,
      value: row.value,
      definition: row.definition,
    }));
  }

  const collection = PROCUREMENT_AUDIT_CONFIG[tab]?.collection;
  const records = collection ? audit[collection] || [] : [];
  return records.map((record) => ({
    ...record,
    __id: record.id,
    vendorName:
      record.vendorName ||
      (record.poNumber ? poVendor(record.poNumber) : ""),
  }));
}

function buildProcurementAuditKpis(derived = buildDerived()) {
  const audit = procurementAuditState();
  const poRows = buildProcurementAuditRows("PO Master", derived);
  const lineRows = buildProcurementAuditRows("Line Item Audit", derived);
  const vendorRows = buildProcurementAuditRows("Vendor Audit", derived);
  const paidTotal = audit.payments.reduce(
    (sum, row) => sum + Math.max(0, number(row.amount)),
    0,
  );
  const pendingPayment = poRows.reduce(
    (sum, row) =>
      sum +
      Math.max(
        0,
        number(row.poTotal) - number(row.advancePaid) - number(row.balancePaid),
      ),
    0,
  );
  const deliveredWithDates = poRows.filter(
    (row) =>
      normalizeKey(row.deliveryStatus) === "DELIVERED" &&
      parseDateOnly(row.expectedDeliveryDate) &&
      parseDateOnly(row.actualDeliveryDate),
  );
  const onTimeCount = deliveredWithDates.filter(
    (row) =>
      parseDateOnly(row.actualDeliveryDate) <=
      parseDateOnly(row.expectedDeliveryDate),
  ).length;
  const leadTimes = deliveredWithDates
    .map((row) =>
      dateDiffDays(parseDateOnly(row.poDate), parseDateOnly(row.actualDeliveryDate)),
    )
    .filter((value) => Number.isFinite(value) && value >= 0);
  const inspected = audit.receipts.filter((row) =>
    ["PASSED", "FAILED", "CONDITIONAL"].includes(
      normalizeKey(row.inspectionStatus),
    ),
  );
  const compliantLines = lineRows.filter(
    (row) =>
      number(row.quoteCount) >= 2 ||
      normalizeKey(row.actionRequired).includes("APPROVED EXCEPTION"),
  ).length;
  const assessedVendors = vendorRows.filter(
    (row) => row.overallScore !== "" && row.overallScore != null,
  );
  return [
    { metric: "Total Spend", value: money(paidTotal), definition: "Sum of recorded payment transactions." },
    { metric: "Pending Payment", value: money(pendingPayment), definition: "PO value less recorded advance and balance payments." },
    { metric: "Active Vendors", value: formatNumber(buildProcurementAuditRows("Vendor Master", derived).length), definition: "Vendors currently present in Vendor Master." },
    { metric: "On-Time Delivery", value: deliveredWithDates.length ? `${Math.round((onTimeCount / deliveredWithDates.length) * 100)}%` : "Not Captured", definition: "Actual delivery on or before expected delivery, using delivered POs with both dates." },
    { metric: "Average Lead Time", value: leadTimes.length ? `${(leadTimes.reduce((sum, value) => sum + value, 0) / leadTimes.length).toFixed(1)} days` : "Not Captured", definition: "Actual delivery date minus PO date." },
    { metric: "Vendor Score", value: assessedVendors.length ? (assessedVendors.reduce((sum, row) => sum + number(row.overallScore), 0) / assessedVendors.length).toFixed(2) : "Not Assessed", definition: "Weighted average of completed 1-10 vendor assessments." },
    { metric: "RFQ Compliance", value: lineRows.length ? `${Math.round((compliantLines / lineRows.length) * 100)}%` : "Not Captured", definition: "Lines with two or more quotes or an approved exception." },
    { metric: "First-Pass Acceptance", value: inspected.length ? `${Math.round((inspected.filter((row) => normalizeKey(row.inspectionStatus) === "PASSED").length / inspected.length) * 100)}%` : "Not Captured", definition: "Recorded inspections passed at first receipt." },
    { metric: "Open Risks", value: formatNumber(audit.risks.filter((row) => normalizeKey(row.status) !== "CLOSED").length), definition: "Persistent risks not closed." },
    { metric: "Open Actions", value: formatNumber(audit.actions.filter((row) => normalizeKey(row.status) !== "CLOSED").length), definition: "Persistent actions not closed." },
  ];
}

function dateDiffDays(start, end) {
  if (!(start instanceof Date) || !(end instanceof Date)) return null;
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

function auditFieldDisplay(value, field = {}) {
  if (value === "" || value === null || value === undefined) return "Not Captured";
  if (field.type === "money") return money(number(value));
  if (field.type === "date") return formatDate(value);
  if (field.type === "number") return formatNumber(number(value));
  return String(value);
}

function renderProcurementAuditWorkspace(derived = buildDerived()) {
  const panel = document.getElementById("procurementAuditPanel");
  if (!panel) return;
  panel.classList.toggle("hidden", !state.showProcurementAudit);
  if (!state.showProcurementAudit) return;

  const tab = PROCUREMENT_AUDIT_TABS.includes(state.procurementAuditTab)
    ? state.procurementAuditTab
    : "Vendor Master";
  state.procurementAuditTab = tab;
  const config = PROCUREMENT_AUDIT_CONFIG[tab] || {};
  const rows = buildProcurementAuditRows(tab, derived);
  const fields =
    tab === "KPI Summary"
      ? [
          { key: "metric", label: "KPI" },
          { key: "value", label: "Value" },
          { key: "definition", label: "Definition" },
        ]
      : (config.fields || []).filter((field) => !field.hidden);
  const editable = tab !== "KPI Summary";
  const addButton = document.getElementById("addProcurementAuditRecordBtn");
  if (addButton)
    addButton.classList.toggle("hidden", !config.collection || !editable);

  const tabs = document.getElementById("procurementAuditTabs");
  if (tabs) {
    tabs.innerHTML = PROCUREMENT_AUDIT_TABS.map(
      (name) =>
        `<button class="report-tab${name === tab ? " active" : ""}" type="button" data-procurement-audit-tab="${escapeHtml(name)}">${escapeHtml(name)}</button>`,
    ).join("");
  }

  const head = document.getElementById("procurementAuditHead");
  if (head) {
    head.innerHTML = `<tr>${fields
      .map((field) => `<th>${escapeHtml(field.label)}</th>`)
      .join("")}${editable ? "<th>Actions</th>" : ""}</tr>`;
  }
  const body = document.getElementById("procurementAuditBody");
  if (body) {
    body.innerHTML = rows.length
      ? rows
          .map(
            (row) => `<tr>${fields
              .map(
                (field) =>
                  `<td>${escapeHtml(auditFieldDisplay(row[field.key], field))}</td>`,
              )
              .join("")}${
                editable
                  ? `<td><div class="inline-actions audit-row-actions"><button class="ghost-btn small-btn" type="button" data-audit-edit="${escapeHtml(row.__id)}">Edit</button>${config.collection ? `<button class="danger-btn small-btn" type="button" data-audit-delete="${escapeHtml(row.__id)}">Delete</button>` : ""}</div></td>`
                  : ""
              }</tr>`,
          )
          .join("")
      : `<tr><td colspan="${fields.length + (editable ? 1 : 0)}" class="empty-state">No ${escapeHtml(tab.toLowerCase())} records yet.</td></tr>`;
  }

  const audit = procurementAuditState();
  const dashboard = document.getElementById("procurementAuditDashboard");
  if (dashboard) {
    const kpis = buildProcurementAuditKpis(derived);
    dashboard.innerHTML = kpis
      .slice(0, 6)
      .map(
        (row) => `<article class="audit-summary-card"><span>${escapeHtml(row.metric)}</span><strong>${escapeHtml(row.value)}</strong></article>`,
      )
      .join("");
  }
  const coverage = document.getElementById("procurementAuditCoverage");
  if (coverage) {
    const missingLineAudits = buildProcurementAuditRows("Line Item Audit", derived)
      .filter((row) => !row.purchaseType || !row.auditType || !row.riskLevel)
      .length;
    const summary = document.getElementById("procurementAuditSummary");
    if (summary)
      summary.textContent = `${rows.length} ${tab.toLowerCase()} rows. Records are saved locally and prepared for authenticated Supabase sync.`;
    coverage.textContent = `${formatNumber(audit.invoices.length)} invoices, ${formatNumber(audit.payments.length)} payments, ${formatNumber(audit.receipts.length)} receipts, ${formatNumber(missingLineAudits)} line audits incomplete.`;
  }
}

function auditFormOptions(field, derived) {
  if (field.options) return field.options.map((value) => ({ value, label: value }));
  if (field.sourceOptions === "po") {
    return (derived.pos || [])
      .slice()
      .sort((a, b) => comparePoNumbers(a.poNumber, b.poNumber))
      .map((po) => ({
        value: po.poNumber,
        label: `${po.poNumber} - ${po.vendorName}`,
      }));
  }
  if (field.sourceOptions === "line") {
    return [...auditLineMap().values()].map((line) => ({
      value: line.id,
      label: `${line.poNumber} - ${line.itemDesc}`,
    }));
  }
  if (field.sourceOptions === "invoice") {
    return procurementAuditState().invoices.map((invoice) => ({
      value: invoice.id,
      label: `${invoice.poNumber} - ${invoice.invoiceNumber}`,
    }));
  }
  return [];
}

function openProcurementAuditModal(recordId = null) {
  const tab = state.procurementAuditTab;
  const config = PROCUREMENT_AUDIT_CONFIG[tab];
  if (!config || config.readonly) return;
  const derived = buildDerived();
  const rows = buildProcurementAuditRows(tab, derived);
  const record = recordId
    ? rows.find((row) => cleanText(row.__id) === cleanText(recordId)) || {}
    : {};
  state.procurementAuditEditingId = recordId || null;

  const title = document.getElementById("procurementAuditModalTitle");
  const subtext = document.getElementById("procurementAuditModalSubtext");
  if (title) title.textContent = `${recordId ? "Edit" : "Add"} ${tab} Record`;
  if (subtext)
    subtext.textContent =
      "Enter verified information only. Missing evidence should remain Not Captured or be added to Missing Documents.";
  const mount = document.getElementById("procurementAuditFormFields");
  if (!mount) return;
  mount.innerHTML = (config.fields || [])
    .filter((field) => !field.hidden)
    .map((field) => {
      const value = record[field.key] ?? "";
      const options = auditFormOptions(field, derived);
      const classes = field.type === "textarea" ? "field-full" : "field";
      const required = field.required ? " required" : "";
      const readonly = field.readonly ? " readonly" : "";
      if (options.length || field.options || field.sourceOptions) {
        return `<label class="${classes}"><span>${escapeHtml(field.label)}</span><select class="control-input" name="${escapeHtml(field.key)}"${required}${field.readonly ? " disabled" : ""}><option value="">Select</option>${options.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}</select></label>`;
      }
      if (field.type === "textarea") {
        return `<label class="${classes}"><span>${escapeHtml(field.label)}</span><textarea name="${escapeHtml(field.key)}"${required}${readonly}>${escapeHtml(value)}</textarea></label>`;
      }
      const inputType = ["date", "email", "number"].includes(field.type)
        ? field.type
        : "text";
      return `<label class="${classes}"><span>${escapeHtml(field.label)}</span><input class="control-input" name="${escapeHtml(field.key)}" type="${inputType}" value="${escapeHtml(value)}"${required}${readonly}${field.min != null ? ` min="${field.min}"` : ""}${field.max != null ? ` max="${field.max}"` : ""}${field.step ? ` step="${field.step}"` : ""} /></label>`;
    })
    .join("");
  document
    .getElementById("procurementAuditModalBackdrop")
    ?.classList.remove("hidden");
}

function closeProcurementAuditModal() {
  document
    .getElementById("procurementAuditModalBackdrop")
    ?.classList.add("hidden");
  state.procurementAuditEditingId = null;
}

function auditFormValue(form, field) {
  const element = form.elements.namedItem(field.key);
  if (!element) return "";
  const value = cleanText(element.value);
  if (field.type === "number" || field.type === "money")
    return value === "" ? "" : number(value);
  return value;
}

function rejectProcurementAuditField(form, fieldName, message) {
  const element = form.elements.namedItem(fieldName);
  if (!element) {
    window.alert(message);
    return false;
  }
  element.setCustomValidity(message);
  element.reportValidity();
  const clearError = () => element.setCustomValidity("");
  element.addEventListener("input", clearError, { once: true });
  element.addEventListener("change", clearError, { once: true });
  element.focus();
  return false;
}

function validateProcurementAuditRecord(tab, record, form) {
  if (tab === "Vendor Master" && record.gstin) {
    record.gstin = cleanText(record.gstin).toUpperCase();
    if (!/^[0-9A-Z]{15}$/.test(record.gstin))
      return rejectProcurementAuditField(
        form,
        "gstin",
        "GSTIN must contain exactly 15 letters or numbers.",
      );
  }

  if (tab === "PO Master") {
    const advancePaid = toNumeric(record.advancePaid);
    const poTotal = toNumeric(record.poTotal);
    if (advancePaid < 0 || (poTotal > 0 && advancePaid > poTotal))
      return rejectProcurementAuditField(
        form,
        "advancePaid",
        "Advance paid must be between zero and the PO total.",
      );
  }

  if (tab === "Invoices") {
    if (toNumeric(record.invoiceAmount) <= 0)
      return rejectProcurementAuditField(
        form,
        "invoiceAmount",
        "Invoice amount must be greater than zero.",
      );
    const duplicate = procurementAuditState().invoices.some(
      (invoice) =>
        cleanText(invoice.id) !== cleanText(state.procurementAuditEditingId) &&
        cleanText(invoice.poNumber) === cleanText(record.poNumber) &&
        normalizeKey(invoice.invoiceNumber) === normalizeKey(record.invoiceNumber),
    );
    if (duplicate)
      return rejectProcurementAuditField(
        form,
        "invoiceNumber",
        "This invoice number is already recorded for the selected PO.",
      );
  }

  if (tab === "Payments") {
    if (toNumeric(record.amount) <= 0)
      return rejectProcurementAuditField(
        form,
        "amount",
        "Payment amount must be greater than zero.",
      );
    const invoice = procurementAuditState().invoices.find(
      (row) => cleanText(row.id) === cleanText(record.invoiceId),
    );
    if (invoice && cleanText(invoice.poNumber) !== cleanText(record.poNumber))
      return rejectProcurementAuditField(
        form,
        "invoiceId",
        "The selected invoice belongs to a different PO.",
      );
  }

  if (tab === "Receipts") {
    if (toNumeric(record.rejectionQuantity) > toNumeric(record.receivedQuantity))
      return rejectProcurementAuditField(
        form,
        "rejectionQuantity",
        "Rejected quantity cannot exceed received quantity.",
      );
    const line = auditLineMap().get(cleanText(record.lineId));
    if (line && cleanText(line.poNumber) !== cleanText(record.poNumber))
      return rejectProcurementAuditField(
        form,
        "lineId",
        "The selected PO line belongs to a different PO.",
      );
  }

  return true;
}

function saveProcurementAuditRecord(event) {
  event.preventDefault();
  const tab = state.procurementAuditTab;
  const config = PROCUREMENT_AUDIT_CONFIG[tab];
  if (!config || config.readonly) return;
  const form = event.currentTarget;
  const existingRows = buildProcurementAuditRows(tab, buildDerived());
  const existing =
    existingRows.find(
      (row) =>
        cleanText(row.__id) === cleanText(state.procurementAuditEditingId),
    ) || {};
  const record = { ...existing };
  (config.fields || []).forEach((field) => {
    if (field.hidden) return;
    if (field.readonly && existing[field.key] != null) {
      record[field.key] = existing[field.key];
      return;
    }
    record[field.key] = auditFormValue(form, field);
  });
  if (!validateProcurementAuditRecord(tab, record, form)) return;
  const audit = procurementAuditState();

  if (config.source === "vendor") {
    const vendorName = cleanText(record.vendorName);
    state.vendorContacts[vendorName] = {
      ...(state.vendorContacts[vendorName] || {}),
      vendorName,
      vendorCategory: record.vendorCategory,
      contactPerson: record.contactPerson,
      contactPerson2: record.contactPerson2,
      email: record.email,
      phone: record.phone,
      phone2: record.phone2,
      currencyCode: record.currencyCode || "INR",
      source: record.source,
      gstin: record.gstin,
    };
  } else if (config.source === "po") {
    audit.poMaster[cleanText(record.poNumber)] = {
      ...(audit.poMaster[cleanText(record.poNumber)] || {}),
      purchaseCategory: record.purchaseCategory,
      gstIncluded: record.gstIncluded,
      advancePaid: record.advancePaid,
      auditStatus: record.auditStatus || "Pending",
      auditNotes: record.auditNotes || "",
    };
  } else if (config.source === "line") {
    audit.lineAudits[cleanText(record.lineId)] = Object.fromEntries(
      (config.fields || [])
        .filter((field) => !field.readonly && !field.hidden)
        .map((field) => [field.key, record[field.key]]),
    );
  } else if (config.source === "vendorAudit") {
    const vendorName = cleanText(record.vendorName);
    audit.vendorAudits[vendorName] = Object.fromEntries(
      (config.fields || [])
        .filter(
          (field) =>
            !field.readonly &&
            !["overallScore", "classification"].includes(field.key),
        )
        .map((field) => [field.key, record[field.key]]),
    );
  } else if (config.collection) {
    const collection = audit[config.collection];
    const id = state.procurementAuditEditingId || uid("audit");
    const selectedPo = auditPoMap(buildDerived()).get(cleanText(record.poNumber));
    const nextRecord = {
      ...record,
      id,
      vendorName: record.vendorName || selectedPo?.vendorName || "",
      updatedAt: new Date().toISOString(),
    };
    const index = collection.findIndex((row) => cleanText(row.id) === cleanText(id));
    if (index >= 0) collection[index] = nextRecord;
    else collection.push(nextRecord);
  }

  saveState();
  closeProcurementAuditModal();
  renderAll();
  syncProcurementAuditToSupabase();
}

function deleteProcurementAuditRecord(recordId) {
  const config = PROCUREMENT_AUDIT_CONFIG[state.procurementAuditTab];
  if (!config?.collection || !recordId) return;
  const ok = window.confirm("Delete this audit record?");
  if (!ok) return;
  const audit = procurementAuditState();
  audit[config.collection] = audit[config.collection].filter(
    (row) => cleanText(row.id) !== cleanText(recordId),
  );
  if (config.collection === "invoices") {
    audit.payments = audit.payments.map((payment) =>
      cleanText(payment.invoiceId) === cleanText(recordId)
        ? { ...payment, invoiceId: "" }
        : payment,
    );
  }
  if (config.collection === "risks") {
    audit.actions = audit.actions.map((action) =>
      cleanText(action.riskId) === cleanText(recordId)
        ? { ...action, riskId: "" }
        : action,
    );
  }
  saveState();
  renderAll();
  deleteProcurementAuditRecordFromSupabase(config.collection, recordId);
}

function handleProcurementAuditTableAction(event) {
  const edit = event.target.closest("[data-audit-edit]");
  if (edit) {
    openProcurementAuditModal(edit.dataset.auditEdit);
    return;
  }
  const remove = event.target.closest("[data-audit-delete]");
  if (remove) deleteProcurementAuditRecord(remove.dataset.auditDelete);
}

function renderReports(derived = buildDerived()) {
  const rows = buildProcurementReportRows(derived);
  const mechanicalAnalysis = buildMechanicalAnalysis(derived);
  const totalValue = rows.reduce((sum, row) => sum + number(row.lineTotal), 0);
  const uniquePos = new Set(rows.map((row) => row.poNumber).filter(Boolean));
  const reportKpiGrid = document.getElementById("reportKpiGrid");
  if (reportKpiGrid) {
    reportKpiGrid.innerHTML = `
      <article class="kpi-card kpi-cyan report-kpi-card" data-report-action="open-procurement" role="button" tabindex="0">
        <div class="kpi-icon">${kpiIconSvg("file")}</div>
        <div class="kpi-content">
          <div class="kpi-label"><span>Procurement Report</span></div>
          <div class="kpi-value">${escapeHtml(formatNumber(rows.length))}</div>
          <div class="kpi-note">${escapeHtml(formatNumber(uniquePos.size))} POs · ${escapeHtml(compactMoney(totalValue))}</div>
        </div>
      </article>
      <article class="kpi-card kpi-cyan report-kpi-card" data-report-action="open-mechanical" role="button" tabindex="0">
        <div class="kpi-icon">${kpiIconSvg("shield")}</div>
        <div class="kpi-content">
          <div class="kpi-label"><span>Mechanical Procurement Analysis</span></div>
          <div class="kpi-value">${escapeHtml(compactMoney(mechanicalAnalysis.summary.mechanicalLanded))}</div>
          <div class="kpi-note">${escapeHtml(formatNumber(mechanicalAnalysis.summary.lineCount))} lines - ${escapeHtml(formatNumber(mechanicalAnalysis.summary.mechanicalSpendPercent))}% of BOM</div>
        </div>
      </article>
      <article class="kpi-card kpi-cyan report-kpi-card" data-report-action="open-audit" role="button" tabindex="0">
        <div class="kpi-icon">${kpiIconSvg("shield")}</div>
        <div class="kpi-content">
          <div class="kpi-label"><span>Procurement Audit Workspace</span></div>
          <div class="kpi-value">${escapeHtml(formatNumber(procurementAuditState().risks.filter((row) => normalizeKey(row.status) !== "CLOSED").length))}</div>
          <div class="kpi-note">Open risks - evidence-based audit records</div>
        </div>
      </article>
    `;
  }

  const panel = document.getElementById("procurementReportPanel");
  if (panel) panel.classList.toggle("hidden", !state.showProcurementReport);
  renderMechanicalAnalysis(mechanicalAnalysis);
  renderProcurementAuditWorkspace(derived);
  if (!panel || !state.showProcurementReport) return;

  const head = document.getElementById("procurementReportHead");
  const body = document.getElementById("procurementReportBody");
  const summary = document.getElementById("procurementReportSummary");
  if (summary) {
    summary.textContent = `${rows.length} line items across ${uniquePos.size} purchase orders. Export creates a formatted Excel workbook.`;
  }
  if (head) {
    head.innerHTML = `
      <tr>${PROCUREMENT_REPORT_COLUMNS.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>
    `;
  }
  if (body) {
    body.innerHTML = rows.length
      ? rows
          .map(
            (row) => `
              <tr>
                ${PROCUREMENT_REPORT_COLUMNS.map(
                  (column) =>
                    `<td>${escapeHtml(reportDisplayValue(row[column.key], column.type))}</td>`,
                ).join("")}
              </tr>
            `,
          )
          .join("")
      : `<tr><td colspan="${PROCUREMENT_REPORT_COLUMNS.length}" class="empty-state">No procurement rows available.</td></tr>`;
  }
}

function handleReportAction(event) {
  const card = event.target.closest("[data-report-action]");
  if (!card) return;
  if (card.dataset.reportAction === "open-procurement") {
    state.showProcurementReport = true;
    state.showMechanicalAnalysis = false;
    state.showProcurementAudit = false;
    renderReports(buildDerived());
    document
      .getElementById("procurementReportPanel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (card.dataset.reportAction === "open-mechanical") {
    state.showMechanicalAnalysis = true;
    state.showProcurementReport = false;
    state.showProcurementAudit = false;
    renderReports(buildDerived());
    document
      .getElementById("mechanicalAnalysisPanel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (card.dataset.reportAction === "open-audit") {
    state.showProcurementAudit = true;
    state.showMechanicalAnalysis = false;
    state.showProcurementReport = false;
    renderReports(buildDerived());
    document
      .getElementById("procurementAuditPanel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function xlsxColumnName(index) {
  let value = index + 1;
  let name = "";
  while (value > 0) {
    const remainder = (value - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    value = Math.floor((value - 1) / 26);
  }
  return name;
}

function addSharedString(sharedStrings, value) {
  const text = String(value ?? "");
  if (!sharedStrings) return null;
  if (sharedStrings.map.has(text)) return sharedStrings.map.get(text);
  const index = sharedStrings.items.length;
  sharedStrings.map.set(text, index);
  sharedStrings.items.push(text);
  return index;
}

function buildSharedStringsXml(sharedStrings) {
  const items = sharedStrings.items || [];
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${items.length}" uniqueCount="${items.length}">
  ${items
    .map(
      (value) =>
        `<si><t xml:space="preserve">${xmlEscape(value)}</t></si>`,
    )
    .join("")}
</sst>`;
}

function xlsxCell(
  rowIndex,
  columnIndex,
  value,
  style = 0,
  type = "text",
  sharedStrings = null,
  cachedValue = null,
) {
  const ref = `${xlsxColumnName(columnIndex)}${rowIndex}`;
  const styleAttr = style ? ` s="${style}"` : "";
  if (value === null || value === undefined || value === "") {
    return `<c r="${ref}"${styleAttr}/>`;
  }
  if (["money", "number", "percent"].includes(type)) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      return `<c r="${ref}"${styleAttr}><v>${numeric}</v></c>`;
    }
  }
  if (type === "formula") {
    const formula = String(value).startsWith("=")
      ? String(value).slice(1)
      : String(value);
    if (cachedValue !== null && cachedValue !== undefined && cachedValue !== "") {
      if (Number.isFinite(Number(cachedValue))) {
        return `<c r="${ref}"${styleAttr}><f>${xmlEscape(formula)}</f><v>${Number(cachedValue)}</v></c>`;
      }
      return `<c r="${ref}"${styleAttr} t="str"><f>${xmlEscape(formula)}</f><v>${xmlEscape(cachedValue)}</v></c>`;
    }
    return `<c r="${ref}"${styleAttr}><f>${xmlEscape(formula)}</f></c>`;
  }
  if (sharedStrings) {
    return `<c r="${ref}"${styleAttr} t="s"><v>${addSharedString(sharedStrings, value)}</v></c>`;
  }
  return `<c r="${ref}"${styleAttr} t="inlineStr"><is><t>${xmlEscape(value)}</t></is></c>`;
}

function xlsxRow(rowIndex, cells, style = 0, sharedStrings = null) {
  return `<row r="${rowIndex}">${cells
    .map((cell, columnIndex) =>
      xlsxCell(
        rowIndex,
        columnIndex,
        cell.value,
        cell.style ?? style,
        cell.type || "text",
        sharedStrings,
        cell.cachedValue,
      ),
    )
    .join("")}</row>`;
}

function crc32(bytes) {
  if (!crc32.table) {
    crc32.table = Array.from({ length: 256 }, (_, index) => {
      let c = index;
      for (let k = 0; k < 8; k += 1) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      return c >>> 0;
    });
  }
  let crc = 0xffffffff;
  bytes.forEach((byte) => {
    crc = crc32.table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  });
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  const time =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const day =
    ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, day };
}

function uint16(value) {
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, value, true);
  return bytes;
}

function uint32(value) {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value >>> 0, true);
  return bytes;
}

function concatBytes(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  parts.forEach((part) => {
    output.set(part, offset);
    offset += part.length;
  });
  return output;
}

function createZipBlob(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const { time, day } = dosDateTime();

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const dataBytes =
      file.content instanceof Uint8Array
        ? file.content
        : encoder.encode(file.content);
    const crc = crc32(dataBytes);
    const localHeader = concatBytes([
      uint32(0x04034b50),
      uint16(20),
      uint16(0x0800),
      uint16(0),
      uint16(time),
      uint16(day),
      uint32(crc),
      uint32(dataBytes.length),
      uint32(dataBytes.length),
      uint16(nameBytes.length),
      uint16(0),
      nameBytes,
    ]);
    localParts.push(localHeader, dataBytes);

    const centralHeader = concatBytes([
      uint32(0x02014b50),
      uint16(20),
      uint16(20),
      uint16(0x0800),
      uint16(0),
      uint16(time),
      uint16(day),
      uint32(crc),
      uint32(dataBytes.length),
      uint32(dataBytes.length),
      uint16(nameBytes.length),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(0),
      uint32(offset),
      nameBytes,
    ]);
    centralParts.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const endRecord = concatBytes([
    uint32(0x06054b50),
    uint16(0),
    uint16(0),
    uint16(files.length),
    uint16(files.length),
    uint32(centralDirectory.length),
    uint32(offset),
    uint16(0),
  ]);
  return new Blob([...localParts, centralDirectory, endRecord], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

function buildProcurementReportWorkbook(rows) {
  const lastColumn = xlsxColumnName(PROCUREMENT_REPORT_COLUMNS.length - 1);
  const tableStartRow = 6;
  const firstDataRow = tableStartRow + 1;
  const lastRow = Math.max(firstDataRow, firstDataRow + rows.length - 1);
  const sharedStrings = { items: [], map: new Map() };
  const totalLineValue = rows.reduce((sum, row) => sum + number(row.lineTotal), 0);
  const totalBalance = rows.reduce((sum, row) => sum + number(row.balanceDue), 0);
  const uniquePos = new Set(rows.map((row) => row.poNumber).filter(Boolean));
  const generatedOn = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const headerCells = PROCUREMENT_REPORT_COLUMNS.map((column) => ({
    value: column.label,
    style: 5,
  }));
  const dataRows = rows.map((row, rowOffset) =>
    xlsxRow(
      firstDataRow + rowOffset,
      PROCUREMENT_REPORT_COLUMNS.map((column) => ({
        value: row[column.key],
        type: column.type,
        style:
          column.type === "money"
            ? 7
            : column.type === "number"
              ? 8
              : column.type === "percent"
                ? 10
                : 6,
      })),
      0,
      sharedStrings,
    ),
  );

  const sheetXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="A1:${lastColumn}${lastRow}"/>
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="6" topLeftCell="A7" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    ${PROCUREMENT_REPORT_COLUMNS.map((column, index) => `<col min="${index + 1}" max="${index + 1}" width="${column.width}" customWidth="1"/>`).join("")}
  </cols>
  <sheetData>
    ${xlsxRow(1, [{ value: "Procurement Report", style: 1 }, ...Array(PROCUREMENT_REPORT_COLUMNS.length - 1).fill({ value: "", style: 1 })], 0, sharedStrings)}
    ${xlsxRow(2, [{ value: `Generated ${generatedOn}`, style: 2 }, ...Array(PROCUREMENT_REPORT_COLUMNS.length - 1).fill({ value: "", style: 2 })], 0, sharedStrings)}
    ${xlsxRow(4, [
      { value: "Purchase Orders", style: 3 },
      { value: uniquePos.size, type: "number", style: 4 },
      { value: "Line Items", style: 3 },
      { value: rows.length, type: "number", style: 4 },
      { value: "Line Value", style: 3 },
      { value: totalLineValue, type: "money", style: 7 },
      { value: "Balance Due", style: 3 },
      { value: totalBalance, type: "money", style: 7 },
    ], 0, sharedStrings)}
    ${xlsxRow(tableStartRow, headerCells, 0, sharedStrings)}
    ${dataRows.join("")}
  </sheetData>
  <mergeCells count="2"><mergeCell ref="A1:${lastColumn}1"/><mergeCell ref="A2:${lastColumn}2"/></mergeCells>
  <autoFilter ref="A${tableStartRow}:${lastColumn}${lastRow}"/>
  <pageMargins left="0.4" right="0.4" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>
</worksheet>`;

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="3">
    <numFmt numFmtId="164" formatCode="&quot;INR &quot;#,##0.00"/>
    <numFmt numFmtId="165" formatCode="#,##0.00"/>
    <numFmt numFmtId="166" formatCode="0.00%"/>
  </numFmts>
  <fonts count="4">
    <font><sz val="11"/><color rgb="FF111827"/><name val="Aptos"/></font>
    <font><b/><sz val="18"/><color rgb="FFFFFFFF"/><name val="Aptos Display"/></font>
    <font><b/><sz val="11"/><color rgb="FF111827"/><name val="Aptos"/></font>
    <font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
  </fonts>
  <fills count="5">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF111827"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFE500"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF8FAFC"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFE5E7EB"/></left><right style="thin"><color rgb="FFE5E7EB"/></right><top style="thin"><color rgb="FFE5E7EB"/></top><bottom style="thin"><color rgb="FFE5E7EB"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="11">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="165" fontId="2" fillId="4" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/>
    <xf numFmtId="166" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;

  const sharedStringsXml = buildSharedStringsXml(sharedStrings);

  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Procurement Report" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;

  return createZipBlob([
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`,
    },
    {
      name: "docProps/core.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Procurement Report</dc:title>
  <dc:creator>Stack n Stock Procurement Dashboard</dc:creator>
  <dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
</cp:coreProperties>`,
    },
    {
      name: "docProps/app.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Stack n Stock Procurement Dashboard</Application>
</Properties>`,
    },
    {
      name: "xl/workbook.xml",
      content: workbookXml,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>`,
    },
    {
      name: "xl/styles.xml",
      content: stylesXml,
    },
    {
      name: "xl/sharedStrings.xml",
      content: sharedStringsXml,
    },
    {
      name: "xl/worksheets/sheet1.xml",
      content: sheetXml,
    },
  ]);
}

function buildSourcingAuditWorkbook() {
  const sharedStrings = { items: [], map: new Map() };
  const derived = buildDerived();
  const pos = (derived.pos || [])
    .slice()
    .sort((a, b) => comparePoNumbers(a.poNumber, b.poNumber));
  const sourceRows = allRows();
  const poByNumber = new Map(pos.map((po) => [cleanText(po.poNumber), po]));
  const productQuoteCounts = new Map(
    (derived.products || []).map((product) => [
      cleanText(product.productName),
      Math.max(1, number(product.vendorCount)),
    ]),
  );
  const lineItems = sourceRows
    .filter((row) => inferLineType(row.itemDesc, row.lineType) !== "charge")
    .sort((a, b) => {
      const poCompare = comparePoNumbers(a.poNumber, b.poNumber);
      if (poCompare !== 0) return poCompare;
      return cleanText(a.itemDesc).localeCompare(cleanText(b.itemDesc), undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

  const cell = (value = "", type = "text", style = 0, cachedValue = null) => ({
    value,
    type,
    style,
    cachedValue,
  });
  const header = (values) => values.map((value) => cell(value, "text", 1));
  const yesNo = (value) => (value ? "Yes" : "No");
  const auditVendorName = (value) => {
    const name = cleanText(value);
    const raw = normalizeKey(name);
    if (
      raw === "MISUMI" ||
      raw === "MISUMI INDIA" ||
      raw === "MISUMI INDIA PVT LTD" ||
      raw === "MISUMI INDIA PRIVATE LIMITED"
    )
      return "Misumi India Pvt Ltd";
    return name;
  };
  const poLinesByNumber = new Map();
  sourceRows.forEach((row) => {
    const poNumber = cleanText(row.poNumber);
    if (!poNumber) return;
    if (!poLinesByNumber.has(poNumber)) poLinesByNumber.set(poNumber, []);
    poLinesByNumber.get(poNumber).push(row);
  });
  const totalAmount = (po) => Math.max(0, roundMoney(number(po.poTotal)));
  const paidAmount = (po) => Math.max(0, roundMoney(number(po.amountPaid)));
  const pendingBalance = (po) =>
    Math.max(0, roundMoney(totalAmount(po) - paidAmount(po)));
  const poRecords = (po) => [
    po,
    ...(poLinesByNumber.get(cleanText(po.poNumber)) || []),
  ];
  const firstField = (records, keys) => {
    for (const record of records) {
      for (const key of keys) {
        const value = cleanText(record?.[key]);
        if (value) return value;
      }
    }
    return "";
  };
  const invoiceNumber = (po) =>
    firstField(poRecords(po), [
      "invoiceNumber",
      "invoiceNo",
      "invoice_no",
      "billNo",
      "billNumber",
      "bill_no",
    ]);
  const invoiceDate = (po) =>
    firstField(poRecords(po), [
      "invoiceDate",
      "invoice_date",
      "billDate",
      "bill_date",
      "voucherDate",
      "voucher_date",
    ]);
  const hasInvoiceTrace = (po) => Boolean(invoiceNumber(po) && invoiceDate(po));
  const gstCorrect = (po) => {
    const lines = poLinesByNumber.get(cleanText(po.poNumber)) || [];
    const hasTax = number(po.taxTotal) > 0 || lines.some(
      (line) => number(line.itemTaxAmount) > 0 || number(line.itemTaxPercent) > 0,
    );
    if (hasTax) return "Yes";
    return totalAmount(po) > 0 ? "N/A" : "No";
  };
  const formulaCell = (formula, style = 0, cachedValue = null) =>
    cell(formula, "formula", style, cachedValue);
  const addWorkingDays = (days) => {
    const date = todayDateOnly();
    let remaining = Math.max(0, Number(days) || 0);
    while (remaining > 0) {
      date.setDate(date.getDate() + 1);
      const weekday = date.getDay();
      if (weekday !== 0 && weekday !== 6) remaining -= 1;
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const auditCategory = (po) => {
    const rawMaterial = normalizeKey(po.materialType);
    const source = normalizeKey(po.source);
    const vendor = normalizeKey(po.vendorName);
    const items = (poLinesByNumber.get(cleanText(po.poNumber)) || [])
      .map((row) => normalizeKey(row.itemDesc))
      .join(" ");
    const searchable = `${rawMaterial} ${source} ${vendor} ${items}`;
    if (vendor.includes("AMAZON") || source.includes("AMAZON"))
      return "Amazon / Online Purchase";
    if (rawMaterial === "RTO" || searchable.includes(" RTO ")) return "RTO";
    if (rawMaterial === "MTO" || searchable.includes(" MTO ")) return "MTO";
    if (/(STEEL|ROD|PLATE|PIPE|SS|MS|ALUMINIUM|ALUMINUM|BRASS|COPPER|PLYWOOD|GLASS)/.test(searchable))
      return "Raw Material";
    if (/(MOTOR|SENSOR|WIRE|CABLE|ELECTRIC|ELECTRICAL|LED|SWITCH|SMPS|BATTERY|RELAY)/.test(searchable))
      return "Electrical";
    if (/(DRILL|CUTTER|TOOL|BLADE|TAP|DIE|BIT|SPANNER|WRENCH)/.test(searchable))
      return "Tools";
    if (/(TAPE|GLUE|OIL|GREASE|PAINT|SCREW|BOLT|NUT|WASHER|CONSUMABLE)/.test(searchable))
      return "Consumables";
    if (/(FABRICAT|WELD|MACHIN|FRAME|BRACKET|BENDING|CUTTING)/.test(searchable))
      return "Fabrication";
    if (/(BEARING|PULLEY|BELT|WHEEL|GEAR|SHAFT|SPRING|VALVE|COUPLING|CHAIN|ROLLER)/.test(searchable))
      return "Mechanical";
    return "Bought Out";
  };
  const auditPayment = (po) => {
    const total = totalAmount(po);
    const paid = paidAmount(po);
    if (paid <= 0) return "Pending";
    if (total > 0 && paid >= total) return "Paid";
    if (paid > 0) return "Partially Paid";
    return "Pending";
  };
  const auditDelivery = (po) => {
    const status = displayDeliveryStatus(po);
    if (status === "Delivered") return "Delivered";
    if (status === "Partially Delivered") return "Partial";
    return "Pending";
  };
  const materialReceived = (po) => {
    const status = auditDelivery(po);
    if (status === "Delivered") return "Full";
    if (status === "Partial") return "Partial";
    return "None";
  };
  const invoiceAvailable = (po) => yesNo(hasInvoiceTrace(po));
  const paymentProofAvailable = (po) => yesNo(paidAmount(po) > 0);
  const grnAvailable = (po) => yesNo(materialReceived(po) === "Full");
  const paymentApproval = (po) => yesNo(paidAmount(po) > 0);
  const hasDocumentGap = (po) =>
    invoiceAvailable(po) === "No" ||
    paymentProofAvailable(po) === "No" ||
    grnAvailable(po) === "No";
  const hasClaimedPaidWithoutAmount = (po) =>
    normalizePaymentStatus(po.paymentStatus) === "Paid" && paidAmount(po) <= 0;
  const auditStatus = (po) => {
    if (hasDocumentGap(po)) return "In Progress";
    if (auditPayment(po) === "Paid" && auditDelivery(po) === "Delivered")
      return "Closed";
    if (paidAmount(po) > 0 || auditDelivery(po) !== "Pending")
      return "In Progress";
    return "Open";
  };
  const moneyAuditStatus = (po) => {
    if (hasClaimedPaidWithoutAmount(po)) return "Major Gap";
    if (isPoDelayed(po)) return "High Risk";
    if (invoiceAvailable(po) === "No" || paymentProofAvailable(po) === "No") {
      return auditPayment(po) === "Pending" ? "Open" : "Major Gap";
    }
    if (gstCorrect(po) === "No") return "Minor Gap";
    if (grnAvailable(po) === "No") return "Minor Gap";
    if (auditPayment(po) !== "Paid") return "Open";
    if (materialReceived(po) !== "Full")
      return "Minor Gap";
    return "Clean";
  };
  const moneyAuditComments = (po) => {
    const comments = [];
    const gaps = [];
    if (hasClaimedPaidWithoutAmount(po))
      comments.push("Payment status was Paid but paid amount is 0; treated as Pending.");
    if (paidAmount(po) > 0 && invoiceAvailable(po) === "No")
      comments.push("Invoice number/date missing; invoice cannot be traced.");
    if (invoiceAvailable(po) === "No") gaps.push("invoice");
    if (paymentProofAvailable(po) === "No") gaps.push("payment proof");
    if (grnAvailable(po) === "No") gaps.push("GRN");
    if (gaps.length) comments.push(`Missing evidence: ${gaps.join(", ")}.`);
    if (gstCorrect(po) === "N/A")
      comments.push("GST not applicable or not captured; verify invoice if applicable.");
    if (gstCorrect(po) === "No")
      comments.push("GST needs verification before this spend can be clean.");
    if (isPoDelayed(po)) comments.push("Delayed PO needs audit review.");
    return comments.join(" ");
  };

  const vendorMasterData = buildProcurementAuditRows("Vendor Master", derived);
  const poMasterData = buildProcurementAuditRows("PO Master", derived);
  const lineAuditData = buildProcurementAuditRows("Line Item Audit", derived);
  const vendorAuditData = buildProcurementAuditRows("Vendor Audit", derived);
  const auditData = procurementAuditState();
  const vendorMasterRows = vendorMasterData.map((vendor) => [
    cell(vendor.vendorName),
    cell(vendor.vendorCategory),
    cell(vendor.contactPerson),
    cell(vendor.contactPerson2),
    cell(vendor.email),
    cell(vendor.phone),
    cell(vendor.phone2),
    cell(vendor.currencyCode || "INR"),
    cell(vendor.source),
    cell(vendor.gstin),
  ]);
  const poMasterRows = poMasterData.map((po) => [
    cell(po.poNumber),
    cell(po.poDate),
    cell(po.vendorName),
    cell(po.purchaseCategory),
    cell(po.poTotal, "money", 3),
    cell(po.gstIncluded),
    cell(po.advancePaid, "money", 3),
    cell(po.balancePaid, "money", 3),
    cell(po.paymentStatus),
    cell(po.expectedDeliveryDate),
    cell(po.actualDeliveryDate),
    cell(po.deliveryStatus),
    cell(po.grnAvailable),
    cell(po.invoiceAvailable),
    cell(po.auditStatus),
  ]);
  const lineRows = [];
  for (let index = 0; index < Math.max(100, lineAuditData.length); index += 1) {
    const rowNumber = index + 2;
    const line = lineAuditData[index];
    const lineTotal = line ? number(line.quantity) * number(line.unitPrice) : "";
    lineRows.push([
      cell(line?.poNumber || ""),
      cell(line?.vendorName || ""),
      cell(line?.itemName || ""),
      cell(line ? number(line.quantity) : "", "number", 4),
      cell(line ? number(line.unitPrice) : "", "money", 3),
      formulaCell(`=D${rowNumber}*E${rowNumber}`, 3, lineTotal),
      cell(line?.purchaseType || ""),
      cell(line?.auditType || ""),
      cell(line?.itemMaturity || ""),
      cell(line?.vendorType || ""),
      cell(line?.purchaseUrgency || ""),
      cell(line?.quoteCount ?? "", "number", 4),
      cell(line?.technicalValidation || ""),
      cell(line?.priceBenchmarkAvailable || ""),
      cell(line?.backupVendorAvailable || ""),
      cell(line?.riskLevel || ""),
      cell(line?.actionRequired || ""),
      cell(line?.priceVariance ?? "", "number", 4),
      cell(line?.deliveryVariance ?? "", "number", 4),
      cell(line?.qualityVariance || ""),
    ]);
  }
  const vendorRows = [];
  for (let index = 0; index < Math.max(100, vendorAuditData.length); index += 1) {
    const rowNumber = index + 2;
    const vendor = vendorAuditData[index];
    vendorRows.push([
      cell(vendor?.vendorName || ""),
      cell(vendor?.priceCompetitiveness ?? "", "number", 4),
      cell(vendor?.quality ?? "", "number", 4),
      cell(vendor?.deliveryReliability ?? "", "number", 4),
      cell(vendor?.technicalCapability ?? "", "number", 4),
      cell(vendor?.responsiveness ?? "", "number", 4),
      cell(vendor?.paymentFlexibility ?? "", "number", 4),
      cell(vendor?.documentationDiscipline ?? "", "number", 4),
      formulaCell(
        `=IF(COUNT(B${rowNumber}:H${rowNumber})=0,"",SUMPRODUCT(B${rowNumber}:H${rowNumber},{0.2,0.2,0.2,0.15,0.1,0.05,0.1})/SUMPRODUCT(--(B${rowNumber}:H${rowNumber}<>""),{0.2,0.2,0.2,0.15,0.1,0.05,0.1}))`,
        4,
        vendor?.overallScore ?? "",
      ),
      formulaCell(
        `=IF(I${rowNumber}="","Not Assessed",IF(I${rowNumber}>8,"Preferred",IF(I${rowNumber}>=6,"Approved",IF(I${rowNumber}>=4,"Conditional","Avoid"))))`,
        0,
        vendor?.classification || "Not Assessed",
      ),
      cell(vendor?.notes || ""),
    ]);
  }
  const invoiceById = new Map(
    auditData.invoices.map((invoice) => [cleanText(invoice.id), invoice]),
  );
  const receiptsByPo = new Map();
  auditData.receipts.forEach((receipt) => {
    const key = cleanText(receipt.poNumber);
    if (!receiptsByPo.has(key)) receiptsByPo.set(key, []);
    receiptsByPo.get(key).push(receipt);
  });
  const moneySourceRows = auditData.payments.length
    ? auditData.payments
    : auditData.invoices.map((invoice) => ({
        id: `invoice-${invoice.id}`,
        poNumber: invoice.poNumber,
        invoiceId: invoice.id,
        paymentDate: "",
        paymentType: "",
        amount: 0,
        paymentReference: "",
        proofAvailable: "No",
        approved: "No",
        remarks: "Invoice captured; payment not recorded.",
      }));
  const moneyRows = moneySourceRows.map((payment) => {
    const po = poByNumber.get(cleanText(payment.poNumber)) || {};
    const invoice = invoiceById.get(cleanText(payment.invoiceId)) || {};
    const receipts = receiptsByPo.get(cleanText(payment.poNumber)) || [];
    const quantityReceived = receipts.reduce(
      (sum, receipt) => sum + number(receipt.receivedQuantity),
      0,
    );
    const rejectionQuantity = receipts.reduce(
      (sum, receipt) => sum + number(receipt.rejectionQuantity),
      0,
    );
    const inspectionStatuses = receipts
      .map((receipt) => cleanText(receipt.inspectionStatus))
      .filter(Boolean);
    const materialReceived =
      quantityReceived <= 0
        ? "None"
        : quantityReceived >= number(po.totalQty)
          ? "Full"
          : "Partial";
    const inspectionPassed = inspectionStatuses.length
      ? inspectionStatuses.every((status) => normalizeKey(status) === "PASSED")
        ? "Yes"
        : "No"
      : "Not Captured";
    return [
      cell(payment.poNumber),
      cell(po.vendorName || invoice.vendorName || ""),
      cell(invoice.invoiceNumber || ""),
      cell(invoice.invoiceDate || ""),
      cell(invoice.invoiceAmount ?? "", "money", 3),
      cell(payment.paymentDate || ""),
      cell(payment.paymentType || ""),
      cell(payment.amount ?? 0, "money", 3),
      cell(payment.paymentReference || ""),
      cell(invoice.invoiceNumber ? "Yes" : "No"),
      cell(payment.proofAvailable || "No"),
      cell(invoice.gstCorrect || "Not Captured"),
      cell(invoice.freightIncluded || "No"),
      cell(invoice.freightAmount ?? 0, "money", 3),
      cell(invoice.extraCharges ?? 0, "money", 3),
      cell(payment.approved || "No"),
      cell(materialReceived),
      cell(receipts.some((receipt) => cleanText(receipt.grnNumber)) ? "Yes" : "No"),
      cell(number(po.totalQty), "number", 4),
      cell(quantityReceived, "number", 4),
      cell(inspectionPassed),
      cell(rejectionQuantity, "number", 4),
      cell(payment.remarks || invoice.comments || ""),
    ];
  });

  const missingRows = auditData.documents.map((document) => [
    cell(document.poNumber || ""),
    cell(
      document.vendorName ||
        poByNumber.get(cleanText(document.poNumber))?.vendorName ||
        "",
    ),
    cell(document.documentType || ""),
    cell(document.status || "Missing"),
    cell(document.comments || ""),
  ]);
  const riskRows = auditData.risks.map((risk, index) => [
    cell(`R-${String(index + 1).padStart(3, "0")}`),
    cell(risk.itemPo || ""),
    cell(risk.finding || ""),
    cell(risk.risk || ""),
    cell(risk.evidence || ""),
    cell(risk.impact || ""),
    cell(risk.action || ""),
    cell(risk.owner || ""),
    cell(risk.priority || "Medium"),
    cell(risk.dueDate || ""),
    cell(risk.status || "Open"),
  ]);
  const actionRows = auditData.actions.map((action, index) => [
    cell(`A-${String(index + 1).padStart(3, "0")}`),
    cell(action.description || ""),
    cell(action.owner || ""),
    cell(action.priority || "Medium"),
    cell(action.dueDate || ""),
    cell(action.status || "Open"),
    cell(action.comments || ""),
  ]);
  const kpiRows = [
    header(["KPI", "Value", "Definition"]),
    ...buildProcurementAuditKpis(derived).map((row) => [
      cell(row.metric),
      cell(row.value),
      cell(row.definition),
    ]),
  ];

  const howRows = [
    [cell("Sourcing + Money Spent Audit: How to Fill", "text", 5)],
    [],
    [cell("Golden Rules for Everyone Filling This Workbook", "text", 6)],
    [cell("1", "text", 8), cell("Use one row per PO in PO Master and one row per item/line in Line Item Audit.", "text", 2)],
    [cell("2", "text", 8), cell("Use exact dropdown-style words like Yes, No, Pending, Delivered, High, Medium, Low. KPI formulas depend on consistent words.", "text", 2)],
    [cell("3", "text", 8), cell("Do not leave PO Number blank. It is the common link between sheets.", "text", 2)],
    [cell("4", "text", 8), cell("Do not overwrite formula cells unless instructed. Example: Total Value and KPI Summary formulas.", "text", 2)],
    [cell("5", "text", 8), cell("If evidence is missing, do not assume. Mark No or Pending and add it in Missing Documents.", "text", 2)],
    [cell("6", "text", 8), cell("Do not infer evidence. Invoice, payment, GRN, inspection, risk and action records must be entered in the Audit Workspace.", "text", 2)],
    [],
    [cell("Step-by-Step Filling Workflow", "text", 6)],
    ["Step", "Who Fills", "Sheet", "What to Fill", "When to Fill", "Output / Check"].map((value) => cell(value, "text", 7)),
    [cell("1"), cell("Procurement"), cell("PO Master"), cell("PO number, date, vendor, category, total PO value, GST, advance/balance, payment/delivery status"), cell("After PO is issued or imported from Zoho"), cell("Every PO has one master row")],
    [cell("2"), cell("Procurement + Engineering"), cell("Line Item Audit"), cell("Item, qty, unit price, purchase type, audit type, item maturity, quote count, technical validation, benchmark, backup vendor, risk"), cell("After quote comparison / vendor selection"), cell("Each PO line is classified and risk-tagged")],
    [cell("3"), cell("Finance/Admin"), cell("Money Spent Audit"), cell("Invoice amount, paid amount, PO available, invoice available, payment proof, GST, freight, extra charges, payment approval"), cell("At payment or invoice booking stage"), cell("Paid amount is supported by evidence")],
    [cell("4"), cell("Stores / Inward"), cell("Money Spent Audit"), cell("Material received, GRN available, ordered qty, received qty"), cell("When material reaches site/store"), cell("Receipt status is clear")],
    [cell("5"), cell("Quality / Engineering"), cell("Money Spent Audit"), cell("Inspection passed, rejection qty, comments"), cell("After inspection or trial"), cell("Accepted/rejected quantity is visible")],
    [cell("6"), cell("Procurement / Audit Lead"), cell("Vendor Audit"), cell("Vendor score for price, quality, delivery, technical capability, responsiveness, payment terms, documentation"), cell("Weekly or after major purchase batch"), cell("Vendor classified as Preferred / Approved / Conditional / Avoid")],
    [cell("7"), cell("Audit Lead"), cell("Missing Documents, Risk Register, Action Tracker"), cell("Document gaps, findings, risks, corrective actions, owners, due dates"), cell("During audit review"), cell("Each issue has owner and due date")],
    [cell("8"), cell("Founder / Audit Lead"), cell("KPI Summary"), cell("Review formulas only, do not manually edit values"), cell("Weekly review"), cell("Audit dashboard ready for decisions")],
    [],
    [cell("Role Ownership Matrix", "text", 6)],
    ["Role", "Primary Responsibility", "Must Not Do", "Final Check"].map((value) => cell(value, "text", 7)),
    [cell("Procurement Owner"), cell("Fill PO Master, Line Item Audit, quote count, vendor type, price benchmark, backup vendor and sourcing risk."), cell("Do not mark technical validation as approved without Engineering confirmation."), cell("All critical items have quote count and risk level.")],
    [cell("Engineering / Requester"), cell("Confirm item spec, drawing, technical fit, sample/trial requirement, item maturity and inspection inputs."), cell("Do not approve commercial price without procurement comparison."), cell("Technical Validation is Approved/Pending/Failed with comment if needed.")],
    [cell("Finance/Admin"), cell("Verify invoice, payment proof, GST, payment approval, advance/balance and paid amount."), cell("Do not mark payment proof Yes unless bank/Zoho proof exists."), cell("Paid amount matches invoice/PO or variance is explained.")],
    [cell("Stores / Inward"), cell("Update material received status, received quantity and GRN availability."), cell("Do not mark Full received unless quantity physically received matches order."), cell("GRN and quantity received are aligned.")],
    [cell("Quality / Engineering"), cell("Update inspection status, rejection quantity and quality comments."), cell("Do not mark Inspection Passed Yes before actual check/trial."), cell("Rejected qty and remarks are captured.")],
    [cell("Audit Lead"), cell("Review Missing Documents, Risk Register, Action Tracker and KPI Summary."), cell("Do not close action without evidence."), cell("High-risk items have action owner and due date.")],
    [],
    [cell("Sheet-wise Filling Instructions", "text", 6)],
    ["Sheet", "Mandatory Fields", "How to Fill", "Common Mistake to Avoid"].map((value) => cell(value, "text", 7)),
    [cell("PO Master"), cell("PO Number, PO Date, Vendor Name, Category, Total PO Value, Payment Status, Delivery Status"), cell("One row per PO. Expected and Actual Delivery Date are separate. Advance Paid and Balance Paid come from payment records."), cell("Do not create multiple rows for the same PO unless it is a revised PO.")],
    [cell("Line Item Audit"), cell("PO Number, Item, Qty, Unit Price, Purchase Type, Audit Type, Quote Count, Technical Validation, Risk Level"), cell("One row per item. Use the guide values for purchase type, audit type, maturity, vendor type and urgency."), cell("Do not fill sourcing evidence from product-name assumptions.")],
    [cell("Vendor Audit"), cell("Vendor Name and scores from 1-10"), cell("Score realistically. Overall Score and Classification are automatic weighted results."), cell("Do not type text in score columns; use numbers only.")],
    [cell("Money Spent Audit"), cell("PO Number, Invoice Amount, Paid Amount, PO/Invoice/Payment Proof flags, Material Received, GRN, Inspection Passed"), cell("Use Yes/No/None consistently. Add comments for any mismatch."), cell("Do not mark spend clean if GRN or inspection is missing.")],
    [cell("Missing Documents"), cell("PO Number, Vendor, Document Type, Status"), cell("Add every missing document here immediately. Status can be Missing, Requested, Received, Verified, Rejected or Not Required."), cell("Do not keep missing documents only in WhatsApp/email memory.")],
    [cell("Risk Register"), cell("Finding, Risk, Evidence, Impact, Action, Owner, Priority, Status"), cell("Every red flag should become a risk item with evidence and action."), cell("Do not write vague findings without PO number or evidence.")],
    [cell("Action Tracker"), cell("Action ID, Description, Owner, Priority, Due Date, Status"), cell("Use this to close audit gaps. Update weekly."), cell("Do not close an action unless evidence is available.")],
    [cell("KPI Summary"), cell("No manual input required"), cell("Only review. Values come from other sheets."), cell("Do not overwrite formulas.")],
    [],
    [cell("Use These Exact Values for Clean KPI Calculation", "text", 6)],
    ["Field Type", "Allowed Values"].map((value) => cell(value, "text", 7)),
    [cell("Yes/No fields"), cell("Yes, No")],
    [cell("Payment Status"), cell("Pending, Partially Paid, Paid")],
    [cell("Delivery Status"), cell("Pending, Partial, Delivered")],
    [cell("Purchase Type"), cell("Prototype, Production, Consumable, Tooling")],
    [cell("Audit Type"), cell("Routine, Technical, Commercial")],
    [cell("Item Maturity"), cell("Prototype, Alpha, Beta, Production")],
    [cell("Vendor Type"), cell("OEM, Distributor, Local Manufacturer")],
    [cell("Purchase Urgency"), cell("Low, Medium, High, Critical")],
    [cell("Technical Validation"), cell("Pending, Yes, No, Approved, Failed")],
    [cell("Risk / Priority"), cell("Critical, High, Medium, Low")],
    [cell("Material Received"), cell("None, Partial, Full")],
    [cell("Risk Status"), cell("Open, Mitigated, Closed")],
    [cell("Action Status"), cell("Open, In Progress, Closed")],
    [cell("Document Status"), cell("Missing, Requested, Received, Verified, Rejected, Not Required")],
  ];

  const sheets = [
    { name: "Vendor Master", widths: [26, 20, 20, 20, 28, 16, 16, 12, 18, 20], rows: [header(["Vendor Name", "Category", "Contact Person 1", "Contact Person 2", "Email", "Phone 1", "Phone 2", "Currency", "Source of Supply", "GSTIN"]), ...vendorMasterRows], validations: [["B2:B1000", '"Mechanical,Electrical,Electronics,Fabrication,Raw Material,Tools,Consumables,Services,Other"'], ["H2:H1000", '"INR,USD,EUR,GBP,CNY"']] },
    { name: "PO Master", widths: [15, 15, 22, 20, 18, 15, 15, 15, 18, 18, 18, 18, 15, 18, 18], rows: [header(["PO Number", "PO Date", "Vendor Name", "Category", "Total PO Value", "GST Included", "Advance Paid", "Balance Paid", "Payment Status", "Expected Delivery Date", "Actual Delivery Date", "Delivery Status", "GRN Available", "Invoice Available", "Audit Status"]), ...poMasterRows], validations: [["F2:F1000", '"Yes,No"'], ["I2:I1000", '"Pending,Partially Paid,Paid"'], ["L2:L1000", '"Pending,Partial,Delivered"'], ["M2:N1000", '"Yes,No"'], ["O2:O1000", '"Pending,In Progress,Completed"']] },
    { name: "Line Item Audit", widths: [15, 24, 34, 10, 14, 16, 16, 16, 16, 22, 16, 12, 20, 22, 22, 15, 30, 15, 18, 22], rows: [header(["PO Number", "Vendor Name", "Item Name/Description", "Quantity", "Unit Price", "Total Value", "Purchase Type", "Audit Type", "Item Maturity", "Vendor Type", "Purchase Urgency", "Quote Count", "Technical Validation", "Price Benchmark Available", "Backup Vendor Available", "Risk Level", "Action Required", "Price Variance", "Delivery Variance", "Quality Variance"]), ...lineRows], validations: [["G2:G1000", '"Prototype,Production,Consumable,Tooling"'], ["H2:H1000", '"Routine,Technical,Commercial"'], ["I2:I1000", '"Prototype,Alpha,Beta,Production"'], ["J2:J1000", '"OEM,Distributor,Local Manufacturer"'], ["K2:K1000", '"Low,Medium,High,Critical"'], ["M2:M1000", '"Pending,Yes,No,Approved,Failed"'], ["N2:O1000", '"Yes,No"'], ["P2:P1000", '"Low,Medium,High,Critical"']] },
    { name: "Vendor Audit", widths: [24, 22, 15, 20, 20, 18, 20, 25, 15, 16, 30], rows: [header(["Vendor Name", "Price Competitiveness", "Quality", "Delivery Reliability", "Technical Capability", "Responsiveness", "Payment Flexibility", "Documentation Discipline", "Overall Score", "Classification", "Notes"]), ...vendorRows] },
    { name: "Money Spent Audit", widths: [15, 22, 18, 15, 18, 15, 15, 18, 20, 18, 18, 18, 18, 16, 16, 18, 18, 15, 18, 18, 18, 18, 30], rows: [header(["PO Number", "Vendor Name", "Invoice Number", "Invoice Date", "Invoice Amount", "Payment Date", "Payment Type", "Paid Amount", "Payment Reference", "Invoice Available", "Payment Proof", "GST Correct", "Freight Included", "Freight Amount", "Extra Charges", "Payment Approval", "Material Received", "GRN Available", "Quantity Ordered", "Quantity Received", "Inspection Passed", "Rejection Quantity", "Comments"]), ...moneyRows], validations: [["G2:G1000", '"Advance,Balance,Final,Refund,Other"'], ["J2:K1000", '"Yes,No"'], ["L2:L1000", '"Pending,Correct,Incorrect,Not Applicable"'], ["M2:M1000", '"Yes,No"'], ["P2:P1000", '"Yes,No"'], ["Q2:Q1000", '"None,Partial,Full"'], ["R2:R1000", '"Yes,No"'], ["U2:U1000", '"Yes,No,Not Captured"']] },
    { name: "Missing Documents", widths: [15, 22, 22, 18, 36], rows: [header(["PO Number", "Vendor Name", "Document Type", "Status", "Comments"]), ...missingRows], validations: [["D2:D1000", '"Missing,Requested,Received,Verified,Rejected,Not Required"']] },
    { name: "Risk Register", widths: [10, 15, 30, 20, 30, 20, 30, 20, 15, 18, 12], rows: [header(["ID", "Item/PO", "Finding", "Risk", "Evidence", "Impact", "Action", "Owner", "Priority", "Due Date", "Status"]), ...riskRows], validations: [["I2:I1000", '"Critical,High,Medium,Low"'], ["K2:K1000", '"Open,Mitigated,Closed"']] },
    { name: "Action Tracker", widths: [12, 34, 20, 15, 18, 15, 32], rows: [header(["Action ID", "Description", "Owner", "Priority", "Due Date", "Status", "Comments"]), ...actionRows], validations: [["D2:D1000", '"Critical,High,Medium,Low"'], ["F2:F1000", '"Open,In Progress,Closed"']] },
    { name: "KPI Summary", widths: [34, 22, 80], rows: kpiRows },
    { name: "How to Fill", widths: [16, 36, 24, 42, 22, 35, 16, 16], rows: howRows, merges: ["A1:H1", "A3:H3", "A11:H11", "A22:H22", "A31:H31", "A42:H42"] },
  ];

  function validationsXml(validations = []) {
    if (!validations.length) return "";
    return `<dataValidations count="${validations.length}">${validations
      .map(([sqref, formula]) => `<dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="${xmlEscape(sqref)}"><formula1>${xmlEscape(formula)}</formula1></dataValidation>`)
      .join("")}</dataValidations>`;
  }

  function worksheetXml(spec) {
    const colCount = spec.widths.length;
    const rowCount = Math.max(1, spec.rows.length);
    const rowsXml = spec.rows
      .map((row, rowIndex) => {
        const padded = Array.from({ length: colCount }, (_, index) => row[index] || cell(""));
        return xlsxRow(rowIndex + 1, padded, 0, sharedStrings);
      })
      .join("");
    const merges = spec.merges?.length
      ? `<mergeCells count="${spec.merges.length}">${spec.merges.map((ref) => `<mergeCell ref="${ref}"/>`).join("")}</mergeCells>`
      : "";
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:${xlsxColumnName(colCount - 1)}${rowCount}"/>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>${spec.widths.map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`).join("")}</cols>
  <sheetData>${rowsXml}</sheetData>
  ${merges}
  ${validationsXml(spec.validations)}
  <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>`;
  }

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="3"><numFmt numFmtId="164" formatCode="&quot;INR &quot;#,##0.00"/><numFmt numFmtId="165" formatCode="#,##0.00"/><numFmt numFmtId="166" formatCode="0.00%"/></numFmts>
  <fonts count="5"><font><sz val="11"/><color rgb="FF111827"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FF111827"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="14"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><sz val="11"/><color rgb="FF111827"/><name val="Calibri"/></font></fonts>
  <fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0F766E"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE0F2F1"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="10">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
    <xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top" wrapText="1"/></xf>
    <xf numFmtId="166" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;

  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, index) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join("")}</sheets><calcPr fullCalcOnLoad="1"/></workbook>`;
  const sheetFiles = sheets.map((sheet, index) => ({
    name: `xl/worksheets/sheet${index + 1}.xml`,
    content: worksheetXml(sheet),
  }));
  const sharedStringsXml = buildSharedStringsXml(sharedStrings);

  return createZipBlob([
    { name: "[Content_Types].xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sheets.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>` },
    { name: "_rels/.rels", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>` },
    { name: "docProps/core.xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Sourcing Money Audit with SOP</dc:title><dc:creator>Stack n Stock Procurement Dashboard</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created></cp:coreProperties>` },
    { name: "docProps/app.xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Stack n Stock Procurement Dashboard</Application></Properties>` },
    { name: "xl/workbook.xml", content: workbookXml },
    { name: "xl/_rels/workbook.xml.rels", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId${sheets.length + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>` },
    { name: "xl/styles.xml", content: stylesXml },
    { name: "xl/sharedStrings.xml", content: sharedStringsXml },
    ...sheetFiles,
  ]);
}

function mechanicalAnalysisRowsForSheet(sheetName, rows) {
  const columns = MECHANICAL_ANALYSIS_COLUMNS[sheetName] || [];
  const cell = (value = "", type = "text", style = 0) => ({
    value,
    type,
    style,
  });
  return [
    columns.map((column) => cell(column.label, "text", 1)),
    ...rows.map((row) =>
      columns.map((column) => {
        const type = column.type === "percent" ? "number" : column.type;
        const style = column.type === "money" ? 3 : column.type === "number" || column.type === "percent" ? 4 : 0;
        return cell(row[column.key], type, style);
      }),
    ),
  ];
}

function buildMechanicalAnalysisWorkbook() {
  const sharedStrings = { items: [], map: new Map() };
  const analysis = buildMechanicalAnalysis(buildDerived());
  const sheets = MECHANICAL_ANALYSIS_TABS.map((sheetName) => {
    const columns = MECHANICAL_ANALYSIS_COLUMNS[sheetName] || [];
    return {
      name: sheetName,
      widths: columns.map((column) => column.width || 18),
      rows: mechanicalAnalysisRowsForSheet(sheetName, analysis.tables[sheetName] || []),
    };
  });
  function cell(value = "", type = "text", style = 0) {
    return { value, type, style };
  }
  function worksheetXml(spec) {
    const colCount = Math.max(1, spec.widths.length);
    const rowCount = Math.max(1, spec.rows.length);
    const rowsXml = spec.rows
      .map((row, rowIndex) => {
        const padded = Array.from({ length: colCount }, (_, index) => row[index] || cell(""));
        return xlsxRow(rowIndex + 1, padded, 0, sharedStrings);
      })
      .join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:${xlsxColumnName(colCount - 1)}${rowCount}"/>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>${spec.widths.map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`).join("")}</cols>
  <sheetData>${rowsXml}</sheetData>
  <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>`;
  }
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="2"><numFmt numFmtId="164" formatCode="&quot;INR &quot;#,##0.00"/><numFmt numFmtId="165" formatCode="#,##0.00"/></numFmts>
  <fonts count="3"><font><sz val="11"/><color rgb="FF111827"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="12"/><color rgb="FF111827"/><name val="Calibri"/></font></fonts>
  <fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0F766E"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="5">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, index) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join("")}</sheets><calcPr fullCalcOnLoad="1"/></workbook>`;
  const sheetFiles = sheets.map((sheet, index) => ({
    name: `xl/worksheets/sheet${index + 1}.xml`,
    content: worksheetXml(sheet),
  }));
  const sharedStringsXml = buildSharedStringsXml(sharedStrings);
  return createZipBlob([
    { name: "[Content_Types].xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sheets.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>` },
    { name: "_rels/.rels", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>` },
    { name: "docProps/core.xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Mechanical Procurement Analysis</dc:title><dc:creator>Stack n Stock Procurement Dashboard</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created></cp:coreProperties>` },
    { name: "docProps/app.xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Stack n Stock Procurement Dashboard</Application></Properties>` },
    { name: "xl/workbook.xml", content: workbookXml },
    { name: "xl/_rels/workbook.xml.rels", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId${sheets.length + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>` },
    { name: "xl/styles.xml", content: stylesXml },
    { name: "xl/sharedStrings.xml", content: sharedStringsXml },
    ...sheetFiles,
  ]);
}

function exportMechanicalAnalysisXlsx() {
  const analysis = buildMechanicalAnalysis(buildDerived());
  if (!analysis.summary.lineCount) {
    alert("No mechanical procurement data is available to export.");
    return;
  }
  const blob = buildMechanicalAnalysisWorkbook();
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  link.href = URL.createObjectURL(blob);
  link.download = `mechanical-procurement-analysis-${timestamp}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function exportProcurementReportXlsx() {
  const rows = buildProcurementReportRows(buildDerived());
  if (!rows.length) {
    alert("No procurement data is available to export.");
    return;
  }
  const blob = buildProcurementReportWorkbook(rows);
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  link.href = URL.createObjectURL(blob);
  link.download = `procurement-report-${timestamp}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function exportProcurementAuditXlsx() {
  const derived = buildDerived();
  if (!(derived.pos || []).length) {
    alert("No procurement data is available to export.");
    return;
  }
  const blob = buildSourcingAuditWorkbook();
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  link.href = URL.createObjectURL(blob);
  link.download = `procurement-audit-workbook-${timestamp}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function importLocalState(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const normalizedPayload = normalizeIncomingDbPayload(payload);

      if (normalizedPayload) {
        const imported = convertDbImportPayloadToLocalRows(normalizedPayload);
        state.manualRows = Array.isArray(imported.manualRows)
          ? imported.manualRows
          : [];
        state.rowOverrides = {};
        state.vendorContacts = mergeVendorSeeds({
          ...(state.vendorContacts || {}),
          ...(imported.vendorContacts || {}),
        });
        state.productVendorMetrics = {
          ...(state.productVendorMetrics || {}),
          ...(imported.productVendorMetrics || {}),
        };
        const restoredVendorNames = new Set(
          (imported.restoredVendorNames || []).map((name) => cleanText(name)),
        );
        state.deletedVendors = (state.deletedVendors || []).filter(
          (name) => !restoredVendorNames.has(cleanText(name)),
        );
        saveState();
        renderAll();

        if (useSupabase) {
          syncStateToSupabase()
            .then(() => {
              alert(
                `DB JSON imported and synced: ${state.manualRows.length} lines across ${normalizedPayload.purchase_orders.length} purchase orders.`,
              );
            })
            .catch((err) => {
              console.error("Import sync failed", err);
              alert(
                `DB JSON imported locally, but Supabase sync failed: ${err.message || err}`,
              );
            });
        } else {
          alert(
            `DB JSON imported: ${state.manualRows.length} lines across ${normalizedPayload.purchase_orders.length} purchase orders.`,
          );
        }
      } else {
        const localPayload =
          payload.localState && typeof payload.localState === "object"
            ? payload.localState
            : payload;
        state.manualRows = Array.isArray(localPayload.manualRows)
          ? localPayload.manualRows
          : state.manualRows;
        state.rowOverrides =
          localPayload.rowOverrides && typeof localPayload.rowOverrides === "object"
            ? localPayload.rowOverrides
            : state.rowOverrides;
        state.vendorContacts = mergeVendorSeeds(
          localPayload.vendorContacts && typeof localPayload.vendorContacts === "object"
            ? localPayload.vendorContacts
            : state.vendorContacts,
        );
        state.productVendorMetrics =
          localPayload.productVendorMetrics &&
          typeof localPayload.productVendorMetrics === "object"
            ? localPayload.productVendorMetrics
            : state.productVendorMetrics;
        state.deletedVendors = Array.isArray(localPayload.deletedVendors)
          ? localPayload.deletedVendors
          : state.deletedVendors;
        state.poTokenLog = Array.isArray(localPayload.poTokenLog)
          ? localPayload.poTokenLog
          : state.poTokenLog;
        state.reusableQueue = Array.isArray(localPayload.reusableQueue)
          ? localPayload.reusableQueue
          : state.reusableQueue;
        state.poMaster = Array.isArray(localPayload.poMaster)
          ? localPayload.poMaster
          : state.poMaster;
        state.activeReservations = Array.isArray(localPayload.activeReservations)
          ? localPayload.activeReservations
          : state.activeReservations;
        state.procurementAudit = normalizeProcurementAuditState(
          localPayload.procurementAudit || state.procurementAudit,
        );
        saveState();
        renderAll();

        if (useSupabase) {
          syncStateToSupabase()
            .then(() => {
              alert("Local data imported and synced to Supabase.");
            })
            .catch((err) => {
              console.error("Import sync failed", err);
              alert(
                `Local data imported, but Supabase sync failed: ${err.message || err}`,
              );
            });
        } else {
          alert("Local data imported.");
        }
      }
    } catch {
      alert("Unable to import this JSON file.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function saveVendorForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const vendorName = cleanText(form.elements.vendorName?.value);
  if (!vendorName) return;

  restoreVendorIfDeleted(vendorName);
  state.vendorContacts[vendorName] = {
    vendorName,
    source: cleanText(form.elements.source?.value),
    vendorCategory: cleanText(form.elements.vendorCategory?.value),
    currencyCode: cleanText(form.elements.currencyCode?.value || "INR"),
    gstin: cleanText(form.elements.gstin?.value),
    contactPerson: cleanText(form.elements.contactPerson?.value),
    contactPerson2: cleanText(form.elements.contactPerson2?.value),
    phone: cleanText(form.elements.phone?.value),
    phone2: cleanText(form.elements.phone2?.value),
    email: cleanText(form.elements.email?.value),
    website: cleanText(form.elements.website?.value),
    city: cleanText(form.elements.city?.value),
    defaultLeadTimeDays: cleanText(form.elements.defaultLeadTimeDays?.value),
    rating: cleanText(form.elements.rating?.value),
    notes: form.elements.notes?.value || "",
  };

  saveState();
  renderAll();
}

function deleteSelectedVendor() {
  const vendorName = cleanText(state.selectedVendor);
  if (!vendorName) return;
  const ok = window.confirm(
    `Delete ${vendorName} from active vendor lists? Historical PO records will stay as-is.`,
  );
  if (!ok) return;

  if (!Array.isArray(state.deletedVendors)) state.deletedVendors = [];
  if (
    !state.deletedVendors.some(
      (item) => normalizeKey(item) === normalizeKey(vendorName),
    )
  ) {
    state.deletedVendors.push(vendorName);
  }

  delete state.vendorContacts[vendorName];
  Object.keys(state.productVendorMetrics || {}).forEach((key) => {
    const parsed = splitMetricStorageKey(key);
    if (normalizeKey(parsed.vendorName) === normalizeKey(vendorName)) {
      delete state.productVendorMetrics[key];
    }
  });

  state.selectedVendor = null;
  state.showMetricVendorForm = false;
  saveState();
  renderAll();
}

function saveMetricForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const key = form.dataset.metricKey;
  if (!key) return;

  const parsed = splitMetricStorageKey(key);
  const existing = state.productVendorMetrics[key] || {};
  state.productVendorMetrics[key] = {
    ...existing,
    productName: existing.productName || parsed.productName,
    vendorName: existing.vendorName || parsed.vendorName,
    source:
      existing.source || state.vendorContacts[parsed.vendorName]?.source || "",
    gstin:
      existing.gstin || state.vendorContacts[parsed.vendorName]?.gstin || "",
    quotedPrice: cleanText(form.elements.quotedPrice?.value),
    leadTimeDays: cleanText(form.elements.leadTimeDays?.value),
    moq: cleanText(form.elements.moq?.value),
    rating: cleanText(form.elements.rating?.value),
    notes: form.elements.notes?.value || "",
  };

  saveState();
  renderAll();
}

function saveMetricQuickAddForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const productName = cleanText(
    form.elements.productName?.value || state.selectedMetricProduct,
  );
  const vendorName = cleanText(form.elements.vendorName?.value);
  if (!productName || !vendorName) {
    alert("Please add a product and vendor name.");
    return;
  }

  const key = metricStorageKey(productName, vendorName);
  const source = cleanText(form.elements.source?.value);
  const gstin = cleanText(form.elements.gstin?.value);
  restoreVendorIfDeleted(vendorName);

  state.productVendorMetrics[key] = {
    ...(state.productVendorMetrics[key] || {}),
    productName,
    vendorName,
    source:
      source ||
      state.productVendorMetrics[key]?.source ||
      state.vendorContacts[vendorName]?.source ||
      "",
    gstin:
      gstin ||
      state.productVendorMetrics[key]?.gstin ||
      state.vendorContacts[vendorName]?.gstin ||
      "",
    quotedPrice: cleanText(form.elements.quotedPrice?.value),
    leadTimeDays: cleanText(form.elements.leadTimeDays?.value),
    moq: cleanText(form.elements.moq?.value),
    rating: cleanText(form.elements.rating?.value),
    notes: form.elements.notes?.value || "",
  };

  state.vendorContacts[vendorName] = {
    ...(state.vendorContacts[vendorName] || {}),
    vendorName,
    source: source || state.vendorContacts[vendorName]?.source || "",
    gstin: gstin || state.vendorContacts[vendorName]?.gstin || "",
    contactPerson: state.vendorContacts[vendorName]?.contactPerson || "",
    phone: state.vendorContacts[vendorName]?.phone || "",
    email: state.vendorContacts[vendorName]?.email || "",
    website: state.vendorContacts[vendorName]?.website || "",
    city: state.vendorContacts[vendorName]?.city || "",
    defaultLeadTimeDays:
      state.vendorContacts[vendorName]?.defaultLeadTimeDays ||
      cleanText(form.elements.leadTimeDays?.value),
    rating:
      cleanText(form.elements.rating?.value) ||
      state.vendorContacts[vendorName]?.rating ||
      "",
    notes: state.vendorContacts[vendorName]?.notes || "",
  };

  state.showMetricVendorForm = false;
  saveState();
  renderAll();
}

// Legacy function kept for reference but not used
function renderPoAvailabilityLegacy() {
  const mount = document.getElementById("poAvailabilityContent");
  if (!mount) return;
  const available = getCurrentAvailablePO();
  const stats = getPoAvailabilityStats();
  const tokenRows = state.poTokenLog
    .slice()
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
  const queueRows = state.reusableQueue
    .slice()
    .sort((a, b) => {
      const aStatus = normalizeReusableStatus(a.status) === "Available" ? 0 : 1;
      const bStatus = normalizeReusableStatus(b.status) === "Available" ? 0 : 1;
      if (aStatus !== bStatus) return aStatus - bStatus;
      const aTime = new Date(a.cancelledOn || 0).getTime();
      const bTime = new Date(b.cancelledOn || 0).getTime();
      if (aTime !== bTime) return aTime - bTime;
      return comparePoNumbers(a.poNumber, b.poNumber);
    });

  const tokenHtml = tokenRows.length
    ? tokenRows
        .map((token) => {
          const status = normalizePoTokenStatus(token.status);
          return `
            <tr>
              <td><strong>${escapeHtml(token.tokenNumber)}</strong></td>
              <td>${escapeHtml(token.poNumber)}</td>
              <td>${escapeHtml(token.takenBy || "—")}</td>
              <td>${escapeHtml(normalizePoAvailabilityType(token.type))}</td>
              <td>${escapeHtml(formatDateTime(token.timestamp))}</td>
              <td>
                <span class="availability-status ${poAvailabilityStatusClass(status)}">${escapeHtml(status)}</span>
                ${
                  status === "Taken"
                    ? `
                      <div class="inline-actions availability-row-actions">
                        <button class="primary-btn small-btn" type="button" data-po-availability-action="create-po" data-token="${escapeHtml(token.tokenNumber)}">Create PO</button>
                        <button class="danger-btn small-btn" type="button" data-po-availability-action="cancel-token" data-token="${escapeHtml(token.tokenNumber)}">Cancel PO</button>
                      </div>
                    `
                    : ""
                }
              </td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="6" class="empty-state">No PO tokens have been taken yet.</td></tr>`;

  const queueHtml = queueRows.length
    ? queueRows
        .map((row) => {
          const status = normalizeReusableStatus(row.status);
          return `
            <tr>
              <td><strong>${escapeHtml(row.poNumber)}</strong></td>
              <td>${escapeHtml(row.cancelledBy || "—")}</td>
              <td>${escapeHtml(normalizePoAvailabilityType(row.type))}</td>
              <td>${escapeHtml(formatDateTime(row.cancelledOn))}</td>
              <td>${escapeHtml(row.reason || "—")}</td>
              <td><span class="availability-status ${poAvailabilityStatusClass(status)}">${escapeHtml(status)}</span></td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="6" class="empty-state">No reusable PO numbers are waiting in the queue.</td></tr>`;

  mount.innerHTML = `
    <div class="po-availability-layout">
      <article class="panel availability-current-panel">
        <div class="panel-header wrap">
          <div>
            <h2>Current Available PO Number</h2>
            <p class="section-copy">Reusable cancelled draft numbers are assigned first. New sequence numbers fill the gaps after that queue is empty.</p>
          </div>
          <button class="primary-btn" type="button" data-po-availability-action="take">Take PO Number</button>
        </div>
        <div class="availability-current-card">
          <div>
            <span>Current Available PO</span>
            <strong>${escapeHtml(available.currentPo)}</strong>
          </div>
          <div>
            <span>Next PO Number</span>
            <strong>${escapeHtml(available.nextPo)}</strong>
          </div>
          <div>
            <span>PO Type</span>
            <strong>${escapeHtml(available.type)}</strong>
          </div>
        </div>
      </article>

      <article class="panel availability-stats-panel">
        <div class="panel-header">
          <div>
            <h2>Allocation Status</h2>
            <p class="section-copy">Booked numbers stay taken until they are cancelled.</p>
          </div>
        </div>
        <div class="availability-stat-grid">
          <div>
            <span>Active</span>
            <strong>${stats.active}</strong>
            <small>Reservations</small>
          </div>
          <div>
            <span>Reusable</span>
            <strong>${stats.reusable}</strong>
            <small>Available PO Nos</small>
          </div>
          <div>
            <span>Taken</span>
            <strong>${stats.taken}</strong>
            <small>Locked POs</small>
          </div>
          <div>
            <span>Cancelled</span>
            <strong>${stats.cancelled}</strong>
            <small>Returned to Queue</small>
          </div>
          <div>
            <span>Known PO Nos</span>
            <strong>${stats.knownCount}</strong>
            <small>Total Unique</small>
          </div>
        </div>
      </article>

      <article class="panel availability-table-panel">
        <div class="panel-header wrap">
          <div>
            <h2>Booked PO Numbers</h2>
            <p class="section-copy">Open bookings waiting for PO creation or cancellation.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Token</th>
                <th>Taken By</th>
          <div>
            <span>PO Type</span>
            <strong>${escapeHtml(available.type)}</strong>
          </div>
        </div>
      </article>

      <article class="panel availability-stats-panel">
        <div class="panel-header">
          <div>
            <h2>Allocation Status</h2>
            <p class="section-copy">Booked numbers stay taken until they are cancelled.</p>
          </div>
        </div>
        <div class="availability-stat-grid">
          <div><span>Booked</span><strong>${stats.active}</strong></div>
          <div><span>Taken</span><strong>${stats.taken}</strong></div>
          <div><span>Reusable</span><strong>${stats.reusable}</strong></div>
          <div><span>Cancelled</span><strong>${stats.cancelled}</strong></div>
        </div>
      </article>

      <article class="panel availability-table-panel">
        <div class="panel-header">
          <div>
            <h2>PO Token Log</h2>
            <p class="section-copy">Every taken PO number is tracked with name, type, time, and status.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PO Token Number</th>
                <th>Taken PO Number</th>
                <th>Taken By</th>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${tokenHtml}</tbody>
          </table>
        </div>
      </article>

      <article class="panel availability-table-panel">
        <div class="panel-header">
          <div>
            <h2>Reusable PO Queue</h2>
            <p class="section-copy">Cancelled draft PO numbers return here and are reused in FIFO order.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Cancelled By</th>
                <th>Type</th>
                <th>Cancelled On</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${queueHtml}</tbody>
          </table>
        </div>
      </article>
    </div>
  `;
}

function availabilityEmptyRow(colspan, message) {
  return `<tr><td colspan="${colspan}" class="empty-state">${escapeHtml(message)}</td></tr>`;
}

function availabilityStatusPill(status) {
  const normalized = cleanText(status) || "Unknown";
  return `<span class="availability-status ${poAvailabilityStatusClass(normalized)}">${escapeHtml(normalized)}</span>`;
}

function availabilityTokenActions(token) {
  const status = normalizePoTokenStatus(token?.status);
  const tokenNumber = cleanText(token?.tokenNumber);
  if (status !== "Taken" || !tokenNumber) return "";
  return `
    <div class="inline-actions availability-row-actions">
      <button class="primary-btn small-btn" type="button" data-po-availability-action="create-po" data-token="${escapeHtml(tokenNumber)}">Create PO</button>
      <button class="danger-btn small-btn" type="button" data-po-availability-action="cancel-token" data-token="${escapeHtml(tokenNumber)}">Cancel</button>
    </div>
  `;
}

function availabilityMetricCard(label, value, note, tone = "") {
  return `
    <div class="availability-metric ${tone ? `availability-metric-${tone}` : ""}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(note)}</small>
    </div>
  `;
}

function renderPoAvailability(derived = buildDerived()) {
  const mount = document.getElementById("poAvailabilityContent");
  if (!mount) return;
  const available = getCurrentAvailablePO();
  const stats = getPoAvailabilityStats(derived);
  const tokenRows = state.poTokenLog
    .slice()
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
  const queueRows = state.reusableQueue
    .slice()
    .sort((a, b) => {
      const aStatus = normalizeReusableStatus(a.status) === "Available" ? 0 : 1;
      const bStatus = normalizeReusableStatus(b.status) === "Available" ? 0 : 1;
      if (aStatus !== bStatus) return aStatus - bStatus;
      const aTime = new Date(a.cancelledOn || 0).getTime();
      const bTime = new Date(b.cancelledOn || 0).getTime();
      if (aTime !== bTime) return aTime - bTime;
      return comparePoNumbers(a.poNumber, b.poNumber);
    });
  const lastTaken = stats.lastTaken;
  const syncLabel = useSupabase ? "Supabase shared mode" : "Local browser mode";
  const sourceLabel =
    available.type === "Reusable" ? "Reusable pool" : "New sequence";

  const tokenHtml = tokenRows.length
    ? tokenRows
        .slice(0, 12)
        .map((token) => {
          const status = normalizePoTokenStatus(token.status);
          const actions = availabilityTokenActions(token);
          return `
            <tr>
              <td><strong>${escapeHtml(token.tokenNumber)}</strong></td>
              <td>${escapeHtml(token.poNumber)}</td>
              <td>${escapeHtml(token.takenBy || "Not set")}</td>
              <td>${availabilityStatusPill(status)}</td>
              <td>${escapeHtml(formatDateTime(token.timestamp))}</td>
              <td>${actions || '<span class="small-text">No action</span>'}</td>
            </tr>
          `;
        })
        .join("")
    : availabilityEmptyRow(6, "No PO tokens have been taken yet.");

  const queueHtml = queueRows.length
    ? queueRows
        .map((row) => {
          const status = normalizeReusableStatus(row.status);
          return `
            <tr>
              <td><strong>${escapeHtml(row.poNumber)}</strong></td>
              <td>${escapeHtml(row.cancelledBy || "Not set")}</td>
              <td>${escapeHtml(formatDateTime(row.cancelledOn))}</td>
              <td>${escapeHtml(row.reason || "Not set")}</td>
              <td>${availabilityStatusPill(status)}</td>
            </tr>
          `;
        })
        .join("")
    : availabilityEmptyRow(5, "No reusable PO numbers are waiting in the queue.");

  mount.innerHTML = `
    <div class="po-availability-simple">
      <div class="tab-page-header availability-simple-header">
        <div>
          <h1>PO Availability</h1>
          <p>${escapeHtml(syncLabel)}</p>
        </div>
        <button class="primary-btn" type="button" data-po-availability-action="take">Take PO Number</button>
      </div>

      <article class="panel availability-simple-current">
        <div>
          <span>Current Available</span>
          <strong>${escapeHtml(available.currentPo)}</strong>
          <small>${escapeHtml(sourceLabel)}${lastTaken ? ` - Last taken ${escapeHtml(lastTaken.poNumber)}` : ""}</small>
        </div>
        <div class="availability-simple-stats">
          <div><span>Taken</span><strong>${stats.taken}</strong></div>
          <div><span>Reusable</span><strong>${stats.reusable}</strong></div>
          <div><span>Cancelled</span><strong>${stats.cancelled}</strong></div>
          <div><span>Tokens</span><strong>${stats.tokenCount}</strong></div>
        </div>
      </article>

      <article class="panel availability-simple-table">
        <div class="panel-header">
          <div>
            <h2>Recent Token History</h2>
            <p class="section-copy">Every booking stays taken until it is cancelled.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>PO Number</th>
                <th>Taken By</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>${tokenHtml}</tbody>
          </table>
        </div>
      </article>

      <article class="panel availability-simple-table">
        <div class="panel-header">
          <div>
            <h2>Reusable Queue</h2>
            <p class="section-copy">Cancelled numbers are reused first.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Cancelled By</th>
                <th>Cancelled On</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${queueHtml}</tbody>
          </table>
        </div>
      </article>
    </div>
  `;
}

function openPoTokenModal() {
  const available = getCurrentAvailablePO();
  const form = document.getElementById("poTokenForm");
  if (!form || !available.currentPo) return;
  form.reset();
  form.elements.poNumber.value = available.currentPo;
  form.elements.poSource.value = available.type;
  form.elements.requestType.value = "Marketplace";
  document.getElementById("poTokenTitle").textContent =
    `Take ${available.currentPo}`;
  document.getElementById("poTokenSubtext").textContent =
    `${available.type} PO number. This booking stays taken until it is cancelled.`;
  document.getElementById("poTokenPreviewNumber").textContent =
    available.currentPo;
  document.getElementById("poTokenPreviewType").textContent = available.type;
  document.getElementById("poTokenBackdrop")?.classList.remove("hidden");
}

function closePoTokenModal() {
  document.getElementById("poTokenBackdrop")?.classList.add("hidden");
}

function createPOToken(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const takenBy = cleanText(form.elements.takenBy.value);
  if (!takenBy) {
    alert("Enter the name of the person taking this PO number.");
    return;
  }
  const available = getCurrentAvailablePO();
  const poNumber = cleanText(form.elements.poNumber.value || available.currentPo);
  if (!poNumber || poNumber !== available.currentPo) {
    alert("This PO number is no longer available. Please take the current available number.");
    renderAll();
    return;
  }

  const now = new Date();
  const type = normalizePoAvailabilityType(form.elements.requestType.value);
  const tokenNumber = generatePoTokenNumber();
  const source = available.type;
  state.poTokenLog.unshift({
    tokenNumber,
    poNumber,
    takenBy,
    type,
    timestamp: now.toISOString(),
    status: "Taken",
    notes: cleanText(form.elements.notes.value),
    source,
  });
  state.activeReservations = state.activeReservations.filter(
    (row) => cleanText(row.poNumber) !== poNumber,
  );
  state.activeReservations.push({
    poNumber,
    tokenNumber,
    reservedBy: takenBy,
    reservedAt: now.toISOString(),
    expiryTime: PO_RESERVATION_COMPAT_EXPIRY,
    source,
    type,
  });
  upsertPoMaster({
    poNumber,
    status: "Reserved",
    createdBy: takenBy,
    createdAt: now.toISOString(),
    type,
    isReusable: source === "Reusable",
    tokenNumber,
  });
  if (source === "Reusable") {
    const queueRow = state.reusableQueue.find(
      (row) => cleanText(row.poNumber) === poNumber,
    );
    if (queueRow) {
      queueRow.status = "Reserved";
      queueRow.tokenNumber = tokenNumber;
    }
  }
  saveState();
  closePoTokenModal();
  renderAll();
}

function openPoTokenCancelModal(tokenNumber) {
  const token = getTokenByNumber(tokenNumber);
  if (!token || normalizePoTokenStatus(token.status) !== "Taken") {
    alert("Only taken PO reservations can be cancelled.");
    return;
  }
  const form = document.getElementById("poTokenCancelForm");
  form.reset();
  form.elements.tokenNumber.value = token.tokenNumber;
  document.getElementById("poTokenCancelTitle").textContent =
    `Cancel ${token.poNumber}`;
  document.getElementById("poTokenCancelSubtext").textContent =
    `${token.tokenNumber} taken by ${token.takenBy || "Unknown"}`;
  document
    .getElementById("poTokenCancelBackdrop")
    ?.classList.remove("hidden");
}

function closePoTokenCancelModal() {
  document.getElementById("poTokenCancelBackdrop")?.classList.add("hidden");
}

function cancelPOToken(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const token = getTokenByNumber(form.elements.tokenNumber.value);
  const reason = cleanText(form.elements.cancellationReason.value);
  if (!token) {
    alert("PO token not found. Refresh once and try again.");
    return;
  }
  if (!reason) {
    alert("Enter a cancellation reason.");
    return;
  }

  const now = new Date().toISOString();
  token.status = "Cancelled";
  token.cancelledAt = now;
  token.cancellationReason = reason;
  state.activeReservations = state.activeReservations.filter(
    (row) => cleanText(row.tokenNumber) !== cleanText(token.tokenNumber),
  );
  const queueEntry = {
    poNumber: token.poNumber,
    cancelledBy: token.takenBy || "",
    type: normalizePoAvailabilityType(token.type),
    cancelledOn: now,
    reason,
    status: "Available",
    tokenNumber: token.tokenNumber,
  };
  const existingQueueIndex = state.reusableQueue.findIndex(
    (row) => cleanText(row.poNumber) === cleanText(token.poNumber),
  );
  if (existingQueueIndex >= 0)
    state.reusableQueue[existingQueueIndex] = {
      ...state.reusableQueue[existingQueueIndex],
      ...queueEntry,
    };
  else state.reusableQueue.push(queueEntry);
  upsertPoMaster({
    poNumber: token.poNumber,
    status: "Cancelled",
    createdBy: token.takenBy || "",
    createdAt: token.timestamp || now,
    type: normalizePoAvailabilityType(token.type),
    isReusable: true,
    tokenNumber: token.tokenNumber,
  });

  saveState();
  closePoTokenCancelModal();
  renderAll();
}

function markPoNumberSubmitted(poNumber) {
  normalizeAvailabilityArrays();
  const cleanPo = cleanText(poNumber);
  if (!cleanPo) return;
  const token = state.poTokenLog.find(
    (row) =>
      cleanText(row.poNumber) === cleanPo &&
      normalizePoTokenStatus(row.status) === "Taken",
  );
  if (!token) return;
  const now = new Date().toISOString();
  token.status = "Taken";
  token.submittedAt = now;
  state.activeReservations = state.activeReservations.filter(
    (row) => cleanText(row.poNumber) !== cleanPo,
  );
  const queueRow = state.reusableQueue.find(
    (row) => cleanText(row.poNumber) === cleanPo,
  );
  if (queueRow) queueRow.status = "Used";
  upsertPoMaster({
    poNumber: cleanPo,
    status: "Submitted",
    createdBy: token.takenBy || "",
    createdAt: token.timestamp || now,
    type: normalizePoAvailabilityType(token.type),
    isReusable: false,
    tokenNumber: token.tokenNumber,
  });
}

function poNumberExistsForAnotherPO(poNumber, existingPo = null) {
  const cleanPo = cleanText(poNumber);
  if (!cleanPo) return false;
  return buildDerived().pos.some(
    (po) =>
      cleanText(po.poNumber) === cleanPo &&
      cleanText(po.poKey) !== cleanText(existingPo?.poKey || existingPo?.poNumber),
  );
}

function handlePoAvailabilityAction(event) {
  const button = event.target.closest("[data-po-availability-action]");
  if (!button) return;
  const action = button.dataset.poAvailabilityAction;
  if (action === "take") {
    openPoTokenModal();
    return;
  }
  const token = getTokenByNumber(button.dataset.token);
  if (action === "cancel-token") {
    openPoTokenCancelModal(button.dataset.token);
    return;
  }
  if (action === "create-po" && token) {
    openPoModal(null, { poNumber: token.poNumber });
  }
}

function renderAll() {
  const derived = buildDerived();
  renderCommandKpis(derived);
  renderCommandOverview(derived);
  renderPurchaseOrders(derived);
  renderProductsWorkspace(derived);
  renderVendors(derived);
  renderMetricProducts(derived);
  renderFollowups(derived);
  renderPoAvailability(derived);
  renderReports(derived);
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeTab = tab.dataset.tab;
      document
        .querySelectorAll(".tab")
        .forEach((item) =>
          item.classList.toggle("active", item.dataset.tab === state.activeTab),
        );
      document
        .querySelectorAll(".tab-panel")
        .forEach((panel) =>
          panel.classList.toggle("active", panel.id === state.activeTab),
        );
    });
  });
}

function bindFilters() {
  const specs = [
    ["poSearch", "input", (value) => (state.filters.poSearch = value)],
    ["poVendorFilter", "change", (value) => (state.filters.poVendor = value)],
    ["poPaymentFilter", "change", (value) => (state.filters.poPayment = value)],
    ["poStatusFilter", "change", (value) => (state.filters.poStatus = value)],
    [
      "poDeliveryFilter",
      "change",
      (value) => (state.filters.poDelivery = value),
    ],
    ["poSortSelect", "change", (value) => (state.filters.poSort = value)],
    [
      "productMasterSearch",
      "input",
      (value) => (state.filters.productMasterSearch = value),
    ],
    [
      "productMasterCategoryFilter",
      "change",
      (value) => (state.filters.productMasterCategory = value),
    ],
    [
      "productMasterStatusFilter",
      "change",
      (value) => (state.filters.productMasterStatus = value),
    ],
    [
      "productSearch",
      "input",
      (value) => (state.filters.productSearch = value),
    ],
    [
      "productSortSelect",
      "change",
      (value) => (state.filters.productSort = value),
    ],
    ["vendorSearch", "input", (value) => (state.filters.vendorSearch = value)],
    [
      "vendorSortSelect",
      "change",
      (value) => (state.filters.vendorSort = value),
    ],
    [
      "metricProductSearch",
      "input",
      (value) => (state.filters.metricProductSearch = value),
    ],
    [
      "metricSortSelect",
      "change",
      (value) => (state.filters.metricSort = value),
    ],
    [
      "followupDateFilter",
      "change",
      (value) => (state.filters.followupDate = value),
    ],
    [
      "followupMaterialFilter",
      "change",
      (value) => (state.filters.followupMaterial = value),
    ],
    [
      "followupStatusFilter",
      "change",
      (value) => (state.filters.followupStatus = value),
    ],
  ];

  specs.forEach(([id, eventName, handler]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(eventName, (event) => {
      handler(event.target.value);
      renderAll();
    });
  });
}

function bindGlobalEvents() {
  document
    .getElementById("openAddPoBtn")
    .addEventListener("click", () => openPoModal());
  document
    .getElementById("closePoModalBtn")
    .addEventListener("click", closePoModal);
  document
    .getElementById("cancelPoBtn")
    .addEventListener("click", closePoModal);
  document
    .getElementById("closeDetailModalBtn")
    .addEventListener("click", closeDetailModal);
  document
    .getElementById("exportStateBtn")
    .addEventListener("click", exportLocalState);
  document
    .getElementById("exportFullDataBtn")
    .addEventListener("click", exportFullData);
  document
    .getElementById("reportKpiGrid")
    ?.addEventListener("click", handleReportAction);
  document
    .getElementById("reportKpiGrid")
    ?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      handleReportAction(event);
    });
  document
    .getElementById("mechanicalAnalysisTabs")
    ?.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-mechanical-tab]");
      if (!tab) return;
      state.mechanicalAnalysisTab = tab.dataset.mechanicalTab;
      renderReports(buildDerived());
    });
  document
    .getElementById("procurementAuditTabs")
    ?.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-procurement-audit-tab]");
      if (!tab) return;
      state.procurementAuditTab = tab.dataset.procurementAuditTab;
      renderReports(buildDerived());
    });
  document
    .getElementById("procurementAuditBody")
    ?.addEventListener("click", handleProcurementAuditTableAction);
  document
    .getElementById("addProcurementAuditRecordBtn")
    ?.addEventListener("click", () => openProcurementAuditModal());
  document
    .getElementById("closeProcurementAuditModalBtn")
    ?.addEventListener("click", closeProcurementAuditModal);
  document
    .getElementById("cancelProcurementAuditBtn")
    ?.addEventListener("click", closeProcurementAuditModal);
  document
    .getElementById("procurementAuditModalBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "procurementAuditModalBackdrop")
        closeProcurementAuditModal();
    });
  document
    .getElementById("procurementAuditForm")
    ?.addEventListener("submit", saveProcurementAuditRecord);
  document
    .getElementById("exportProcurementReportBtn")
    ?.addEventListener("click", exportProcurementReportXlsx);
  document
    .getElementById("exportProcurementAuditBtn")
    ?.addEventListener("click", exportProcurementAuditXlsx);
  document
    .getElementById("exportMechanicalAnalysisBtn")
    ?.addEventListener("click", exportMechanicalAnalysisXlsx);
  document
    .getElementById("importStateInput")
    .addEventListener("change", importLocalState);
  document
    .getElementById("processQueueBtn")
    ?.addEventListener("click", processIncomingQueue);

  document
    .getElementById("poModalBackdrop")
    .addEventListener("click", (event) => {
      if (event.target.id === "poModalBackdrop") closePoModal();
    });
  document
    .getElementById("detailModalBackdrop")
    .addEventListener("click", (event) => {
      if (event.target.id === "detailModalBackdrop") closeDetailModal();
    });
  document
    .getElementById("closeStatusTimelineModalBtn")
    ?.addEventListener("click", closePoStatusTimeline);
  document
    .getElementById("statusTimelineBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "statusTimelineBackdrop") closePoStatusTimeline();
    });
  document
    .getElementById("closeCompleteFollowupModalBtn")
    ?.addEventListener("click", closeCompleteFollowupModal);
  document
    .getElementById("cancelCompleteFollowupBtn")
    ?.addEventListener("click", closeCompleteFollowupModal);
  document
    .getElementById("completeFollowupBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "completeFollowupBackdrop")
        closeCompleteFollowupModal();
    });
  document
    .getElementById("completeFollowupForm")
    ?.addEventListener("submit", completeFollowup);
  document
    .getElementById("closeFollowupMailModalBtn")
    ?.addEventListener("click", closeFollowupMailModal);
  document
    .getElementById("cancelFollowupMailBtn")
    ?.addEventListener("click", closeFollowupMailModal);
  document
    .getElementById("followupMailBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "followupMailBackdrop") closeFollowupMailModal();
    });
  document
    .getElementById("followupMailForm")
    ?.addEventListener("submit", queueFollowupMail);
  document
    .getElementById("poAvailabilityContent")
    ?.addEventListener("click", handlePoAvailabilityAction);

  // Add event listeners for PO Availability dynamically created elements
  function addPoAvailabilityEventListeners() {
    // Event listeners for dynamically created buttons will be handled by the existing click listener on poAvailabilityContent
    // which calls handlePoAvailabilityAction - this delegates to specific handlers based on data attributes
  }
  document
    .getElementById("closePoTokenModalBtn")
    ?.addEventListener("click", closePoTokenModal);
  document
    .getElementById("cancelPoTokenBtn")
    ?.addEventListener("click", closePoTokenModal);
  document
    .getElementById("poTokenBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "poTokenBackdrop") closePoTokenModal();
    });
  document
    .getElementById("poTokenForm")
    ?.addEventListener("submit", createPOToken);
  document
    .getElementById("closePoTokenCancelModalBtn")
    ?.addEventListener("click", closePoTokenCancelModal);
  document
    .getElementById("cancelPoTokenCancelBtn")
    ?.addEventListener("click", closePoTokenCancelModal);
  document
    .getElementById("poTokenCancelBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "poTokenCancelBackdrop")
        closePoTokenCancelModal();
    });
  document
    .getElementById("poTokenCancelForm")
    ?.addEventListener("submit", cancelPOToken);

  document.getElementById("addLineBtn").addEventListener("click", () => {
    document
      .getElementById("poLineItems")
      .appendChild(
        createLineItemCard({ quantityOrdered: 1, itemTaxPercent: 18 }),
      );
    refreshLineIndexes();
    recalcPoSummary();
  });

  document.getElementById("poLineItems").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-line-remove]");
    if (!btn) return;
    const cards = document.querySelectorAll(".line-item-card");
    if (cards.length <= 1) {
      alert("At least one product line is required.");
      return;
    }
    btn.closest(".line-item-card")?.remove();
    refreshLineIndexes();
    recalcPoSummary();
  });

  document
    .getElementById("poLineItems")
    .addEventListener("input", recalcPoSummary);
  document.getElementById("poLineItems").addEventListener("change", (event) => {
    if (event.target.matches('[name="lineType"]')) refreshLineIndexes();
    recalcPoSummary();
  });

  document
    .getElementById("summaryDiscountType")
    ?.addEventListener("change", recalcPoSummary);
  document
    .getElementById("summaryDiscountInput")
    ?.addEventListener("input", recalcPoSummary);
  document
    .getElementById("summaryDiscountInput")
    ?.addEventListener("change", recalcPoSummary);
  document
    .getElementById("summaryAdjustmentInput")
    ?.addEventListener("input", recalcPoSummary);
  document
    .getElementById("summaryAdjustmentInput")
    ?.addEventListener("change", recalcPoSummary);
  document
    .getElementById("summaryAmountPaidInput")
    ?.addEventListener("input", recalcPoSummary);
  document
    .getElementById("summaryAmountPaidInput")
    ?.addEventListener("change", recalcPoSummary);
  document
    .querySelector('#poForm [name="deliveryStatus"]')
    ?.addEventListener("change", () => syncDeliveredDateField({ stampIfEmpty: true }));

  document.getElementById("poForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const existing = state.editingPoKey
      ? getDerivedAndGroupedPo(state.editingPoKey).po
      : null;
    const payload = collectPoFormPayload(existing);
    applyPoChanges(existing, payload);
  });

  document.getElementById("poList").addEventListener("click", handlePoAction);
  document.querySelector(".po-board-head")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-po-sort-key]");
    if (!button) return;
    setPoBoardSort(button.dataset.poSortKey);
  });
  document
    .getElementById("recentPOs")
    ?.addEventListener("click", handlePoAction);
  document
    .getElementById("detailModalContent")
    .addEventListener("click", handlePoAction);
  document
    .getElementById("followupCardList")
    ?.addEventListener("click", handlePoAction);

  document.getElementById("vendorForm").addEventListener("click", (event) => {
    const btn = event.target.closest("#deleteVendorBtn");
    if (btn) deleteSelectedVendor();
  });

  document
    .getElementById("openAddMetricVendorBtn")
    .addEventListener("click", () => {
      if (!state.selectedMetricProduct) {
        alert("Select a product first.");
        return;
      }
      state.showMetricVendorForm = true;
      renderAll();
    });

  document.getElementById("metricEditor").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;
    if (btn.dataset.action === "cancel-add-metric-vendor") {
      state.showMetricVendorForm = false;
      renderAll();
    }
  });

  document
    .getElementById("metricEditor")
    .addEventListener("submit", (event) => {
      const form = event.target;
      if (form.id === "metricAddForm") {
        saveMetricQuickAddForm(event);
        return;
      }
      if (form.matches(".metric-card")) {
        saveMetricForm(event);
      }
    });

  document
    .getElementById("productTableBody")
    .addEventListener("click", (event) => {
      const row = event.target.closest("[data-product]");
      if (!row) return;
      state.activeTab = "vendor-metrics";
      document
        .querySelectorAll(".tab")
        .forEach((item) =>
          item.classList.toggle("active", item.dataset.tab === state.activeTab),
        );
      document
        .querySelectorAll(".tab-panel")
        .forEach((panel) =>
          panel.classList.toggle("active", panel.id === state.activeTab),
        );
      state.selectedMetricProduct = row.dataset.product;
      renderAll();
    });

  document
    .getElementById("vendorTableBody")
    .addEventListener("click", (event) => {
      const row = event.target.closest("[data-vendor]");
      if (!row) return;
      state.selectedVendor = row.dataset.vendor;
      renderAll();
    });

  document
    .getElementById("metricProductTableBody")
    .addEventListener("click", (event) => {
      const row = event.target.closest("[data-metric-product]");
      if (!row) return;
      state.selectedMetricProduct = row.dataset.metricProduct;
      renderAll();
    });

  document
    .getElementById("vendorForm")
    .addEventListener("submit", saveVendorForm);
  document
    .getElementById("metricEditor")
    .addEventListener("submit", (event) => {
      if (event.target.matches("form[data-metric-key]")) saveMetricForm(event);
    });
}

function handlePoAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const poKey = button.dataset.po;
  if (!action) return;

  if (action === "view-products") {
    openProductDetailModal(poKey);
    return;
  }
  if (action === "edit-po" || action === "edit-po-from-detail") {
    const { po } = getDerivedAndGroupedPo(poKey);
    if (po) {
      closeDetailModal();
      openPoModal(po);
    }
    return;
  }
  if (action === "delete-po") {
    deletePurchaseOrder(poKey);
    return;
  }
  if (action === "status-timeline") {
    openPoStatusTimeline(poKey);
    return;
  }
  if (action === "complete-followup") {
    openCompleteFollowupModal(button.dataset.followup || "", poKey);
    return;
  }
  if (action === "send-followup-mail") {
    openFollowupMailModal(button.dataset.followup || "", poKey);
    return;
  }
}

function bindProductMasterEvents() {
  document.querySelectorAll("[data-products-subtab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.productsSubTab = btn.dataset.productsSubtab;
      renderProductsWorkspace(buildDerived());
    });
  });

  document
    .getElementById("openAddProductMasterBtn")
    ?.addEventListener("click", () => openProductMasterModal());

  document
    .getElementById("closeProductMasterModalBtn")
    ?.addEventListener("click", closeProductMasterModal);
  document
    .getElementById("cancelProductMasterModalBtn")
    ?.addEventListener("click", closeProductMasterModal);
  document
    .getElementById("productMasterModalBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "productMasterModalBackdrop") closeProductMasterModal();
    });

  document
    .getElementById("productMasterForm")
    ?.addEventListener("submit", saveProductMasterForm);

  document
    .getElementById("productMasterTableBody")
    ?.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-product-master-action]");
      if (!btn) {
        const row = event.target.closest("[data-product-id]");
        if (row) openProductMasterDetailModal(row.dataset.productId);
        return;
      }
      const action = btn.dataset.productMasterAction;
      const productId = btn.dataset.productId;
      if (action === "edit") {
        const product = (state.products || []).find((p) => p.productId === productId);
        if (product) openProductMasterModal(product);
      } else if (action === "toggle-status") {
        toggleProductStatus(productId);
      } else if (action === "details") {
        openProductMasterDetailModal(productId);
      }
    });

  document.querySelectorAll("[data-pdetail-tab]").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      state.selectedMasterDetailTab = tabBtn.dataset.pdetailTab;
      if (state.selectedMasterProductId) {
        const product = (state.products || []).find((p) => p.productId === state.selectedMasterProductId);
        if (product) renderProductMasterDetailContent(product);
      }
    });
  });

  document
    .getElementById("closeProductMasterDetailModalBtn")
    ?.addEventListener("click", closeProductMasterDetailModal);
  document
    .getElementById("productMasterDetailModalBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "productMasterDetailModalBackdrop") closeProductMasterDetailModal();
    });

  document
    .getElementById("addAliasForm")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("aliasTextInput");
      const productId = document.getElementById("aliasProductId").value;
      if (productId && input && input.value) {
        addAliasToProduct(productId, input.value);
        input.value = "";
      }
    });

  document
    .getElementById("aliasChipsList")
    ?.addEventListener("click", (event) => {
      const btn = event.target.closest(".remove-alias-btn");
      if (btn && btn.dataset.aliasId) {
        removeAlias(btn.dataset.aliasId);
      }
    });

  document
    .getElementById("openAdminLoginBtn")
    ?.addEventListener("click", openAdminLoginModal);
  document
    .getElementById("closeAdminLoginModalBtn")
    ?.addEventListener("click", closeAdminLoginModal);
  document
    .getElementById("cancelAdminLoginBtn")
    ?.addEventListener("click", closeAdminLoginModal);
  document
    .getElementById("adminLoginModalBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "adminLoginModalBackdrop") closeAdminLoginModal();
    });
  document
    .getElementById("adminLoginForm")
    ?.addEventListener("submit", handleAdminSignInForm);
  document
    .getElementById("adminSignOutBtn")
    ?.addEventListener("click", handleAdminSignOut);

  // Unmapped Products Events
  const unmappedSearchInput = document.getElementById("unmappedProductSearch");
  if (unmappedSearchInput) {
    unmappedSearchInput.addEventListener("input", (event) => {
      state.filters.unmappedProductSearch = event.target.value;
      renderUnmappedProducts(buildDerived());
    });
  }

  document
    .getElementById("unmappedProductsTableBody")
    ?.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-unmapped-action]");
      if (!btn) return;
      const action = btn.dataset.unmappedAction;
      const key = btn.dataset.unmappedKey;
      if (action === "map") {
        openMapProductModal(key);
      } else if (action === "create") {
        handleCreateNewProductFromUnmapped(key);
      }
    });

  document
    .getElementById("mapTargetProductSelect")
    ?.addEventListener("change", (event) => {
      updateMapTargetPreview(event.target.value);
    });

  document
    .getElementById("closeMapProductModalBtn")
    ?.addEventListener("click", closeMapProductModal);
  document
    .getElementById("cancelMapProductModalBtn")
    ?.addEventListener("click", closeMapProductModal);
  document
    .getElementById("mapProductModalBackdrop")
    ?.addEventListener("click", (event) => {
      if (event.target.id === "mapProductModalBackdrop") closeMapProductModal();
    });
  document
    .getElementById("mapProductForm")
    ?.addEventListener("submit", handleMapProductForm);
}

function openAdminLoginModal() {
  const modal = document.getElementById("adminLoginModalBackdrop");
  const form = document.getElementById("adminLoginForm");
  const errBox = document.getElementById("adminLoginError");
  if (!modal || !form) return;
  form.reset();
  if (errBox) {
    errBox.textContent = "";
    errBox.classList.add("hidden");
  }
  modal.classList.remove("hidden");
  const emailInput = document.getElementById("adminLoginEmail");
  if (emailInput) emailInput.focus();
}

function closeAdminLoginModal() {
  const modal = document.getElementById("adminLoginModalBackdrop");
  if (modal) modal.classList.add("hidden");
}

async function handleAdminSignInForm(event) {
  if (event) event.preventDefault();
  const form = document.getElementById("adminLoginForm");
  const errBox = document.getElementById("adminLoginError");
  const submitBtn = document.getElementById("adminLoginSubmitBtn");
  if (!form) return;

  const email = cleanText(form.elements.email.value);
  const password = form.elements.password.value;
  if (!email || !password) return;

  if (errBox) {
    errBox.textContent = "";
    errBox.classList.add("hidden");
  }
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Signing In...";
  }

  try {
    if (!useSupabase || !supabaseClient?.auth) {
      throw new Error("Supabase authentication is not configured.");
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (errBox) {
        errBox.textContent = error.message || "Invalid login credentials.";
        errBox.classList.remove("hidden");
      }
      return;
    }

    closeAdminLoginModal();
    await checkSupabaseAuthSession();
    renderAll();
  } catch (err) {
    if (errBox) {
      errBox.textContent = err.message || "An unexpected error occurred.";
      errBox.classList.remove("hidden");
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Sign In";
    }
  }
}

async function handleAdminSignOut() {
  if (useSupabase && supabaseClient?.auth) {
    await supabaseClient.auth.signOut();
  }
  state.authSession = null;
  state.isAuthenticatedUser = false;
  state.productMasterCanWrite = false;
  renderAll();
}

async function init() {
  bindTabs();
  bindFilters();
  bindGlobalEvents();
  bindProductMasterEvents();
  renderAll();
  if (hasSupabaseConfig() && (useSupabase || (await loadSupabaseSdk()))) {
    await refreshStateFromSupabase({ generateFollowups: true });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
