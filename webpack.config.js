const path = require('path');

module.exports = {
    mode: 'production',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: process.env.PORT,
        host: `0.0.0.0.`,
    },
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/js/',
        filename: `[name].js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {}
    },
    plugins: [],

};