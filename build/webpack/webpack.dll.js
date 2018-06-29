const webpack = require('webpack');
const cwd = process.cwd();
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const ventors = [
    'react',
    'react-dom',
    'antd'
]
const webpackDllConfig = {
    entry: {
        vendor: ventors 
    },
    output: {
        filename: '[name].js',
        path: path.join(cwd, '/public/vendors'),
        library: '[name]_[chunkhash]'
    },
    plugins: [
        //使用DllPlugin插件编译上面配置的NPM包
        new webpack.DllPlugin({ 
            path: path.join(cwd, 'build/manifest/manifest.json'),
            name: '[name]_[chunkhash].js'
        })
    ]
}
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV == 'production'){
    webpackDllConfig.output.filename = '[name]_[hash:7].js';
    webpackDllConfig.output.publicPath = './verdors/';
    webpackDllConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            },
            mangle:{
                except:['$super','$','exports','require']
            }
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.join(cwd, 'bin'),
            update: true,
            prettyProint: true
        })
    )
}
module.exports = webpackDllConfig;