/**
 * 服务端入口，仅运行于服务端
 */

// 创建一个 express 的 server 实例
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('../build/setup-dev-server')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('../config')

let renderer
let onReady

// 开发模式 --> 监视打包构建（客户端 + 服务端） --> 重新生成 Renderer 渲染器
onReady = setupDevServer(app, (serverBundle, template, clientManifest) => {
  renderer = createBundleRenderer(serverBundle, {
    template, // (可选) 设置页面模板
    clientManifest, // (可选) 客户端构建
  })
})

// server.use(favicon('./static/favicon.ico'))


app.use(cookieParser())
// 开头的路径，需要与 output 中设置的 publicPath 保持一致
app.use('/dist', express.static('../dist'))

const render = async (request, response) => {
  try {
    const context = {
      // entry-server.js用于设置服务器端router的位置
      url: request.url,
      cookies: request.cookies,
      request: request
    }

    // renderToString支持promise
    const html = await renderer.renderToString(context)

    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end(html)
  } catch (error) {
    console.log('server error: ', error.response.status)
    if (error.response.status === 404 || error.response.status === 400) {
      response.status(404).redirect('/mall/404?message=' + error.response.data.message)
    }

    if (error.response.status === 500) {
      response.status(500).redirect('/mall/500')
    }
  }
}

Object.keys(config.dev.proxyTable).forEach(function (context) {
  var options = config.dev.proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }

  app.use(proxyMiddleware(options.filter || context, options))
})

/**
 * 添加路由
 * 服务端路由设置为 *，意味着所有的路由都会进入这里,不然会导致刷新页面，获取不到页面的bug
 * 并且vue-router设置的404页面无法进入
 */
app.get('/*', async (request, response) => {
  // 等待有了 Renderer 渲染器以后，调用 render 函数
  await onReady
  render(request, response)
})

app.listen(config.port, () => {
  console.log(`server running at port ${config.port}`)
})
