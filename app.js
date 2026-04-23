
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

const state = {
  manualRows: loadJson(STORAGE_KEYS.manualRows, []),
  rowOverrides: loadJson(STORAGE_KEYS.rowOverrides, {}),
  vendorContacts: mergeVendorSeeds(loadJson(STORAGE_KEYS.vendorContacts, {})),
  productVendorMetrics: loadJson(STORAGE_KEYS.productVendorMetrics, {}),
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
    metricSort: 'vendorCount-desc'
  }
};

const snsConfig = window.SNS_CONFIG || {};
const useSupabase = Boolean(snsConfig.useSupabase && snsConfig.supabaseUrl && snsConfig.supabaseAnonKey && window.supabase?.createClient);
const supabaseClient = useSupabase ? window.supabase.createClient(snsConfig.supabaseUrl, snsConfig.supabaseAnonKey) : null;
let remoteSyncTimer = null;
let remoteSyncInFlight = false;

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
  const total = roundMoney(poTotal);
  const paidInput = Math.max(0, roundMoney(amountPaidInput));
  const hasExplicitBalance = explicitBalanceDue !== null && explicitBalanceDue !== undefined && explicitBalanceDue !== '';
  const balanceDue = hasExplicitBalance
    ? Math.max(0, roundMoney(explicitBalanceDue))
    : Math.max(0, roundMoney(total - Math.min(total, paidInput)));
  const amountPaid = Math.max(0, roundMoney(total - balanceDue));
  let paymentStatus = 'Pending';
  if (total <= 0 || amountPaid >= total) paymentStatus = 'Paid';
  else if (amountPaid > 0) paymentStatus = 'Partially Paid';
  return { amountPaid, balanceDue, paymentStatus };
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

  const [vendorsRes, poRes, linesRes, metricsRes] = await Promise.all([
    supabaseClient.from('vendors').select('*').order('vendor_name'),
    supabaseClient.from('purchase_orders').select('*').order('po_date', { ascending: false }),
    supabaseClient.from('po_lines').select('*').order('po_date', { ascending: false }),
    supabaseClient.from('product_vendor_metrics').select('*').order('product_name')
  ]);

  const errors = [vendorsRes.error, poRes.error, linesRes.error, metricsRes.error].filter(Boolean);
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
      reference_no: ''
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

    // delete removed metrics / lines / pos
    const [existingMetricsRes, existingLinesRes, existingPOsRes] = await Promise.all([
      supabaseClient.from('product_vendor_metrics').select('metric_key'),
      supabaseClient.from('po_lines').select('line_id'),
      supabaseClient.from('purchase_orders').select('po_number')
    ]);
    if (existingMetricsRes.error) throw existingMetricsRes.error;
    if (existingLinesRes.error) throw existingLinesRes.error;
    if (existingPOsRes.error) throw existingPOsRes.error;

    const currentMetricKeys = new Set(metricsPayload.map(x => x.metric_key));
    const removeMetricKeys = (existingMetricsRes.data || []).map(x => x.metric_key).filter(k => !currentMetricKeys.has(k));
    if (removeMetricKeys.length) {
      const { error } = await supabaseClient.from('product_vendor_metrics').delete().in('metric_key', removeMetricKeys);
      if (error) throw error;
    }

    const currentLineIds = new Set(linePayload.map(x => x.line_id));
    const removeLineIds = (existingLinesRes.data || []).map(x => x.line_id).filter(k => !currentLineIds.has(k));
    if (removeLineIds.length) {
      const { error } = await supabaseClient.from('po_lines').delete().in('line_id', removeLineIds);
      if (error) throw error;
    }

    const currentPONumbers = new Set(poPayload.map(x => x.po_number));
    const removePONumbers = (existingPOsRes.data || []).map(x => x.po_number).filter(k => !currentPONumbers.has(k));
    if (removePONumbers.length) {
      const { error } = await supabaseClient.from('purchase_orders').delete().in('po_number', removePONumbers);
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

    if (metricsPayload.length) {
      const { error } = await supabaseClient.from('product_vendor_metrics').upsert(metricsPayload, { onConflict: 'metric_key' });
      if (error) throw error;
    }
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
  if (raw.includes('BILL')) return 'Billed';
  if (raw.includes('ISSU')) return 'Issued';
  if (raw.includes('CLOSE')) return 'Closed';
  return cleanText(value) || 'Unknown';
}

function normalizeDeliveryStatus(value) {
  const raw = normalizeKey(value);
  if (!raw) return 'Unknown';
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanText(value))) return 'Unknown';
  if (raw.includes('PART')) return 'Partially Delivered';
  if (raw.includes('TRANSIT')) return 'In Transit';
  if (raw.includes('DELAY')) return 'Delayed';
  if (['YES', 'Y', 'DELIVERED', 'RECEIVED', 'DONE', 'COMPLETE', 'COMPLETED'].includes(raw)) return 'Delivered';
  if (['NO', 'N', 'PENDING', 'OPEN', 'NOTDELIVERED', 'NOTRECEIVED'].includes(raw) || raw.includes('NOT DELIVER')) return 'Not Delivered';
  return 'Unknown';
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
    poNumber: cleanText(row.poNumber) || cleanText(row.id),
    vendorName: cleanText(row.vendorName) || 'Unknown Vendor',
    source: cleanText(row.source),
    gstin: cleanText(row.gstin),
    terms: String(row.terms ?? ''),
    itemDesc: cleanText(row.itemDesc) || 'Unnamed Item',
    quantityOrdered: number(row.quantityOrdered),
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
        prices: []
      });
    }
    const group = map.get(key);
    group.quantityOrdered += number(item.quantityOrdered);
    group.itemTotal += number(item.itemTotal);
    group.itemTaxAmount += number(item.itemTaxAmount);
    group.lineGrandTotal += number(item.lineGrandTotal);
    group.lines.push(item);
    if (number(item.itemPrice) > 0) group.prices.push(number(item.itemPrice));
  });

  return Array.from(map.values()).map(group => {
    const uniquePrices = [...new Set(group.prices.filter(Boolean))];
    const minPrice = uniquePrices.length ? Math.min(...uniquePrices) : 0;
    const maxPrice = uniquePrices.length ? Math.max(...uniquePrices) : 0;
    const avgPrice = group.quantityOrdered > 0 ? (group.itemTotal / group.quantityOrdered) : 0;
    return {
      ...group,
      lineCount: group.lines.length,
      minPrice,
      maxPrice,
      avgPrice,
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
    const providedAmountPaid = [...new Set(items.map(item => Math.max(0, number(item.amountPaid))).filter(value => value > 0))];
    const providedBalanceDue = [...new Set(items.map(item => number(item.balanceDue)).filter(value => value >= 0))];
    const discountAmount = providedDiscounts.length ? providedDiscounts[0] : 0;
    const discountType = providedDiscountTypes.length ? providedDiscountTypes[0] : 'amount';
    const discountInputValue = providedDiscountInputs.length ? providedDiscountInputs[0] : discountAmount;
    const adjustmentAmount = providedAdjustments.length ? providedAdjustments[0] : 0;
    const taxableSubtotal = roundMoney(itemSubtotal - discountAmount);
    const poTotal = providedTotals.length === 1 ? providedTotals[0] : Math.max(0, taxableSubtotal + taxTotal + adjustmentAmount);
    const paymentDerived = derivePaymentState(poTotal, providedAmountPaid.length ? providedAmountPaid[0] : 0, providedBalanceDue.length ? providedBalanceDue[0] : null);
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
    const ranks = { UNKNOWN: 0, 'NOT DELIVERED': 1, 'IN TRANSIT': 2, 'PARTIALLY DELIVERED': 3, DELIVERED: 4, DELAYED: 5, MIXED: 6 };
    return ranks[cleanText(value).toUpperCase()] ?? ranks[raw] ?? 99;
  }
  return null;
}

function sortData(items, sortValue) {
  const [key, dir] = String(sortValue || '').split('-');
  const direction = dir === 'asc' ? 1 : -1;
  return items.slice().sort((a, b) => {
    let av = a[key];
    let bv = b[key];
    const statusA = statusSortValue(key, av);
    const statusB = statusSortValue(key, bv);

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
  const openPaymentValue = pos.reduce((sum, po) => sum + Math.max(0, number(po.balanceDue)), 0);
  const deliveredCount = pos.filter(po => po.deliveryStatus === 'Delivered').length;
  const partialPaymentCount = pos.filter(po => po.paymentStatus === 'Partially Paid').length;
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

function renderStatusMix(pos, mountId, field) {
  const counts = pos.reduce((acc, po) => {
    const key = po[field] || 'Unknown';
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

function renderPurchaseOrders({ pos }) {
  const vendors = ['all', ...new Set(pos.map(po => po.vendorName).filter(Boolean))].sort();
  const paymentStatuses = ['all', ...new Set(pos.map(po => po.paymentStatus).filter(Boolean))];
  const poStatuses = ['all', ...new Set(pos.map(po => po.poStatus).filter(Boolean))];
  const deliveryStatuses = ['all', ...new Set(pos.map(po => po.deliveryStatus).filter(Boolean))];

  setSelectOptions('poVendorFilter', vendors.map(v => v === 'all' ? { value: 'all', label: 'All Vendors' } : { value: v, label: v }), state.filters.poVendor);
  setSelectOptions('poPaymentFilter', paymentStatuses.map(v => v === 'all' ? { value: 'all', label: 'All Payments' } : { value: v, label: v }), state.filters.poPayment);
  setSelectOptions('poStatusFilter', poStatuses.map(v => v === 'all' ? { value: 'all', label: 'All PO Status' } : { value: v, label: v }), state.filters.poStatus);
  setSelectOptions('poDeliveryFilter', deliveryStatuses.map(v => v === 'all' ? { value: 'all', label: 'All Delivery' } : { value: v, label: v }), state.filters.poDelivery);
  setSelectOptions('poSortSelect', PO_SORTS, state.filters.poSort);

  let filtered = pos.filter(po => {
    const search = state.filters.poSearch.toLowerCase();
    if (search && !po.searchBlob.includes(search)) return false;
    if (state.filters.poVendor !== 'all' && po.vendorName !== state.filters.poVendor) return false;
    if (state.filters.poPayment !== 'all' && po.paymentStatus !== state.filters.poPayment) return false;
    if (state.filters.poStatus !== 'all' && po.poStatus !== state.filters.poStatus) return false;
    if (state.filters.poDelivery !== 'all' && po.deliveryStatus !== state.filters.poDelivery) return false;
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
      </div>
      <div class="metric-block">
        <div class="metric-label">Products</div>
        <button class="text-link" data-action="view-products" data-po="${escapeHtml(po.poKey)}">${po.productCount || po.itemCount} product${(po.productCount || po.itemCount) === 1 ? "" : "s"}</button>
      </div>
      <div class="metric-block">
        <div class="metric-label">PO Total</div>
        <div class="metric-value total-value">${money(po.poTotal)}</div>
      </div>
      <div class="metric-block">
        <div class="metric-label">Payment</div>
        <div class="badge ${badgeClass(po.paymentStatus)}">${escapeHtml(po.paymentStatus)}</div>
      </div>
      <div class="metric-block">
        <div class="metric-label">PO Status</div>
        <div class="badge ${badgeClass(po.poStatus)}">${escapeHtml(po.poStatus)}</div>
      </div>
      <div class="metric-block">
        <div class="metric-label">Delivery</div>
        <div class="badge ${badgeClass(po.deliveryStatus)}">${escapeHtml(po.deliveryStatus)}</div>
        <div class="small-text">${formatDate(po.deliveryDate)}</div>
      </div>
      <div class="action-stack">
        <button class="ghost-btn small-btn" data-action="view-products" data-po="${escapeHtml(po.poKey)}">Products</button>
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
        <input class="control-input" type="number" min="0" step="1" name="quantityOrdered" value="${escapeHtml(values.quantityOrdered ?? 1)}" required />
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
    form.elements.deliveryStatus.value = ['Unknown', 'Not Delivered', 'In Transit', 'Partially Delivered', 'Delivered', 'Delayed'].includes(po.deliveryStatus) ? po.deliveryStatus : 'Unknown';
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
    linesMount.appendChild(createLineItemCard({ quantityOrdered: 1, itemTaxPercent: 18 }));
  }
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
    itemPrice: number(card.querySelector('[name="itemPrice"]')?.value),
    itemTaxPercent: number(card.querySelector('[name="itemTaxPercent"]')?.value)
  }));
  const { discountType, discountInputValue, adjustmentAmount } = getDiscountStateFromInputs();
  const breakdown = calculatePoBreakdown(lines, discountType, discountInputValue, adjustmentAmount);
  const amountPaidInputEl = document.getElementById('summaryAmountPaidInput');
  const paymentState = derivePaymentState(breakdown.grandTotal, number(amountPaidInputEl?.value));

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
  const { discountType, discountInputValue, adjustmentAmount } = getDiscountStateFromInputs();
  const amountPaidInput = number(document.getElementById('summaryAmountPaidInput')?.value);
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
  const paymentStatus = paymentState.paymentStatus;
  const originalItems = existingPo?.items || [];
  const usedBaseIds = new Set();
  const updatedRows = breakdown.lines.map((line, index) => {
    const base = originalItems[index];
    if (base?.id) usedBaseIds.add(base.id);
    return {
      id: base?.id || uid('manual'),
      poDate,
      deliveryDate,
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

  return { updatedRows, removedRows, vendorName, source, gstin };
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
      <div class="detail-card"><div class="k">Payment</div><div class="v"><span class="badge ${badgeClass(po.paymentStatus)}">${escapeHtml(po.paymentStatus)}</span></div></div>
      <div class="detail-card"><div class="k">Delivery</div><div class="v"><span class="badge ${badgeClass(po.deliveryStatus)}">${escapeHtml(po.deliveryStatus)}</span> <span class="small-text">${formatDate(po.deliveryDate)}</span></div></div>
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
              <span>Total Qty ${formatNumber(item.quantityOrdered)}</span>
              <span>Rate ${item.displayPrice}</span>
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
                      <span>Qty ${formatNumber(line.quantityOrdered)}</span>
                      <span>Unit ${money(line.itemPrice)}</span>
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
              <span>Qty ${formatNumber(item.quantityOrdered)}</span>
              <span>Rate ${item.displayPrice}</span>
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

      if (isDbImportPayload(payload)) {
        const imported = convertDbImportPayloadToLocalRows(payload);
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
              alert(`DB JSON imported and synced: ${state.manualRows.length} lines across ${payload.purchase_orders.length} purchase orders.`);
            })
            .catch(err => {
              console.error('Import sync failed', err);
              alert(`DB JSON imported locally, but Supabase sync failed: ${err.message || err}`);
            });
        } else {
          alert(`DB JSON imported: ${state.manualRows.length} lines across ${payload.purchase_orders.length} purchase orders.`);
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
    ['metricSortSelect', 'change', value => state.filters.metricSort = value]
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

  document.getElementById('poModalBackdrop').addEventListener('click', event => {
    if (event.target.id === 'poModalBackdrop') closePoModal();
  });
  document.getElementById('detailModalBackdrop').addEventListener('click', event => {
    if (event.target.id === 'detailModalBackdrop') closeDetailModal();
  });

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
  }
}

async function init() {
  bindTabs();
  bindFilters();
  bindGlobalEvents();
  if (useSupabase) {
    await loadRemoteStateFromSupabase();
  }
  renderAll();
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
