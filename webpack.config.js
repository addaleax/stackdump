const path = require('path');

module.exports = {
  entry: './template/browser-script.js',
  output: {
    path: path.resolve(__dirname, 'template/dist'),
    filename: 'bundle.js'
  }
};
