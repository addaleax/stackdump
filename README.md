stackdump
==============

[![NPM Version](https://img.shields.io/npm/v/stackdump.svg?style=flat)](https://npmjs.org/package/stackdump)
[![NPM Downloads](https://img.shields.io/npm/dm/stackdump.svg?style=flat)](https://npmjs.org/package/stackdump)
[![Build Status](https://travis-ci.org/addaleax/stackdump.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/stackdump?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/stackdump/badge.svg?branch=master)](https://coveralls.io/r/addaleax/stackdump?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/stackdump.svg?style=flat)](https://david-dm.org/addaleax/stackdump)

Get a dump file for your unhandled promise rejection stack and inspect it in a browser. For Node.js 8 and above.

Install:
`npm install stackdump`

test.js:
```js
setTimeout(function foo() {
  Promise.reject(new Error('foo'));
}, 10);
```

```
$ node -r stackdump test.js
[stack dumped to node-21992-20171130T221243.dump (gen in 214 ms)]
(node:21992) UnhandledPromiseRejectionWarning: Error: foo
    at Timeout.foo [as _onTimeout] (/home/sqrt/src/stackdump/test/fixtures/crashing-script.js:3:18)
    at ontimeout (timers.js:485:11)
    at tryOnTimeout (timers.js:309:5)
    at Timer.listOnTimeout (timers.js:269:5)
```

Creates a core dump file with a name like `node-21992-20171130T221243.dump`
(or writes to a file path specified via the `STACKDUMP_FILE` environment variable).

Inspect that file in the browser:

```
$ stackdump-open node-21992-20171130T221243.dump
```

License
=======

MIT
