'use strict';
setTimeout(function() {
  Promise.reject(new Error('foo')).catch(() => {});
}, 10);
