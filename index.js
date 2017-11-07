'use strict';

const stuck = require('stuck');
const { serialize } = require('cold-storage');
const { writeFileSync } = require('fs');
const { basename } = require('path');
const { argv, pid } = process;
const progname = basename(argv[0]);
let filename = process.env.STACKDUMP_FILE;

process.on('uncaughtException', (err) => {
  const now = new Date().toISOString();
  const nowString = now.replace(/[:-]/g, '').replace(/\....Z$/, '');
  filename = filename || `${progname}-${pid}-${nowString}.dump`;
  writeFileSync(filename, serialize({
    now,
    process,
    stack: stuck()
  }));
  throw err;
});
