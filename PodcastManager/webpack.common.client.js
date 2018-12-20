const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports =
    {
        name: 'client',
        context: __dirname + '/src/public',
        entry: {
            app: './app.js',
            vendor: ['angular']
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            publicPath: '/',
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: 'head'
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: 'vendor',
                        enforce: true
                    },
                }
            },
            runtimeChunk: false
        }
    };