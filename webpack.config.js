const path = require('path');

module.exports = (env, argv) => {

  return {
    mode: argv && argv.mode ? argv.mode : "development",
    devtool: "source-map",
    entry: {
      'index': path.resolve(__dirname, './dist/esm/index.js')
    },
    output: {
      path: path.resolve(__dirname, './dist/umd'), // builds to ./dist/umd/
      filename: '[name].js', // index.js
      library: 'MiddleOut', // aka window.myLibrary
      libraryTarget: 'umd', // supports commonjs, amd and web browsers
      globalObject: 'this'
    },
    module: {
      rules: [
        { test: /\.t|js$/, use: 'babel-loader' }
      ]
    }
  };

};