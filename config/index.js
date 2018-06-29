module.exports = {
    dev: {
        env: 'env',
        autoOpenServer: true,
        port: 8080,
        proxyTable: {
            "/api":{
                target: 'www.baidu.com',
                changeOrgin: true
            }
        }
    }
}