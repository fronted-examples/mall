'use strict';

module.exports = {
  port: 3000,
  dev: {
    proxyTable: {
      '/api': {
        target: 'https://cnodejs.org/api',
        secure: false, // 如果是https接口，需要配置该参数，表示是否校验证书，开发环境改为false
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}