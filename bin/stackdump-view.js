'use strict';
const fs = require('fs');
const path = require('path');
const { deserialize } = require('cold-storage');

const filename = process.argv[2];

let data;
try {
  data = fs.readFileSync(filename);
} catch (e) {
  console.error('File could not be opened:', filename, e);
  return process.exitCode = 1;
}

try {
  // Just make sure it's deserializable. We're still going to use the
  // base64 version for display.
  deserialize(data);
} catch (e) {
  console.error('File could not be parsed:', filename, e);
  return process.exitCode = 1;
}

const output = `${filename}.html`;

const bundle = fs.readFileSync(
    path.resolve(__dirname, '..', 'template', 'dist', 'bundle.js'), 'utf8');
const html = fs.readFileSync(
    path.resolve(__dirname, '..', 'template', 'template.html'), 'utf8');
fs.writeFileSync(output,
  html.replace(/__VIEW_DATA__/g, JSON.stringify(data.toString('base64')))
      .replace(/__BUNDLE__/g, bundle));
