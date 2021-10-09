const {getEndpoints} = require("../../config/endpoints");

process.endpoints = getEndpoints('production');
module.exports = require('./webpack.config');
