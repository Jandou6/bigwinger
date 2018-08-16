const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CONFIG = require('./config');
module.exports = {
  output: {
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: `url-loader?limit=10&name=asset/[name].[ext]`,
        exclude: /(node_modules)/,
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: CONFIG.INDEX_HTML,
      chunks: ['app', 'commons'],
      template: CONFIG.HTML_TEMPLATE_PATH,
    }),
    new webpack.DllReferencePlugin({
      context: CONFIG.ROOT_PATH,
      manifest: require('./dll/vender-manifest.json'),
    }),
    new CopyWebpackPlugin([{
      from: CONFIG.DLL_PATH,
      to: 'dll',
    }]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['dll/vender.dll.js'],
      append: false,
    }),
    new ExtractTextPlugin({
      disable: true,
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
}