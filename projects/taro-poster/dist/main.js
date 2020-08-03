'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Taro = require('@tarojs/taro');
var Taro__default = _interopDefault(Taro);

const fun =  function () {
  Taro__default.showLoading();
  setTimeout(() => {
    Taro__default.hideLoading();
  }, 5000);
};

// export default fun

exports.fun = fun;
