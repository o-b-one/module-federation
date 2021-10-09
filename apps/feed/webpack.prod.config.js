const {getEndpoints} = require("../../config/endpoints");
module.exports = require('./webpack.config');
process['endpoints'] = getEndpoints('production');
