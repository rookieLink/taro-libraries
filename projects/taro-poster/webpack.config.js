let path = require('path');
console.log(path.resolve(__dirname, 'dist'));
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname) + '/src/main.js',
  output: {
    filename: 'buldle.js',
    path: path.resolve(__dirname, 'dist'),
    // path: 'dist'
  },
  plugins: [],
  externals: {
    //  '@tarojs/taro-weapp': '@tarojs/taro-weapp'
  }
}