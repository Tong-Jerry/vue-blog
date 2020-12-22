module.exports = {
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5001/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/' // 请求的时候使用这个api就可以
        }
      }
    }
  },
  productionSourceMap: false,
  assetsDir: 'static'
}
