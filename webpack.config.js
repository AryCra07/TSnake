const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {template} = require("@babel/core"); // 清除上一次打包生成的文件

module.exports = {
  entry: './src/index.ts',
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader', // babel-loader 会调用 @babel/core
            options: {
              presets: [
                [
                  '@babel/preset-env', {
                  targets: {
                    chrome: '110',
                  },
                  corejs: '3',
                  useBuiltIns: 'usage'
                }
                ],
              ]
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/
      },

      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    }
                  ]
                ]
              }
            }
          },
          'less-loader',
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin(
      {template: './src/index.html'}
    ),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
}
