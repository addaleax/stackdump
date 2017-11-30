#!/usr/bin/env node
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  deserialize: { Context: DeserializerContext },
  serialize,
  deserialize
} = require('cold-storage');

const filename = process.argv[2];

let data;
try {
  data = fs.readFileSync(filename);
} catch (e) {
  console.error('File could not be opened:', filename, e);
  return process.exitCode = 1;
}

try {
  // Deserialize into a single buffer.
  const ctx = new DeserializerContext(data);
  const warmup = ctx.deserialize();
  const deserialized = ctx.deserialize();
  data = serialize(deserialized);
  assert.strictEqual(deserialized.global, warmup.global);
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
