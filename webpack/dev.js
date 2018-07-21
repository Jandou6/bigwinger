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
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract({
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 3,
                localIdentName: '[local]_[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function () {
                  return [
                    require('autoprefixer')({
                      browsers: [
                        'Chrome >= 35',
                        'Firefox >= 38',
                        'Edge >= 12',
                        'Explorer >= 10',
                        'iOS >= 8',
                        'Safari >= 8',
                        'Android 2.3',
                        'Android >= 4',
                        'Opera >= 12',
                      ]
                    }),
                  ];
                },
              },
            },
            'resolve-url-loader',
            'sass-loader',
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
  // optimization: {
  //   minimize: true,
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //       },
  //     }
  //   },
  // }
}