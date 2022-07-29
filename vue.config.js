const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  publicPath: './' // 告诉webpack打包的index.html引入其他资源文件以./开头，不要默认/开头
})
