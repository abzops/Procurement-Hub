// Browser-native report downloads. No data is uploaded to generate an export.
const REPORT_EXPORTS = {
  procurement: { title: "Procurement Report", file: "procurement-report", build: () => buildProcurementReportWorkbook(buildProcurementReportRows(buildDerived())) },
  mechanical: { title: "Mechanical Analysis", file: "mechanical-procurement-analysis", build: () => buildMechanicalAnalysisWorkbook() },
  audit: { title: "Procurement Audit", file: "procurement-audit-workbook", build: () => buildSourcingAuditWorkbook() },
};
let reportExportBusy = false;
let reportDataLoading = false;

function reportCell(value = "", type = "text") {
  return { value, type, style: type === "money" ? 3 : type === "number" ? 4 : type === "percent" ? 9 : type === "date" ? 10 : 2 };
}

function reportSheet(name, columns, records) {
  return {
    name, widths: columns.map(column => column.width || 22),
    rows: [columns.map(column => ({ value: column.label, style: 1 })),
      ...records.map(row => columns.map(column => reportCell(row[column.key], column.type)))],
  };
}

function reportExportInfo(title, notes = []) {
  return reportSheet("Export Info", [
    { key: "label", label: "Report information", width: 30 },
    { key: "value", label: "Details", width: 95 },
  ], [
    { label: "Report", value: title },
    { label: "Generated", value: new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeStyle: "short" }).format(new Date()) },
    { label: "Scope", value: "All currently loaded purchase orders and saved audit records. PO workspace filters do not limit exports." },
    { label: "Currency", value: "INR. Amounts are rounded to two decimal places." },
    { label: "Missing data", value: "Empty cells mean not captured. No invoices, receipts, payment evidence or vendor assessments are invented." },
    ...notes.map(value => ({ label: "Reading this report", value })),
  ]);
}

function reportDateSerial(value) {
  const date = parseDateOnly(value);
  return date ? (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1899, 11, 30)) / 86400000 : null;
}

function reportStylesXml() {
  const xf = (numFmtId, fontId = 0, fillId = 0, align = 'vertical="top" wrapText="1"') =>
    `<xf numFmtId="${numFmtId}" fontId="${fontId}" fillId="${fillId}" borderId="0" xfId="0" applyFont="1" applyFill="1" applyNumberFormat="1" applyAlignment="1"><alignment ${align}/></xf>`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
    <numFmts count="4"><numFmt numFmtId="164" formatCode="&quot;INR &quot;#,##0.00;[Red](&quot;INR &quot;#,##0.00)"/><numFmt numFmtId="165" formatCode="#,##0.##"/><numFmt numFmtId="166" formatCode="0.00&quot;%&quot;"/><numFmt numFmtId="167" formatCode="dd mmm yyyy"/></numFmts>
    <fonts count="3"><font><sz val="11"/><color rgb="FF17201A"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFE500"/><name val="Calibri"/></font><font><b/><sz val="16"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts>
    <fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF142017"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F2"/><bgColor indexed="64"/></patternFill></fill></fills>
    <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
    <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
    <cellXfs count="11">${[
      xf(0), xf(0, 1, 2, 'vertical="center" wrapText="1"'), xf(0), xf(164), xf(0),
      xf(0, 2, 2), xf(0, 0, 3), xf(0, 1, 2), xf(0), xf(166), xf(167),
    ].join("")}</cellXfs>
    <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
  </styleSheet>`;
}

function buildReportWorkbook(sheets, title) {
  const sharedStrings = { items: [], map: new Map() };
  const worksheetXml = (spec) => {
    const colCount = spec.widths.length;
    const lastCol = xlsxColumnName(colCount - 1);
    const lastRow = Math.max(1, spec.rows.length);
    const instructional = spec.name === "How to Fill";
    const dateColumns = new Set((spec.rows[0] || []).map((cell, index) => /date$/i.test(String(cell.value)) ? index : -1));
    const rows = spec.rows.map((row, index) => {
      const cells = Array.from({ length: colCount }, (_, col) => {
        const cell = { ...(row[col] || reportCell("")) };
        if (index === 0 && !instructional) cell.style = 1;
        if (index > 0 && (cell.type === "date" || dateColumns.has(col)) && cell.value) {
          const serial = reportDateSerial(cell.value);
          if (serial !== null) { cell.value = serial; cell.type = "number"; cell.style = 10; }
        }
        return cell;
      });
      const height = index === 0 ? 34 : instructional ? 60 : Math.min(180, Math.max(32, ...cells.map((cell, col) => {
        if (cell.type === "formula" || cell.type === "number" || cell.type === "money") return 32;
        const text = String(cell.value ?? "");
        const lines = text.split("\n").reduce((count, line) => count + Math.max(1, Math.ceil(line.length / Math.max(8, spec.widths[col] - 3))), 0);
        return lines * 15 + 8;
      })));
      return xlsxRow(index + 1, cells, 0, sharedStrings).replace('<row ', height ? `<row ht="${height}" customHeight="1" ` : '<row ');
    }).join("");
    const validations = spec.validations || [];
    const merges = spec.merges || [];
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
      <dimension ref="A1:${lastCol}${lastRow}"/>
      <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
      <sheetFormatPr defaultRowHeight="32"/>
      <cols>${spec.widths.map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`).join("")}</cols>
      <sheetData>${rows}</sheetData>
      ${!instructional && lastRow > 1 ? `<autoFilter ref="A1:${lastCol}${lastRow}"/>` : ""}
      ${merges.length ? `<mergeCells count="${merges.length}">${merges.map(ref => `<mergeCell ref="${xmlEscape(ref)}"/>`).join("")}</mergeCells>` : ""}
      ${validations.length ? `<dataValidations count="${validations.length}">${validations.map(([ref, formula]) => `<dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="${xmlEscape(ref)}"><formula1>${xmlEscape(formula)}</formula1></dataValidation>`).join("")}</dataValidations>` : ""}
      <printOptions horizontalCentered="1"/>
      <pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.2" footer="0.2"/>
      <pageSetup paperSize="9" orientation="landscape"/>
    </worksheet>`;
  };
  const sheetFiles = sheets.map((sheet, index) => ({ name: `xl/worksheets/sheet${index + 1}.xml`, content: worksheetXml(sheet) }));
  const xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  const relationship = (id, type, target) => `<Relationship Id="rId${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/${type}" Target="${target}"/>`;
  return createZipBlob([
    { name: "[Content_Types].xml", content: `${xml}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
    { name: "_rels/.rels", content: `${xml}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relationship(1, "officeDocument", "xl/workbook.xml")}</Relationships>` },
    { name: "xl/workbook.xml", content: `${xml}<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, i) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets><definedNames>${sheets.map((sheet, i) => `<definedName name="_xlnm.Print_Titles" localSheetId="${i}">'${xmlEscape(sheet.name.replace(/'/g, "''"))}'!$1:$1</definedName>`).join("")}</definedNames><calcPr fullCalcOnLoad="1"/></workbook>` },
    { name: "xl/_rels/workbook.xml.rels", content: `${xml}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => relationship(i + 1, "worksheet", `worksheets/sheet${i + 1}.xml`)).join("")}${relationship(sheets.length + 1, "styles", "styles.xml")}${relationship(sheets.length + 2, "sharedStrings", "sharedStrings.xml")}</Relationships>` },
    { name: "xl/styles.xml", content: reportStylesXml() },
    { name: "xl/sharedStrings.xml", content: buildSharedStringsXml(sharedStrings) },
    ...sheetFiles,
  ]);
}

function procurementWorkbookSheets(rows) {
  const poMap = new Map();
  rows.forEach(row => { if (!poMap.has(row.poNumber)) poMap.set(row.poNumber, row); });
  const pos = Array.from(poMap.values());
  const sum = key => roundMoney(pos.reduce((value, row) => value + number(row[key]), 0));
  const vendors = new Map();
  pos.forEach(po => {
    if (!vendors.has(po.vendorName)) vendors.set(po.vendorName, { vendorName: po.vendorName, poCount: 0, poTotal: 0, amountPaid: 0, balanceDue: 0 });
    const vendor = vendors.get(po.vendorName);
    vendor.poCount += 1;
    ["poTotal", "amountPaid", "balanceDue"].forEach(key => { vendor[key] += number(po[key]); });
  });
  const poColumns = [
    ...["poNumber", "vendorName", "poDate", "deliveryDate", "deliveredDate"].map(key => PROCUREMENT_REPORT_COLUMNS.find(column => column.key === key)),
    ...["itemSubtotal", "taxTotal", "discountAmount", "adjustmentAmount"].map(key => ({ key, label: { itemSubtotal: "Item Subtotal", taxTotal: "Tax Total", discountAmount: "Discount", adjustmentAmount: "Adjustment" }[key], type: "money", width: 18 })),
    ...["poTotal", "amountPaid", "balanceDue", "paymentStatus", "poStatus", "deliveryStatus"].map(key => PROCUREMENT_REPORT_COLUMNS.find(column => column.key === key)),
  ];
  // Header-level values belong on PO Summary once, never repeated in Line Items.
  const lineColumns = PROCUREMENT_REPORT_COLUMNS.filter(column => !["poTotal", "amountPaid", "balanceDue"].includes(column.key));
  const summary = reportSheet("Summary", [{ key: "metric", label: "Metric", width: 32 }, { key: "value", label: "Value", width: 28, type: "number" }], [
      { metric: "Purchase orders", value: pos.length }, { metric: "Line items", value: rows.length },
      { metric: "Total PO value (INR)", value: sum("poTotal") }, { metric: "Amount paid (INR)", value: sum("amountPaid") },
      { metric: "Balance due (INR)", value: sum("balanceDue") },
    ]);
  summary.rows.slice(3).forEach(row => { row[1] = reportCell(row[1].value, "money"); });
  return [summary,
    reportSheet("PO Summary", poColumns, pos),
    reportSheet("Line Items", lineColumns, rows),
    reportSheet("Vendor Summary", [{ key: "vendorName", label: "Vendor", width: 38 }, { key: "poCount", label: "POs", type: "number" },
      ...["poTotal", "amountPaid", "balanceDue"].map(key => ({ key, label: { poTotal: "PO Value", amountPaid: "Amount Paid", balanceDue: "Balance Due" }[key], type: "money" }))], Array.from(vendors.values())),
    reportExportInfo("Procurement Report", ["PO Summary contains one row per PO, including final totals after discounts and adjustments.", "Line Items contains product and charge detail. Gross line values may differ from final PO value because of PO-level discounts and adjustments."]),
  ];
}

function auditEvidenceSheets() {
  return ["Invoices", "Payments", "Receipts"].map(name => {
    const config = PROCUREMENT_AUDIT_CONFIG[name];
    const columns = config.fields.filter(field => !field.hidden).map(field => ({ ...field, type: field.type === "number" ? /amount|cost|price|charges/i.test(field.key) ? "money" : "number" : field.type === "date" ? "date" : "text", width: /remarks|comment|description/i.test(field.key) ? 48 : 24 }));
    return reportSheet(name, columns, buildProcurementAuditRows(name));
  });
}

function csvField(value) {
  let text = String(value ?? "");
  if (/^[\s]*[=+@-]/.test(text) && !/^-?\d+(\.\d+)?$/.test(text)) text = "'" + text;
  return `"${text.replace(/"/g, '""')}"`;
}

function buildReportCsv(kind) {
  let columns, rows, name;
  if (kind === "procurement") {
    const sheets = procurementWorkbookSheets(buildProcurementReportRows());
    const sheet = sheets.find(item => item.name === state.procurementReportTab) || sheets[1];
    name = sheet.name;
    columns = sheet.rows[0].map((cell, index) => ({ key: index, label: cell.value }));
    rows = sheet.rows.slice(1).map(row => row.map(cell => cell.value));
  } else if (kind === "mechanical") {
    name = state.mechanicalAnalysisTab; columns = MECHANICAL_ANALYSIS_COLUMNS[name]; rows = buildMechanicalAnalysis().tables[name];
  } else {
    name = state.procurementAuditTab;
    columns = name === "KPI Summary" ? [{ key: "metric", label: "KPI" }, { key: "value", label: "Value" }, { key: "definition", label: "Definition" }] : PROCUREMENT_AUDIT_CONFIG[name].fields.filter(field => !field.hidden);
    rows = buildProcurementAuditRows(name);
  }
  return { name, blob: new Blob(["\uFEFF", [columns.map(column => csvField(column.label)).join(","), ...rows.map(row => columns.map(column => csvField(row[column.key])).join(","))].join("\r\n")], { type: "text/csv;charset=utf-8" }) };
}

function downloadReportBlob(blob, filename) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function setReportExportStatus(message, busy = false, failed = false) {
  const status = document.getElementById("reportExportStatus");
  if (status) { status.textContent = message; status.classList.toggle("export-error", failed); }
  document.querySelectorAll("[data-export-kind], [data-report-csv], #exportAllReportsBtn, #exportProcurementReportBtn, #exportMechanicalAnalysisBtn, #exportProcurementAuditBtn").forEach(button => { button.disabled = busy; });
}

async function runReportExport(kind, csv = false) {
  if (reportExportBusy) return;
  if (reportDataLoading) {
    setReportExportStatus("Purchase order data is still loading. Please try again when loading finishes.");
    return;
  }
  reportExportBusy = true;
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  setReportExportStatus(kind === "all" ? "Preparing all 3 workbooks…" : "Preparing your download…", true);
  try {
    // Let the browser show progress before synchronous workbook generation.
    await new Promise(resolve => setTimeout(resolve, 0));
    let filename;
    if (csv) {
      const result = buildReportCsv(kind);
      filename = `${result.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${timestamp}.csv`;
      downloadReportBlob(result.blob, filename);
    } else if (kind === "all") {
      const files = [];
      for (const [index, entry] of Object.values(REPORT_EXPORTS).entries()) {
        setReportExportStatus(`Preparing workbook ${index + 1} of 3: ${entry.title}…`, true);
        await new Promise(resolve => setTimeout(resolve, 0));
        files.push({ name: `${entry.file}.xlsx`, content: new Uint8Array(await entry.build().arrayBuffer()) });
      }
      filename = `procurement-all-reports-${timestamp}.zip`;
      downloadReportBlob(createZipBlob(files), filename);
    } else {
      const entry = REPORT_EXPORTS[kind];
      filename = `${entry.file}-${timestamp}.xlsx`;
      downloadReportBlob(entry.build(), filename);
    }
    setReportExportStatus(`Download prepared: ${filename}. Check your browser downloads.`);
  } catch (error) {
    console.error("Report export failed", error);
    setReportExportStatus(`Export failed: ${error.message || "Please try again."}`, false, true);
  } finally {
    reportExportBusy = false;
    document.querySelectorAll("[data-export-kind], [data-report-csv], #exportAllReportsBtn, #exportProcurementReportBtn, #exportMechanicalAnalysisBtn, #exportProcurementAuditBtn").forEach(button => { button.disabled = false; });
  }
}

function bindReportExports() {
  document.getElementById("reports")?.addEventListener("click", event => {
    const tab = event.target.closest("[data-procurement-report-tab]");
    if (tab) { state.procurementReportTab = tab.dataset.procurementReportTab; renderReports(); }
    const exportButton = event.target.closest("[data-export-kind]");
    const csvButton = event.target.closest("[data-report-csv]");
    if (exportButton) runReportExport(exportButton.dataset.exportKind);
    if (csvButton) runReportExport(csvButton.dataset.reportCsv, true);
  });
  document.getElementById("exportAllReportsBtn")?.addEventListener("click", () => runReportExport("all"));
}
