'use strict';
const path = require('path');
const {
  deserialize: { Context: DeserializerContext }
} = require('cold-storage');

let data;
{
  const _data = Buffer.from(window.viewData, 'base64');
  const ctx = new DeserializerContext(_data);
  const warmup = ctx.deserialize({ global: window });
  data = ctx.deserialize();
}
delete window.viewData;
window.data = data;

{
  const argv = Array.prototype.slice.call(data.process.argv);
  argv[0] = path.basename(data.process.argv0);
  document.title = Array.prototype.join.call(argv, ' ');
}
