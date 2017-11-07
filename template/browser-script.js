'use strict';
const path = require('path');
const { deserialize } = require('cold-storage');

const data = deserialize(Buffer.from(window.viewData, 'base64'));
delete window.viewData;
window.data = data;

const argv = Array.prototype.slice.call(data.process.argv);
argv[0] = path.basename(data.process.argv0);
document.title = Array.prototype.join.call(argv, ' ');
