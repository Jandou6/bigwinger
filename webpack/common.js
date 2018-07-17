const CONFIG = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
  entry: {
    app: [
      CONFIG.ENTRY,
    ]
  },

  output: {
    path: CONFIG.DIST_PATH,
    publicPath: CONFIG.PUBLIC_PATH,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      'node_modules',
    ],
    alias: {
      "@src": CONFIG.SRC_PATH,
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          'happypack/loader?id=babel',
          'happypack/loader?id=ts',
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /(node_modules)/,
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../libs/highlight.pack.js'),
      to: 'libs/highlight.pack.js',
    }]),
  ]
}