const HappyPack = require('happypack');
const tsImportPluginFactory = require('ts-import-plugin')

const happypack_thread_pool = HappyPack.ThreadPool({ size: 2 });

module.exports = {
  plugins: [
    new HappyPack({
      id: 'babel',
      threadPool: happypack_thread_pool,
      loaders: ['babel-loader'],
    }),
    new HappyPack({
      id: 'ts',
      threadPool: happypack_thread_pool,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true },
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [ tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
              })]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          },
        }
      ],
    }),
  ],
}