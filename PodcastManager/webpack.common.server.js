console.log('hello there from common');

const nodeExternals = require('webpack-node-externals');

module.exports =
    {
        name: 'server',
        context: __dirname + '/src',
        entry: {
            app: './server.js'
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false
        },
        output: {
            path: __dirname + '/dist',
            filename: 'server.js',
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.js$/, // which file needs to be read
                    exclude: /node_modules/, // which folder needs not to be read
                    loader: ['babel-loader']

                }
            ]
        }
    };