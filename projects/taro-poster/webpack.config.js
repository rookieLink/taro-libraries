let path = require('path');
console.log(path.resolve(__dirname, 'dist'));
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname) + '/src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
    // path: 'dist'
  },
  plugins: [],
  externals: {
    //  '@tarojs/taro-weapp': '@tarojs/taro-weapp'
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: [
                      '@babel/preset-env',
                  ],
                  plugins: [
                      ['@babel/plugin-proposal-decorators', {legacy: true}],
                      ['@babel/plugin-proposal-class-properties', {loose: true}],
                  ]
              }
          }
      }
  ]
  }
}