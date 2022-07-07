const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [
      path.resolve(), 
      'node_modules'
    ]
  },
    plugins: [
        new webpack.ProvidePlugin({
            p5: 'p5',
        }),
    ],
};