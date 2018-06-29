const webpack = require('webpack');
const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin')
const cwd = process.cwd();
const manifest = require('../manifest/manifest.json')
module.exports = {
    entry: [//入口文件
        'webpack-hot-middleware/client?noInfo=true',
        './src/main.js'
    ],
    output: {//出口文件
        filename: "[name].js",
        path: path.join(cwd, '/public/dist')
    },
    module: {//项目规则
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
    plugins: [//插件
        new webpack.DllReferencePlugin({
            context: path.join(cwd, 'build/manifest'),
            //下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
            //这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
            manifest
        }),
        new webpack.HotModuleReplacementPlugin(),
        new htmlwebpackplugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}