const webpack = require('webpack')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals') // Webpack allows you to define externals - modules that should not be bundled.
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const WebpackBar = require('webpackbar')

const { merge } = require('webpack-merge')

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
]

if (process.env.NODE_ENV == 'production') {
    plugins.push(
        new WebpackBar()
    )
}

module.exports = merge(base, {
    target: 'node',
    devtool: '#source-map',
    entry: './src/entry-server.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        allowlist: /\.css$/ // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    }),
    module: {
        rules: [{
            test: /\.(sc|c)ss$/,
            use: [
            //   'vue-style-loader', // vue-style-loader将css以<style>标签的形式注入到页面中，注释掉，则服务端不注入css
              'css-loader',
              'sass-loader',
            ],
          }]
    },
    plugins
})
