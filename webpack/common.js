const webpack = require('webpack');
const CONFIG = require('./config');
const tsImportPluginFactory = require('ts-import-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[local]_[hash:base64:5]',
              }
            },
            'resolve-url-loader',
            'postcss-loader',
          ],
        }),

      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        }),
      },
      {
        enforce: 'pre',
        test: /\.(ts|tsx)?$/,
        use: [{
          loader: 'tslint-loader',
          options: {
            emitErrors: false,
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [ tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: 'css'
                })]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            },
          }
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
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../libs/highlight.pack.js'),
      to: 'libs/highlight.pack.js',
    }]),
  ]
}