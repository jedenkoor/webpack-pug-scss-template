const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ESLintPlugin = require('eslint-webpack-plugin')
const internalIp = require('internal-ip')

;(async () => {
  console.log(`http://${await internalIp.v4()}:8080`)
})()

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',

  devServer: {
    open: true,
    watchFiles: ['src/*', 'src/**/*']
    // host: '0.0.0.0'
  },

  entry: {
    main: ['./index.js']
  },

  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [new ESLintPlugin()],

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
