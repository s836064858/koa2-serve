const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

let outDir = 'dist'

module.exports = {
  mode: 'production',
  entry: ['./app.js'],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, outDir)
  },
  target: 'node', // 服务端打包
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './package.json'),
          to: path.resolve(__dirname, outDir)
        },
        {
          from: path.resolve(__dirname, './start.sh'),
          to: path.resolve(__dirname, outDir)
        },
        {
          from: path.resolve(__dirname, './controllers'),
          to: path.resolve(__dirname, outDir + '/controllers')
        }
      ]
    })
  ],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
}
