const path = require('path');

const config = require(path.resolve(__dirname, 'lib/index.cjs'));

module.exports = config.baseConfig;
