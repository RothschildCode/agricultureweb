var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var entriesLoader = require('../entries-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // entry: {
  //   app: './src/main.js'
  // },
  entry: entriesLoader.entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'swiper': 'swiper/dist/js/swiper.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 50000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  }
}
