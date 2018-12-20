module.exports = {
    entry: './app.module.js',
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // which file needs to be read
                exclude: /node_modules/, // which folder needs not to be read
                loader: ['babel-loader'] // which transplier/compiler/plugin to compile files
            }
        ]
    },
    devServer: {
        port: 3000, // configuring port for localserver
        contentBase: './' // configuring from where content needs to be served
    }
};

