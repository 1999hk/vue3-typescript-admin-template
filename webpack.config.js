
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: {
    main: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  // 美化自定义输入的loader
  resolveLoader: {
    // 先去node_modules去找loader 找不到就去./myLoaders找
    modules: ['node_modules', "./myLoaders"]
  },

  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.less$/,
        // use: [
        //   // 把css抽离成独立的css文件
        //   MiniCssExtractPlugin.loader,
        //   {
        //     loader: 'css-loader',
        //     // options: {}
        //   },
        //   'postcss-loader',
        //   'less-loader'
        // ]
        use: ['lin-style-loader', 'lin-css-loader', 'lin-less-loader']
      },
      // 测试myLoaders
      {
        test: /\.js$/,
        // use: { // 执行单个loader
        //   loader: path.resolve(__dirname, './myLoaders/replace-loader.js'), // 要使用绝对路径
        //   options: {
        //     info: 'lin'
        //   }
        // }
        use: [ // 执行多个loader
          // path.resolve(__dirname, './myLoaders/replace-loader.js'), // 要使用绝对路径
          // {
          //   loader: path.resolve(__dirname, './myLoaders/replace-async-loader.js'), // 要使用绝对路径
          //   options: {
          //     info: 'world'
          //   }
          // }
          'replace-loader', // 要使用绝对路径
          // {
          'replace-async-loader', // 要使用绝对路径
            // options: {
            //   info: 'world'
            // }
          // }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // 仅对production模式有效
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]

}