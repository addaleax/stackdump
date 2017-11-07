'use strict';
setTimeout(function() {
  throw new Error('foo');
}, 10);
