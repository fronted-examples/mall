const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  context: resolve('/'),
  devtool: isProd ? 'source-map' : '#cheap-module-source-map',
  output: {
    path: resolve('dist'),
    publicPath: '/',
    /**
     * chunkhash 同属一个 chunk 中的文件修改了，文件名会发生变化
     * contenthash 只有文件自己的内容变化了，文件名才会变化
     */
    filename: '[name].[contenthash].js',
    /**
     * 此选项给打包后的非入口js文件命名，与 SplitChunksPlugin 配合使用
     */
    chunkFilename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      public: resolve('public'),
      vue: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~/static': path.resolve(__dirname, '../static'),
    },
  },
  module: {
    /**
     * https://juejin.cn/post/6844903689103081485
     * 使用 `mini-css-extract-plugin` 插件打包的的 `server bundle` 会使用到 document。
     * 由于 node 环境中不存在 document 对象，所以报错。
     * 解决方案：样式相关的 loader 不要放在 `webpack.base.config.js` 文件
     * 将其分拆到 `webpack.client.config.js` 和 `webpack.client.server.js` 文件
     * 其中 `mini-css-extract-plugin` 插件要放在 `webpack.client.config.js` 文件配置。
     */
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'markdown-loader', options: {} }
        ]
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: {
              hot: !isProd,
              reloadAll: !isProd
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
        // use: [
        //   // fallback to style-loader in development
        //   isProd !== 'production' ? 'vue-style-loader' : {
        //     loader: MiniCssExtractPlugin.loader,
        //     options: {
        //       // 解决 export 'default' (imported as 'mod') was not found
        //       // 启用 CommonJS 语法
        //       esModule: false,
        //     },
        //   },
        //   "css-loader",
        //   "postcss-loader",
        //   "sass-loader"
        // ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)(\?.*)?$/,
        loader: 'url-loader',
        //这个不处理svg图片，因为我们独立拆开让svg-sprite-loader来处理了
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          // 解决图片地址变为[object Module]
          esModule: false,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'//去掉svg这个图片加载不出来
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf)\??.*$/,
        loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': isProd ? require('../config/prod.env') : require('../config/dev.env')
    }),
    new webpack.ProvidePlugin({
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
    }, {
      from: path.resolve(__dirname, '../static/robots.txt'),//防爬虫文件
      to:'./',//到根目录下
    }]),
    new ExtractCssChunksPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].[chunkhash:7].css'
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:3000/mall`],
      },
    })
  ],
}
