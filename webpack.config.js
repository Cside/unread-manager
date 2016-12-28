const webpack = require('webpack');
const AsyncAwaitPlugin = require('webpack-async-await');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:3000', // WebSocket Runtime
    'webpack/hot/dev-server', // HMR dispatch Runtime
    './src/index.jsx',
  ],
  output: {
    path: 'public',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new AsyncAwaitPlugin({}),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
      },
    ],
  },
};
