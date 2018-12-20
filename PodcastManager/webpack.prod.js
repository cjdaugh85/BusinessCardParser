const merge = require('webpack-merge');

const commonServer = require('./webpack.common.server');
const commonClient = require('./webpack.common.client');
const mode = 'production';

console.log('hello there from prod');

const server = merge(commonServer, {mode: mode});
const client = merge(commonClient, {mode: mode});

module.exports = [server, client];