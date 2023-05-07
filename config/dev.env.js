'use strict'
const { merge } = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"/mall-service"',
  IMAGE_PREFIX: '"https://www.bookswings.com/minio"',
  VUE_APP_API_SOCKET_URL: '"http://localhost:8088/mall-service/websocket"'
})
