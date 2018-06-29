//该模式为生产环境
const webpack = require('webpack');
const path = require('path');
const cwd = process.cwd();
const manifest = require('../manifest/manifest.json');
const AssetsPlugin = require('assets-webpack-plugin');
module.exports = {
    entry: [
        './src/main.js' 
    ],
    output: {
        path: path.join(cwd, 'public/js'),
        filename: '[name].js',
        publicPath: './js/'
    },
    module: {
        rules: [
             {
                test:/\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node-modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)$/, 
                use: ['url-loader?limit=8192&name=./[name].[ext]']
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(cwd, 'build/manifest'),
            manifest
        }),
        new webpack.DefinePlugin({
            "pricess.env": {
                "NODE_DEV": JSON.stringify('production')
            },
            "process.PORT": 8080
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            comments: false,
            beautify: false,
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.join(cwd, 'bin'),
            update: true,
            prettyProint: true
        })
    ]
}