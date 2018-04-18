const path = require('path')
const webpack = require('webpack');
var entries = require('./entries')

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: entries.vendor,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name].manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
  ],
};