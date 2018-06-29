const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackBaseDev = require('../build/webpack/webpack.dev.js');
const compiler = webpack(webpackBaseDev);
const proxy = require('http-proxy-middleware');
const config = require('../config').dev;
const proxyTable = config.proxyTable;
let port = process.env.PORT || config.port;
if(!process.env.PORT){
    port = config.port;
}
const opn = require('opn');
//用于webpack 捆绑软件的快速开发中间件，可以提供从webpack发出的文件
const devMiddleware = require('webpack-dev-middleware')(compiler,{
})
//允许您在没有webpack-dev-server的情况下将热重新加载到现有服务器中。
const hotMiddleware = require('webpack-hot-middleware')(compiler,{
    log:false
})
Object.keys(proxyTable).map((key)=>{
    app.use(proxy(key, proxyTable[key]));
})
//挂载
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(express.static('public'))
if(config.autoOpenServer){
    opn('http://localhost:' + port)
}
app.listen(port)
