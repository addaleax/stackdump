'use strict';

const promiseReject = require('set-promise-reject-callback');
const assert = require('assert');
const util = require('util');
const stuck = require('stuck');
const { serialize: { Context: SerializerContext } } = require('cold-storage');
const { writeFileSync } = require('fs');
const { basename } = require('path');
const { argv, pid } = process;
const { performance } = require('perf_hooks');
const progname = basename(argv[0]);
let filename = process.env.STACKDUMP_FILE;

const map = new WeakMap();
const promiseToReason = new WeakMap();

const globalSerializer = new SerializerContext();
globalSerializer.serialize({ global });

promiseReject.SetCallback(function CaptureRejection(event, promise, reason) {
if (event === promiseReject.kPromiseRejectWithNoHandler) {
  promiseToReason.set(promise, reason);
  if (map.has(reason))
    return;

  try {
    const __start = performance.now();
    const stack = stuck();
    const now = new Date().toISOString();
    const nowString = now.replace(/[:-]/g, '').replace(/\....Z$/, '');
    const ctx = globalSerializer.fork();
    ctx.serialize({ stack, now, reason, promise, global, process });
    const __end = performance.now();
    map.set(reason, { nowString, buf: ctx.getBuffer(), dt: __end - __start });
  } catch (e) {
    console.error('Serializing unhandled rejection failed');
    console.error('Original rejection reason:');
    console.error(reason);
    console.error('Serialization failure:');
    console.error(e);
    process.abort();
  }

  process.nextTick(() => {
    if (!promiseToReason.has(promise))
      return;
    const info = map.get(reason);
    const nowString = info.nowString.replace(/[:-]/g, '').replace(/\....Z$/, '');
    filename = filename || `${progname}-${pid}-${nowString}.dump`;
    writeFileSync(filename, info.buf);
    console.error(`[stack dumped to ${filename} (gen in ${info.dt|0} ms)]`);
    let str;
    if (typeof reason.stack === 'string')
      str = reason.stack;
    else
      str = toString(reason);
    process.emitWarning(str, 'UnhandledPromiseRejectionWarning');
  });
} else {
  const reason = promiseToReason.get(promise);
  assert(reason); // reason should not be garbage collected if promise exists
  map.delete(reason);
  promiseToReason.delete(promise);
}
});

function toString(thing) {
  try {
    return util.inspect(thing);
  } catch (e) {
    try {
      return String(thing);
    } catch (e) {
      try {
        return Object.prototype.toString.call(thing);
      } catch (e) {
        return '<toString() threw>';
      }
    }
  }
}
