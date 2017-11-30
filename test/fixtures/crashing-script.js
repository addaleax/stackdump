'use strict';
setTimeout(function() {
  Promise.reject(new Error('foo'));
}, 10);
