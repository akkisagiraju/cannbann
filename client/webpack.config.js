const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = path.resolve(__dirname, 'public');
const buildPath = path.resolve(__dirname, 'build');

const config = {
  entry: './src/index.tsx',
  output: {
    path: buildPath,
    filename: 'main.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devServer: {
    contentBase: publicPath,
    compress: true,
    port: 3000,
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'ts-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(s*)css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // Convert images < 8kb to base64 strings
            }
          }
        ]
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: './public/index.html',
      chunks: ['app'],
      filename: 'index.html'
    })
  ]
};

module.exports = config;
