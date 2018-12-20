const merge = require('webpack-merge');

const commonServer = require('./webpack.common.server');
const commonClient = require('./webpack.common.client');
const mode = 'development';

console.log('hello there from dev');

const server = merge(commonServer, {
        mode: mode,
        // optimization: {
        //     minify: false
        // }
    }
);
const client = merge(commonClient, {
        mode: mode,
        // optimization: {
        //     minify: false
        // }
    }
);

module.exports = [server, client];