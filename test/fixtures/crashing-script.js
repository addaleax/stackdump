'use strict';
setTimeout(function foo() {
  Promise.reject(new Error('foo'));
}, 10);
