const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { app } = require('./app-harness.cjs');
const output = path.join(__dirname, '..', 'qa', 'report-exports');
fs.mkdirSync(output, { recursive: true });

function unzipStored(buffer) {
  const result = new Map();
  let offset = 0;
  while (buffer.readUInt32LE(offset) === 0x04034b50) {
    assert.equal(buffer.readUInt16LE(offset + 8), 0);
    const size = buffer.readUInt32LE(offset + 18);
    const nameLength = buffer.readUInt16LE(offset + 26);
    const extraLength = buffer.readUInt16LE(offset + 28);
    const name = buffer.subarray(offset + 30, offset + 30 + nameLength).toString();
    const start = offset + 30 + nameLength + extraLength;
    result.set(name, buffer.subarray(start, start + size));
    offset = start + size;
  }
  return result;
}
async function capture(blob, filename) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(path.join(output, filename), buffer);
  return unzipStored(buffer);
}

function fixture() {
  const instance = app();
  instance.run(`baseRows = []; state.manualRows = [{
    id:'qa-line-1',poNumber:'QA-001',vendorName:'QA Vendor & Co',poDate:'2026-10-01',
    deliveryDate:'2026-10-10',deliveredDate:'2026-10-12',itemDesc:'Custom machined wheel',
    quantityOrdered:2,itemPrice:100,itemTotal:200,itemTaxPercent:18,itemTaxAmount:36,
    total:216,amountPaid:50,balanceDue:166,paymentStatus:'Partially Paid',poStatus:'Issued',deliveryStatus:'Delivered'
  },{
    id:'qa-line-2',poNumber:'QA-001',vendorName:'QA Vendor & Co',poDate:'2026-10-01',
    itemDesc:'Freight',lineType:'charge',quantityOrdered:1,itemPrice:20,itemTotal:20,
    total:216,amountPaid:50,balanceDue:166,paymentStatus:'Partially Paid',poStatus:'Issued',deliveryStatus:'Delivered'
  }];
  state.procurementAudit = normalizeProcurementAuditState({
    invoices:[{id:'invoice-paid',poNumber:'QA-001',invoiceNumber:'INV-PAID',invoiceAmount:50,invoiceDate:'2026-10-05'},
      {id:'invoice-unpaid',poNumber:'QA-001',invoiceNumber:'INV-UNPAID',invoiceAmount:166,invoiceDate:'2026-10-06'}],
    payments:[{id:'payment-1',poNumber:'QA-001',invoiceId:'invoice-paid',amount:50,paymentDate:'2026-10-05',paymentReference:'REF-1'}],
    receipts:[{id:'receipt-1',poNumber:'QA-001',lineId:'qa-line-1',receivedQuantity:2,grnNumber:'GRN-1',grnDate:'2026-10-12'}],
    documents:[{id:'document-1',poNumber:'QA-001',documentType:'Test Certificate',status:'Requested',comments:'QA-only evidence'}]
  });`);
  return instance;
}

test('procurement export totals PO amounts once, separates lines, dates and tax', async () => {
  const { run } = fixture();
  const sheets = JSON.parse(run('JSON.stringify(procurementWorkbookSheets(buildProcurementReportRows()))'));
  assert.equal(sheets.length, 5);
  assert.equal(sheets.find(s => s.name === 'PO Summary').rows.length, 2);
  const metrics = sheets[0].rows.slice(1).map(row => row[1].value);
  assert.deepEqual(metrics, [1, 2, 216, 50, 166]);
  assert.ok(!sheets.find(s => s.name === 'Line Items').rows[0].some(cell => cell.value === 'Balance Due'));
  const files = await capture(run('buildProcurementReportWorkbook(buildProcurementReportRows())'), 'procurement.xlsx');
  assert.match(files.get('xl/workbook.xml').toString(), /name="Delivered Date"|name="PO Summary"/);
  assert.match(files.get('xl/worksheets/sheet2.xml').toString(), /s="10"><v>\d+<\/v>/);
  const styles = files.get('xl/styles.xml').toString();
  assert.match(styles, /0\.00&quot;%&quot;/);
  assert.doesNotMatch(styles, /formatCode="0\.00%"/);
});

test('mechanical workbook includes all nine analysis tabs plus export notes', async () => {
  const { run } = fixture();
  const files = await capture(run('buildMechanicalAnalysisWorkbook()'), 'mechanical.xlsx');
  const workbook = files.get('xl/workbook.xml').toString();
  assert.equal((workbook.match(/<sheet /g) || []).length, 10);
  for (const name of ['Dashboard', 'Cleaned Lines', 'Vendor Summary', 'Opportunities', 'Cleaning Notes', 'Export Info']) assert.ok(workbook.includes(`name="${name}"`));
  assert.match(files.get('xl/worksheets/sheet2.xml').toString(), /s="9"><v>/);
});

test('audit export retains every workspace tab, unpaid invoices and formula caches', async () => {
  const { run } = fixture();
  const files = await capture(run('buildSourcingAuditWorkbook()'), 'audit.xlsx');
  const workbook = files.get('xl/workbook.xml').toString();
  assert.equal((workbook.match(/<sheet /g) || []).length, 14);
  const names = [...workbook.matchAll(/<sheet name="([^"]+)"/g)].map(match => match[1]);
  for (const name of ['Invoices', 'Payments', 'Receipts', 'Money Spent Audit', 'Missing Documents', 'How to Fill']) assert.ok(names.includes(name));
  const stringsXml = files.get('xl/sharedStrings.xml').toString();
  const strings = [...stringsXml.matchAll(/<si><t[^>]*>([\s\S]*?)<\/t><\/si>/g)].map(m => m[1]);
  const money = files.get(`xl/worksheets/sheet${names.indexOf('Money Spent Audit') + 1}.xml`).toString();
  assert.ok(money.includes(`<v>${strings.indexOf('INV-UNPAID')}</v>`));
  assert.ok(money.includes(`<v>${strings.indexOf('INV-PAID')}</v>`));
  const lineAudit = files.get(`xl/worksheets/sheet${names.indexOf('Line Item Audit') + 1}.xml`).toString();
  assert.match(lineAudit, /<f>D2\*E2<\/f><v>200<\/v>/);
  assert.match(lineAudit, /<dataValidations/);
});

test('every workbook exports valid header-only sheets for empty data', async () => {
  const { run } = app();
  run('baseRows=[]; state.manualRows=[]; state.vendorContacts={}; state.productVendorMetrics={};');
  for (const [kind, expression, count] of [
    ['procurement','buildProcurementReportWorkbook([])',5],
    ['mechanical','buildMechanicalAnalysisWorkbook()',10],
    ['audit','buildSourcingAuditWorkbook()',14],
  ]) {
    const files = await capture(run(expression), `empty-${kind}.xlsx`);
    assert.equal((files.get('xl/workbook.xml').toString().match(/<sheet /g) || []).length, count);
  }
});

test('CSV preserves Unicode, quoting and line breaks and protects formula-like text', async () => {
  const { run } = fixture();
  assert.equal(run(`csvField('=HYPERLINK("bad")')`), '"\'=HYPERLINK(""bad"")"');
  assert.equal(run(`csvField(-12.5)`), '"-12.5"');
  assert.equal(run(`csvField('മലയാളം, "QA"\\nnext')`), '"മലയാളം, ""QA""\nnext"');
  for (const kind of ['procurement','mechanical','audit']) {
    const result = run(`buildReportCsv('${kind}')`);
    const buffer = Buffer.from(await result.blob.arrayBuffer());
    assert.equal(buffer.subarray(0, 3).toString('hex'), 'efbbbf');
    fs.writeFileSync(path.join(output, `${kind}.csv`), buffer);
  }
});

test('every preview tab has a CSV export, with matching columns', async () => {
  const { run } = fixture();
  for (const [kind, stateKey, tabs] of [
    ['procurement', 'procurementReportTab', JSON.parse(run('JSON.stringify(procurementWorkbookSheets(buildProcurementReportRows()).map(sheet => sheet.name))'))],
    ['mechanical', 'mechanicalAnalysisTab', JSON.parse(run('JSON.stringify(MECHANICAL_ANALYSIS_TABS)'))],
    ['audit', 'procurementAuditTab', JSON.parse(run('JSON.stringify(PROCUREMENT_AUDIT_TABS)'))],
  ]) {
    for (const name of tabs) {
      run(`state.${stateKey} = ${JSON.stringify(name)};`);
      const result = run(`buildReportCsv('${kind}')`);
      assert.equal(result.name, name);
      assert.ok((await result.blob.text()).split('\r\n')[0].length > 4);
    }
  }
});

test('ZIP bundle contains three binary Excel workbooks', async () => {
  const { run, context } = fixture();
  const captured = [];
  context.captureDownload = (blob, filename) => captured.push({ blob, filename });
  run('downloadReportBlob = captureDownload;');
  await run(`runReportExport('all')`);
  assert.equal(captured.length, 1);
  assert.match(captured[0].filename, /\.zip$/);
  const files = await capture(captured[0].blob, 'all-reports.zip');
  assert.equal(files.size, 3);
  for (const bytes of files.values()) assert.equal(unzipStored(bytes).has('xl/workbook.xml'), true);
});

test('download failures restore controls and report a retryable error', async () => {
  const { run, elements } = fixture();
  run(`REPORT_EXPORTS.procurement.build = () => { throw new Error('QA failure'); };`);
  await run(`runReportExport('procurement')`);
  assert.match(elements.get('reportExportStatus').textContent, /Export failed: QA failure/);
  assert.equal(run('reportExportBusy'), false);
});

test('exports wait for backend load instead of exporting the initial seed dataset', async () => {
  const { run, elements } = fixture();
  run('reportDataLoading = true; downloadReportBlob = () => { throw new Error("Must not download"); };');
  await run(`runReportExport('all')`);
  assert.match(elements.get('reportExportStatus').textContent, /still loading/);
  assert.equal(run('reportExportBusy'), false);
});

if (process.env.PROCUREMENT_QA_SNAPSHOT) {
  test('all workbooks export the full downloaded live snapshot', async () => {
    const { run } = app();
    const snapshot = JSON.parse(fs.readFileSync(process.env.PROCUREMENT_QA_SNAPSHOT, 'utf8'));
    run(`baseRows = ${JSON.stringify(snapshot.mergedView.rows)}; state.manualRows=[]; state.rowOverrides={};
      state.vendorContacts = ${JSON.stringify(snapshot.localState.vendorContacts)};
      state.procurementAudit = normalizeProcurementAuditState(${JSON.stringify(snapshot.localState.procurementAudit)});`);
    const sheets = JSON.parse(run('JSON.stringify(procurementWorkbookSheets(buildProcurementReportRows()))'));
    assert.equal(sheets[1].rows.length - 1, snapshot.mergedView.derived.pos.length);
    assert.equal(sheets[2].rows.length - 1, snapshot.mergedView.rows.length);
    for (const [kind, expr] of [['procurement', 'buildProcurementReportWorkbook(buildProcurementReportRows())'], ['mechanical','buildMechanicalAnalysisWorkbook()'], ['audit','buildSourcingAuditWorkbook()']]) {
      await capture(run(expr), `live-${kind}.xlsx`);
    }
  });
}
