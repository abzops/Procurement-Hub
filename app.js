
const STORAGE_KEYS = {
  manualRows: 'sns-manual-rows-v1',
  rowOverrides: 'sns-row-overrides-v1',
  vendorContacts: 'sns-vendor-contacts-v1',
  productVendorMetrics: 'sns-product-vendor-metrics-v1',
  deletedVendors: 'sns-deleted-vendors-v1'
};

let baseRows = Array.isArray(window.STACKNSTOCK_DATA?.rows) ? window.STACKNSTOCK_DATA.rows : [];
let vendorSeeds = Array.isArray(window.STACKNSTOCK_DATA?.vendorSeeds) ? window.STACKNSTOCK_DATA.vendorSeeds : [];

const PRODUCT_SORTS = [
  { value: 'totalSpend-desc', label: 'Sort: Highest Spend' },
  { value: 'totalSpend-asc', label: 'Sort: Lowest Spend' },
  { value: 'vendorCount-desc', label: 'Sort: Most Vendors' },
  { value: 'vendorCount-asc', label: 'Sort: Fewest Vendors' },
  { value: 'bestPrice-asc', label: 'Sort: Lowest Best Price' },
  { value: 'bestPrice-desc', label: 'Sort: Highest Best Price' },
  { value: 'avgPrice-asc', label: 'Sort: Lowest Avg Price' },
  { value: 'avgPrice-desc', label: 'Sort: Highest Avg Price' },
  { value: 'totalQty-desc', label: 'Sort: Highest Qty' },
  { value: 'totalQty-asc', label: 'Sort: Lowest Qty' },
  { value: 'lastOrderDate-desc', label: 'Sort: Latest Order' },
  { value: 'lastOrderDate-asc', label: 'Sort: Oldest Order' },
  { value: 'bestVendor-asc', label: 'Sort: Best Vendor A to Z' },
  { value: 'productName-asc', label: 'Sort: Product A to Z' },
  { value: 'productName-desc', label: 'Sort: Product Z to A' }
];

const PO_SORTS = [
  { value: 'poDate-desc', label: 'Sort: Latest PO Date' },
  { value: 'poDate-asc', label: 'Sort: Oldest PO Date' },
  { value: 'deliveryDate-desc', label: 'Sort: Latest Delivery Date' },
  { value: 'deliveryDate-asc', label: 'Sort: Earliest Delivery Date' },
  { value: 'poTotal-desc', label: 'Sort: Highest PO Value' },
  { value: 'poTotal-asc', label: 'Sort: Lowest PO Value' },
  { value: 'productCount-desc', label: 'Sort: Most Product Lines' },
  { value: 'productCount-asc', label: 'Sort: Fewest Product Lines' },
  { value: 'totalQty-desc', label: 'Sort: Highest Total Qty' },
  { value: 'totalQty-asc', label: 'Sort: Lowest Total Qty' },
  { value: 'vendorName-asc', label: 'Sort: Vendor A to Z' },
  { value: 'vendorName-desc', label: 'Sort: Vendor Z to A' },
  { value: 'paymentStatus-asc', label: 'Sort: Payment Status' },
  { value: 'poStatus-asc', label: 'Sort: PO Status' },
  { value: 'deliveryStatus-asc', label: 'Sort: Delivery Status' },
  { value: 'poNumber-asc', label: 'Sort: PO Number A to Z' },
  { value: 'poNumber-desc', label: 'Sort: PO Number Z to A' },
  { value: 'source-asc', label: 'Sort: Source A to Z' },
  { value: 'gstin-asc', label: 'Sort: GSTIN A to Z' }
];

const VENDOR_SORTS = [
  { value: 'totalSpend-desc', label: 'Sort: Highest Spend' },
  { value: 'totalSpend-asc', label: 'Sort: Lowest Spend' },
  { value: 'poCount-desc', label: 'Sort: Most POs' },
  { value: 'poCount-asc', label: 'Sort: Fewest POs' },
  { value: 'productCount-desc', label: 'Sort: Most Products' },
  { value: 'productCount-asc', label: 'Sort: Fewest Products' },
  { value: 'lastOrderDate-desc', label: 'Sort: Latest Order' },
  { value: 'lastOrderDate-asc', label: 'Sort: Oldest Order' },
  { value: 'vendorName-asc', label: 'Sort: Vendor A to Z' },
  { value: 'vendorName-desc', label: 'Sort: Vendor Z to A' },
  { value: 'source-asc', label: 'Sort: Source A to Z' },
  { value: 'gstin-asc', label: 'Sort: GSTIN A to Z' }
];

const METRIC_SORTS = [
  { value: 'vendorCount-desc', label: 'Sort: Most Vendors' },
  { value: 'vendorCount-asc', label: 'Sort: Fewest Vendors' },
  { value: 'bestPrice-asc', label: 'Sort: Lowest Best Price' },
  { value: 'bestPrice-desc', label: 'Sort: Highest Best Price' },
  { value: 'avgPrice-asc', label: 'Sort: Lowest Avg Price' },
  { value: 'avgPrice-desc', label: 'Sort: Highest Avg Price' },
  { value: 'totalQty-desc', label: 'Sort: Highest Qty' },
  { value: 'totalQty-asc', label: 'Sort: Lowest Qty' },
  { value: 'totalSpend-desc', label: 'Sort: Highest Spend' },
  { value: 'totalSpend-asc', label: 'Sort: Lowest Spend' },
  { value: 'lastOrderDate-desc', label: 'Sort: Latest Order' },
  { value: 'lastOrderDate-asc', label: 'Sort: Oldest Order' },
  { value: 'productName-asc', label: 'Sort: Product A to Z' },
  { value: 'productName-desc', label: 'Sort: Product Z to A' }
];

const PRODUCT_COLUMNS = [
  { key: 'productName', label: 'Product' },
  { key: 'vendorCount', label: 'Vendors' },
  { key: 'bestVendor', label: 'Best Vendor' },
  { key: 'bestPrice', label: 'Best Price' },
  { key: 'avgPrice', label: 'Avg Price' },
  { key: 'totalQty', label: 'Total Qty' },
  { key: 'totalSpend', label: 'Total Spend' },
  { key: 'lastOrderDate', label: 'Last Order' }
];

const VENDOR_COLUMNS = [
  { key: 'vendorName', label: 'Vendor' },
  { key: 'source', label: 'Source' },
  { key: 'gstin', label: 'GSTIN' },
  { key: 'poCount', label: 'POs' },
  { key: 'productCount', label: 'Products' },
  { key: 'totalSpend', label: 'Spend' },
  { key: 'lastOrderDate', label: 'Last Order' }
];

const METRIC_PRODUCT_COLUMNS = [
  { key: 'productName', label: 'Product' },
  { key: 'vendorCount', label: 'Vendors' },
  { key: 'bestPrice', label: 'Best Price' },
  { key: 'lastOrderDate', label: 'Last Order' }
];

const FOLLOWUP_RULES = {
  RTO: [
    { key: 'RTO_50', percent: 50, label: '50% Lead Time', activity: 'Verify order readiness and logistics arrangement', method: 'Call / Email' },
    { key: 'RTO_75', percent: 75, label: '75% Lead Time', activity: 'Confirm dispatch schedule and transportation details', method: 'Call + Email' },
    { key: 'RTO_95', percent: 95, label: '95% Lead Time', activity: 'Confirm next-day delivery commitment', method: 'Mandatory Call + Email' },
    { key: 'RTO_100', percent: 100, label: '100% Lead Date', activity: 'Confirm dispatch / delivery status and ETA', method: 'Mandatory Call + Email' },
    { key: 'RTO_DELAY', percent: 101, label: 'Delay Stage', activity: 'Ask reason for delay and revised delivery date', method: 'Mandatory Call + Email', delay: true }
  ],
  MTO: [
    { key: 'MTO_25', percent: 25, label: '25% Lead Time', activity: 'Confirm raw material procurement and manufacturing kickoff', method: 'Call + Email' },
    { key: 'MTO_50', percent: 50, label: '50% Lead Time', activity: 'Obtain manufacturing progress update (%)', method: 'Call + Email' },
    { key: 'MTO_75', percent: 75, label: '75% Lead Time', activity: 'Verify production completion, QC, and inspection readiness', method: 'Call + Email' },
    { key: 'MTO_90', percent: 90, label: '90% Lead Time', activity: 'Confirm packing, dispatch readiness, and logistics planning', method: 'Call + Email' },
    { key: 'MTO_95', percent: 95, label: '95% Lead Time', activity: 'Confirm next-day committed delivery', method: 'Mandatory Call + Email' },
    { key: 'MTO_100', percent: 100, label: '100% Lead Date', activity: 'Confirm dispatch / material movement / ETA', method: 'Mandatory Call + Email' },
    { key: 'MTO_DELAY', percent: 101, label: 'Delay Stage', activity: 'Obtain delay justification and revised delivery schedule', method: 'Mandatory Call + Email', delay: true }
  ],
  Unknown: [
    { key: 'UNKNOWN_50', percent: 50, label: '50% Lead Time', activity: 'Verify order readiness and delivery commitment', method: 'Call / Email' },
    { key: 'UNKNOWN_75', percent: 75, label: '75% Lead Time', activity: 'Confirm dispatch schedule and transportation details', method: 'Call + Email' },
    { key: 'UNKNOWN_100', percent: 100, label: '100% Lead Date', activity: 'Confirm dispatch / delivery status and ETA', method: 'Mandatory Call + Email' },
    { key: 'UNKNOWN_DELAY', percent: 101, label: 'Delay Stage', activity: 'Ask reason for delay and revised delivery date', method: 'Mandatory Call + Email', delay: true }
  ]
};

const state = {
  manualRows: loadJson(STORAGE_KEYS.manualRows, []),
  rowOverrides: loadJson(STORAGE_KEYS.rowOverrides, {}),
  vendorContacts: mergeVendorSeeds(loadJson(STORAGE_KEYS.vendorContacts, {})),
  productVendorMetrics: loadJson(STORAGE_KEYS.productVendorMetrics, {}),
  followups: [],
  activityEvents: [],
  deletedVendors: loadJson(STORAGE_KEYS.deletedVendors, []),
  activeTab: 'overview',
  selectedVendor: null,
  selectedMetricProduct: null,
  editingPoKey: null,
  showMetricVendorForm: false,
  filters: {
    poSearch: '',
    poVendor: 'all',
    poPayment: 'all',
    poStatus: 'all',
    poDelivery: 'all',
    poSort: 'poDate-desc',
    productSearch: '',
    productSort: 'totalSpend-desc',
    vendorSearch: '',
    vendorSort: 'totalSpend-desc',
    metricProductSearch: '',
    metricSort: 'vendorCount-desc',
    followupDate: new Date().toISOString().slice(0, 10),
    followupMaterial: 'all',
    followupStatus: 'all'
  }
};

const snsConfig = window.SNS_CONFIG || {};
const useSupabase = Boolean(snsConfig.useSupabase && snsConfig.supabaseUrl && snsConfig.supabaseAnonKey && window.supabase?.createClient);
const supabaseClient = useSupabase ? window.supabase.createClient(snsConfig.supabaseUrl, snsConfig.supabaseAnonKey) : null;
const queueConfig = {
  enabled: Boolean(snsConfig.useQueueProcessor && useSupabase),
  table: cleanConfigText(snsConfig.queueTable) || 'incoming_po_queue',
  payloadColumn: cleanConfigText(snsConfig.queuePayloadColumn) || 'raw_payload',
  statusColumn: cleanConfigText(snsConfig.queueStatusColumn) || 'status',
  errorColumn: cleanConfigText(snsConfig.queueErrorColumn) || 'error_message',
  processedAtColumn: cleanConfigText(snsConfig.queueProcessedAtColumn) || 'processed_at',
  poNumberColumn: cleanConfigText(snsConfig.queuePoNumberColumn) || 'po_number',
  sourceColumn: cleanConfigText(snsConfig.queueSourceColumn) || 'source',
  batchSize: Number.isFinite(Number(snsConfig.queueBatchSize)) ? Math.max(1, Number(snsConfig.queueBatchSize)) : 20
};
let remoteSyncTimer = null;
let remoteSyncInFlight = false;
let queueProcessingInFlight = false;
let completingFollowupContext = null;
let mailingFollowupContext = null;

function cleanConfigText(value) {
  return String(value ?? '').trim();
}

function safeDate(value) {
  const text = cleanText(value);
  return text || null;
}

function toNumeric(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Number(n.toFixed(2)) : null;
}

function roundMoney(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Number(n.toFixed(2)) : 0;
}

function derivePaymentState(poTotal, amountPaidInput = 0, explicitBalanceDue = null) {
  const total = Math.max(0, roundMoney(poTotal));
  const paidInput = Math.max(0, roundMoney(amountPaidInput));
  const hasExplicitBalance = explicitBalanceDue !== null && explicitBalanceDue !== undefined && explicitBalanceDue !== '' && Number.isFinite(Number(explicitBalanceDue));
  const rawBalance = hasExplicitBalance
    ? roundMoney(explicitBalanceDue)
    : roundMoney(total - Math.min(total, paidInput));
  const balanceDue = Math.max(0, rawBalance);
  const amountPaid = Math.max(0, roundMoney(total - balanceDue));
  let paymentStatus = 'Pending';
  if (total <= 0 || amountPaid >= total) paymentStatus = 'Paid';
  else if (amountPaid > 0) paymentStatus = 'Partially Paid';
  return { amountPaid, balanceDue, paymentStatus };
}


function paymentProgressPercent(po) {
  const total = Math.max(0, number(po?.poTotal));
  const explicitPaid = Math.max(0, number(po?.amountPaid));
  const balance = po?.balanceDue === null || po?.balanceDue === undefined || po?.balanceDue === '' ? null : Math.max(0, number(po?.balanceDue));
  const status = normalizePaymentStatus(po?.paymentStatus || 'Pending');
  if (status === 'Paid') return 100;
  if (total <= 0) return status === 'Paid' ? 100 : 0;
  let paid = explicitPaid;
  if (balance !== null && Number.isFinite(balance)) paid = Math.max(0, total - balance);
  let percent = Math.round((Math.min(total, paid) / total) * 100);
  if (status === 'Pending') percent = 0;
  if (status === 'Partially Paid' && percent <= 0) percent = 1;
  if (status === 'Partially Paid' && percent >= 100) percent = 99;
  return Math.max(0, Math.min(100, percent));
}

function paymentProgressStatus(po) {
  const percent = paymentProgressPercent(po);
  if (percent >= 100) return 'Paid';
  if (percent > 0) return 'Partially Paid';
  return 'Pending';
}

function paymentProgressClass(po) {
  const percent = paymentProgressPercent(po);
  if (percent >= 100) return 'paid';
  if (percent > 0) return 'partial';
  return 'pending';
}

function renderPaymentProgress(po) {
  const percent = paymentProgressPercent(po);
  const status = paymentProgressStatus(po);
  const total = Math.max(0, number(po?.poTotal));
  const paidFromBalance = po?.balanceDue === null || po?.balanceDue === undefined || po?.balanceDue === ''
    ? number(po?.amountPaid || 0)
    : Math.max(0, total - number(po?.balanceDue));
  const paid = Math.max(0, Math.min(total, paidFromBalance));
  const balance = Math.max(0, number(po?.balanceDue ?? Math.max(0, total - paid)));
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
  const typeEl = document.getElementById('summaryDiscountType');
  const inputEl = document.getElementById('summaryDiscountInput');
  const adjustmentEl = document.getElementById('summaryAdjustmentInput');
  const discountType = cleanText(typeEl?.value || 'amount').toLowerCase() === 'percent' ? 'percent' : 'amount';
  const discountInputValue = Math.max(0, number(inputEl?.value));
  const adjustmentAmount = roundMoney(number(adjustmentEl?.value));
  return { discountType, discountInputValue, adjustmentAmount };
}

function calculatePoBreakdown(lines, discountType = 'amount', discountInputValue = 0, adjustmentAmount = 0) {
  const normalizedLines = (lines || []).map(line => {
    const quantityOrdered = number(line.quantityOrdered);
    const itemPrice = number(line.itemPrice);
    const itemTaxPercent = number(line.itemTaxPercent);
    const lineBase = roundMoney(quantityOrdered * itemPrice);
    return {
      ...line,
      quantityOrdered,
      uom: normalizeUom(line.uom || 'Nos'),
      itemPrice,
      itemTaxPercent,
      lineBase
    };
  });

  const itemSubtotal = roundMoney(normalizedLines.reduce((sum, line) => sum + line.lineBase, 0));
  const rawDiscountValue = discountType === 'percent'
    ? itemSubtotal * (number(discountInputValue) / 100)
    : number(discountInputValue);
  const discountValue = roundMoney(Math.min(itemSubtotal, Math.max(0, rawDiscountValue)));
  const taxableSubtotal = roundMoney(itemSubtotal - discountValue);

  let allocatedDiscount = 0;
  const computedLines = normalizedLines.map((line, index) => {
    let discountShare = 0;
    if (itemSubtotal > 0 && discountValue > 0) {
      if (index === normalizedLines.length - 1) {
        discountShare = roundMoney(discountValue - allocatedDiscount);
      } else {
        discountShare = roundMoney(discountValue * (line.lineBase / itemSubtotal));
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
      lineGrandTotal
    };
  });

  const taxTotal = roundMoney(computedLines.reduce((sum, line) => sum + line.itemTaxAmount, 0));
  const grandTotal = roundMoney(Math.max(0, taxableSubtotal + taxTotal + number(adjustmentAmount)));

  return {
    itemSubtotal,
    discountType,
    discountInputValue: roundMoney(discountInputValue),
    discountValue,
    taxableSubtotal,
    taxTotal,
    adjustmentAmount: roundMoney(adjustmentAmount),
    grandTotal,
    lines: computedLines
  };
}

async function loadRemoteStateFromSupabase() {
  if (!useSupabase) return false;

  const [vendorsRes, poRes, linesRes, metricsRes, followupsRes, activityEventsRes] = await Promise.all([
    supabaseClient.from('vendors').select('*').order('vendor_name'),
    supabaseClient.from('purchase_orders').select('*').order('po_date', { ascending: false }),
    supabaseClient.from('po_lines').select('*').order('po_date', { ascending: false }),
    supabaseClient.from('product_vendor_metrics').select('*').order('product_name'),
    supabaseClient.from('po_followups').select('*').order('due_date', { ascending: true }),
    supabaseClient.from('po_activity_events').select('*').order('created_at', { ascending: false })
  ]);

  const errors = [vendorsRes.error, poRes.error, linesRes.error, metricsRes.error, followupsRes.error, activityEventsRes.error].filter(Boolean);
  if (errors.length) {
    console.error('Supabase load error', errors);
    alert('Supabase connection loaded with errors. Falling back to local mode for this session.');
    return false;
  }

  const vendors = vendorsRes.data || [];
  const lines = linesRes.data || [];
  const metrics = metricsRes.data || [];

  vendorSeeds = vendors
    .filter(v => !v.is_deleted)
    .map(v => ({
      vendorName: v.vendor_name,
      source: v.source || '',
      gstin: v.gstin || '',
      contactPerson: v.contact_person || '',
      phone: v.phone || '',
      email: v.email || '',
      website: v.website || '',
      city: v.city || '',
      defaultLeadTimeDays: v.default_lead_time_days || '',
      rating: v.rating || '',
      notes: v.notes || ''
    }));

  baseRows = lines.map(line => ({
    id: line.line_id,
    poDate: line.po_date || '',
    deliveryDate: line.delivery_date || '',
    deliveryStatus: line.delivery_status || '',
    poNumber: line.po_number,
    reference: '',
    poStatus: line.po_status || '',
    vendorName: line.vendor_name || '',
    hsnSac: '',
    source: line.source || '',
    gstin: line.gstin || '',
    referenceNo: '',
    terms: line.terms || '',
    itemPrice: Number(line.item_price || 0),
    itemDesc: line.item_desc || '',
    quantityOrdered: Number(line.quantity_ordered || 0),
    uom: cleanText(line.uom || line.unit || line.unit_name || ''),
    itemTax: line.item_tax_percent ? `GST${line.item_tax_percent}` : '',
    itemTaxPercent: Number(line.item_tax_percent || 0),
    itemTaxAmount: Number(line.item_tax_amount || 0),
    itemTotal: Number(line.item_total || 0),
    lineGrandTotal: Number(line.line_grand_total || 0),
    total: null,
    paymentStatus: line.payment_status || '',
    balanceDue: line.balance_due,
    discountAmount: 0,
    discountType: 'amount',
    discountInputValue: 0,
    adjustmentAmount: 0,
    manual: Boolean(line.manual),
    lineType: line.line_type || 'product'
  }));

  // set po total on first line of each PO so existing grouping logic can keep using it
  const poMap = new Map((poRes.data || []).map(po => [po.po_number, po]));
  const firstIndexByPo = new Map();
  baseRows.forEach((row, idx) => {
    if (!firstIndexByPo.has(row.poNumber)) firstIndexByPo.set(row.poNumber, idx);
  });
  firstIndexByPo.forEach((idx, poNumber) => {
    if (poMap.has(poNumber)) baseRows[idx].total = Number(poMap.get(poNumber).po_total || 0);
  });
  baseRows.forEach(row => {
    const po = poMap.get(row.poNumber);
    row.discountAmount = Number(po?.discount_amount || 0);
    row.discountType = cleanText(po?.discount_type || 'amount').toLowerCase() === 'percent' ? 'percent' : 'amount';
    row.discountInputValue = Number(po?.discount_input_value ?? po?.discount_amount ?? 0);
    row.adjustmentAmount = Number(po?.adjustment_amount || 0);
    row.amountPaid = Number(po?.amount_paid || 0);
    row.materialType = normalizeMaterialType(po?.material_type || row.materialType || 'Unknown');
    row.edd = po?.edd || row.edd || '';
    row.vendorEmail = po?.vendor_email || row.vendorEmail || '';
    row.vendorPhone = po?.vendor_phone || row.vendorPhone || '';
    row.delayReason = po?.delay_reason || row.delayReason || '';
    row.balanceDue = po?.balance_due ?? row.balanceDue ?? null;
  });

  state.manualRows = [];
  state.rowOverrides = {};
  state.vendorContacts = mergeVendorSeeds(Object.fromEntries(vendors.filter(v => !v.is_deleted).map(v => [cleanText(v.vendor_name), {
    vendorName: v.vendor_name,
    source: v.source || '',
    gstin: v.gstin || '',
    contactPerson: v.contact_person || '',
    phone: v.phone || '',
    email: v.email || '',
    website: v.website || '',
    city: v.city || '',
    defaultLeadTimeDays: v.default_lead_time_days || '',
    rating: v.rating || '',
    notes: v.notes || ''
  }])));
  state.productVendorMetrics = Object.fromEntries(metrics.map(m => [m.metric_key, {
    productName: m.product_name,
    vendorName: m.vendor_name,
    quotedPrice: m.quoted_price == null ? '' : String(m.quoted_price),
    leadTimeDays: m.lead_time_days || '',
    moq: m.moq || '',
    rating: m.rating || '',
    notes: m.notes || '',
    source: m.source || '',
    gstin: m.gstin || ''
  }]));
  state.deletedVendors = vendors.filter(v => v.is_deleted).map(v => v.vendor_name);
  state.followups = (followupsRes.data || []).filter(row => !isAcknowledgementFollowup(row));
  state.activityEvents = activityEventsRes.data || [];
  return true;
}

async function syncStateToSupabase() {
  if (!useSupabase || remoteSyncInFlight) return;
  remoteSyncInFlight = true;
  try {
    const derived = buildDerived();
    const allRowsData = dedupeRowsById(allRows());

    const vendorNames = new Set([
      ...Object.keys(state.vendorContacts || {}).map(cleanText),
      ...derived.vendors.map(v => cleanText(v.vendorName)),
      ...allRowsData.map(r => cleanText(r.vendorName))
    ]);

    const vendorsPayload = Array.from(vendorNames)
      .filter(Boolean)
      .map(vendorName => {
        const contact = state.vendorContacts[vendorName] || {};
        const derivedVendor = derived.vendors.find(v => cleanText(v.vendorName) === vendorName) || {};
        return {
          vendor_name: vendorName,
          source: cleanText(contact.source || derivedVendor.source || ''),
          gstin: cleanText(contact.gstin || derivedVendor.gstin || ''),
          contact_person: cleanText(contact.contactPerson || ''),
          phone: cleanText(contact.phone || ''),
          email: cleanText(contact.email || ''),
          website: cleanText(contact.website || ''),
          city: cleanText(contact.city || ''),
          default_lead_time_days: cleanText(contact.defaultLeadTimeDays || ''),
          rating: cleanText(contact.rating || ''),
          notes: contact.notes || '',
          is_deleted: isVendorDeleted(vendorName)
        };
      });

    const poPayload = dedupeRecordsByKey(derived.pos.map(po => ({
      po_number: po.poNumber,
      po_date: safeDate(po.poDate),
      vendor_name: po.vendorName,
      source: po.source || '',
      gstin: po.gstin || '',
      delivery_date: safeDate(po.deliveryDate),
      payment_status: po.paymentStatus || '',
      po_status: po.poStatus || '',
      delivery_status: po.deliveryStatus || '',
      terms: po.terms || '',
      po_total: toNumeric(po.poTotal),
      discount_amount: toNumeric(po.discountAmount),
      discount_type: po.discountType || 'amount',
      discount_input_value: toNumeric(po.discountInputValue),
      adjustment_amount: toNumeric(po.adjustmentAmount),
      amount_paid: toNumeric(po.amountPaid),
      balance_due: toNumeric(po.balanceDue),
      item_count: Number(po.itemCount || 0),
      product_count: Number(po.productCount || 0),
      charge_count: Number(po.chargeCount || 0),
      total_qty: toNumeric(po.totalQty),
      total_charge_value: toNumeric(po.totalChargeValue),
      reference_no: '',
      material_type: normalizeMaterialType(po.materialType || 'Unknown'),
      vendor_email: cleanText(po.vendorEmail || state.vendorContacts[po.vendorName]?.email || ''),
      vendor_phone: cleanText(po.vendorPhone || state.vendorContacts[po.vendorName]?.phone || ''),
      delay_reason: cleanText(po.delayReason || ''),
      edd: safeDate(po.edd)
    })), 'po_number');

    const linePayload = dedupeRecordsByKey(allRowsData.map(line => ({
      line_id: line.id,
      po_number: line.poNumber,
      vendor_name: line.vendorName,
      po_date: safeDate(line.poDate),
      delivery_date: safeDate(line.deliveryDate),
      payment_status: line.paymentStatus || '',
      po_status: line.poStatus || '',
      delivery_status: line.deliveryStatus || '',
      line_type: line.lineType || inferLineType(line.itemDesc, line.lineType),
      is_charge: Boolean(line.isCharge),
      item_desc: line.itemDesc,
      quantity_ordered: toNumeric(line.quantityOrdered),
      uom: cleanText(line.uom || ''),
      item_price: toNumeric(line.itemPrice),
      item_tax_percent: toNumeric(line.itemTaxPercent),
      item_tax_amount: toNumeric(line.itemTaxAmount),
      item_total: toNumeric(line.itemTotal),
      line_grand_total: toNumeric(line.lineGrandTotal),
      balance_due: toNumeric(line.balanceDue),
      terms: line.terms || '',
      source: line.source || '',
      gstin: line.gstin || '',
      manual: Boolean(line.manual)
    })), 'line_id');

    const metricsPayload = dedupeRecordsByKey(Object.entries(state.productVendorMetrics || {}).map(([metricKey, metric]) => ({
      metric_key: metricKey,
      product_name: cleanText(metric.productName || splitMetricStorageKey(metricKey).productName),
      vendor_name: cleanText(metric.vendorName || splitMetricStorageKey(metricKey).vendorName),
      quoted_price: metric.quotedPrice === '' ? null : toNumeric(metric.quotedPrice),
      lead_time_days: cleanText(metric.leadTimeDays || ''),
      moq: cleanText(metric.moq || ''),
      rating: cleanText(metric.rating || ''),
      notes: metric.notes || '',
      source: cleanText(metric.source || ''),
      gstin: cleanText(metric.gstin || '')
    })).filter(x => x.product_name && x.vendor_name), 'metric_key');

    // Upsert vendors first for FK safety
    if (vendorsPayload.length) {
      const { error } = await supabaseClient.from('vendors').upsert(vendorsPayload, { onConflict: 'vendor_name' });
      if (error) throw error;
    }

    // Normal sync is upsert-only. Do not delete existing Supabase rows here; explicit Delete PO handles deletion.

    if (poPayload.length) {
      const { error } = await supabaseClient.from('purchase_orders').upsert(poPayload, { onConflict: 'po_number' });
      if (error) throw error;
    }

    if (linePayload.length) {
      const { error } = await supabaseClient.from('po_lines').upsert(linePayload, { onConflict: 'line_id' });
      if (error) throw error;
    }

    if (metricsPayload.length) {
      const { error } = await supabaseClient.from('product_vendor_metrics').upsert(metricsPayload, { onConflict: 'metric_key' });
      if (error) throw error;
    }

    await generateFollowupsForPOs(derived.pos);
    await loadRemoteStateFromSupabase();
  } catch (error) {
    console.error('Supabase sync failed', error);
    const message = String(error?.message || error || '');
    if (message.includes('cannot affect row a second time')) {
      alert('Supabase sync failed because duplicate PO line IDs were detected in this save. Refresh once and save again.');
    } else {
      alert(`Supabase sync failed: ${message}`);
    }
  } finally {
    remoteSyncInFlight = false;
  }
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
  localStorage.setItem(STORAGE_KEYS.manualRows, JSON.stringify(state.manualRows));
  localStorage.setItem(STORAGE_KEYS.rowOverrides, JSON.stringify(state.rowOverrides));
  localStorage.setItem(STORAGE_KEYS.vendorContacts, JSON.stringify(state.vendorContacts));
  localStorage.setItem(STORAGE_KEYS.productVendorMetrics, JSON.stringify(state.productVendorMetrics));
  localStorage.setItem(STORAGE_KEYS.deletedVendors, JSON.stringify(state.deletedVendors));
  scheduleRemoteSync();
}

function mergeVendorSeeds(existing) {
  const merged = { ...(existing || {}) };
  vendorSeeds.forEach(seed => {
    if (!seed?.vendorName) return;
    const key = cleanText(seed.vendorName);
    merged[key] = { ...seed, ...(merged[key] || {}) };
  });
  return merged;
}

function cleanText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function dedupeRowsById(rows) {
  const map = new Map();
  (rows || []).forEach(row => {
    if (!row || row.__deleted) return;
    const key = cleanText(row.id);
    if (!key) return;
    map.set(key, row);
  });
  return Array.from(map.values());
}

function dedupeRecordsByKey(records, keyName) {
  const map = new Map();
  (records || []).forEach(record => {
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
    Array.isArray(payload.po_lines)
  );
}

function isSinglePoPackagePayload(payload) {
  return Boolean(payload && payload.purchase_order && Array.isArray(payload.po_lines));
}

function isRawZohoPoPayload(payload) {
  return Boolean(payload && cleanText(payload.purchaseorder_number || payload.purchaseorder_id || payload.po_number) && Array.isArray(payload.line_items));
}

function sumLineItemTaxes(lineItem) {
  const taxes = Array.isArray(lineItem?.line_item_taxes) ? lineItem.line_item_taxes : [];
  if (!taxes.length) return toNumeric(lineItem?.item_tax_amount) || 0;
  return roundMoney(taxes.reduce((sum, tax) => {
    const amount = Number(tax?.tax_amount ?? tax?.amount ?? tax?.tax_total ?? 0);
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0));
}

function convertSinglePoPackageToDbPayload(payload) {
  if (!isSinglePoPackagePayload(payload)) return null;
  const purchaseOrder = payload.purchase_order || {};
  const poLines = Array.isArray(payload.po_lines) ? payload.po_lines : [];
  return {
    purchase_orders: [purchaseOrder],
    po_lines: poLines
  };
}

function convertZohoPoPayloadToDbPayload(payload) {
  if (!isRawZohoPoPayload(payload)) return null;

  const poNumber = cleanText(payload.purchaseorder_number || payload.po_number);
  const poDate = cleanText(payload.date || payload.po_date);
  const deliveryDate = cleanText(payload.delivery_date || payload.expected_delivery_date);
  const vendorName = cleanText(payload.vendor_name);
  const source = cleanText(payload.source_of_supply || payload.source || payload.destination_of_supply);
  const gstin = cleanText(payload.gst_no || payload.gstin);
  const terms = String(payload.terms ?? payload.notes ?? '');
  const paymentStatus = normalizePaymentStatus(payload.payment_status || payload.payment_terms_label || 'Pending');
  const poStatus = normalizePoStatus(payload.status || payload.po_status || 'Issued');
  const deliveryStatus = normalizeDeliveryStatus(payload.delivery_status || payload.received_status || payload.received_status_formatted || 'Unknown');
  const discountAmount = roundMoney(payload.discount_total ?? payload.discount_amount ?? 0);
  const discountInputValue = roundMoney(payload.discount_total ?? payload.discount_amount ?? 0);
  const adjustmentAmount = roundMoney(payload.adjustment ?? 0);
  const totalAmount = roundMoney(payload.total ?? payload.po_total ?? 0);
  const referenceNo = cleanText(payload.reference_number || payload.reference_no || payload.purchaseorder_id);
  const lineItems = Array.isArray(payload.line_items) ? payload.line_items : [];

  const poLines = lineItems.map((item, index) => {
    const itemDesc = cleanText(item?.name || item?.item_desc || item?.description);
    const quantityOrdered = roundMoney(item?.quantity ?? item?.qty ?? 0);
    const uom = normalizeUom(item?.unit || item?.uom || item?.unit_name || item?.unit_measure || item?.unit_of_measurement || item?.measure || '');
    const itemPrice = roundMoney(item?.rate ?? item?.item_price ?? 0);
    const itemTotal = roundMoney(item?.item_total ?? (quantityOrdered * itemPrice));
    const itemTaxPercent = roundMoney(item?.tax_percentage ?? item?.item_tax_percent ?? 0);
    const itemTaxAmount = sumLineItemTaxes(item);
    const lineType = inferLineType(itemDesc, item?.line_type);
    const isCharge = lineType === 'charge';
    const itemOrder = cleanText(item?.item_order || item?.line_item_id || String(index + 1));
    return {
      line_id: `${poNumber}__${itemOrder}`,
      po_number: poNumber,
      vendor_name: vendorName,
      po_date: poDate,
      delivery_date: deliveryDate || null,
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
      manual: false
    };
  });

  const chargeLines = poLines.filter(line => line.is_charge);
  const productLines = poLines.filter(line => !line.is_charge);
  const totalQty = roundMoney(productLines.reduce((sum, line) => sum + number(line.quantity_ordered), 0));
  const totalChargeValue = roundMoney(chargeLines.reduce((sum, line) => sum + number(line.line_grand_total), 0));
  const itemCount = poLines.length;
  const chargeCount = chargeLines.length;
  const productCount = productLines.length;

  return {
    purchase_orders: [{
      po_number: poNumber,
      po_date: poDate || null,
      vendor_name: vendorName,
      source,
      gstin,
      delivery_date: deliveryDate || null,
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
      discount_type: 'amount',
      discount_input_value: discountInputValue,
      adjustment_amount: adjustmentAmount,
      amount_paid: paymentStatus === 'Paid' ? totalAmount : 0,
      balance_due: paymentStatus === 'Paid' ? 0 : totalAmount
    }],
    po_lines: poLines
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
  (payload.purchase_orders || []).forEach(po => {
    const vendorName = cleanText(po.vendor_name);
    if (!vendorName) return;
    vendorMap.set(vendorName, {
      vendor_name: vendorName,
      source: cleanText(po.source),
      gstin: cleanText(po.gstin),
      contact_person: '',
      phone: '',
      email: '',
      website: '',
      city: '',
      default_lead_time_days: '',
      rating: '',
      notes: '',
      is_deleted: false
    });
  });
  (payload.po_lines || []).forEach(line => {
    const vendorName = cleanText(line.vendor_name);
    if (!vendorName) return;
    const existing = vendorMap.get(vendorName) || {
      vendor_name: vendorName,
      source: '',
      gstin: '',
      contact_person: '',
      phone: '',
      email: '',
      website: '',
      city: '',
      default_lead_time_days: '',
      rating: '',
      notes: '',
      is_deleted: false
    };
    if (!existing.source) existing.source = cleanText(line.source);
    if (!existing.gstin) existing.gstin = cleanText(line.gstin);
    vendorMap.set(vendorName, existing);
  });
  return Array.from(vendorMap.values());
}

async function upsertDbPayloadToSupabase(payload) {
  if (!useSupabase) throw new Error('Supabase is not enabled.');
  const normalized = normalizeIncomingDbPayload(payload);
  if (!normalized) throw new Error('Unsupported payload shape.');

  const vendorsPayload = buildVendorPayloadFromDbPayload(normalized);
  const poPayload = dedupeRecordsByKey((normalized.purchase_orders || []).map(po => ({
    po_number: cleanText(po.po_number),
    po_date: safeDate(po.po_date),
    vendor_name: cleanText(po.vendor_name),
    source: cleanText(po.source),
    gstin: cleanText(po.gstin),
    delivery_date: safeDate(po.delivery_date),
    payment_status: normalizePaymentStatus(po.payment_status || 'Pending'),
    po_status: normalizePoStatus(po.po_status || 'Issued'),
    delivery_status: normalizeDeliveryStatus(po.delivery_status || 'Unknown'),
    terms: String(po.terms ?? ''),
    po_total: toNumeric(po.po_total),
    discount_amount: toNumeric(po.discount_amount),
    discount_type: cleanText(po.discount_type || 'amount').toLowerCase() === 'percent' ? 'percent' : 'amount',
    discount_input_value: toNumeric(po.discount_input_value ?? po.discount_amount ?? 0),
    adjustment_amount: toNumeric(po.adjustment_amount),
    amount_paid: toNumeric(po.amount_paid),
    balance_due: toNumeric(po.balance_due),
    item_count: Number(po.item_count || 0),
    product_count: Number(po.product_count || 0),
    charge_count: Number(po.charge_count || 0),
    total_qty: toNumeric(po.total_qty),
    total_charge_value: toNumeric(po.total_charge_value),
    reference_no: cleanText(po.reference_no),
    material_type: normalizeMaterialType(po.material_type || po.materialType || 'Unknown'),
    vendor_email: cleanText(po.vendor_email || po.vendorEmail || ''),
    vendor_phone: cleanText(po.vendor_phone || po.vendorPhone || ''),
    delay_reason: cleanText(po.delay_reason || po.delayReason || ''),
    edd: safeDate(po.edd || po.revised_estimated_delivery_date || po.revised_delivery_date)
  })), 'po_number');

  const linePayload = dedupeRecordsByKey((normalized.po_lines || []).map(line => ({
    line_id: cleanText(line.line_id),
    po_number: cleanText(line.po_number),
    vendor_name: cleanText(line.vendor_name),
    po_date: safeDate(line.po_date),
    delivery_date: safeDate(line.delivery_date),
    payment_status: normalizePaymentStatus(line.payment_status || 'Pending'),
    po_status: normalizePoStatus(line.po_status || 'Issued'),
    delivery_status: normalizeDeliveryStatus(line.delivery_status || 'Unknown'),
    line_type: inferLineType(line.item_desc, line.line_type),
    is_charge: Boolean(line.is_charge) || inferLineType(line.item_desc, line.line_type) === 'charge',
    item_desc: cleanText(line.item_desc),
    quantity_ordered: toNumeric(line.quantity_ordered),
    uom: normalizeUom(line.uom || line.unit || line.unit_name || ''),
    item_price: toNumeric(line.item_price),
    item_tax_percent: toNumeric(line.item_tax_percent),
    item_tax_amount: toNumeric(line.item_tax_amount),
    item_total: toNumeric(line.item_total),
    line_grand_total: toNumeric(line.line_grand_total),
    balance_due: toNumeric(line.balance_due),
    terms: String(line.terms ?? ''),
    source: cleanText(line.source),
    gstin: cleanText(line.gstin),
    manual: Boolean(line.manual)
  })), 'line_id');

  if (vendorsPayload.length) {
    const { error } = await supabaseClient.from('vendors').upsert(vendorsPayload, { onConflict: 'vendor_name' });
    if (error) throw error;
  }
  if (poPayload.length) {
    const { error } = await supabaseClient.from('purchase_orders').upsert(poPayload, { onConflict: 'po_number' });
    if (error) throw error;
  }
  if (linePayload.length) {
    const { error } = await supabaseClient.from('po_lines').upsert(linePayload, { onConflict: 'line_id' });
    if (error) throw error;
  }
  return { vendors: vendorsPayload.length, purchaseOrders: poPayload.length, poLines: linePayload.length };
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
  if (!row || typeof row !== 'object') return null;
  const candidates = [
    row[queueConfig.payloadColumn],
    row.raw_payload,
    row.payload,
    row.data,
    row.body
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (typeof candidate === 'string') {
      try {
        return JSON.parse(candidate);
      } catch {
        continue;
      }
    }
    if (typeof candidate === 'object') return candidate;
  }
  return null;
}

async function markQueueRow(rowId, patch) {
  if (!queueConfig.enabled || !rowId) return;
  const updateData = {};
  if (queueConfig.statusColumn && patch.status !== undefined) updateData[queueConfig.statusColumn] = patch.status;
  if (queueConfig.errorColumn && patch.error_message !== undefined) updateData[queueConfig.errorColumn] = patch.error_message;
  if (queueConfig.processedAtColumn && patch.processed_at !== undefined) updateData[queueConfig.processedAtColumn] = patch.processed_at;
  if (!Object.keys(updateData).length) return;
  const { error } = await supabaseClient.from(queueConfig.table).update(updateData).eq('id', rowId);
  if (error) console.warn('Queue row update skipped', error);
}

async function processIncomingQueue() {
  if (!queueConfig.enabled) {
    alert('Queue processor is disabled. Enable it in config.js first.');
    return;
  }
  if (queueProcessingInFlight) return;
  queueProcessingInFlight = true;
  const processBtn = document.getElementById('processQueueBtn');
  if (processBtn) processBtn.disabled = true;
  try {
    let query = supabaseClient.from(queueConfig.table).select('*');
    if (queueConfig.statusColumn) {
      query = query.or(`${queueConfig.statusColumn}.is.null,${queueConfig.statusColumn}.eq.pending,${queueConfig.statusColumn}.eq.Pending,${queueConfig.statusColumn}.eq.PENDING,${queueConfig.statusColumn}.eq.failed,${queueConfig.statusColumn}.eq.Failed,${queueConfig.statusColumn}.eq.FAILED`);
    }
    const { data, error } = await query.order('created_at', { ascending: true }).limit(queueConfig.batchSize);
    if (error) throw error;

    const pendingRows = (data || []).filter(row => {
      const status = normalizeKey(row?.[queueConfig.statusColumn]);
      return !status || ['PENDING', 'FAILED'].includes(status);
    });

    if (!pendingRows.length) {
      alert('No pending queue rows found.');
      return;
    }

    let processed = 0;
    let failed = 0;
    for (const row of pendingRows) {
      try {
        const payload = readQueueRowPayload(row);
        const normalized = normalizeIncomingDbPayload(payload);
        if (!normalized) throw new Error('Unsupported raw payload shape in queue row.');
        await upsertDbPayloadToSupabase(normalized);
        await markQueueRow(row.id, { status: 'processed', error_message: null, processed_at: new Date().toISOString() });
        processed += 1;
      } catch (queueError) {
        failed += 1;
        await markQueueRow(row.id, { status: 'failed', error_message: String(queueError?.message || queueError), processed_at: null });
      }
    }

    await refreshStateFromSupabase();
    const message = failed
      ? `Queue processed. Success: ${processed}. Failed: ${failed}.`
      : `Queue processed successfully. ${processed} row(s) synced.`;
    alert(message);
  } catch (error) {
    console.error('Queue processing failed', error);
    alert(`Queue processing failed: ${error.message || error}`);
  } finally {
    queueProcessingInFlight = false;
    if (processBtn) processBtn.disabled = false;
  }
}

function buildProductVendorMetricsFromRows(rows) {
  const metrics = {};
  (rows || []).forEach(row => {
    const vendorName = cleanText(row.vendorName);
    const productName = cleanText(row.itemDesc);
    const lineType = cleanText(row.lineType || row.line_type).toLowerCase();
    if (!vendorName || !productName || lineType === 'charge') return;
    const key = `${productName}__${vendorName}`;
    metrics[key] = {
      ...(metrics[key] || {}),
      productName,
      vendorName,
      quotedPrice: number(row.itemPrice),
      source: cleanText(row.source),
      gstin: cleanText(row.gstin),
      notes: metrics[key]?.notes || ''
    };
  });
  return metrics;
}

function convertDbImportPayloadToLocalRows(payload) {
  const poMap = new Map(
    (payload.purchase_orders || []).map(po => [cleanText(po.po_number), po])
  );

  const firstLineIndexByPo = new Map();
  const rows = dedupeRecordsByKey((payload.po_lines || []).map((line, index) => {
    const poNumber = cleanText(line.po_number);
    const po = poMap.get(poNumber) || {};
    const rowId = cleanText(line.line_id) || uid('import');
    const rowIndex = (firstLineIndexByPo.get(poNumber) || 0) + 1;
    firstLineIndexByPo.set(poNumber, rowIndex);

    return {
      id: rowId,
      poDate: cleanText(po.po_date || line.po_date),
      deliveryDate: cleanText(po.delivery_date || line.delivery_date),
      poNumber,
      vendorName: cleanText(po.vendor_name || line.vendor_name),
      source: cleanText(line.source || po.source),
      gstin: cleanText(line.gstin ?? po.gstin),
      terms: String(line.terms ?? po.terms ?? ''),
      itemDesc: cleanText(line.item_desc),
      quantityOrdered: number(line.quantity_ordered),
      uom: normalizeUom(line.uom || line.unit || line.unit_name || ''),
      itemPrice: number(line.item_price),
      itemTaxPercent: number(line.item_tax_percent),
      itemTaxAmount: number(line.item_tax_amount),
      itemTotal: number(line.item_total),
      lineGrandTotal: number(line.line_grand_total),
      lineType: cleanText(line.line_type || inferLineType(line.item_desc, line.line_type)).toLowerCase() === 'charge' ? 'charge' : 'product',
      isCharge: Boolean(line.is_charge) || cleanText(line.line_type).toLowerCase() === 'charge',
      paymentStatus: normalizePaymentStatus(po.payment_status || line.payment_status),
      poStatus: normalizePoStatus(po.po_status || line.po_status),
      deliveryStatus: normalizeDeliveryStatus(po.delivery_status || line.delivery_status),
      balanceDue: line.balance_due ?? null,
      discountAmount: number(po.discount_amount),
      discountType: cleanText(po.discount_type || 'amount').toLowerCase() === 'percent' ? 'percent' : 'amount',
      discountInputValue: number(po.discount_input_value),
      adjustmentAmount: number(po.adjustment_amount),
      amountPaid: number(po.amount_paid),
      balanceDue: po.balance_due ?? line.balance_due ?? null,
      total: rowIndex === 1 ? number(po.po_total) : null,
      manual: true
    };
  }), 'id');

  const vendorContacts = {};
  (payload.purchase_orders || []).forEach(po => {
    const vendorName = cleanText(po.vendor_name);
    if (!vendorName) return;
    vendorContacts[vendorName] = {
      ...(vendorContacts[vendorName] || {}),
      vendorName,
      source: cleanText(po.source),
      gstin: cleanText(po.gstin)
    };
  });

  return {
    manualRows: rows,
    rowOverrides: {},
    vendorContacts,
    productVendorMetrics: buildProductVendorMetricsFromRows(rows),
    restoredVendorNames: Object.keys(vendorContacts)
  };
}

function normalizeKey(value) {
  return cleanText(value).toUpperCase();
}

function metricStorageKey(productName, vendorName) {
  return `${cleanText(productName)}__${cleanText(vendorName)}`;
}

function splitMetricStorageKey(key) {
  const [productName = '', vendorName = ''] = String(key || '').split('__');
  return { productName: cleanText(productName), vendorName: cleanText(vendorName) };
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
  /\binstallation\s*charge/i
];

function isVendorDeleted(vendorName) {
  const key = normalizeKey(vendorName);
  return Array.isArray(state.deletedVendors) && state.deletedVendors.some(item => normalizeKey(item) === key);
}

function restoreVendorIfDeleted(vendorName) {
  const key = normalizeKey(vendorName);
  state.deletedVendors = (state.deletedVendors || []).filter(item => normalizeKey(item) !== key);
}

function inferLineType(itemDesc, explicitType = '') {
  const explicit = cleanText(explicitType).toLowerCase();
  if (explicit === 'charge') return 'charge';
  if (explicit === 'product') return 'product';
  const text = cleanText(itemDesc);
  if (!text) return 'product';
  return CHARGE_PATTERNS.some(pattern => pattern.test(text)) ? 'charge' : 'product';
}

function getLineTypeLabel(lineType) {
  return lineType === 'charge' ? 'Charge Line' : 'Product Line';
}

function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function uid(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function money(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(number(value));
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(number(value));
}

function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return cleanText(value) || '—';
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function lineGrandTotal(row) {
  const itemTotal = number(row.itemTotal) || number(row.itemPrice) * number(row.quantityOrdered);
  const itemTaxAmount = number(row.itemTaxAmount) || (itemTotal * (number(row.itemTaxPercent) / 100));
  return itemTotal + itemTaxAmount;
}

function normalizePaymentStatus(value) {
  const raw = normalizeKey(value);
  if (!raw) return 'Unknown';
  if (raw.includes('PART')) return 'Partially Paid';
  if (raw.includes('PAID')) return 'Paid';
  if (raw.includes('PENDING') || raw.includes('DUE') || raw.includes('OPEN')) return 'Pending';
  return cleanText(value) || 'Unknown';
}

function normalizePoStatus(value) {
  const raw = normalizeKey(value);
  if (!raw) return 'Unknown';
  if (raw.includes('DRAFT')) return 'Draft';
  if (raw.includes('BILL')) return 'Billed';
  if (raw.includes('ISSU')) return 'Issued';
  if (raw.includes('CLOSE')) return 'Closed';
  return cleanText(value) || 'Unknown';
}

function normalizeMaterialType(value) {
  const raw = normalizeKey(value);
  if (raw === 'RTO') return 'RTO';
  if (raw === 'MTO') return 'MTO';
  return 'Unknown';
}

function normalizeDeliveryStatus(value) {
  const raw = normalizeKey(value);
  if (!raw) return 'Unknown';
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanText(value))) return 'Unknown';
  if (raw.includes('TRANSIT')) return 'In Transit';
  if (raw.includes('PART')) return 'Partially Delivered';
  if (['YES', 'Y', 'DELIVERED', 'RECEIVED', 'DONE', 'COMPLETE', 'COMPLETED'].includes(raw)) return 'Delivered';
  return cleanText(value) || 'Unknown';
}

function parseDateOnly(value) {
  const text = cleanText(value);
  if (!text) return null;
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
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
  if (normalizeDeliveryStatus(po.deliveryStatus) === 'Delivered') return false;
  const deliveryDate = parseDateOnly(po.deliveryDate);
  if (!deliveryDate) return false;
  return deliveryDate < todayDateOnly();
}

function displayDeliveryStatus(po) {
  if (isPoDelayed(po)) return 'Delayed';
  const status = cleanText(po?.deliveryStatus);
  if (status === 'Mixed') return 'Mixed';
  return normalizeDeliveryStatus(status);
}

function displayDeliveryBadgeClass(po) {
  return isPoDelayed(po) ? 'delayed' : badgeClass(displayDeliveryStatus(po));
}

function badgeClass(value) {
  const raw = normalizeKey(value);
  if (raw === 'PAID' || raw === 'DELIVERED') return 'paid delivered';
  if (raw.includes('PART')) return 'partial';
  if (raw === 'ISSUED') return 'issued';
  if (raw === 'BILLED') return 'billed';
  if (raw === 'DELAYED') return 'delayed';
  return 'unknown';
}

function normalizeUom(value) {
  const raw = cleanText(value);
  if (!raw) return 'Nos';
  const lower = raw.toLowerCase();
  if (['m', 'meter', 'meters', 'metre', 'metres', 'mtr', 'mtrs'].includes(lower)) return 'Mtr';
  if (['nos', 'no', 'number', 'numbers', 'pcs', 'piece', 'pieces', 'qty'].includes(lower)) return 'Nos';
  if (['kg', 'kgs', 'kilogram', 'kilograms'].includes(lower)) return 'Kg';
  if (['g', 'gm', 'gram', 'grams'].includes(lower)) return 'Gm';
  if (['ltr', 'ltrs', 'liter', 'liters', 'litre', 'litres', 'l'].includes(lower)) return 'Ltr';
  if (['set', 'sets'].includes(lower)) return 'Set';
  if (['box', 'boxes'].includes(lower)) return 'Box';
  if (['roll', 'rolls'].includes(lower)) return 'Roll';
  return raw;
}

function materializeRow(row) {
  const itemTotal = number(row.itemTotal) || (number(row.itemPrice) * number(row.quantityOrdered));
  const itemTaxAmount = number(row.itemTaxAmount) || (itemTotal * (number(row.itemTaxPercent) / 100));
  const lineType = inferLineType(row.itemDesc, row.lineType);
  const discountAmount = Math.max(0, number(row.discountAmount));
  const discountType = cleanText(row.discountType || 'amount').toLowerCase() === 'percent' ? 'percent' : 'amount';
  const discountInputValue = Math.max(0, number(row.discountInputValue ?? (discountType === 'amount' ? discountAmount : 0)));
  const adjustmentAmount = number(row.adjustmentAmount);
  const amountPaid = Math.max(0, number(row.amountPaid));
  const balanceDue = row.balanceDue ?? null;
  return {
    ...row,
    id: cleanText(row.id) || uid('row'),
    poDate: cleanText(row.poDate),
    deliveryDate: cleanText(row.deliveryDate),
    edd: cleanText(row.edd),
    materialType: normalizeMaterialType(row.materialType),
    vendorEmail: cleanText(row.vendorEmail),
    vendorPhone: cleanText(row.vendorPhone),
    delayReason: cleanText(row.delayReason),
    poNumber: cleanText(row.poNumber) || cleanText(row.id),
    vendorName: cleanText(row.vendorName) || 'Unknown Vendor',
    source: cleanText(row.source),
    gstin: cleanText(row.gstin),
    terms: String(row.terms ?? ''),
    itemDesc: cleanText(row.itemDesc) || 'Unnamed Item',
    quantityOrdered: number(row.quantityOrdered),
    uom: normalizeUom(row.uom || row.unit || row.unitName || ''),
    itemPrice: number(row.itemPrice),
    itemTaxPercent: number(row.itemTaxPercent),
    itemTotal,
    itemTaxAmount,
    lineGrandTotal: number(row.lineGrandTotal) || (itemTotal + itemTaxAmount),
    discountAmount,
    discountType,
    discountInputValue,
    adjustmentAmount,
    amountPaid,
    balanceDue,
    lineType,
    isCharge: lineType === 'charge',
    paymentStatus: normalizePaymentStatus(row.paymentStatus),
    poStatus: normalizePoStatus(row.poStatus),
    deliveryStatus: normalizeDeliveryStatus(row.deliveryStatus),
    manual: Boolean(row.manual)
  };
}

function allRows() {
  const rowMap = new Map();
  const manualPoNumbers = new Set(
    (state.manualRows || [])
      .filter(row => row && !row.__deleted)
      .map(row => cleanText(row.poNumber))
      .filter(Boolean)
  );

  baseRows.forEach(base => {
    if (manualPoNumbers.has(cleanText(base.poNumber))) return;
    const override = state.rowOverrides?.[base.id];
    if (override?.__deleted) return;
    const merged = materializeRow(override ? { ...base, ...override } : base);
    rowMap.set(cleanText(merged.id), merged);
  });

  (state.manualRows || []).forEach(row => {
    if (row?.__deleted) return;
    const merged = materializeRow(row);
    rowMap.set(cleanText(merged.id), merged);
  });

  return Array.from(rowMap.values());
}

function uniqueMeaningful(values) {
  return [...new Set(values.map(v => cleanText(v)).filter(v => v && v !== 'Unknown' && v !== '—'))];
}

function summarizeStatus(items, field) {
  const unique = uniqueMeaningful(items.map(item => item[field]));
  if (!unique.length) return 'Unknown';
  if (unique.length === 1) return unique[0];
  return 'Mixed';
}

function summarizeDate(items, field) {
  const values = items.map(item => cleanText(item[field])).filter(Boolean);
  if (!values.length) return '';
  const dated = values
    .map(v => ({ raw: v, ts: Number.isNaN(new Date(v).getTime()) ? -Infinity : new Date(v).getTime() }))
    .sort((a, b) => b.ts - a.ts);
  return dated[0]?.raw || values[0] || '';
}

function groupedPoItems(items) {
  const map = new Map();

  items.forEach(item => {
    const key = normalizeKey(item.itemDesc) || item.id;
    if (!map.has(key)) {
      map.set(key, {
        itemDesc: item.itemDesc || 'Unnamed Item',
        lineType: item.lineType || (item.isCharge ? 'charge' : 'product'),
        isCharge: Boolean(item.isCharge),
        quantityOrdered: 0,
        itemTotal: 0,
        itemTaxAmount: 0,
        lineGrandTotal: 0,
        itemTaxPercent: number(item.itemTaxPercent),
        lines: [],
        prices: [],
        uoms: []
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

  return Array.from(map.values()).map(group => {
    const uniquePrices = [...new Set(group.prices.filter(Boolean))];
    const minPrice = uniquePrices.length ? Math.min(...uniquePrices) : 0;
    const maxPrice = uniquePrices.length ? Math.max(...uniquePrices) : 0;
    const avgPrice = group.quantityOrdered > 0 ? (group.itemTotal / group.quantityOrdered) : 0;
    const uniqueUoms = [...new Set(group.uoms.filter(Boolean))];
    const displayUom = uniqueUoms.length === 1 ? uniqueUoms[0] : (uniqueUoms.length ? 'Mixed' : 'Nos');
    return {
      ...group,
      lineCount: group.lines.length,
      minPrice,
      maxPrice,
      avgPrice,
      displayUom,
      displayPrice: minPrice && maxPrice && minPrice !== maxPrice ? `${money(minPrice)} to ${money(maxPrice)}` : (minPrice ? money(minPrice) : '—'),
      displayTaxPercent: group.lines.length === 1 ? formatNumber(group.itemTaxPercent) : 'Mixed'
    };
  });
}

function groupedPOs(rows) {
  const map = new Map();

  rows.forEach(row => {
    const key = cleanText(row.poNumber) || row.id;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  });

  return Array.from(map.entries()).map(([poNumber, items]) => {
    const first = items[0] || {};
    const productItems = items.filter(item => !item.isCharge);
    const chargeItems = items.filter(item => item.isCharge);
    const groupedItems = groupedPoItems(productItems);
    const groupedCharges = groupedPoItems(chargeItems);
    const itemSubtotal = roundMoney(items.reduce((sum, item) => sum + number(item.itemTotal), 0));
    const taxTotal = roundMoney(items.reduce((sum, item) => sum + number(item.itemTaxAmount), 0));
    const grossTotal = roundMoney(itemSubtotal + taxTotal);
    const providedDiscounts = [...new Set(items.map(item => Math.max(0, number(item.discountAmount))).filter(value => value > 0))];
    const providedDiscountTypes = uniqueMeaningful(items.map(item => item.discountType));
    const providedDiscountInputs = [...new Set(items.map(item => Math.max(0, number(item.discountInputValue))).filter(value => value > 0))];
    const providedAdjustments = [...new Set(items.map(item => number(item.adjustmentAmount)).filter(value => value !== 0))];
    const providedTotals = [...new Set(items.map(item => number(item.total)).filter(value => value > 0))];
    const providedAmountPaid = [...new Set(items.map(item => Math.max(0, number(item.amountPaid))).filter(value => value >= 0))];
    const providedBalanceDue = [...new Set(items.map(item => item.balanceDue).filter(value => value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value))))];
    const discountAmount = providedDiscounts.length ? providedDiscounts[0] : 0;
    const discountType = providedDiscountTypes.length ? providedDiscountTypes[0] : 'amount';
    const discountInputValue = providedDiscountInputs.length ? providedDiscountInputs[0] : discountAmount;
    const adjustmentAmount = providedAdjustments.length ? providedAdjustments[0] : 0;
    const taxableSubtotal = roundMoney(itemSubtotal - discountAmount);
    const poTotal = providedTotals.length === 1 ? providedTotals[0] : Math.max(0, taxableSubtotal + taxTotal + adjustmentAmount);
    const fallbackAmountPaid = providedAmountPaid.length ? providedAmountPaid[0] : 0;
    const fallbackBalanceDue = providedBalanceDue.length ? providedBalanceDue[0] : null;
    const paymentDerived = derivePaymentState(poTotal, fallbackAmountPaid, fallbackBalanceDue);
    const amountPaid = paymentDerived.amountPaid;
    const balanceDue = paymentDerived.balanceDue;
    const totalQty = productItems.reduce((sum, item) => sum + number(item.quantityOrdered), 0);
    const totalChargeValue = chargeItems.reduce((sum, item) => sum + number(item.lineGrandTotal), 0);
    const searchBlob = [
      poNumber,
      first.vendorName,
      first.gstin,
      first.source,
      ...items.map(item => item.itemDesc)
    ].join(' ').toLowerCase();

    return {
      poKey: poNumber,
      poNumber,
      poDate: first.poDate,
      vendorName: first.vendorName || 'Unknown Vendor',
      gstin: first.gstin || '',
      source: first.source || '',
      terms: first.terms || '',
      materialType: normalizeMaterialType(first.materialType || 'Unknown'),
      edd: summarizeDate(items, 'edd') || first.edd || '',
      vendorEmail: first.vendorEmail || state.vendorContacts[first.vendorName]?.email || '',
      vendorPhone: first.vendorPhone || state.vendorContacts[first.vendorName]?.phone || '',
      delayReason: first.delayReason || '',
      deliveryDate: summarizeDate(items, 'deliveryDate') || first.deliveryDate || '',
      paymentStatus: summarizeStatus(items, 'paymentStatus'),
      poStatus: summarizeStatus(items, 'poStatus'),
      deliveryStatus: summarizeStatus(items, 'deliveryStatus'),
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
      searchBlob
    };
  });
}

function buildDerived() {
  const rows = allRows();
  const pos = groupedPOs(rows);

  const vendorMap = new Map();
  const productMap = new Map();
  const productVendorMap = new Map();

  rows.forEach(row => {
    const vendorName = cleanText(row.vendorName) || 'Unknown Vendor';
    const vendorKey = vendorName;
    const productName = cleanText(row.itemDesc) || 'Unnamed Item';
    const productKey = productName;
    const vendorDeleted = isVendorDeleted(vendorName);

    if (!vendorDeleted && !vendorMap.has(vendorKey)) {
      const seed = state.vendorContacts[vendorKey] || {};
      vendorMap.set(vendorKey, {
        vendorName,
        source: row.source || seed.source || '',
        gstin: row.gstin || seed.gstin || '',
        poSet: new Set(),
        productSet: new Set(),
        totalSpend: 0,
        lastOrderDate: row.poDate || '',
        contacts: seed
      });
    }

    if (!vendorDeleted) {
      const vendor = vendorMap.get(vendorKey);
      vendor.poSet.add(row.poNumber || row.id);
      if (!row.isCharge) vendor.productSet.add(productKey);
      vendor.totalSpend += number(row.lineGrandTotal);
      if ((new Date(row.poDate || 0)).getTime() > (new Date(vendor.lastOrderDate || 0)).getTime()) vendor.lastOrderDate = row.poDate;
      if (!vendor.source) vendor.source = row.source || '';
      if (!vendor.gstin) vendor.gstin = row.gstin || '';
    }

    if (row.isCharge || vendorDeleted) return;

    if (!productMap.has(productKey)) {
      productMap.set(productKey, {
        productName,
        vendorSet: new Set(),
        priceList: [],
        totalQty: 0,
        totalSpend: 0,
        lastOrderDate: row.poDate || ''
      });
    }

    const product = productMap.get(productKey);
    product.vendorSet.add(vendorName);
    if (number(row.itemPrice) > 0) product.priceList.push({ vendorName, price: number(row.itemPrice), source: 'history' });
    product.totalQty += number(row.quantityOrdered);
    product.totalSpend += number(row.lineGrandTotal);
    if ((new Date(row.poDate || 0)).getTime() > (new Date(product.lastOrderDate || 0)).getTime()) product.lastOrderDate = row.poDate;

    const pvKey = metricStorageKey(productKey, vendorName);
    if (!productVendorMap.has(pvKey)) {
      const saved = state.productVendorMetrics[pvKey] || {};
      productVendorMap.set(pvKey, {
        productName,
        vendorName,
        source: saved.source || state.vendorContacts[vendorName]?.source || row.source || '',
        gstin: saved.gstin || state.vendorContacts[vendorName]?.gstin || row.gstin || '',
        historicalBestPrice: number(row.itemPrice),
        latestPrice: number(row.itemPrice),
        quotedPrice: cleanText(saved.quotedPrice || ''),
        leadTimeDays: cleanText(saved.leadTimeDays || ''),
        moq: cleanText(saved.moq || ''),
        rating: cleanText(saved.rating || ''),
        notes: saved.notes || '',
        lastOrderDate: row.poDate || '',
        totalQty: 0,
        poCount: new Set(),
        hasHistory: true
      });
    }

    const metric = productVendorMap.get(pvKey);
    metric.latestPrice = number(row.itemPrice) || metric.latestPrice;
    metric.historicalBestPrice = metric.historicalBestPrice ? Math.min(metric.historicalBestPrice, number(row.itemPrice) || metric.historicalBestPrice) : number(row.itemPrice);
    metric.totalQty += number(row.quantityOrdered);
    metric.poCount.add(row.poNumber || row.id);
    if ((new Date(row.poDate || 0)).getTime() > (new Date(metric.lastOrderDate || 0)).getTime()) metric.lastOrderDate = row.poDate;
  });

  Object.entries(state.vendorContacts || {}).forEach(([vendorName, contact]) => {
    const cleanVendorName = cleanText(vendorName);
    if (!cleanVendorName || isVendorDeleted(cleanVendorName)) return;
    if (!vendorMap.has(cleanVendorName)) {
      vendorMap.set(cleanVendorName, {
        vendorName: cleanVendorName,
        source: contact.source || '',
        gstin: contact.gstin || '',
        poSet: new Set(),
        productSet: new Set(),
        totalSpend: 0,
        lastOrderDate: '',
        contacts: contact
      });
    }
  });

  Object.entries(state.productVendorMetrics || {}).forEach(([key, saved]) => {
    const parsed = splitMetricStorageKey(key);
    const productName = cleanText(saved.productName || parsed.productName);
    const vendorName = cleanText(saved.vendorName || parsed.vendorName);
    if (!productName || !vendorName || isVendorDeleted(vendorName) || inferLineType(productName, saved.lineType) === 'charge') return;

    const vendorSeed = state.vendorContacts[vendorName] || {};
    if (!vendorMap.has(vendorName)) {
      vendorMap.set(vendorName, {
        vendorName,
        source: saved.source || vendorSeed.source || '',
        gstin: saved.gstin || vendorSeed.gstin || '',
        poSet: new Set(),
        productSet: new Set(),
        totalSpend: 0,
        lastOrderDate: '',
        contacts: vendorSeed
      });
    }

    const vendor = vendorMap.get(vendorName);
    vendor.productSet.add(productName);
    if (!vendor.source) vendor.source = saved.source || vendorSeed.source || '';
    if (!vendor.gstin) vendor.gstin = saved.gstin || vendorSeed.gstin || '';

    if (!productMap.has(productName)) {
      productMap.set(productName, {
        productName,
        vendorSet: new Set(),
        priceList: [],
        totalQty: 0,
        totalSpend: 0,
        lastOrderDate: ''
      });
    }

    const product = productMap.get(productName);
    product.vendorSet.add(vendorName);
    const quotedPrice = number(saved.quotedPrice);
    if (quotedPrice > 0) product.priceList.push({ vendorName, price: quotedPrice, source: 'quote' });

    const pvKey = metricStorageKey(productName, vendorName);
    if (!productVendorMap.has(pvKey)) {
      productVendorMap.set(pvKey, {
        productName,
        vendorName,
        source: saved.source || vendorSeed.source || '',
        gstin: saved.gstin || vendorSeed.gstin || '',
        historicalBestPrice: 0,
        latestPrice: 0,
        quotedPrice: cleanText(saved.quotedPrice || ''),
        leadTimeDays: cleanText(saved.leadTimeDays || ''),
        moq: cleanText(saved.moq || ''),
        rating: cleanText(saved.rating || ''),
        notes: saved.notes || '',
        lastOrderDate: '',
        totalQty: 0,
        poCount: new Set(),
        hasHistory: false
      });
    } else {
      const metric = productVendorMap.get(pvKey);
      metric.quotedPrice = cleanText(saved.quotedPrice || metric.quotedPrice || '');
      metric.leadTimeDays = cleanText(saved.leadTimeDays || metric.leadTimeDays || '');
      metric.moq = cleanText(saved.moq || metric.moq || '');
      metric.rating = cleanText(saved.rating || metric.rating || '');
      metric.notes = saved.notes || metric.notes || '';
      metric.source = metric.source || saved.source || vendorSeed.source || '';
      metric.gstin = metric.gstin || saved.gstin || vendorSeed.gstin || '';
    }
  });

  const vendors = Array.from(vendorMap.values()).map(vendor => ({
    vendorName: vendor.vendorName,
    source: vendor.source || '',
    gstin: vendor.gstin || '',
    poCount: vendor.poSet.size,
    productCount: vendor.productSet.size,
    totalSpend: vendor.totalSpend,
    lastOrderDate: vendor.lastOrderDate,
    contacts: {
      vendorName: vendor.vendorName,
      source: vendor.source || '',
      gstin: vendor.gstin || '',
      contactPerson: vendor.contacts.contactPerson || '',
      phone: vendor.contacts.phone || '',
      email: vendor.contacts.email || '',
      website: vendor.contacts.website || '',
      city: vendor.contacts.city || '',
      defaultLeadTimeDays: vendor.contacts.defaultLeadTimeDays || '',
      rating: vendor.contacts.rating || '',
      notes: vendor.contacts.notes || ''
    }
  }));

  const products = Array.from(productMap.values()).map(product => {
    const priceList = product.priceList.filter(item => item.price > 0);
    const best = priceList.slice().sort((a, b) => a.price - b.price)[0];
    const avgPrice = priceList.length ? priceList.reduce((sum, item) => sum + item.price, 0) / priceList.length : 0;
    return {
      productName: product.productName,
      vendorCount: product.vendorSet.size,
      bestVendor: best?.vendorName || '—',
      bestPrice: best?.price || 0,
      avgPrice,
      totalQty: product.totalQty,
      totalSpend: product.totalSpend,
      lastOrderDate: product.lastOrderDate
    };
  });

  const productVendorMetrics = Array.from(productVendorMap.values()).map(metric => ({
    ...metric,
    poCount: metric.poCount.size,
    quotedPriceNumber: number(metric.quotedPrice)
  }));

  return { rows, pos, vendors, products, productVendorMetrics };
}

function statusSortValue(key, value) {
  const raw = normalizeKey(value);
  if (key === 'paymentStatus') {
    const ranks = { UNKNOWN: 0, PENDING: 1, 'PARTIALLY PAID': 2, PAID: 3, MIXED: 4 };
    return ranks[cleanText(value).toUpperCase()] ?? ranks[raw] ?? 99;
  }
  if (key === 'poStatus') {
    const ranks = { UNKNOWN: 0, ISSUED: 1, BILLED: 2, CLOSED: 3, MIXED: 4 };
    return ranks[cleanText(value).toUpperCase()] ?? ranks[raw] ?? 99;
  }
  if (key === 'deliveryStatus') {
    const ranks = { UNKNOWN: 0, 'IN TRANSIT': 1, 'PARTIALLY DELIVERED': 2, DELAYED: 3, DELIVERED: 4, MIXED: 5 };
    return ranks[cleanText(value).toUpperCase()] ?? ranks[raw] ?? 99;
  }
  return null;
}

function sortData(items, sortValue) {
  const [key, dir] = String(sortValue || '').split('-');
  const direction = dir === 'asc' ? 1 : -1;
  return items.slice().sort((a, b) => {
    let av = key === 'deliveryStatus' ? displayDeliveryStatus(a) : a[key];
    let bv = key === 'deliveryStatus' ? displayDeliveryStatus(b) : b[key];
    if (key === 'paymentStatus') {
      av = paymentProgressPercent(a);
      bv = paymentProgressPercent(b);
    }
    const statusA = key === 'paymentStatus' ? null : statusSortValue(key, av);
    const statusB = key === 'paymentStatus' ? null : statusSortValue(key, bv);

    if (statusA !== null && statusB !== null) {
      av = statusA;
      bv = statusB;
    } else if (key.toLowerCase().includes('date')) {
      av = new Date(av || 0).getTime();
      bv = new Date(bv || 0).getTime();
    } else if (typeof av === 'string' || typeof bv === 'string') {
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
  if (!date || Number.isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysBetween(start, end) {
  if (!start || !end) return 0;
  const ms = end.getTime() - start.getTime();
  return Math.round(ms / 86400000);
}

function getFollowupRules(materialType) {
  return FOLLOWUP_RULES[normalizeMaterialType(materialType)] || FOLLOWUP_RULES.Unknown;
}

function isAcknowledgementFollowup(row = {}) {
  const stage = normalizeKey(row.followup_stage || row.label || '');
  const key = normalizeKey(row.followup_key || row.key || '');
  const activity = normalizeKey(row.followup_activity || row.activity || '');
  return /^0\s*%/.test(stage)
    || stage.includes('ACKNOWLEDGEMENT')
    || stage.includes('ACKNOWLEDGMENT')
    || key.endsWith('_0')
    || activity.includes('PO ACKNOWLEDGEMENT')
    || activity.includes('PO ACKNOWLEDGMENT');
}

function getCurrentFollowupForPo(po, asOfDate = todayDateOnly()) {
  if (!po || normalizeDeliveryStatus(po.deliveryStatus) === 'Delivered') return null;
  const poDate = parseDateOnly(po.poDate);
  const deliveryDate = parseDateOnly(po.deliveryDate);
  if (!poDate || !deliveryDate) return null;
  const leadTimeDays = Math.max(1, daysBetween(poDate, deliveryDate));
  const elapsedDays = Math.max(0, daysBetween(poDate, asOfDate));
  const leadTimePercent = Math.round(Math.min(999, (elapsedDays / leadTimeDays) * 100));
  const materialType = normalizeMaterialType(po.materialType || 'Unknown');
  const rules = getFollowupRules(materialType);
  const isDelayed = deliveryDate < asOfDate;
  let rule = null;
  if (isDelayed) {
    rule = rules.find(item => item.delay) || rules[rules.length - 1];
  } else {
    const eligible = rules.filter(item => !item.delay && leadTimePercent >= item.percent);
    rule = eligible[eligible.length - 1] || null;
  }
  if (!rule || Number(rule.percent) <= 0 || /^0\s*%/.test(normalizeKey(rule.label))) return null;
  // For delayed POs, follow-up is a continuous daily cycle.
  // The card should be due on the selected/current date, not stuck on the original delivery date.
  const dueDate = rule.delay ? asOfDate : addDays(poDate, Math.round(leadTimeDays * (rule.percent / 100)));
  const followupType = rule.delay ? 'Daily Delay Follow-up' : 'Lead Time Follow-up';
  return {
    po_number: po.poNumber,
    vendor_name: po.vendorName,
    vendor_email: po.vendorEmail || state.vendorContacts[po.vendorName]?.email || '',
    vendor_phone: po.vendorPhone || state.vendorContacts[po.vendorName]?.phone || '',
    material_type: materialType,
    followup_stage: rule.label,
    followup_key: rule.key,
    lead_time_percent: leadTimePercent,
    followup_activity: rule.activity,
    communication_method: rule.method,
    due_date: dateToIso(dueDate),
    po_delivery_date: dateToIso(deliveryDate),
    status: 'Pending',
    priority: rule.delay ? 'High' : (rule.percent >= 95 ? 'High' : (rule.percent >= 75 ? 'Medium' : 'Low')),
    email_status: 'Not Sent',
    call_status: rule.method.toLowerCase().includes('call') ? 'Pending' : 'Not Required',
    followup_type: followupType,
    poKey: po.poKey,
    isVirtual: true
  };
}


function makeFollowupTaskKey(row = {}) {
  return `${cleanText(row.po_number || row.poNumber)}__${cleanText(row.followup_stage || row.label)}__${safeDate(row.due_date || row.dueDate)}`;
}

async function generateFollowupsForPOs(pos = []) {
  if (!useSupabase || !Array.isArray(pos) || !pos.length) return [];
  const today = todayDateOnly();
  const candidates = pos
    .map(po => getCurrentFollowupForPo(po, today))
    .filter(row => row && !isAcknowledgementFollowup(row));
  if (!candidates.length) return [];

  try {
    const { data: existing, error: existingError } = await supabaseClient
      .from('po_followups')
      .select('po_number, followup_stage, due_date, status, followup_type');
    if (existingError) throw existingError;

    const existingRows = existing || [];
    const existingKeys = new Set(existingRows.map(row => makeFollowupTaskKey(row)));
    const activePendingByPo = new Set(existingRows
      .filter(row => !normalizeKey(row.status || 'Pending').includes('COMPLETE'))
      .map(row => cleanText(row.po_number))
      .filter(Boolean));
    const payload = candidates
      .filter(row => !existingKeys.has(makeFollowupTaskKey(row)))
      .filter(row => !activePendingByPo.has(cleanText(row.po_number)))
      .map(row => ({
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
        followup_type: row.followup_type || 'Lead Time Follow-up'
      }));

    if (payload.length) {
      const firstInsert = await supabaseClient.from('po_followups').insert(payload);
      if (firstInsert.error) {
        const message = String(firstInsert.error.message || '');
        if (message.includes('followup_type')) {
          const fallbackPayload = payload.map(row => {
            const copy = { ...row };
            delete copy.followup_type;
            return copy;
          });
          const retryInsert = await supabaseClient.from('po_followups').insert(fallbackPayload);
          if (retryInsert.error) throw retryInsert.error;
        } else {
          throw firstInsert.error;
        }
      }
      const events = payload.map(row => ({
        po_number: row.po_number,
        event_type: 'followup_generated',
        event_title: 'Follow-up Generated',
        event_description: `${row.followup_stage}: ${row.followup_activity}`,
        actor_name: 'Procurement Hub',
        metadata: { material_type: row.material_type, due_date: row.due_date, followup_type: row.followup_type || 'Lead Time Follow-up' }
      }));
      await supabaseClient.from('po_activity_events').insert(events);
    }

    const { data: refreshed, error: refreshError } = await supabaseClient
      .from('po_followups')
      .select('*')
      .order('due_date', { ascending: true });
    if (!refreshError) state.followups = (refreshed || []).filter(row => !isAcknowledgementFollowup(row));
    return payload;
  } catch (error) {
    console.error('Follow-up generation failed', error);
    return [];
  }
}

function enrichFollowupRowForCard(row, po = {}) {
  return {
    ...row,
    poKey: po.poKey || row.poKey || row.po_number,
    poTotal: po.poTotal || row.poTotal || 0,
    productCount: po.productCount || po.itemCount || row.productCount || 0,
    po_delivery_date: po.deliveryDate || row.po_delivery_date || row.delivery_date || '',
    latestUpdate: row.latest_update || row.completion_note || row.notes || row.latestUpdate || '',
    followup_type: row.followup_type || row.type || 'Lead Time Follow-up',
    close_reason: row.close_reason || '',
    isVirtual: Boolean(row.isVirtual)
  };
}

function buildFollowupCards(pos = []) {
  const selectedDate = parseDateOnly(state.filters.followupDate) || todayDateOnly();
  const poMap = new Map((pos || []).map(po => [cleanText(po.poNumber), po]));

  const persisted = (state.followups || [])
    .filter(row => !isAcknowledgementFollowup(row))
    .map(row => enrichFollowupRowForCard(row, poMap.get(cleanText(row.po_number)) || {}));

  const persistedByPoStage = new Map(persisted.map(row => [
    makeFollowupTaskKey(row),
    row
  ]));

  const visibleByPo = new Map();
  const addVisible = (row, poFallback = null) => {
    if (!row || isAcknowledgementFollowup(row)) return;
    const poNumber = cleanText(row.po_number || row.poNumber || poFallback?.poNumber);
    if (!poNumber) return;
    const enriched = enrichFollowupRowForCard(row, poFallback || poMap.get(poNumber) || {});
    const existing = visibleByPo.get(poNumber);
    if (!existing) {
      visibleByPo.set(poNumber, enriched);
      return;
    }

    // Keep one card per PO. Prefer current/due card over older persisted rows,
    // and completed card only when no active task is pending.
    const existingStatus = normalizeKey(existing.status || 'Pending');
    const newStatus = normalizeKey(enriched.status || 'Pending');
    const existingDue = parseDateOnly(existing.due_date)?.getTime() || 0;
    const newDue = parseDateOnly(enriched.due_date)?.getTime() || 0;
    if (existingStatus.includes('COMPLETE') && !newStatus.includes('COMPLETE')) {
      visibleByPo.set(poNumber, enriched);
    } else if (!existingStatus.includes('COMPLETE') && !newStatus.includes('COMPLETE') && newDue >= existingDue) {
      visibleByPo.set(poNumber, enriched);
    }
  };

  const activeFutureScheduledByPo = new Set(persisted
    .filter(row => !normalizeKey(row.status || 'Pending').includes('COMPLETE'))
    .filter(row => {
      const type = normalizeKey(row.followup_type || '');
      const due = parseDateOnly(row.due_date);
      // Only a user-selected Scheduled Follow-up in the future should suppress
      // automatic lead-time/daily-delay cards. Existing Daily Delay rows must
      // not hide today's lead-time follow-up for non-delayed POs.
      return type.includes('SCHEDULED') && due && selectedDate && due > selectedDate;
    })
    .map(row => cleanText(row.po_number))
    .filter(Boolean));

  // Main rule: for every active non-delivered PO, show the current follow-up
  // when it is due today or already missed. If the user already scheduled the
  // next follow-up for a future date, do not show that PO before the scheduled date.
  (pos || []).forEach(po => {
    if (!po || normalizeDeliveryStatus(po.deliveryStatus) === 'Delivered') return;
    const poNumberForSchedule = cleanText(po.poNumber);
    if (activeFutureScheduledByPo.has(poNumberForSchedule)) return;
    const current = getCurrentFollowupForPo(po, selectedDate);
    if (!current || isAcknowledgementFollowup(current)) return;
    const dueDate = parseDateOnly(current.due_date);
    if (!dueDate || !selectedDate || dueDate > selectedDate) return;
    const poNumber = cleanText(current.po_number || po.poNumber);
    const stage = cleanText(current.followup_stage);
    const persistedMatch = persistedByPoStage.get(makeFollowupTaskKey(current));
    addVisible(persistedMatch || current, po);
  });

  // Preserve completed follow-ups for the selected date.
  persisted.forEach(row => {
    const isCompleted = normalizeKey(row.status).includes('COMPLETE');
    if (!isCompleted) return;
    const completedDate = parseDateOnly(row.completed_at || row.updated_at || row.created_at);
    if (completedDate && selectedDate && completedDate.getTime() === selectedDate.getTime()) {
      addVisible(row, poMap.get(cleanText(row.po_number)) || null);
    }
  });

  // Fallback for old DB rows when the PO no longer exists locally, or when
  // a missed DB follow-up has no matching generated current-stage card.
  persisted.forEach(row => {
    const isCompleted = normalizeKey(row.status).includes('COMPLETE');
    if (isCompleted) return;
    const dueDate = parseDateOnly(row.due_date);
    if (dueDate && selectedDate && dueDate <= selectedDate) {
      addVisible(row, poMap.get(cleanText(row.po_number)) || null);
    }
  });

  return Array.from(visibleByPo.values());
}

function getFollowupCardStatus(card, selectedDate) {
  const status = cleanText(card.status || 'Pending');
  const isCompleted = normalizeKey(status).includes('COMPLETE');
  const dueDate = parseDateOnly(card.due_date);
  if (isCompleted) return 'Completed';
  if (dueDate && selectedDate && dueDate < selectedDate) return 'Missed Follow-up';
  if (dueDate && selectedDate && dueDate.getTime() === selectedDate.getTime()) return 'Due Today';
  if (normalizeKey(card.email_status).includes('SENT')) return 'Email Sent';
  return status || 'Pending';
}



function toDbFollowupPriority(value) {
  const raw = normalizeKey(value);
  if (raw.includes('LOW')) return 'Low';
  if (raw.includes('HIGH')) return 'High';
  if (raw.includes('CRITICAL')) return 'Critical';
  // Supabase Module 1 constraint supports Low, Normal, High, Critical.
  // UI still displays Medium based on stage, but DB stores it as Normal.
  return 'Normal';
}

function getEffectiveFollowupPriority(card, viewStatus) {
  const statusKey = normalizeKey(card?.status || '');
  const rawPriority = normalizeKey(card?.priority || '');
  const stageKey = normalizeKey(card?.followup_stage || '');
  const activityKey = normalizeKey(card?.followup_activity || '');

  // Priority is based on follow-up stage/risk. Overdue is shown separately as the status.
  // Example: a 25% MTO follow-up can be overdue, but it remains Low Priority.
  if (statusKey.includes('COMPLETE')) return { key: 'low', label: 'Low Priority' };
  if (rawPriority.includes('INCOMPLETE') || activityKey.includes('MISSING') || activityKey.includes('REQUIRED')) {
    return { key: 'incomplete', label: 'Incomplete Tasks' };
  }
  if (stageKey.includes('DELAY') || stageKey.includes('95') || stageKey.includes('100') || rawPriority.includes('CRITICAL')) {
    return { key: 'high', label: 'High Priority' };
  }
  if (stageKey.includes('90') || stageKey.includes('75') || stageKey.includes('50') || rawPriority.includes('MEDIUM')) {
    return { key: 'medium', label: 'Medium Priority' };
  }
  if (stageKey.includes('25') || rawPriority.includes('LOW')) {
    return { key: 'low', label: 'Low Priority' };
  }
  return { key: 'medium', label: 'Medium Priority' };
}

function shouldShowFollowupCard(card, selectedDate) {
  const status = cleanText(card.status || 'Pending');
  const isCompleted = normalizeKey(status).includes('COMPLETE');
  if (isCompleted) {
    const completedDate = parseDateOnly(card.completed_at || card.updated_at || card.created_at);
    return completedDate && selectedDate && completedDate.getTime() === selectedDate.getTime();
  }
  const dueDate = parseDateOnly(card.due_date);
  return Boolean(dueDate && selectedDate && dueDate <= selectedDate);
}

function renderFollowups({ pos }) {
  const dateInput = document.getElementById('followupDateFilter');
  const summaryMount = document.getElementById('followupSummary');
  const listMount = document.getElementById('followupCardList');
  if (!summaryMount || !listMount) return;
  if (!state.filters.followupDate) state.filters.followupDate = dateToIso(todayDateOnly());
  if (dateInput && dateInput.value !== state.filters.followupDate) dateInput.value = state.filters.followupDate;

  const materialOptions = [
    { value: 'all', label: 'All Material Types' },
    { value: 'RTO', label: 'RTO' },
    { value: 'MTO', label: 'MTO' },
    { value: 'Unknown', label: 'Unknown' }
  ];
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'due_today', label: 'Due Today' },
    { value: 'missed', label: 'Missed Follow-ups' },
    { value: 'pending', label: 'Pending' },
    { value: 'email_sent', label: 'Email Sent' },
    { value: 'completed', label: 'Completed' }
  ];
  setSelectOptions('followupMaterialFilter', materialOptions, state.filters.followupMaterial);
  setSelectOptions('followupStatusFilter', statusOptions, state.filters.followupStatus);

  const selectedDate = parseDateOnly(state.filters.followupDate) || todayDateOnly();
  let cards = buildFollowupCards(pos).filter(card => shouldShowFollowupCard(card, selectedDate));
  cards = cards.filter(card => {
    const material = normalizeMaterialType(card.material_type || card.materialType || 'Unknown');
    if (state.filters.followupMaterial !== 'all' && material !== state.filters.followupMaterial) return false;
    const viewStatus = getFollowupCardStatus(card, selectedDate);
    const rawStatus = normalizeKey(card.status || 'Pending');
    if (state.filters.followupStatus === 'due_today' && viewStatus !== 'Due Today') return false;
    if (state.filters.followupStatus === 'missed' && viewStatus !== 'Missed Follow-up') return false;
    if (state.filters.followupStatus === 'pending' && !rawStatus.includes('PENDING')) return false;
    if (state.filters.followupStatus === 'completed' && !rawStatus.includes('COMPLETE')) return false;
    if (state.filters.followupStatus === 'email_sent' && !normalizeKey(card.email_status).includes('SENT')) return false;
    return true;
  });

  cards.sort((a, b) => {
    const aDue = parseDateOnly(a.due_date)?.getTime() || 0;
    const bDue = parseDateOnly(b.due_date)?.getTime() || 0;
    const aStatusKey = normalizeKey(getFollowupCardStatus(a, selectedDate));
    const bStatusKey = normalizeKey(getFollowupCardStatus(b, selectedDate));
    const aPriority = aStatusKey.includes('MISSED') ? 0 : aStatusKey.includes('DUE') ? 1 : 2;
    const bPriority = bStatusKey.includes('MISSED') ? 0 : bStatusKey.includes('DUE') ? 1 : 2;
    return aPriority - bPriority || aDue - bDue;
  });

  const dueTodayCount = cards.filter(card => getFollowupCardStatus(card, selectedDate) === 'Due Today').length;
  const missedCount = cards.filter(card => getFollowupCardStatus(card, selectedDate) === 'Missed Follow-up').length;
  const completedCount = cards.filter(card => normalizeKey(card.status).includes('COMPLETE')).length;
  const callCount = cards.filter(card => !normalizeKey(card.call_status).includes('NOT REQUIRED')).length;
  summaryMount.innerHTML = `
    <span class="followup-stat"><strong>${formatNumber(cards.length)}</strong> action cards</span>
    <span class="followup-stat warning"><strong>${formatNumber(dueTodayCount)}</strong> due today</span>
    <span class="followup-stat danger"><strong>${formatNumber(missedCount)}</strong> missed follow-ups</span>
    <span class="followup-stat good"><strong>${formatNumber(completedCount)}</strong> completed</span>
    <span class="followup-stat"><strong>${formatNumber(callCount)}</strong> call required</span>
  `;

  if (!cards.length) {
    listMount.innerHTML = '<div class="empty-state">No follow-up cards for the selected filters.</div>';
    return;
  }

  listMount.innerHTML = cards.map(card => {
    const viewStatus = getFollowupCardStatus(card, selectedDate);
    const isDue = ['Due Today', 'Missed Follow-up'].includes(viewStatus);
    const isCompleted = normalizeKey(card.status).includes('COMPLETE');
    const isEmailSent = normalizeKey(card.email_status).includes('SENT');
    const priorityInfo = getEffectiveFollowupPriority(card, viewStatus);
    const className = isDue ? 'followup-due' : isCompleted ? 'followup-completed' : isEmailSent ? 'followup-email-sent' : '';
    const deliveryDateText = formatDate(card.po_delivery_date || card.delivery_date || '');
    return `
      <article class="followup-card ${className} priority-${priorityInfo.key}">
        <div class="followup-card-main">
          <div>
            <div class="followup-topline">
              <span class="followup-po">${escapeHtml(card.po_number)}</span>
              <span class="badge material-type-badge">${escapeHtml(normalizeMaterialType(card.material_type))}</span>
              <span class="followup-status-pill ${isDue ? 'danger' : ''}">${escapeHtml(viewStatus)}</span>
              <span class="priority-chip priority-${priorityInfo.key}">${escapeHtml(priorityInfo.label)}</span>
              ${card.isVirtual ? '<span class="followup-status-pill">Preview</span>' : ''}
            </div>
            <h3>${escapeHtml(card.vendor_name || 'Unknown Vendor')}</h3>
          </div>
          <div class="followup-due-box">
            <span>Follow-up Due</span>
            <strong>${formatDate(card.due_date)}</strong>
            <small>Delivery: ${escapeHtml(deliveryDateText)}</small>
          </div>
        </div>
        <div class="followup-action-copy">
          <span>${escapeHtml(card.followup_stage || 'Follow-up')}</span>
          <strong>${escapeHtml(card.followup_activity || 'Follow up with vendor')}</strong>
        </div>
        <div class="followup-meta-grid">
          <div><span>Type</span><strong>${escapeHtml(getFollowupTypeLabel(card))}</strong></div>
          <div><span>Communication</span><strong>${escapeHtml(card.communication_method || '—')}</strong></div>
          <div><span>Email</span><strong>${escapeHtml(card.email_status || 'Not Sent')}</strong></div>
          <div><span>Call</span><strong>${escapeHtml(card.call_status || 'Not Required')}</strong></div>
          <div class="priority-cell priority-${priorityInfo.key}"><span>Priority</span><strong>${escapeHtml(priorityInfo.label)}</strong></div>
        </div>
        <div class="followup-latest">
          <span>Latest Update</span>
          <p>${escapeHtml(card.latestUpdate || (card.isVirtual ? 'Generated from current PO status. Complete or sync to persist this task.' : 'No update added yet.'))}</p>
        </div>
        <div class="inline-actions followup-actions">
          <button class="ghost-btn small-btn" data-action="view-products" data-po="${escapeHtml(card.poKey || card.po_number)}">View PO</button>
          <button class="primary-btn small-btn" data-action="complete-followup" data-followup="${escapeHtml(card.id || '')}" data-po="${escapeHtml(card.poKey || card.po_number)}">Complete</button>
          <button class="ghost-btn small-btn" data-action="send-followup-mail" data-followup="${escapeHtml(card.id || '')}" data-po="${escapeHtml(card.poKey || card.po_number)}">Send Mail</button>
        </div>
      </article>
    `;
  }).join('');
}


function getFollowupByIdOrPo(followupId, poKey) {
  const derived = buildDerived();
  const po = derived.pos.find(item => item.poKey === poKey || item.poNumber === poKey) || null;
  const allCards = buildFollowupCards(derived.pos);
  const card = allCards.find(item => cleanText(item.id) === cleanText(followupId))
    || allCards.find(item => cleanText(item.poKey || item.po_number) === cleanText(poKey) || cleanText(item.po_number) === cleanText(poKey))
    || null;
  return { card, po };
}

async function ensureFollowupPersisted(card) {
  if (!card) throw new Error('Follow-up card not found.');
  if (cleanText(card.id) && !card.isVirtual) return card;

  if (!useSupabase) {
    const localRow = {
      ...card,
      id: cleanText(card.id) || uid('followup'),
      isVirtual: false,
      created_at: new Date().toISOString()
    };
    state.followups = [...(state.followups || []), localRow];
    return localRow;
  }

  let existingFollowupQuery = supabaseClient
    .from('po_followups')
    .select('*')
    .eq('po_number', card.po_number)
    .eq('followup_stage', card.followup_stage);
  const cardDueDate = safeDate(card.due_date);
  if (cardDueDate) existingFollowupQuery = existingFollowupQuery.eq('due_date', cardDueDate);
  const matchQuery = await existingFollowupQuery.limit(1).maybeSingle();

  if (matchQuery.error && matchQuery.error.code !== 'PGRST116') throw matchQuery.error;
  if (matchQuery.data) return matchQuery.data;

  const payload = {
    po_number: card.po_number,
    vendor_name: card.vendor_name || 'Unknown Vendor',
    vendor_email: card.vendor_email || null,
    vendor_phone: card.vendor_phone || null,
    material_type: normalizeMaterialType(card.material_type || 'Unknown'),
    followup_stage: card.followup_stage || 'Follow-up',
    lead_time_percent: card.lead_time_percent == null ? null : Number(card.lead_time_percent),
    followup_activity: card.followup_activity || 'Follow up with vendor',
    communication_method: card.communication_method || 'Call / Email',
    due_date: safeDate(card.due_date),
    status: 'Pending',
    priority: toDbFollowupPriority(card.priority || 'Normal'),
    email_status: cleanText(card.email_status || 'Not Sent'),
    call_status: cleanText(card.call_status || 'Not Required'),
    followup_type: card.followup_type || 'Lead Time Follow-up'
  };

  const data = await insertFollowupRow(payload);
  state.followups = [...(state.followups || []).filter(item => cleanText(item.id) !== cleanText(data.id)), data];
  return data;
}


function getFollowupTypeLabel(card = {}) {
  const raw = cleanText(card.followup_type || card.type || '');
  const stage = normalizeKey(card.followup_stage || '');
  const activity = normalizeKey(card.followup_activity || '');
  const rawKey = normalizeKey(raw);
  if (rawKey.includes('SCHEDULED')) return raw || 'Scheduled Follow-up';
  if (rawKey.includes('DAILY DELAY') || stage.includes('DELAY') || activity.includes('DELAY')) return 'Daily Delay Follow-up';
  if (rawKey.includes('MANUAL')) return 'Manual Follow-up';
  return raw || 'Lead Time Follow-up';
}


function isDelayedFollowupContext(card = {}, po = {}, asOfDate = todayDateOnly()) {
  const stage = normalizeKey(card.followup_stage || '');
  const activity = normalizeKey(card.followup_activity || '');
  const type = normalizeKey(card.followup_type || '');
  const deliveryStatus = normalizeDeliveryStatus(po?.deliveryStatus || card.delivery_status || '');
  const deliveryDate = parseDateOnly(po?.deliveryDate || card.po_delivery_date || card.delivery_date || '');
  return deliveryStatus === 'Delayed'
    || stage.includes('DELAY')
    || type.includes('DELAY')
    || activity.includes('DELAY')
    || Boolean(deliveryDate && asOfDate && deliveryDate < asOfDate);
}

function buildNextFollowupCandidate({ persisted = {}, card = {}, po = {}, completion = {} } = {}) {
  const poNumber = cleanText(persisted.po_number || card.po_number || po.poNumber);
  if (!poNumber) return null;
  if (isFollowupCycleClosed(po, completion.closeReason)) return null;

  const selectedNextDate = parseDateOnly(completion.nextFollowupDate);
  const completedDate = parseDateOnly(completion.completedAt) || todayDateOnly();
  const delayedContext = isDelayedFollowupContext(card, po, completedDate);
  let dueDate = null;
  let followupType = '';
  let stage = '';
  let activity = '';
  let priority = 'Normal';
  let method = card.communication_method || 'Call + Email';

  if (selectedNextDate) {
    dueDate = selectedNextDate;
    followupType = 'Scheduled Follow-up';
    stage = delayedContext ? 'Scheduled Delay Follow-up' : 'Scheduled Follow-up';
    activity = 'Follow up as per the next follow-up date committed during the previous update.';
    priority = delayedContext ? 'High' : 'Normal';
  } else if (delayedContext) {
    dueDate = addDays(completedDate, 1);
    followupType = 'Daily Delay Follow-up';
    stage = 'Daily Delay Follow-up';
    activity = 'Daily delay follow-up until material is received or a revised next follow-up date is set.';
    priority = 'High';
    method = 'Mandatory Call + Email';
  } else {
    return null;
  }

  return {
    po_number: poNumber,
    vendor_name: persisted.vendor_name || card.vendor_name || po.vendorName || 'Unknown Vendor',
    vendor_email: persisted.vendor_email || card.vendor_email || po.vendorEmail || state.vendorContacts?.[po.vendorName]?.email || null,
    vendor_phone: persisted.vendor_phone || card.vendor_phone || po.vendorPhone || state.vendorContacts?.[po.vendorName]?.phone || null,
    material_type: normalizeMaterialType(persisted.material_type || card.material_type || po.materialType || 'Unknown'),
    followup_stage: stage,
    lead_time_percent: persisted.lead_time_percent == null ? (card.lead_time_percent == null ? null : Number(card.lead_time_percent)) : Number(persisted.lead_time_percent),
    followup_activity: activity,
    communication_method: method,
    due_date: dateToIso(dueDate),
    status: 'Pending',
    priority: toDbFollowupPriority(priority),
    email_status: 'Not Sent',
    call_status: method.toLowerCase().includes('call') ? 'Pending' : 'Not Required',
    followup_type: followupType,
    parent_followup_id: cleanText(persisted.id || card.id) || null
  };
}

async function insertFollowupRow(payload) {
  if (!useSupabase) return null;
  const first = await supabaseClient.from('po_followups').insert(payload).select('*').single();
  if (!first.error) return first.data;
  const message = String(first.error.message || '');
  const optionalColumns = ['followup_type', 'parent_followup_id', 'close_reason'];
  if (!optionalColumns.some(column => message.includes(column))) throw first.error;
  const fallbackPayload = { ...payload };
  optionalColumns.forEach(column => delete fallbackPayload[column]);
  const second = await supabaseClient.from('po_followups').insert(fallbackPayload).select('*').single();
  if (second.error) throw second.error;
  return second.data;
}

async function createNextFollowupAfterCompletion({ persisted = {}, card = {}, po = {}, completion = {} } = {}) {
  const nextPayload = buildNextFollowupCandidate({ persisted, card, po, completion });
  if (!nextPayload) return null;

  if (!useSupabase) {
    const localRow = { ...nextPayload, id: uid('followup'), created_at: new Date().toISOString(), isVirtual: false };
    state.followups.push(localRow);
    return localRow;
  }

  const { data: existing, error: existingError } = await supabaseClient
    .from('po_followups')
    .select('*')
    .eq('po_number', nextPayload.po_number)
    .eq('due_date', nextPayload.due_date)
    .eq('status', 'Pending')
    .limit(1)
    .maybeSingle();
  if (existingError && existingError.code !== 'PGRST116') throw existingError;
  if (existing) return existing;

  const inserted = await insertFollowupRow(nextPayload);
  await insertPoActivityEvent({
    po_number: nextPayload.po_number,
    event_type: 'followup_generated',
    event_title: nextPayload.followup_type || 'Follow-up Generated',
    event_description: `${nextPayload.followup_stage}: ${nextPayload.followup_activity}`,
    actor: 'Procurement Hub',
    metadata: {
      material_type: nextPayload.material_type,
      due_date: nextPayload.due_date,
      followup_type: nextPayload.followup_type,
      parent_followup_id: nextPayload.parent_followup_id
    }
  });
  return inserted;
}

function openCompleteFollowupModal(followupId, poKey) {
  const { card, po } = getFollowupByIdOrPo(followupId, poKey);
  if (!card) {
    alert('Follow-up card not found. Refresh once and try again.');
    return;
  }

  completingFollowupContext = { followupId: cleanText(followupId), poKey, card, po };

  const form = document.getElementById('completeFollowupForm');
  if (!form) return;
  form.reset();
  form.elements.followupId.value = cleanText(followupId);
  form.elements.poKey.value = cleanText(poKey || card.poKey || card.po_number);
  form.elements.completionMethod.value = cleanText(card.communication_method || 'Call + Email').includes('Call') ? 'Call + Email' : 'Email';
  form.elements.edd.value = safeDate(po?.edd || card.edd || '') || '';
  form.elements.delayReason.value = cleanText(po?.delayReason || card.delay_reason || '');
  form.elements.nextFollowupDate.value = '';
  if (form.elements.closeReason) form.elements.closeReason.value = '';

  document.getElementById('completeFollowupTitle').textContent = `Complete ${card.po_number || poKey}`;
  document.getElementById('completeFollowupSubtext').textContent = `${card.vendor_name || po?.vendorName || 'Vendor'} • ${card.followup_stage || 'Follow-up'}`;
  document.getElementById('completeFollowupStage').textContent = card.followup_stage || 'Follow-up';
  document.getElementById('completeFollowupActivity').textContent = card.followup_activity || 'Follow up with vendor';
  document.getElementById('completeFollowupDue').textContent = formatDate(card.due_date);
  document.getElementById('completeFollowupDelivery').textContent = formatDate(po?.deliveryDate || card.po_delivery_date || '');

  document.getElementById('completeFollowupBackdrop').classList.remove('hidden');
}

function closeCompleteFollowupModal() {
  document.getElementById('completeFollowupBackdrop')?.classList.add('hidden');
  completingFollowupContext = null;
}

function applyFollowupCompletionLocally(followupRow, completion) {
  const id = cleanText(followupRow.id);
  const poNumber = cleanText(followupRow.po_number || completion.poNumber);
  const updated = {
    ...followupRow,
    status: 'Completed',
    completed_at: completion.completedAt,
    completed_by: completion.doneBy,
    call_status: completion.callStatus,
    notes: completion.updateReceived || completion.notes || followupRow.notes || '',
    close_reason: completion.closeReason || followupRow.close_reason || ''
  };

  state.followups = (state.followups || []).filter(item => {
    if (id && cleanText(item.id) === id) return false;
    return !(cleanText(item.po_number) === poNumber && cleanText(item.followup_stage) === cleanText(followupRow.followup_stage));
  });
  state.followups.push(updated);

  const patchPoRow = row => {
    if (!row || cleanText(row.poNumber) !== poNumber) return row;
    if (completion.edd) row.edd = completion.edd;
    if (completion.delayReason) row.delayReason = completion.delayReason;
    return row;
  };

  baseRows.forEach(patchPoRow);
  state.manualRows.forEach(patchPoRow);
  baseRows.forEach(row => {
    if (cleanText(row.poNumber) !== poNumber) return;
    state.rowOverrides[row.id] = {
      ...(state.rowOverrides[row.id] || {}),
      ...(completion.edd ? { edd: completion.edd } : {}),
      ...(completion.delayReason ? { delayReason: completion.delayReason } : {})
    };
  });
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
    source: 'Procurement Hub',
    metadata: event.metadata || {}
  };

  const withActor = { ...basePayload, actor: event.actor || '' };
  const first = await supabaseClient.from('po_activity_events').insert(withActor);
  if (!first.error) return;

  const message = String(first.error.message || '');
  if (!message.includes('actor')) {
    console.warn('Activity event insert failed', first.error);
    return;
  }

  const withActorName = { ...basePayload, actor_name: event.actor || '' };
  const second = await supabaseClient.from('po_activity_events').insert(withActorName);
  if (second.error) console.warn('Activity event insert failed', second.error);
}

async function completeFollowup(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent || 'Save Complete';

  const context = completingFollowupContext || getFollowupByIdOrPo(form.elements.followupId.value, form.elements.poKey.value);
  const card = context.card;
  if (!card) {
    alert('Follow-up card not found. Refresh once and try again.');
    return;
  }

  const doneBy = cleanText(form.elements.doneBy.value);
  const vendorContactPerson = cleanText(form.elements.vendorContactPerson.value);
  const completionMethod = cleanText(form.elements.completionMethod.value);
  const updateReceived = cleanText(form.elements.updateReceived.value);
  const edd = safeDate(form.elements.edd.value);
  const delayReason = cleanText(form.elements.delayReason.value);
  const nextFollowupDate = safeDate(form.elements.nextFollowupDate.value);
  const closeReason = cleanText(form.elements.closeReason?.value || '');
  const notes = cleanText(form.elements.notes.value);

  if (!doneBy) {
    alert('Enter who completed the follow-up.');
    return;
  }
  if (!updateReceived) {
    alert('Enter the update received from the vendor.');
    return;
  }

  const completedAt = new Date().toISOString();
  const callStatus = completionMethod.toLowerCase().includes('call') || !normalizeKey(card.call_status).includes('NOT REQUIRED')
    ? 'Completed'
    : (card.call_status || 'Not Required');

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving...';
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
      notes,
      completedAt,
      callStatus
    };

    if (useSupabase) {
      const followupUpdate = {
        status: 'Completed',
        completed_at: completedAt,
        completed_by: doneBy,
        call_status: callStatus,
        notes: updateReceived || notes || null,
        close_reason: closeReason || null,
        updated_at: completedAt
      };
      const { error: followupError } = await supabaseClient
        .from('po_followups')
        .update(followupUpdate)
        .eq('id', followupId);
      if (followupError) throw followupError;

      const logPayload = {
        followup_id: followupId || null,
        po_number: poNumber,
        action_type: 'Completed',
        update_received: updateReceived,
        vendor_contact_person: vendorContactPerson || null,
        done_by: doneBy,
        communication_method: completionMethod,
        edd: edd || null,
        delay_reason: delayReason || null,
        next_followup_date: nextFollowupDate || null,
        close_reason: closeReason || null,
        notes: notes || null
      };
      const { error: logError } = await supabaseClient.from('po_followup_logs').insert(logPayload);
      if (logError) throw logError;

      if (edd || delayReason) {
        const poPatch = {};
        if (edd) poPatch.edd = edd;
        if (delayReason) poPatch.delay_reason = delayReason;
        const { error: poError } = await supabaseClient
          .from('purchase_orders')
          .update(poPatch)
          .eq('po_number', poNumber);
        if (poError) throw poError;
      }

      await insertPoActivityEvent({
        po_number: poNumber,
        event_type: 'followup_completed',
        event_title: 'Follow-up Completed',
        event_description: `${persisted.followup_stage || card.followup_stage || 'Follow-up'} completed by ${doneBy}. ${updateReceived}`,
        actor: doneBy,
        metadata: {
          followup_id: followupId,
          followup_stage: persisted.followup_stage || card.followup_stage,
          vendor_contact_person: vendorContactPerson,
          communication_method: completionMethod,
          edd,
          delay_reason: delayReason,
          next_followup_date: nextFollowupDate,
          close_reason: closeReason
        }
      });

      const nextFollowup = await createNextFollowupAfterCompletion({ persisted, card, po: context.po, completion });
      if (nextFollowup) {
        const nextDate = safeDate(nextFollowup.due_date);
        await supabaseClient
          .from('po_followup_logs')
          .update({ created_next_followup_date: nextDate || null })
          .eq('followup_id', followupId)
          .eq('po_number', poNumber);
      }
    } else {
      await createNextFollowupAfterCompletion({ persisted: { ...persisted, ...card }, card, po: context.po, completion });
    }

    applyFollowupCompletionLocally({ ...persisted, ...card }, completion);
    if (useSupabase) await loadRemoteStateFromSupabase();
    closeCompleteFollowupModal();
    renderAll();
    alert('Follow-up completed and saved.');
  } catch (error) {
    console.error('Complete follow-up failed', error);
    alert(`Complete follow-up failed: ${error.message || error}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}


function getFollowupTemplateKey(card, po) {
  const material = normalizeMaterialType(card?.material_type || po?.materialType || 'Unknown');
  const stage = normalizeKey(card?.followup_key || card?.followup_stage || 'FOLLOWUP');
  return `${material}_${stage || 'FOLLOWUP'}`;
}

function buildFollowupMailTemplate(card, po) {
  const poNumber = cleanText(card?.po_number || po?.poNumber || '');
  const vendorName = cleanText(card?.vendor_name || po?.vendorName || 'Vendor');
  const materialType = normalizeMaterialType(card?.material_type || po?.materialType || 'Unknown');
  const stage = cleanText(card?.followup_stage || 'Vendor Follow-up');
  const activity = cleanText(card?.followup_activity || 'Please confirm current PO status and delivery timeline.');
  const communication = cleanText(card?.communication_method || 'Email');
  const deliveryDate = formatDate(po?.deliveryDate || card?.po_delivery_date || '');
  const followupDue = formatDate(card?.due_date || '');
  const edd = formatDate(po?.edd || card?.edd || '');
  const isDelay = normalizeKey(stage).includes('DELAY') || normalizeKey(activity).includes('DELAY');
  const isMto = materialType === 'MTO';
  const isRto = materialType === 'RTO';
  const subjectPrefix = isDelay ? 'Delay Follow-up Required' : 'Vendor Follow-up Required';
  const subject = `${subjectPrefix}: PO ${poNumber} - ${stage}`;
  const stageLine = isMto
    ? 'This is an MTO follow-up. Please share the current production/manufacturing status clearly.'
    : isRto
      ? 'This is an RTO follow-up. Please confirm readiness, dispatch, and delivery status clearly.'
      : 'This is a PO follow-up. Please confirm the latest status clearly.';
  const delayAsk = isDelay
    ? '\nSince the PO is delayed, please share:\n- reason for delay\n- revised estimated delivery date\n- dispatch status\n- expected arrival date\n'
    : '';
  const body = [
    `Dear ${vendorName},`,
    '',
    `This is a follow-up for PO ${poNumber}.`,
    stageLine,
    '',
    `Follow-up Stage: ${stage}`,
    `Required Update: ${activity}`,
    `Communication Method: ${communication}`,
    '',
    `PO Date: ${formatDate(po?.poDate || card?.po_date || '')}`,
    `Original Delivery Date: ${deliveryDate}`,
    `Follow-up Due Date: ${followupDue}`,
    edd !== '—' ? `Current EDD: ${edd}` : '',
    delayAsk,
    'Please reply with the latest status and expected delivery timeline.',
    '',
    'Regards,',
    'Stack n Stock Procurement Team'
  ].filter(line => line !== '').join('\n');
  return { subject, body, templateKey: getFollowupTemplateKey(card, po) };
}

function getFollowupVendorEmail(card, po) {
  const vendorName = cleanText(card?.vendor_name || po?.vendorName || '');
  return cleanText(card?.vendor_email || po?.vendorEmail || state.vendorContacts?.[vendorName]?.email || '');
}

function openFollowupMailModal(followupId, poKey) {
  const { card, po } = getFollowupByIdOrPo(followupId, poKey);
  if (!card) {
    alert('Follow-up card not found. Refresh once and try again.');
    return;
  }
  mailingFollowupContext = { followupId: cleanText(followupId), poKey, card, po };
  const form = document.getElementById('followupMailForm');
  if (!form) return;
  form.reset();
  const { subject, body, templateKey } = buildFollowupMailTemplate(card, po);
  form.elements.followupId.value = cleanText(followupId);
  form.elements.poKey.value = cleanText(poKey || card.poKey || card.po_number);
  form.elements.templateKey.value = templateKey;
  form.elements.to.value = getFollowupVendorEmail(card, po);
  form.elements.cc.value = '';
  form.elements.queuedBy.value = '';
  form.elements.subject.value = subject;
  form.elements.body.value = body;
  document.getElementById('followupMailTitle').textContent = `Send Mail - ${card.po_number || poKey}`;
  document.getElementById('followupMailSubtext').textContent = `${card.vendor_name || po?.vendorName || 'Vendor'} • ${card.followup_stage || 'Follow-up'}`;
  document.getElementById('followupMailStage').textContent = card.followup_stage || 'Follow-up';
  document.getElementById('followupMailAction').textContent = card.followup_activity || 'Follow up with vendor';
  document.getElementById('followupMailTemplate').textContent = templateKey;
  document.getElementById('followupMailDelivery').textContent = formatDate(po?.deliveryDate || card.po_delivery_date || '');
  document.getElementById('followupMailBackdrop')?.classList.remove('hidden');
}

function closeFollowupMailModal() {
  document.getElementById('followupMailBackdrop')?.classList.add('hidden');
  mailingFollowupContext = null;
}

function applyFollowupMailQueuedLocally(followupRow, queuePayload) {
  const id = cleanText(followupRow.id);
  const poNumber = cleanText(followupRow.po_number || queuePayload.po_number);
  const stage = cleanText(followupRow.followup_stage || queuePayload.followup_stage);
  const updated = { ...followupRow, email_status: 'Pending', latestUpdate: `Mail queued for Zoho Flow by ${queuePayload.created_by || 'user'}.` };
  state.followups = (state.followups || []).filter(item => {
    if (id && cleanText(item.id) === id) return false;
    return !(cleanText(item.po_number) === poNumber && cleanText(item.followup_stage) === stage);
  });
  state.followups.push(updated);
}

async function queueFollowupMail(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent || 'Queue Mail';
  const context = mailingFollowupContext || getFollowupByIdOrPo(form.elements.followupId.value, form.elements.poKey.value);
  const card = context.card;
  const po = context.po;
  if (!card) {
    alert('Follow-up card not found. Refresh once and try again.');
    return;
  }
  if (!useSupabase) {
    alert('Mail queue requires Supabase because Zoho Flow reads vendor_email_queue.');
    return;
  }
  const to = cleanText(form.elements.to.value);
  const cc = cleanText(form.elements.cc.value);
  const queuedBy = cleanText(form.elements.queuedBy.value);
  const subject = cleanText(form.elements.subject.value);
  const body = cleanText(form.elements.body.value);
  const templateKey = cleanText(form.elements.templateKey.value || getFollowupTemplateKey(card, po));
  if (!to) {
    alert('Vendor email is required before queueing mail.');
    return;
  }
  if (!subject) {
    alert('Email subject is required.');
    return;
  }
  if (!body) {
    alert('Email body is required.');
    return;
  }
  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Queueing...';
    }
    const persisted = await ensureFollowupPersisted(card);
    const followupId = cleanText(persisted.id);
    const poNumber = cleanText(persisted.po_number || card.po_number);
    const vendorName = cleanText(persisted.vendor_name || card.vendor_name || po?.vendorName || 'Unknown Vendor');
    const materialType = normalizeMaterialType(persisted.material_type || card.material_type || po?.materialType || 'Unknown');
    const followupStage = cleanText(persisted.followup_stage || card.followup_stage || 'Follow-up');
    const queuePayload = {
      followup_id: followupId || null,
      po_number: poNumber,
      vendor_name: vendorName,
      vendor_email: to,
      cc_email: cc || null,
      subject,
      body,
      material_type: materialType,
      followup_stage: followupStage,
      template_key: templateKey,
      status: 'Pending',
      created_by: queuedBy || null
    };
    const { error: queueError } = await supabaseClient.from('vendor_email_queue').insert(queuePayload);
    if (queueError) throw queueError;
    const { error: followupError } = await supabaseClient.from('po_followups').update({ email_status: 'Pending', updated_at: new Date().toISOString() }).eq('id', followupId);
    if (followupError) throw followupError;
    const logPayload = { followup_id: followupId || null, po_number: poNumber, action_type: 'Email Queued', update_received: `Mail queued to ${to}`, done_by: queuedBy || null, communication_method: 'Email', notes: subject };
    const { error: logError } = await supabaseClient.from('po_followup_logs').insert(logPayload);
    if (logError) throw logError;
    await insertPoActivityEvent({ po_number: poNumber, event_type: 'email_queued', event_title: 'Follow-up Email Queued', event_description: `${followupStage} email queued to ${to}.`, actor: queuedBy || '', metadata: { followup_id: followupId, followup_stage: followupStage, vendor_email: to, cc_email: cc, template_key: templateKey } });
    applyFollowupMailQueuedLocally({ ...persisted, ...card }, queuePayload);
    if (useSupabase) await loadRemoteStateFromSupabase();
    closeFollowupMailModal();
    renderAll();
    alert('Mail queued. Zoho Flow will send it from vendor_email_queue.');
  } catch (error) {
    console.error('Queue follow-up mail failed', error);
    alert(`Queue mail failed: ${error.message || error}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

function setSelectOptions(id, options, selectedValue, placeholderLabel = 'All') {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  options.forEach(option => {
    const opt = document.createElement('option');
    if (typeof option === 'string') {
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

function renderKpis({ pos, vendors, products, rows }) {
  const totalPOValue = pos.reduce((sum, po) => sum + number(po.poTotal), 0);
  const openPaymentValue = pos.reduce((sum, po) => {
    const derived = derivePaymentState(number(po.poTotal), number(po.amountPaid), po.balanceDue);
    return sum + Math.max(0, number(derived.balanceDue));
  }, 0);
  const deliveredCount = pos.filter(po => po.deliveryStatus === 'Delivered').length;
  const partialPaymentCount = pos.filter(po => paymentProgressStatus(po) === 'Partially Paid').length;
  const cards = [
    { label: 'Total PO Value', value: money(totalPOValue), note: `${pos.length} purchase orders` },
    { label: 'Open Payment Value', value: money(openPaymentValue), note: 'Calculated from balance due' },
    { label: 'Delivered POs', value: formatNumber(deliveredCount), note: 'Delivered at PO level' },
    { label: 'Partially Paid POs', value: formatNumber(partialPaymentCount), note: 'Need payment follow-up' },
    { label: 'Line Items in History', value: formatNumber(rows.length), note: `${products.length} products · ${vendors.length} vendors` }
  ];
  document.getElementById('kpiGrid').innerHTML = cards.map(card => `
    <article class="kpi-card">
      <div class="kpi-label">${escapeHtml(card.label)}</div>
      <div class="kpi-value">${escapeHtml(card.value)}</div>
      <div class="kpi-note">${escapeHtml(card.note)}</div>
    </article>
  `).join('');
}

function renderOverview({ pos, vendors }) {
  const recent = sortData(pos, 'poDate-desc').slice(0, 6);
  document.getElementById('recentPOs').innerHTML = recent.length ? recent.map(po => `
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
  `).join('') : `<div class="empty-state">No purchase orders available.</div>`;

  const maxSpend = Math.max(...vendors.map(vendor => vendor.totalSpend), 0) || 1;
  document.getElementById('vendorSpendBars').innerHTML = sortData(vendors, 'totalSpend-desc').slice(0, 7).map(vendor => `
    <div class="bar-row">
      <div class="bar-label">
        <span>${escapeHtml(vendor.vendorName)}</span>
        <span>${money(vendor.totalSpend)}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.max((vendor.totalSpend / maxSpend) * 100, 3)}%"></div>
      </div>
    </div>
  `).join('') || `<div class="empty-state">No vendor spend data.</div>`;
}

function statusDisplayValue(item, field) {
  if (field === 'deliveryStatus') return displayDeliveryStatus(item);
  return item?.[field] || 'Unknown';
}

function renderStatusMix(pos, mountId, field) {
  const counts = pos.reduce((acc, po) => {
    const key = statusDisplayValue(po, field) || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const html = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([label, count]) => `
    <div class="status-card">
      <div class="badge ${badgeClass(label)}">${escapeHtml(label)}</div>
      <strong>${formatNumber(count)}</strong>
    </div>
  `).join('') || '<div class="empty-state">No data.</div>';
  document.getElementById(mountId).innerHTML = html;
}


function getPoByKeyOrNumber(poKey) {
  const derived = buildDerived();
  return derived.pos.find(po => po.poKey === poKey || po.poNumber === poKey) || null;
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
  if (!date) return 'Date not available';
  const hasTime = String(value || '').includes('T');
  const dateText = formatDate(dateToIso(date));
  if (!hasTime) return dateText;
  return `${dateText} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function getTimelineIcon(type = '') {
  const key = normalizeKey(type);
  if (key.includes('COMPLETE')) return '✓';
  if (key.includes('EMAIL')) return '✉';
  if (key.includes('CALL')) return '☎';
  if (key.includes('EDD') || key.includes('DELIVERY')) return '↗';
  if (key.includes('PAYMENT')) return '₹';
  if (key.includes('QUEUE') || key.includes('SYNC')) return '↻';
  if (key.includes('FOLLOWUP') || key.includes('FOLLOW-UP')) return '!';
  if (key.includes('CREATE')) return '+';
  return '•';
}

function buildPoStatusTimeline(po) {
  if (!po) return [];
  const poNumber = cleanText(po.poNumber);
  const events = [];

  const addEvent = event => {
    if (!event || !event.title) return;
    events.push({
      date: event.date || event.created_at || event.createdAt || po.poDate || '',
      type: event.type || event.event_type || 'status',
      title: event.title || event.event_title,
      description: event.description || event.event_description || '',
      actor: event.actor || event.actor_name || '',
      source: event.source || 'Procurement Hub',
      oldValue: event.oldValue || event.old_value || '',
      newValue: event.newValue || event.new_value || '',
      metadata: event.metadata || {}
    });
  };

  addEvent({
    date: po.poDate,
    type: 'po_created',
    title: 'PO Created',
    description: `${po.vendorName || 'Vendor'} • ${money(po.poTotal || 0)} • ${po.productCount || po.itemCount || 0} product${(po.productCount || po.itemCount || 0) === 1 ? '' : 's'}`,
    source: 'Purchase Orders'
  });

  (state.activityEvents || [])
    .filter(event => cleanText(event.po_number) === poNumber)
    .forEach(event => addEvent({
      date: event.created_at,
      type: event.event_type,
      title: event.event_title,
      description: event.event_description,
      actor: event.actor || event.actor_name,
      source: event.source,
      oldValue: event.old_value,
      newValue: event.new_value,
      metadata: event.metadata
    }));

  (state.followups || [])
    .filter(row => cleanText(row.po_number) === poNumber && !isAcknowledgementFollowup(row))
    .forEach(row => {
      const status = cleanText(row.status || 'Pending');
      const isCompleted = normalizeKey(status).includes('COMPLETE');
      addEvent({
        date: isCompleted ? (row.completed_at || row.updated_at || row.created_at) : (row.due_date || row.created_at),
        type: isCompleted ? 'followup_completed' : 'followup_generated',
        title: isCompleted ? 'Follow-up Completed' : 'Follow-up Generated',
        description: `${row.followup_stage || 'Follow-up'}: ${row.followup_activity || 'Vendor follow-up'}${row.completed_by ? ` • Done by ${row.completed_by}` : ''}`,
        actor: row.completed_by || '',
        source: 'Follow-ups',
        metadata: { status, email_status: row.email_status, call_status: row.call_status }
      });
    });

  if (po.edd) {
    addEvent({
      date: po.edd,
      type: 'edd_updated',
      title: 'EDD Available',
      description: `Revised Estimated Delivery Date set to ${formatDate(po.edd)}${po.delayReason ? ` • Reason: ${po.delayReason}` : ''}`,
      source: 'Purchase Orders'
    });
  }

  addEvent({
    date: po.deliveryDate || po.poDate,
    type: 'delivery_status',
    title: 'Current Delivery Status',
    description: `${displayDeliveryStatus(po)}${po.deliveryDate ? ` • Delivery date: ${formatDate(po.deliveryDate)}` : ''}`,
    source: 'Purchase Orders'
  });

  addEvent({
    date: po.poDate,
    type: 'payment_status',
    title: 'Current Payment Status',
    description: `${po.paymentStatus || 'Pending'} • Paid: ${money(po.amountPaid || 0)} • Balance: ${money(po.balanceDue || 0)}`,
    source: 'Purchase Orders'
  });

  const seen = new Set();
  return events
    .filter(event => {
      const key = [event.type, event.title, event.description, event.date].map(cleanText).join('|');
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
    alert('PO not found. Refresh once and try again.');
    return;
  }

  const events = buildPoStatusTimeline(po);
  const title = document.getElementById('statusTimelineTitle');
  const subtext = document.getElementById('statusTimelineSubtext');
  const summary = document.getElementById('statusTimelineSummary');
  const body = document.getElementById('statusTimelineContent');
  if (!title || !subtext || !summary || !body) return;

  title.textContent = `${po.poNumber} Status Timeline`;
  subtext.textContent = `${po.vendorName || 'Vendor'} • ${po.materialType || 'Unknown'} • ${money(po.poTotal || 0)}`;
  summary.innerHTML = `
    <span class="timeline-summary-chip"><strong>${escapeHtml(displayDeliveryStatus(po))}</strong><small>Delivery</small></span>
    <span class="timeline-summary-chip"><strong>${escapeHtml(po.paymentStatus || 'Pending')}</strong><small>Payment</small></span>
    <span class="timeline-summary-chip"><strong>${escapeHtml(po.poStatus || 'Issued')}</strong><small>PO Status</small></span>
    <span class="timeline-summary-chip"><strong>${events.length}</strong><small>Events</small></span>
  `;

  body.innerHTML = events.length ? `
    <div class="status-timeline-list">
      ${events.map(event => `
        <div class="timeline-item timeline-${escapeHtml(normalizeKey(event.type).toLowerCase().replace(/[^a-z0-9]+/g, '-'))}">
          <div class="timeline-marker">${escapeHtml(getTimelineIcon(event.type))}</div>
          <div class="timeline-card">
            <div class="timeline-card-head">
              <div>
                <h4>${escapeHtml(event.title)}</h4>
                <p>${escapeHtml(timelineDateLabel(event.date))}</p>
              </div>
              <span>${escapeHtml(event.source || 'Procurement Hub')}</span>
            </div>
            ${event.description ? `<div class="timeline-desc">${escapeHtml(event.description)}</div>` : ''}
            ${(event.oldValue || event.newValue) ? `<div class="timeline-change"><span>Old: ${escapeHtml(event.oldValue || '—')}</span><span>New: ${escapeHtml(event.newValue || '—')}</span></div>` : ''}
            ${event.actor ? `<div class="timeline-actor">By ${escapeHtml(event.actor)}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  ` : '<div class="empty-state">No timeline events found for this PO.</div>';

  document.getElementById('statusTimelineBackdrop')?.classList.remove('hidden');
}

function closePoStatusTimeline() {
  document.getElementById('statusTimelineBackdrop')?.classList.add('hidden');
}

function renderPurchaseOrders({ pos }) {
  const vendors = ['all', ...new Set(pos.map(po => po.vendorName).filter(Boolean))].sort();
  const paymentStatuses = ['all', ...new Set(pos.map(po => paymentProgressStatus(po)).filter(Boolean))];
  const poStatuses = ['all', ...new Set(pos.map(po => po.poStatus).filter(Boolean))];
  const baseDeliveryStatuses = ['Unknown', 'In Transit', 'Partially Delivered', 'Delivered', 'Delayed'];
  const dynamicDeliveryStatuses = pos.map(displayDeliveryStatus).filter(Boolean);
  const deliveryStatuses = ['all', ...baseDeliveryStatuses.filter(v => dynamicDeliveryStatuses.includes(v) || v === 'In Transit' || v === 'Unknown' || v === 'Partially Delivered' || v === 'Delivered' || v === 'Delayed')];
  const selectedDeliveryFilter = deliveryStatuses.includes(state.filters.poDelivery) ? state.filters.poDelivery : 'all';
  state.filters.poDelivery = selectedDeliveryFilter;

  setSelectOptions('poVendorFilter', vendors.map(v => v === 'all' ? { value: 'all', label: 'All Vendors' } : { value: v, label: v }), state.filters.poVendor);
  setSelectOptions('poPaymentFilter', paymentStatuses.map(v => v === 'all' ? { value: 'all', label: 'All Payments' } : { value: v, label: v }), state.filters.poPayment);
  setSelectOptions('poStatusFilter', poStatuses.map(v => v === 'all' ? { value: 'all', label: 'All PO Status' } : { value: v, label: v }), state.filters.poStatus);
  setSelectOptions('poDeliveryFilter', deliveryStatuses.map(v => v === 'all' ? { value: 'all', label: 'All Delivery' } : { value: v, label: v }), selectedDeliveryFilter);
  setSelectOptions('poSortSelect', PO_SORTS, state.filters.poSort);

  let filtered = pos.filter(po => {
    const search = state.filters.poSearch.toLowerCase();
    if (search && !po.searchBlob.includes(search)) return false;
    if (state.filters.poVendor !== 'all' && po.vendorName !== state.filters.poVendor) return false;
    if (state.filters.poPayment !== 'all' && paymentProgressStatus(po) !== state.filters.poPayment) return false;
    if (state.filters.poStatus !== 'all' && po.poStatus !== state.filters.poStatus) return false;
    if (state.filters.poDelivery !== 'all' && displayDeliveryStatus(po) !== state.filters.poDelivery) return false;
    return true;
  });

  filtered = sortData(filtered, state.filters.poSort);

  const html = filtered.length ? filtered.map(po => `
    <article class="po-row">
      <div class="po-main">
        <div class="po-number">${escapeHtml(po.poNumber)}</div>
        <div class="po-date">${formatDate(po.poDate)}</div>
      </div>
      <div class="metric-block">
        <div class="vendor-name">${escapeHtml(po.vendorName)}</div>
        <div class="vendor-sub">${escapeHtml(po.gstin || 'No GSTIN')} · ${escapeHtml(po.source || 'No source')}</div>
        <div class="badge material-type-badge">${escapeHtml(po.materialType || 'Unknown')}</div>
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
        <div class="small-text">${formatDate(po.deliveryDate)}</div>
        ${isPoDelayed(po) ? `<div class="small-text"><strong>EDD</strong> <span class="info-icon" title="Revised Estimated Delivery Date">i</span>: ${po.edd ? formatDate(po.edd) : 'Not set'}</div>` : ''}
      </div>
      <div class="action-stack">
        <button class="ghost-btn small-btn" data-action="view-products" data-po="${escapeHtml(po.poKey)}">Products</button>
        <button class="ghost-btn small-btn status-btn" data-action="status-timeline" data-po="${escapeHtml(po.poKey)}">Status</button>
        <button class="primary-btn small-btn" data-action="edit-po" data-po="${escapeHtml(po.poKey)}">Edit PO</button>
        <button class="danger-btn small-btn" data-action="delete-po" data-po="${escapeHtml(po.poKey)}">Delete</button>
      </div>
    </article>
  `).join('') : `<div class="empty-state">No purchase orders found for the current filters.</div>`;

  document.getElementById('poList').innerHTML = html;
}

function renderTableHead(mountId, columns) {
  document.getElementById(mountId).innerHTML = `<tr>${columns.map(column => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr>`;
}

function renderProducts({ products }) {
  setSelectOptions('productSortSelect', PRODUCT_SORTS, state.filters.productSort);

  let filtered = products.filter(product => {
    const search = state.filters.productSearch.toLowerCase();
    return !search || product.productName.toLowerCase().includes(search);
  });

  filtered = sortData(filtered, state.filters.productSort);
  renderTableHead('productTableHead', PRODUCT_COLUMNS);
  document.getElementById('productTableBody').innerHTML = filtered.map(product => `
    <tr class="row-selectable" data-product="${escapeHtml(product.productName)}">
      <td class="truncate">${escapeHtml(product.productName)}</td>
      <td>${formatNumber(product.vendorCount)}</td>
      <td>${escapeHtml(product.bestVendor || '—')}</td>
      <td>${product.bestPrice ? money(product.bestPrice) : '—'}</td>
      <td>${product.avgPrice ? money(product.avgPrice) : '—'}</td>
      <td>${formatNumber(product.totalQty)}</td>
      <td>${money(product.totalSpend)}</td>
      <td>${formatDate(product.lastOrderDate)}</td>
    </tr>
  `).join('') || `<tr><td colspan="8" class="empty-state">No products found.</td></tr>`;
}

function ensureSelectedVendor(vendors) {
  if (!vendors.length) {
    state.selectedVendor = null;
    return;
  }
  const exists = vendors.some(vendor => vendor.vendorName === state.selectedVendor);
  if (!exists) state.selectedVendor = vendors[0].vendorName;
}

function renderVendors({ vendors }) {
  setSelectOptions('vendorSortSelect', VENDOR_SORTS, state.filters.vendorSort);
  let filtered = vendors.filter(vendor => {
    const search = state.filters.vendorSearch.toLowerCase();
    return !search || [vendor.vendorName, vendor.gstin, vendor.source].join(' ').toLowerCase().includes(search);
  });

  filtered = sortData(filtered, state.filters.vendorSort);
  ensureSelectedVendor(filtered);
  renderTableHead('vendorTableHead', VENDOR_COLUMNS);
  document.getElementById('vendorTableBody').innerHTML = filtered.map(vendor => `
    <tr class="row-selectable ${vendor.vendorName === state.selectedVendor ? 'selection-row' : ''}" data-vendor="${escapeHtml(vendor.vendorName)}">
      <td>${escapeHtml(vendor.vendorName)}</td>
      <td>${escapeHtml(vendor.source || '—')}</td>
      <td>${escapeHtml(vendor.gstin || '—')}</td>
      <td>${formatNumber(vendor.poCount)}</td>
      <td>${formatNumber(vendor.productCount)}</td>
      <td>${money(vendor.totalSpend)}</td>
      <td>${formatDate(vendor.lastOrderDate)}</td>
    </tr>
  `).join('') || `<tr><td colspan="7" class="empty-state">No vendors found.</td></tr>`;

  renderVendorForm(vendors);
}

function renderVendorForm(vendors) {
  const vendor = vendors.find(item => item.vendorName === state.selectedVendor);
  const mount = document.getElementById('vendorForm');
  const label = document.getElementById('selectedVendorLabel');
  if (!vendor) {
    mount.innerHTML = '<div class="empty-state">Select a vendor to edit contact details.</div>';
    label.textContent = 'Select a vendor';
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
      <input class="control-input" name="source" value="${escapeHtml(contact.source || vendor.source || '')}" />
    </label>
    <label class="field">
      <span>GSTIN</span>
      <input class="control-input" name="gstin" value="${escapeHtml(contact.gstin || vendor.gstin || '')}" />
    </label>
    <label class="field">
      <span>Contact Person</span>
      <input class="control-input" name="contactPerson" value="${escapeHtml(contact.contactPerson || '')}" />
    </label>
    <label class="field">
      <span>Phone</span>
      <input class="control-input" name="phone" value="${escapeHtml(contact.phone || '')}" />
    </label>
    <label class="field">
      <span>Email</span>
      <input class="control-input" name="email" value="${escapeHtml(contact.email || '')}" />
    </label>
    <label class="field">
      <span>Website</span>
      <input class="control-input" name="website" value="${escapeHtml(contact.website || '')}" />
    </label>
    <label class="field">
      <span>City</span>
      <input class="control-input" name="city" value="${escapeHtml(contact.city || '')}" />
    </label>
    <label class="field">
      <span>Default Lead Time (days)</span>
      <input class="control-input" name="defaultLeadTimeDays" value="${escapeHtml(contact.defaultLeadTimeDays || '')}" />
    </label>
    <label class="field">
      <span>Vendor Rating</span>
      <input class="control-input" name="rating" value="${escapeHtml(contact.rating || '')}" />
    </label>
    <label class="field-full">
      <span>Notes</span>
      <textarea name="notes">${escapeHtml(contact.notes || '')}</textarea>
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
  const exists = products.some(product => product.productName === state.selectedMetricProduct);
  if (!exists) state.selectedMetricProduct = products[0].productName;
}

function renderMetricProducts({ products, productVendorMetrics }) {
  setSelectOptions('metricSortSelect', METRIC_SORTS, state.filters.metricSort);
  let filtered = products.filter(product => {
    const search = state.filters.metricProductSearch.toLowerCase();
    return !search || product.productName.toLowerCase().includes(search);
  });
  filtered = sortData(filtered, state.filters.metricSort);
  ensureSelectedMetricProduct(filtered);
  renderTableHead('metricProductTableHead', METRIC_PRODUCT_COLUMNS);
  document.getElementById('metricProductTableBody').innerHTML = filtered.map(product => `
    <tr class="row-selectable ${product.productName === state.selectedMetricProduct ? 'selection-row' : ''}" data-metric-product="${escapeHtml(product.productName)}">
      <td class="truncate">${escapeHtml(product.productName)}</td>
      <td>${formatNumber(product.vendorCount)}</td>
      <td>${product.bestPrice ? money(product.bestPrice) : '—'}</td>
      <td>${formatDate(product.lastOrderDate)}</td>
    </tr>
  `).join('') || `<tr><td colspan="4" class="empty-state">No products found.</td></tr>`;

  renderMetricEditor(productVendorMetrics);
}

function renderMetricEditor(productVendorMetrics) {
  const mount = document.getElementById('metricEditor');
  const label = document.getElementById('selectedMetricProductLabel');
  const productName = state.selectedMetricProduct;
  if (!productName) {
    mount.innerHTML = '<div class="empty-state">Select a product to compare vendors.</div>';
    label.textContent = 'Select a product';
    return;
  }
  label.textContent = productName;

  const derived = buildDerived();
  const vendorOptions = sortData(derived.vendors, 'vendorName-asc');

  const rows = productVendorMetrics
    .filter(metric => metric.productName === productName)
    .sort((a, b) => {
      const aRank = number(a.quotedPriceNumber || a.historicalBestPrice || a.latestPrice || 0) || Number.MAX_SAFE_INTEGER;
      const bRank = number(b.quotedPriceNumber || b.historicalBestPrice || b.latestPrice || 0) || Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    });

  const datalistId = `metricVendorList-${normalizeKey(productName).replace(/[^A-Z0-9]+/g, '-')}`;

  mount.innerHTML = `
    <div class="metric-topbar">
      <div class="metric-note">Compare historical vendors and add extra vendors for this product even before raising a PO.</div>
      <div class="group-note">${formatNumber(rows.length)} vendor option${rows.length === 1 ? '' : 's'}</div>
    </div>
    ${state.showMetricVendorForm ? `
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
          ${vendorOptions.map(vendor => `<option value="${escapeHtml(vendor.vendorName)}"></option>`).join('')}
        </datalist>
        <div class="form-actions">
          <button type="button" class="ghost-btn" data-action="cancel-add-metric-vendor">Cancel</button>
          <button type="submit" class="primary-btn">Save Vendor Option</button>
        </div>
      </form>
    ` : ''}

    ${rows.length ? `<div class="metric-editor">${rows.map(metric => {
      const metricKey = metricStorageKey(metric.productName, metric.vendorName);
      const saved = state.productVendorMetrics[metricKey] || {};
      const displayPrice = number(saved.quotedPrice) || metric.quotedPriceNumber || metric.historicalBestPrice || metric.latestPrice || 0;
      return `
        <form class="metric-card" data-metric-key="${escapeHtml(metricKey)}">
          <div class="metric-card-head">
            <div>
              <h4>${escapeHtml(metric.vendorName)}</h4>
              <div class="metric-subtle">${escapeHtml(metric.source || 'No source')} ${metric.gstin ? `· ${escapeHtml(metric.gstin)}` : ''}</div>
            </div>
            <div class="group-note">${metric.hasHistory ? 'History linked' : 'Added manually'}</div>
          </div>
          <div class="meta-row">
            <span>Best historical rate: ${metric.historicalBestPrice ? money(metric.historicalBestPrice) : '—'}</span>
            <span>Latest rate: ${metric.latestPrice ? money(metric.latestPrice) : '—'}</span>
            <span>Current compare rate: ${displayPrice ? money(displayPrice) : '—'}</span>
            <span>POs: ${formatNumber(metric.poCount)}</span>
            <span>Last order: ${formatDate(metric.lastOrderDate)}</span>
          </div>
          <div class="metric-grid">
            <label class="field">
              <span>Quoted Price</span>
              <input class="control-input" name="quotedPrice" value="${escapeHtml(saved.quotedPrice || metric.quotedPrice || '')}" />
            </label>
            <label class="field">
              <span>Lead Time (days)</span>
              <input class="control-input" name="leadTimeDays" value="${escapeHtml(saved.leadTimeDays || metric.leadTimeDays || '')}" />
            </label>
            <label class="field">
              <span>MOQ</span>
              <input class="control-input" name="moq" value="${escapeHtml(saved.moq || metric.moq || '')}" />
            </label>
            <label class="field">
              <span>Rating</span>
              <input class="control-input" name="rating" value="${escapeHtml(saved.rating || metric.rating || '')}" />
            </label>
            <label class="field-full">
              <span>Notes</span>
              <textarea name="notes">${escapeHtml(saved.notes || metric.notes || '')}</textarea>
            </label>
          </div>
          <div class="form-actions">
            <button type="submit" class="primary-btn small-btn">Save Metrics</button>
          </div>
        </form>
      `;
    }).join('')}</div>` : `<div class="empty-state">No vendors found for this product yet. Add one to start comparison.</div>`}
  `;
}

function getDerivedAndGroupedPo(poKey) {
  const derived = buildDerived();
  const po = derived.pos.find(item => item.poKey === poKey || item.poNumber === poKey);
  return { derived, po };
}

function createLineItemCard(values = {}) {
  const index = document.querySelectorAll('.line-item-card').length + 1;
  const wrapper = document.createElement('div');
  const lineType = inferLineType(values.itemDesc, values.lineType);
  wrapper.className = 'line-item-card';
  wrapper.innerHTML = `
    <div class="line-item-top">
      <div class="line-title">${getLineTypeLabel(lineType)} ${index}</div>
      <button type="button" class="danger-btn small-btn" data-line-remove>Remove</button>
    </div>
    <div class="line-item-grid">
      <label class="field">
        <span>Line Type</span>
        <select class="control-input" name="lineType">
          <option value="product" ${lineType === 'product' ? 'selected' : ''}>Product</option>
          <option value="charge" ${lineType === 'charge' ? 'selected' : ''}>Charge</option>
        </select>
      </label>
      <label class="field">
        <span>Description</span>
        <input class="control-input" name="itemDesc" value="${escapeHtml(values.itemDesc || '')}" placeholder="Item or charge description" required />
      </label>
      <label class="field">
        <span>Qty</span>
        <input class="control-input" type="number" min="0" step="0.001" name="quantityOrdered" value="${escapeHtml(values.quantityOrdered ?? 1)}" required />
      </label>
      <label class="field">
        <span>UOM</span>
        <input class="control-input" list="uomOptions" name="uom" value="${escapeHtml(normalizeUom(values.uom || 'Nos'))}" placeholder="Nos / Mtr / Kg" />
      </label>
      <label class="field">
        <span>Unit Price</span>
        <input class="control-input" type="number" min="0" step="0.01" name="itemPrice" value="${escapeHtml(values.itemPrice ?? '')}" required />
      </label>
      <label class="field">
        <span>Tax %</span>
        <input class="control-input" type="number" min="0" step="0.01" name="itemTaxPercent" value="${escapeHtml(values.itemTaxPercent ?? 18)}" />
      </label>
      <div class="metric-block">
        <div class="metric-label">Line Total</div>
        <div class="metric-value" data-line-total>${money(materializeRow({
          quantityOrdered: values.quantityOrdered ?? 1,
          itemPrice: values.itemPrice ?? 0,
          itemTaxPercent: values.itemTaxPercent ?? 18,
          itemTotal: values.itemTotal ?? 0,
          itemTaxAmount: values.itemTaxAmount ?? 0,
          lineGrandTotal: values.lineGrandTotal ?? 0,
          itemDesc: values.itemDesc || '',
          lineType
        }).lineGrandTotal)}</div>
      </div>
    </div>
  `;
  return wrapper;
}

function openPoModal(po = null) {
  state.editingPoKey = po?.poKey || null;
  const modal = document.getElementById('poModalBackdrop');
  const title = document.getElementById('poModalTitle');
  const subtext = document.getElementById('poModalSubtext');
  const form = document.getElementById('poForm');
  const linesMount = document.getElementById('poLineItems');

  form.reset();
  linesMount.innerHTML = '';
  if (po) {
    title.textContent = `Edit ${po.poNumber}`;
    subtext.textContent = `Update PO header details, amount paid, amount/percent discount, adjustment, products, and charge lines for ${po.vendorName}.`;
    form.elements.poDate.value = po.poDate || '';
    form.elements.poNumber.value = po.poNumber || '';
    form.elements.vendorName.value = po.vendorName || '';
    form.elements.source.value = po.source || '';
    form.elements.gstin.value = po.gstin || '';
    if (form.elements.materialType) form.elements.materialType.value = normalizeMaterialType(po.materialType || 'Unknown');
    if (form.elements.edd) form.elements.edd.value = po.edd || '';
    form.elements.deliveryDate.value = po.deliveryDate || '';
    const discountTypeInput = document.getElementById('summaryDiscountType');
    const discountValueInput = document.getElementById('summaryDiscountInput');
    const adjustmentInput = document.getElementById('summaryAdjustmentInput');
    const amountPaidInput = document.getElementById('summaryAmountPaidInput');
    if (discountTypeInput) discountTypeInput.value = po.discountType || 'amount';
    if (discountValueInput) discountValueInput.value = String(number(po.discountInputValue || 0));
    if (adjustmentInput) adjustmentInput.value = String(number(po.adjustmentAmount || 0));
    if (amountPaidInput) amountPaidInput.value = String(number(po.amountPaid || 0));
    form.elements.paymentStatus.value = ['Paid', 'Partially Paid', 'Pending', 'Unknown'].includes(po.paymentStatus) ? po.paymentStatus : 'Unknown';
    form.elements.poStatus.value = ['Issued', 'Billed', 'Closed', 'Unknown'].includes(po.poStatus) ? po.poStatus : 'Unknown';
    form.elements.deliveryStatus.value = ['Unknown', 'In Transit', 'Partially Delivered', 'Delivered'].includes(po.deliveryStatus) ? po.deliveryStatus : 'Unknown';
    form.elements.terms.value = po.terms || '';
    po.items.forEach(item => linesMount.appendChild(createLineItemCard(item)));
  } else {
    title.textContent = 'Add Purchase Order';
    subtext.textContent = 'Create one PO with amount paid, amount/percent discount, adjustment, product lines, and charge lines.';
    const discountTypeInput = document.getElementById('summaryDiscountType');
    const discountInput = document.getElementById('summaryDiscountInput');
    const adjustmentInput = document.getElementById('summaryAdjustmentInput');
    const amountPaidInput = document.getElementById('summaryAmountPaidInput');
    if (discountTypeInput) discountTypeInput.value = 'amount';
    if (discountInput) discountInput.value = '0';
    if (adjustmentInput) adjustmentInput.value = '0';
    if (amountPaidInput) amountPaidInput.value = '0';
    form.elements.paymentStatus.value = 'Pending';
    form.elements.poStatus.value = 'Issued';
    form.elements.deliveryStatus.value = 'Unknown';
    if (form.elements.materialType) form.elements.materialType.value = 'Unknown';
    if (form.elements.edd) form.elements.edd.value = '';
    linesMount.appendChild(createLineItemCard({ quantityOrdered: 1, itemTaxPercent: 18 }));
  }
  const eddField = document.getElementById('eddField');
  if (eddField) eddField.classList.toggle('hidden', !(po && isPoDelayed(po)));
  refreshLineIndexes();
  recalcPoSummary();
  modal.classList.remove('hidden');
}

function closePoModal() {
  document.getElementById('poModalBackdrop').classList.add('hidden');
  state.editingPoKey = null;
}

function refreshLineIndexes() {
  document.querySelectorAll('.line-item-card').forEach((card, idx) => {
    const title = card.querySelector('.line-title');
    const lineType = cleanText(card.querySelector('[name="lineType"]')?.value || 'product').toLowerCase();
    if (title) title.textContent = `${getLineTypeLabel(lineType)} ${idx + 1}`;
  });
}

function recalcPoSummary() {
  const lines = Array.from(document.querySelectorAll('.line-item-card')).map(card => ({
    quantityOrdered: number(card.querySelector('[name="quantityOrdered"]')?.value),
    uom: normalizeUom(card.querySelector('[name="uom"]')?.value),
    itemPrice: number(card.querySelector('[name="itemPrice"]')?.value),
    itemTaxPercent: number(card.querySelector('[name="itemTaxPercent"]')?.value)
  }));
  const { discountType, discountInputValue, adjustmentAmount } = getDiscountStateFromInputs();
  const breakdown = calculatePoBreakdown(lines, discountType, discountInputValue, adjustmentAmount);
  const amountPaidInputEl = document.getElementById('summaryAmountPaidInput');
  const typedAmountPaid = number(amountPaidInputEl?.value);
  const paymentState = derivePaymentState(breakdown.grandTotal, typedAmountPaid);

  document.querySelectorAll('.line-item-card').forEach((card, index) => {
    const totalMount = card.querySelector('[data-line-total]');
    if (totalMount) totalMount.textContent = money(breakdown.lines[index]?.lineGrandTotal || 0);
  });

  const itemTotalEl = document.getElementById('summaryItemTotal');
  const discountTotalEl = document.getElementById('summaryDiscountTotal');
  const taxTotalEl = document.getElementById('summaryTaxTotal');
  const balanceDueEl = document.getElementById('summaryBalanceDue');
  if (itemTotalEl) itemTotalEl.textContent = money(breakdown.itemSubtotal);
  if (discountTotalEl) discountTotalEl.textContent = money(breakdown.discountValue);
  if (taxTotalEl) taxTotalEl.textContent = money(breakdown.taxTotal);
  if (balanceDueEl) balanceDueEl.textContent = money(paymentState.balanceDue);

  const discountTypeInput = document.getElementById('summaryDiscountType');
  const discountInput = document.getElementById('summaryDiscountInput');
  const adjustmentInput = document.getElementById('summaryAdjustmentInput');
  if (discountTypeInput && document.activeElement !== discountTypeInput) discountTypeInput.value = breakdown.discountType;
  if (discountInput && document.activeElement !== discountInput) discountInput.value = String(breakdown.discountInputValue);
  if (adjustmentInput && document.activeElement !== adjustmentInput) adjustmentInput.value = String(breakdown.adjustmentAmount);
  if (amountPaidInputEl && document.activeElement !== amountPaidInputEl) amountPaidInputEl.value = String(paymentState.amountPaid);

  const paymentStatusEl = document.querySelector('#poForm [name="paymentStatus"]');
  if (paymentStatusEl) paymentStatusEl.value = paymentState.paymentStatus;

  const poTotalEl = document.getElementById('summaryPoTotal');
  if (poTotalEl) poTotalEl.textContent = money(breakdown.grandTotal);
}

function collectPoFormPayload(existingPo = null) {
  const form = document.getElementById('poForm');
  const poDate = form.elements.poDate.value;
  const poNumber = cleanText(form.elements.poNumber.value) || uid('PO');
  const vendorName = cleanText(form.elements.vendorName.value);
  const source = cleanText(form.elements.source.value);
  const gstin = cleanText(form.elements.gstin.value);
  const deliveryDate = form.elements.deliveryDate.value;
  const materialType = normalizeMaterialType(form.elements.materialType?.value || 'Unknown');
  const edd = form.elements.edd?.value || '';
  const { discountType, discountInputValue, adjustmentAmount } = getDiscountStateFromInputs();
  const amountPaidInput = number(document.getElementById('summaryAmountPaidInput')?.value);
  const paymentStatus = normalizePaymentStatus(form.elements.paymentStatus.value);
  const poStatus = normalizePoStatus(form.elements.poStatus.value);
  const deliveryStatus = normalizeDeliveryStatus(form.elements.deliveryStatus.value);
  const terms = form.elements.terms.value || '';
  const lineCards = Array.from(document.querySelectorAll('.line-item-card'));
  const rawLines = lineCards.map(card => {
    const itemDesc = cleanText(card.querySelector('[name="itemDesc"]')?.value);
    const quantityOrdered = number(card.querySelector('[name="quantityOrdered"]')?.value);
    const itemPrice = number(card.querySelector('[name="itemPrice"]')?.value);
    const itemTaxPercent = number(card.querySelector('[name="itemTaxPercent"]')?.value);
    const lineType = inferLineType(itemDesc, card.querySelector('[name="lineType"]')?.value);
    return {
      itemDesc,
      quantityOrdered,
      uom: normalizeUom(card.querySelector('[name="uom"]')?.value),
      itemPrice,
      itemTaxPercent,
      lineType
    };
  }).filter(line => line.itemDesc);

  if (!vendorName || !poDate || !rawLines.length) {
    alert('Please fill PO date, vendor name, and at least one PO line.');
    return null;
  }

  const breakdown = calculatePoBreakdown(rawLines, discountType, discountInputValue, adjustmentAmount);
  const paymentState = derivePaymentState(breakdown.grandTotal, amountPaidInput);
  const originalItems = existingPo?.items || [];
  const usedBaseIds = new Set();
  const updatedRows = breakdown.lines.map((line, index) => {
    const base = originalItems[index];
    if (base?.id) usedBaseIds.add(base.id);
    return {
      id: base?.id || uid('manual'),
      poDate,
      deliveryDate,
      edd,
      materialType,
      deliveryStatus,
      poNumber,
      reference: base?.reference || '',
      poStatus,
      vendorName,
      hsnSac: base?.hsnSac || '',
      source,
      gstin,
      referenceNo: base?.referenceNo || '',
      terms,
      itemPrice: line.itemPrice,
      itemDesc: line.itemDesc,
      quantityOrdered: line.quantityOrdered,
      uom: normalizeUom(line.uom || 'Nos'),
      itemTax: line.itemTaxPercent ? `GST${line.itemTaxPercent}` : '',
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
      manual: base?.manual || !base
    };
  });

  const removedRows = originalItems.filter(item => !usedBaseIds.has(item.id));

  return { updatedRows, removedRows, vendorName, source, gstin, materialType, edd };
}

function applyPoChanges(existingPo, payload) {
  if (!payload) return;

  payload.updatedRows.forEach(row => {
    if (row.manual) {
      const index = state.manualRows.findIndex(item => item.id === row.id);
      if (index >= 0) state.manualRows[index] = { ...state.manualRows[index], ...row, manual: true };
      else state.manualRows.push({ ...row, manual: true });
    } else {
      state.rowOverrides[row.id] = { ...state.rowOverrides[row.id], ...row };
    }
  });

  payload.removedRows.forEach(row => {
    if (row.manual) {
      state.manualRows = state.manualRows.filter(item => item.id !== row.id);
    } else {
      state.rowOverrides[row.id] = { ...(state.rowOverrides[row.id] || {}), __deleted: true };
    }
  });

  const vendorKey = payload.vendorName;
  if (vendorKey) {
    const current = state.vendorContacts[vendorKey] || {};
    state.vendorContacts[vendorKey] = {
      vendorName: vendorKey,
      source: payload.source || current.source || '',
      gstin: payload.gstin || current.gstin || '',
      contactPerson: current.contactPerson || '',
      phone: current.phone || '',
      email: current.email || '',
      website: current.website || '',
      city: current.city || '',
      defaultLeadTimeDays: current.defaultLeadTimeDays || '',
      rating: current.rating || '',
      notes: current.notes || ''
    };
  }

  saveState();
  closePoModal();
  renderAll();
}

function deletePurchaseOrder(poKey) {
  const { po } = getDerivedAndGroupedPo(poKey);
  if (!po) return;
  const ok = window.confirm(`Delete ${po.poNumber}? This will remove the full PO from the site.`);
  if (!ok) return;

  po.items.forEach(item => {
    if (item.manual) {
      state.manualRows = state.manualRows.filter(row => row.id !== item.id);
    } else {
      state.rowOverrides[item.id] = { ...(state.rowOverrides[item.id] || {}), __deleted: true };
    }
  });

  saveState();
  renderAll();
}

function openProductDetailModal(poKey) {
  const { po } = getDerivedAndGroupedPo(poKey);
  if (!po) return;

  const groupedItems = Array.isArray(po.groupedItems) && po.groupedItems.length ? po.groupedItems : groupedPoItems((po.items || []).filter(item => !item.isCharge));
  const groupedCharges = Array.isArray(po.groupedCharges) && po.groupedCharges.length ? po.groupedCharges : groupedPoItems((po.items || []).filter(item => item.isCharge));

  document.getElementById('detailModalTitle').textContent = `${po.poNumber} · ${po.vendorName}`;
  document.getElementById('detailModalSubtext').textContent = `${groupedItems.length} grouped product${groupedItems.length === 1 ? '' : 's'} and ${groupedCharges.length} charge line${groupedCharges.length === 1 ? '' : 's'} inside this PO.`;
  document.getElementById('detailModalContent').innerHTML = `
    <div class="detail-summary">
      <div class="detail-card"><div class="k">PO Date</div><div class="v">${formatDate(po.poDate)}</div></div>
      <div class="detail-card"><div class="k">Item Total</div><div class="v">${money(po.itemSubtotal || 0)}</div></div>
      <div class="detail-card"><div class="k">Discount</div><div class="v">${money(po.discountAmount || 0)}${po.discountType === 'percent' ? ` (${escapeHtml(String(po.discountInputValue || 0))}%)` : ''}</div></div>
      <div class="detail-card"><div class="k">Tax Total</div><div class="v">${money(po.taxTotal || 0)}</div></div>
      <div class="detail-card"><div class="k">Adjustment</div><div class="v">${money(po.adjustmentAmount || 0)}</div></div>
      <div class="detail-card"><div class="k">PO Total</div><div class="v">${money(po.poTotal)}</div></div>
      <div class="detail-card"><div class="k">Amount Paid</div><div class="v">${money(po.amountPaid || 0)}</div></div>
      <div class="detail-card"><div class="k">Balance Due</div><div class="v">${money(po.balanceDue || 0)}</div></div>
      <div class="detail-card"><div class="k">Payment</div><div class="v">${renderPaymentProgress(po)}</div></div>
      <div class="detail-card"><div class="k">Delivery</div><div class="v"><span class="badge ${displayDeliveryBadgeClass(po)}">${escapeHtml(displayDeliveryStatus(po))}</span> <span class="small-text">${formatDate(po.deliveryDate)}</span></div></div>
    </div>

    ${groupedItems.length ? `
      <div class="detail-section-title">Products</div>
      <div class="detail-items">
        ${groupedItems.map((item, index) => `
          <div class="detail-item">
            <div class="detail-item-head">
              <div>
                <div class="line-title">Grouped Product ${index + 1}</div>
                <h4>${escapeHtml(item.itemDesc)}</h4>
              </div>
              <div class="metric-value">${money(item.lineGrandTotal)}</div>
            </div>
            <div class="meta-row">
              <span>Total Qty ${formatNumber(item.quantityOrdered)} ${escapeHtml(item.displayUom || 'Nos')}</span>
              <span>Rate ${item.displayPrice}${item.displayUom && item.displayUom !== 'Mixed' ? ` / ${escapeHtml(item.displayUom)}` : ''}</span>
              <span>Tax ${escapeHtml(item.displayTaxPercent)}${item.displayTaxPercent === 'Mixed' ? '' : '%'}</span>
              <span>Item Total ${money(item.itemTotal)}</span>
              <span>Tax Amount ${money(item.itemTaxAmount)}</span>
            </div>
            ${item.lineCount > 1 ? `
              <div class="detail-subitems">
                <div class="group-note">Clubbed from ${item.lineCount} lines in this PO</div>
                ${item.lines.map((line, lineIndex) => `
                  <div class="detail-subline">
                    <div class="metric-subtle">Original line ${lineIndex + 1}</div>
                    <div class="meta-row">
                      <span>Qty ${formatNumber(line.quantityOrdered)} ${escapeHtml(line.uom || 'Nos')}</span>
                      <span>Unit ${money(line.itemPrice)}${line.uom ? ` / ${escapeHtml(line.uom)}` : ''}</span>
                      <span>Tax ${formatNumber(line.itemTaxPercent)}%</span>
                      <span>Line Total ${money(line.lineGrandTotal)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    ` : `<div class="empty-state">No product lines in this PO.</div>`}

    ${groupedCharges.length ? `
      <div class="detail-section-title" style="margin-top:18px">Charges</div>
      <div class="detail-items">
        ${groupedCharges.map((item, index) => `
          <div class="detail-item charge-item">
            <div class="detail-item-head">
              <div>
                <div class="line-title">Charge ${index + 1}</div>
                <h4>${escapeHtml(item.itemDesc)}</h4>
              </div>
              <div class="metric-value">${money(item.lineGrandTotal)}</div>
            </div>
            <div class="meta-row">
              <span>Qty ${formatNumber(item.quantityOrdered)} ${escapeHtml(item.displayUom || 'Nos')}</span>
              <span>Rate ${item.displayPrice}${item.displayUom && item.displayUom !== 'Mixed' ? ` / ${escapeHtml(item.displayUom)}` : ''}</span>
              <span>Tax ${escapeHtml(item.displayTaxPercent)}${item.displayTaxPercent === 'Mixed' ? '' : '%'}</span>
              <span>Charge Total ${money(item.itemTotal)}</span>
              <span>Tax Amount ${money(item.itemTaxAmount)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div class="detail-footer">
      <div class="meta-row">
        <span>Vendor: ${escapeHtml(po.vendorName)}</span>
        <span>GSTIN: ${escapeHtml(po.gstin || '—')}</span>
        <span>Source: ${escapeHtml(po.source || '—')}</span>
        <span>PO Status: ${escapeHtml(po.poStatus)}</span>
      </div>
      ${po.terms ? `<div class="small-text" style="margin-top:12px;white-space:pre-wrap;line-height:1.55">${escapeHtml(po.terms)}</div>` : ''}
      <div class="form-actions">
        <button class="primary-btn small-btn" data-action="edit-po-from-detail" data-po="${escapeHtml(po.poKey)}" type="button">Edit PO</button>
      </div>
    </div>
  `;

  document.getElementById('detailModalBackdrop').classList.remove('hidden');
}

function closeDetailModal() {
  document.getElementById('detailModalBackdrop').classList.add('hidden');
}

function exportLocalState() {
  const payload = {
    manualRows: state.manualRows,
    rowOverrides: state.rowOverrides,
    vendorContacts: state.vendorContacts,
    productVendorMetrics: state.productVendorMetrics,
    deletedVendors: state.deletedVendors
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
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
    app: 'Stack n Stock Procurement Dashboard',
    baseData: {
      rows: Array.isArray(window.STACKNSTOCK_DATA?.rows) ? window.STACKNSTOCK_DATA.rows : [],
      vendorSeeds: Array.isArray(window.STACKNSTOCK_DATA?.vendorSeeds) ? window.STACKNSTOCK_DATA.vendorSeeds : []
    },
    localState: {
      manualRows: state.manualRows,
      rowOverrides: state.rowOverrides,
      vendorContacts: state.vendorContacts,
      productVendorMetrics: state.productVendorMetrics,
      deletedVendors: state.deletedVendors
    },
    mergedView: {
      rows: allRows(),
      derived: buildDerived()
    }
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  link.href = URL.createObjectURL(blob);
  link.download = `stack-n-stock-full-data-${timestamp}.json`;
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
        state.manualRows = Array.isArray(imported.manualRows) ? imported.manualRows : [];
        state.rowOverrides = {};
        state.vendorContacts = mergeVendorSeeds({
          ...(state.vendorContacts || {}),
          ...(imported.vendorContacts || {})
        });
        state.productVendorMetrics = {
          ...(state.productVendorMetrics || {}),
          ...(imported.productVendorMetrics || {})
        };
        const restoredVendorNames = new Set((imported.restoredVendorNames || []).map(name => cleanText(name)));
        state.deletedVendors = (state.deletedVendors || []).filter(name => !restoredVendorNames.has(cleanText(name)));
        saveState();
        renderAll();

        if (useSupabase) {
          syncStateToSupabase()
            .then(() => {
              alert(`DB JSON imported and synced: ${state.manualRows.length} lines across ${normalizedPayload.purchase_orders.length} purchase orders.`);
            })
            .catch(err => {
              console.error('Import sync failed', err);
              alert(`DB JSON imported locally, but Supabase sync failed: ${err.message || err}`);
            });
        } else {
          alert(`DB JSON imported: ${state.manualRows.length} lines across ${normalizedPayload.purchase_orders.length} purchase orders.`);
        }
      } else {
        state.manualRows = Array.isArray(payload.manualRows) ? payload.manualRows : state.manualRows;
        state.rowOverrides = payload.rowOverrides && typeof payload.rowOverrides === 'object' ? payload.rowOverrides : state.rowOverrides;
        state.vendorContacts = mergeVendorSeeds(payload.vendorContacts && typeof payload.vendorContacts === 'object' ? payload.vendorContacts : state.vendorContacts);
        state.productVendorMetrics = payload.productVendorMetrics && typeof payload.productVendorMetrics === 'object' ? payload.productVendorMetrics : state.productVendorMetrics;
        state.deletedVendors = Array.isArray(payload.deletedVendors) ? payload.deletedVendors : state.deletedVendors;
        saveState();
        renderAll();

        if (useSupabase) {
          syncStateToSupabase()
            .then(() => {
              alert('Local data imported and synced to Supabase.');
            })
            .catch(err => {
              console.error('Import sync failed', err);
              alert(`Local data imported, but Supabase sync failed: ${err.message || err}`);
            });
        } else {
          alert('Local data imported.');
        }
      }
    } catch {
      alert('Unable to import this JSON file.');
    } finally {
      event.target.value = '';
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
    gstin: cleanText(form.elements.gstin?.value),
    contactPerson: cleanText(form.elements.contactPerson?.value),
    phone: cleanText(form.elements.phone?.value),
    email: cleanText(form.elements.email?.value),
    website: cleanText(form.elements.website?.value),
    city: cleanText(form.elements.city?.value),
    defaultLeadTimeDays: cleanText(form.elements.defaultLeadTimeDays?.value),
    rating: cleanText(form.elements.rating?.value),
    notes: form.elements.notes?.value || ''
  };

  saveState();
  renderAll();
}

function deleteSelectedVendor() {
  const vendorName = cleanText(state.selectedVendor);
  if (!vendorName) return;
  const ok = window.confirm(`Delete ${vendorName} from active vendor lists? Historical PO records will stay as-is.`);
  if (!ok) return;

  if (!Array.isArray(state.deletedVendors)) state.deletedVendors = [];
  if (!state.deletedVendors.some(item => normalizeKey(item) === normalizeKey(vendorName))) {
    state.deletedVendors.push(vendorName);
  }

  delete state.vendorContacts[vendorName];
  Object.keys(state.productVendorMetrics || {}).forEach(key => {
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
    source: existing.source || state.vendorContacts[parsed.vendorName]?.source || '',
    gstin: existing.gstin || state.vendorContacts[parsed.vendorName]?.gstin || '',
    quotedPrice: cleanText(form.elements.quotedPrice?.value),
    leadTimeDays: cleanText(form.elements.leadTimeDays?.value),
    moq: cleanText(form.elements.moq?.value),
    rating: cleanText(form.elements.rating?.value),
    notes: form.elements.notes?.value || ''
  };

  saveState();
  renderAll();
}

function saveMetricQuickAddForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const productName = cleanText(form.elements.productName?.value || state.selectedMetricProduct);
  const vendorName = cleanText(form.elements.vendorName?.value);
  if (!productName || !vendorName) {
    alert('Please add a product and vendor name.');
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
    source: source || state.productVendorMetrics[key]?.source || state.vendorContacts[vendorName]?.source || '',
    gstin: gstin || state.productVendorMetrics[key]?.gstin || state.vendorContacts[vendorName]?.gstin || '',
    quotedPrice: cleanText(form.elements.quotedPrice?.value),
    leadTimeDays: cleanText(form.elements.leadTimeDays?.value),
    moq: cleanText(form.elements.moq?.value),
    rating: cleanText(form.elements.rating?.value),
    notes: form.elements.notes?.value || ''
  };

  state.vendorContacts[vendorName] = {
    ...(state.vendorContacts[vendorName] || {}),
    vendorName,
    source: source || state.vendorContacts[vendorName]?.source || '',
    gstin: gstin || state.vendorContacts[vendorName]?.gstin || '',
    contactPerson: state.vendorContacts[vendorName]?.contactPerson || '',
    phone: state.vendorContacts[vendorName]?.phone || '',
    email: state.vendorContacts[vendorName]?.email || '',
    website: state.vendorContacts[vendorName]?.website || '',
    city: state.vendorContacts[vendorName]?.city || '',
    defaultLeadTimeDays: state.vendorContacts[vendorName]?.defaultLeadTimeDays || cleanText(form.elements.leadTimeDays?.value),
    rating: cleanText(form.elements.rating?.value) || state.vendorContacts[vendorName]?.rating || '',
    notes: state.vendorContacts[vendorName]?.notes || ''
  };

  state.showMetricVendorForm = false;
  saveState();
  renderAll();
}

function renderAll() {
  const derived = buildDerived();
  renderKpis(derived);
  renderOverview(derived);
  renderStatusMix(derived.pos, 'paymentMix', 'paymentStatus');
  renderStatusMix(derived.pos, 'deliveryMix', 'deliveryStatus');
  renderPurchaseOrders(derived);
  renderProducts(derived);
  renderVendors(derived);
  renderMetricProducts(derived);
  renderFollowups(derived);
}

function bindTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeTab = tab.dataset.tab;
      document.querySelectorAll('.tab').forEach(item => item.classList.toggle('active', item.dataset.tab === state.activeTab));
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === state.activeTab));
    });
  });
}

function bindFilters() {
  const specs = [
    ['poSearch', 'input', value => state.filters.poSearch = value],
    ['poVendorFilter', 'change', value => state.filters.poVendor = value],
    ['poPaymentFilter', 'change', value => state.filters.poPayment = value],
    ['poStatusFilter', 'change', value => state.filters.poStatus = value],
    ['poDeliveryFilter', 'change', value => state.filters.poDelivery = value],
    ['poSortSelect', 'change', value => state.filters.poSort = value],
    ['productSearch', 'input', value => state.filters.productSearch = value],
    ['productSortSelect', 'change', value => state.filters.productSort = value],
    ['vendorSearch', 'input', value => state.filters.vendorSearch = value],
    ['vendorSortSelect', 'change', value => state.filters.vendorSort = value],
    ['metricProductSearch', 'input', value => state.filters.metricProductSearch = value],
    ['metricSortSelect', 'change', value => state.filters.metricSort = value],
    ['followupDateFilter', 'change', value => state.filters.followupDate = value],
    ['followupMaterialFilter', 'change', value => state.filters.followupMaterial = value],
    ['followupStatusFilter', 'change', value => state.filters.followupStatus = value]
  ];

  specs.forEach(([id, eventName, handler]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(eventName, event => {
      handler(event.target.value);
      renderAll();
    });
  });
}

function bindGlobalEvents() {
  document.getElementById('openAddPoBtn').addEventListener('click', () => openPoModal());
  document.getElementById('closePoModalBtn').addEventListener('click', closePoModal);
  document.getElementById('cancelPoBtn').addEventListener('click', closePoModal);
  document.getElementById('closeDetailModalBtn').addEventListener('click', closeDetailModal);
  document.getElementById('exportStateBtn').addEventListener('click', exportLocalState);
  document.getElementById('exportFullDataBtn').addEventListener('click', exportFullData);
  document.getElementById('importStateInput').addEventListener('change', importLocalState);
  document.getElementById('processQueueBtn')?.addEventListener('click', processIncomingQueue);

  document.getElementById('poModalBackdrop').addEventListener('click', event => {
    if (event.target.id === 'poModalBackdrop') closePoModal();
  });
  document.getElementById('detailModalBackdrop').addEventListener('click', event => {
    if (event.target.id === 'detailModalBackdrop') closeDetailModal();
  });
  document.getElementById('closeStatusTimelineModalBtn')?.addEventListener('click', closePoStatusTimeline);
  document.getElementById('statusTimelineBackdrop')?.addEventListener('click', event => {
    if (event.target.id === 'statusTimelineBackdrop') closePoStatusTimeline();
  });
  document.getElementById('closeCompleteFollowupModalBtn')?.addEventListener('click', closeCompleteFollowupModal);
  document.getElementById('cancelCompleteFollowupBtn')?.addEventListener('click', closeCompleteFollowupModal);
  document.getElementById('completeFollowupBackdrop')?.addEventListener('click', event => {
    if (event.target.id === 'completeFollowupBackdrop') closeCompleteFollowupModal();
  });
  document.getElementById('completeFollowupForm')?.addEventListener('submit', completeFollowup);
  document.getElementById('closeFollowupMailModalBtn')?.addEventListener('click', closeFollowupMailModal);
  document.getElementById('cancelFollowupMailBtn')?.addEventListener('click', closeFollowupMailModal);
  document.getElementById('followupMailBackdrop')?.addEventListener('click', event => {
    if (event.target.id === 'followupMailBackdrop') closeFollowupMailModal();
  });
  document.getElementById('followupMailForm')?.addEventListener('submit', queueFollowupMail);

  document.getElementById('addLineBtn').addEventListener('click', () => {
    document.getElementById('poLineItems').appendChild(createLineItemCard({ quantityOrdered: 1, itemTaxPercent: 18 }));
    refreshLineIndexes();
    recalcPoSummary();
  });

  document.getElementById('poLineItems').addEventListener('click', event => {
    const btn = event.target.closest('[data-line-remove]');
    if (!btn) return;
    const cards = document.querySelectorAll('.line-item-card');
    if (cards.length <= 1) {
      alert('At least one product line is required.');
      return;
    }
    btn.closest('.line-item-card')?.remove();
    refreshLineIndexes();
    recalcPoSummary();
  });

  document.getElementById('poLineItems').addEventListener('input', recalcPoSummary);
  document.getElementById('poLineItems').addEventListener('change', event => {
    if (event.target.matches('[name="lineType"]')) refreshLineIndexes();
    recalcPoSummary();
  });

  document.getElementById('summaryDiscountType')?.addEventListener('change', recalcPoSummary);
  document.getElementById('summaryDiscountInput')?.addEventListener('input', recalcPoSummary);
  document.getElementById('summaryDiscountInput')?.addEventListener('change', recalcPoSummary);
  document.getElementById('summaryAdjustmentInput')?.addEventListener('input', recalcPoSummary);
  document.getElementById('summaryAdjustmentInput')?.addEventListener('change', recalcPoSummary);
  document.getElementById('summaryAmountPaidInput')?.addEventListener('input', recalcPoSummary);
  document.getElementById('summaryAmountPaidInput')?.addEventListener('change', recalcPoSummary);

  document.getElementById('poForm').addEventListener('submit', event => {
    event.preventDefault();
    const existing = state.editingPoKey ? getDerivedAndGroupedPo(state.editingPoKey).po : null;
    const payload = collectPoFormPayload(existing);
    applyPoChanges(existing, payload);
  });

  document.getElementById('poList').addEventListener('click', handlePoAction);
  document.getElementById('recentPOs').addEventListener('click', handlePoAction);
  document.getElementById('detailModalContent').addEventListener('click', handlePoAction);
  document.getElementById('followupCardList')?.addEventListener('click', handlePoAction);

  document.getElementById('vendorForm').addEventListener('click', event => {
    const btn = event.target.closest('#deleteVendorBtn');
    if (btn) deleteSelectedVendor();
  });

  document.getElementById('openAddMetricVendorBtn').addEventListener('click', () => {
    if (!state.selectedMetricProduct) {
      alert('Select a product first.');
      return;
    }
    state.showMetricVendorForm = true;
    renderAll();
  });

  document.getElementById('metricEditor').addEventListener('click', event => {
    const btn = event.target.closest('[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'cancel-add-metric-vendor') {
      state.showMetricVendorForm = false;
      renderAll();
    }
  });

  document.getElementById('metricEditor').addEventListener('submit', event => {
    const form = event.target;
    if (form.id === 'metricAddForm') {
      saveMetricQuickAddForm(event);
      return;
    }
    if (form.matches('.metric-card')) {
      saveMetricForm(event);
    }
  });

  document.getElementById('productTableBody').addEventListener('click', event => {
    const row = event.target.closest('[data-product]');
    if (!row) return;
    state.activeTab = 'vendor-metrics';
    document.querySelectorAll('.tab').forEach(item => item.classList.toggle('active', item.dataset.tab === state.activeTab));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === state.activeTab));
    state.selectedMetricProduct = row.dataset.product;
    renderAll();
  });

  document.getElementById('vendorTableBody').addEventListener('click', event => {
    const row = event.target.closest('[data-vendor]');
    if (!row) return;
    state.selectedVendor = row.dataset.vendor;
    renderAll();
  });

  document.getElementById('metricProductTableBody').addEventListener('click', event => {
    const row = event.target.closest('[data-metric-product]');
    if (!row) return;
    state.selectedMetricProduct = row.dataset.metricProduct;
    renderAll();
  });

  document.getElementById('vendorForm').addEventListener('submit', saveVendorForm);
  document.getElementById('metricEditor').addEventListener('submit', event => {
    if (event.target.matches('form[data-metric-key]')) saveMetricForm(event);
  });
}

function handlePoAction(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  const poKey = button.dataset.po;
  if (!action) return;

  if (action === 'view-products') {
    openProductDetailModal(poKey);
    return;
  }
  if (action === 'edit-po' || action === 'edit-po-from-detail') {
    const { po } = getDerivedAndGroupedPo(poKey);
    if (po) {
      closeDetailModal();
      openPoModal(po);
    }
    return;
  }
  if (action === 'delete-po') {
    deletePurchaseOrder(poKey);
    return;
  }
  if (action === 'status-timeline') {
    openPoStatusTimeline(poKey);
    return;
  }
  if (action === 'complete-followup') {
    openCompleteFollowupModal(button.dataset.followup || '', poKey);
    return;
  }
  if (action === 'send-followup-mail') {
    openFollowupMailModal(button.dataset.followup || '', poKey);
    return;
  }
}

async function init() {
  bindTabs();
  bindFilters();
  bindGlobalEvents();
  if (useSupabase) {
    await refreshStateFromSupabase({ generateFollowups: true });
    return;
  }
  renderAll();
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
