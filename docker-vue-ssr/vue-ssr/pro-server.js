/**
 * 服务端入口，仅运行于服务端
 */
// 创建一个 express 的 server 实例
const express = require('express')
const server = express()
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const { minify } = require('html-minifier')

let renderer

const template = fs.readFileSync('./index.html', 'utf-8')
// 生产模式，直接基于已构建好的包创建渲染器
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
// 创建一个渲染器
renderer = createBundleRenderer(serverBundle, {
  template, // (可选) 设置页面模板
  clientManifest, // (可选) 客户端构建
})

// 开头的路径，需要与 output 中设置的 publicPath 保持一致
server.use('/dist', express.static('./dist'))

const render = async (req, res) => {
  try {
    // renderToString支持promise
    const html = await renderer.renderToString({
      // 在模板中使用外部数据(可选第二个参数)
      title: 'vue ssr',
      meta: `<meta name="description" content="vue-SSR">`,
      // entry-server.js用于设置服务器端router的位置
      url: req.url,
    })
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(minify(html, { collapseWhitespace: true, minifyCSS: true}))
  } catch (error) {
    console.log('err: ', error)
    res.status(500).end('Internal Server Error')
  }
}

// 添加路由
// 服务端路由设置为 *，意味着所有的路由都会进入这里,不然会导致刷新页面，获取不到页面的bug
// 并且vue-router设置的404页面无法进入
server.get(
  '/vue-ssr/*',
  render // 生产模式：使用构建好的包直接渲染
)

server.listen(3000,() => {
  console.log('server running at port 3000')
})
