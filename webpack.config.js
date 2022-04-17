const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {

  entry: {
    main: './src/index.js'
  },

  output: {
    filename: 'app.bunlde.js',
    path: path.resolve(__dirname, 'dist'),
    publicPaht: 'dist/'
  },

  devServer: {
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          devMode ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPaht: '../'
          }
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ].concat(
    devMode ? []
    : [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
  )

}
