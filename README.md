stackdump
==============

[![NPM Version](https://img.shields.io/npm/v/stackdump.svg?style=flat)](https://npmjs.org/package/stackdump)
[![NPM Downloads](https://img.shields.io/npm/dm/stackdump.svg?style=flat)](https://npmjs.org/package/stackdump)
[![Build Status](https://travis-ci.org/addaleax/stackdump.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/stackdump?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/stackdump/badge.svg?branch=master)](https://coveralls.io/r/addaleax/stackdump?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/stackdump.svg?style=flat)](https://david-dm.org/addaleax/stackdump)

Get a dump file for your stack and inspect it in a browser. For Node.js 8 and above.

Install:
`npm install stackdump`

test.js:
```js
setTimeout(function() {
  throw new Error('foo');
}, 10);
```

```
$ node -r stackdump test.js
/home/sqrt/src/stackdump/index.js:16
  throw err;
  ^

Error: foo
    at Timeout._onTimeout (/home/sqrt/src/stackdump/test.js:2:9)
    at ontimeout (timers.js:478:11)
    at tryOnTimeout (timers.js:302:5)
    at Timer.listOnTimeout (timers.js:262:5)
```

Creates a core dump file with a name like `node-17052-20171107T214611.dump`
(or writes to a file path specified via `STACKDUMP_FILE`).

Inspect that file in the browser:

```
$ stackdump-view node-17052-20171107T214611.dump
```

License
=======

MIT
