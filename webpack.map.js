
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

const setMap = () => {
  const entry = {}
  const HtmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  entryFiles.map((entryFile, idx) => {
    // const entryFile = entryFiles[idx]
    const match = entryFile.match(/src\/(.*)\/index\.js$/)
    const pageName = match[1]
    entry[pageName] = entryFile

    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `./src/${pageName}/index.html`),
      filename: `${pageName}/${pageName}.html`,
      chunks: [pageName]
    }))
  })

  return {
    entry,
    HtmlWebpackPlugins
  }
}

const { entry, HtmlWebpackPlugins } = setMap()

console.log(entry);
console.log(HtmlWebpackPlugins);

module.exports = {
  // entry: {
  //   main: './src/index.js'
  // },
  entry,
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './map')
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    ...HtmlWebpackPlugins,
    // new HtmlWebpackPlugin({
    //   template: 'index.html'
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css',
    })
  ]
}
