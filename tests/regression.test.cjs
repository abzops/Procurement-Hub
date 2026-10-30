const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
function app() {
  const elements = new Map();
  const context = vm.createContext({
    window: { addEventListener() {} },
    localStorage: { getItem() { return null; } },
    document: { getElementById(id) {
      if (!elements.has(id)) elements.set(id, { innerHTML: '', classList: { toggle() {} } });
      return elements.get(id);
    } },
    console, Intl, Date, Set, Map, Blob, TextEncoder, Uint8Array, DataView,
    setTimeout, clearTimeout,
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'report-export.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), context);
  return { run: code => vm.runInContext(code, context), elements };
}

test('periods use calendar boundaries including Monday and year rollover', () => {
  const { run } = app();
  assert.equal(run(`matchesPoPeriod({poDate:'2026-10-01'}, 'month', new Date(2026,9,30))`), true);
  assert.equal(run(`matchesPoPeriod({poDate:'2026-09-30'}, 'month', new Date(2026,9,30))`), false);
  assert.equal(run(`matchesPoPeriod({poDate:'2027-01-01'}, 'month', new Date(2026,11,31))`), false);
  assert.equal(run(`matchesPoPeriod({poDate:'2026-12-31'}, 'month', new Date(2026,11,31))`), true);
  assert.equal(run(`matchesPoPeriod({poDate:'2026-10-26'}, 'week', new Date(2026,10,1))`), true);
  assert.equal(run(`matchesPoPeriod({poDate:'2026-11-02'}, 'week', new Date(2026,10,1))`), false);
  assert.equal(run(`matchesPoPeriod({poDate:'2026-10-30'}, 'today', new Date(2026,9,30))`), true);
  assert.equal(run(`matchesPoPeriod({poDate:'2026-10-29'}, 'today', new Date(2026,9,30))`), false);
  assert.equal(run(`matchesPoPeriod({poDate:''}, 'today')`), false);
  assert.equal(run(`matchesPoPeriod({poDate:''}, 'all')`), true);
});

test('on-time rate measures actual deliveries and excludes missing dates and open orders', () => {
  const { run } = app();
  assert.equal(run(`onTimeDeliveryRate([
    {deliveryStatus:'Delivered', deliveryDate:'2026-03-10', deliveredDate:'2026-03-10'},
    {deliveryStatus:'Delivered', deliveryDate:'2026-03-10', deliveredDate:'2026-03-12'},
    {deliveryStatus:'Delivered', deliveryDate:'2026-03-10'},
    {deliveryStatus:'In Transit', deliveryDate:'2026-03-10', deliveredDate:'2026-03-09'}
  ])`), 50);
  assert.equal(run('onTimeDeliveryRate([])'), null);
});

test('vendor chart reconciles final PO totals instead of gross line amounts', () => {
  const { run } = app();
  assert.equal(run(`vendorPoTotals([
    {vendorName:'A',poTotal:90}, {vendorName:'A',poTotal:20}, {vendorName:'B',poTotal:50}
  ]).reduce((sum, vendor) => sum + vendor.totalSpend, 0)`), 160);
  assert.equal(run(`vendorPoTotals([{vendorName:'A',poTotal:90},{vendorName:'A',poTotal:20}])[0].totalSpend`), 110);
});

test('finished POs suppress stale tasks while completion history and orphan tasks remain', () => {
  const { run } = app();
  run(`state.filters.followupDate = '2026-10-30'; state.followups = [
    {id:'stale',po_number:'done',status:'Pending',due_date:'2026-03-01'},
    {id:'closed',po_number:'closed',status:'Pending',due_date:'2026-03-01'},
    {id:'cancelled',po_number:'cancelled',status:'Pending',due_date:'2026-03-01'},
    {id:'history',po_number:'history',status:'Completed',due_date:'2026-03-01',completed_at:'2026-10-30'},
    {id:'orphan',po_number:'missing',status:'Pending',due_date:'2026-03-01'}
  ];`);
  const ids = run(`buildFollowupCards([
    {poNumber:'done',deliveryStatus:'Delivered'},
    {poNumber:'closed',poStatus:'Closed'},
    {poNumber:'cancelled',poStatus:'Cancelled'},
    {poNumber:'history',deliveryStatus:'Delivered'}
  ]).map(card => card.id).sort().join(',')`);
  assert.equal(ids, 'history,orphan');
  assert.equal(run(`getCurrentFollowupForPo({poStatus:'Closed',poDate:'2026-01-01',deliveryDate:'2026-02-01'})`), null);
});

test('report headline uses PO totals while retaining gross line detail', () => {
  const { run, elements } = app();
  run(`buildProcurementReportRows = () => [{poNumber:'PO-1',lineTotal:120}];
    buildMechanicalAnalysis = () => ({summary:{mechanicalLanded:0,lineCount:0,mechanicalSpendPercent:0}});
    renderMechanicalAnalysis = () => {}; renderProcurementAuditWorkspace = () => {};
    renderReports({pos:[{poNumber:'PO-1',poTotal:100}]});`);
  assert.match(elements.get('reportKpiGrid').innerHTML, /1 POs · ₹100\.00/);
  assert.doesNotMatch(elements.get('reportKpiGrid').innerHTML, /₹120\.00/);
});

if (process.env.PROCUREMENT_QA_SNAPSHOT) {
  test('read-only live snapshot reconciles vendor totals and delivery performance', () => {
    const { run } = app();
    const snapshot = JSON.parse(fs.readFileSync(process.env.PROCUREMENT_QA_SNAPSHOT, 'utf8'));
    run(`globalThis.snapshotPos = ${JSON.stringify(snapshot.mergedView.derived.pos)};`);
    const totals = run(`JSON.stringify({
      count: snapshotPos.length,
      poValue: getPaymentTotals(snapshotPos).totalValue,
      vendorValue: vendorPoTotals(snapshotPos).reduce((sum,v) => sum+v.totalSpend,0),
      datedDeliveries: snapshotPos.filter(po => po.deliveryStatus === 'Delivered' && parseDateOnly(po.deliveryDate) && parseDateOnly(po.deliveredDate)).length,
      onTimeRate: onTimeDeliveryRate(snapshotPos)
    })`);
    const result = JSON.parse(totals);
    assert.ok(result.count > 0);
    assert.ok(Math.abs(result.poValue - result.vendorValue) < 0.01);
    assert.ok(result.datedDeliveries > 0);
    console.log('Live snapshot checks:', result);
  });
}
