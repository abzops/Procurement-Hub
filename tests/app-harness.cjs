const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
function app() {
  const elements = new Map();
  const context = vm.createContext({
    window: { addEventListener() {} },
    localStorage: { getItem() { return null; } },
    document: { getElementById(id) {
      if (!elements.has(id)) elements.set(id, { innerHTML: '', classList: { toggle() {} } });
      return elements.get(id);
    }, querySelectorAll() { return []; } },
    console, Intl, Date, Set, Map, Blob, TextEncoder, Uint8Array, DataView,
    setTimeout, clearTimeout,
  });
  for (const file of ['data.js', 'report-export.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  return { run: code => vm.runInContext(code, context), elements, context };
}
module.exports = { app };
