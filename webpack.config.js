const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  node: { process: false },
  entry: {
    node: './src/index.js',
    browser: './src/index-browser.js',
  },
  output: {
    filename: 'index-[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
};
