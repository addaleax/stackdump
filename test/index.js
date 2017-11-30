'use strict';

const { deserialize } = require('cold-storage');
const assert = require('assert');
const path = require('path');
const cp = require('child_process');
const fs = require('fs');

const fixture = path.resolve(__dirname, 'fixtures/crashing-script.js');
const fixture2 = path.resolve(__dirname, 'fixtures/immediately-handled.js');
const stackdump = path.resolve(__dirname, '..');
process.chdir(__dirname);

describe('stackdump', function() {
  it('will create a dump file', function(done) {
    this.timeout(4000);
    const proc = cp.spawn(process.execPath, ['-r', stackdump, fixture], {
      stdio: 'inherit'
    });
    proc.on('exit', function() {
      let found = false;
      for (const name of fs.readdirSync(__dirname)) {
        if (!name.match(/\.dump$/))
          continue;
        fs.unlinkSync(path.resolve(__dirname, name));
        found = name;
      }
      assert(found);
      done();
    });
  });

  it('will create a dump file at a specified path', function(done) {
    this.timeout(4000);
    const filename = path.resolve(__dirname, 'target.dump');
    try { fs.unlinkSync(filename); } catch (e) {}
    const proc = cp.spawn(process.execPath, ['-r', stackdump, fixture], {
      env: {
        STACKDUMP_FILE: filename
      },
      stdio: 'inherit'
    });
    proc.on('exit', function() {
      assert(fs.existsSync(filename));
      done();
    });
  });

  it('will not create a dump file for handled rejections', function(done) {
    this.timeout(4000);
    const filename = path.resolve(__dirname, 'target-donotcreate.dump');
    try { fs.unlinkSync(filename); } catch (e) {}
    const proc = cp.spawn(process.execPath, ['-r', stackdump, fixture2], {
      env: {
        STACKDUMP_FILE: filename
      },
      stdio: 'inherit'
    });
    proc.on('exit', function() {
      assert(!fs.existsSync(filename));
      done();
    });
  });
});
