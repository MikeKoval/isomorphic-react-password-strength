var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/example'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules')},
      {
        test: /\.js$/,
        include: [/example/, /dist/],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
