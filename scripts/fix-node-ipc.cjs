const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');
const ipcDir = path.join(packageRoot, 'node_modules', '@achrinza', 'node-ipc');
const cjsEntry = path.join(ipcDir, 'node-ipc.cjs');
const esmEntry = path.join(ipcDir, 'node-ipc.js');

if (!fs.existsSync(ipcDir) || !fs.existsSync(esmEntry)) {
  process.exit(0);
}

const shim = `'use strict';

const mod = require('./node-ipc.js');
const ipc = mod.default || mod;

module.exports = ipc;
module.exports.default = ipc;

if (mod.IPCModule) {
  module.exports.IPCModule = mod.IPCModule;
}
`;

fs.writeFileSync(cjsEntry, shim, 'utf8');
console.log('Created node_modules/@achrinza/node-ipc/node-ipc.cjs shim');
