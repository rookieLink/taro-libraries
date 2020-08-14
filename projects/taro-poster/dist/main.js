'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Taro = require('@tarojs/taro');
var Taro__default = _interopDefault(Taro);

const { screenWidth } = Taro__default.getSystemInfoSync();
const toPx = function(nrpx = 0) { // 统一算出canvas的单位长度
  // (screenWidth / 750) * npx 设计图大小npx 转canvas px
  return (screenWidth / 750) * nrpx
};

// import mainBgPath from './../test/image/poster-bg.png'
const fun =  function ({canvasId, canvasHeight, canvasWidth, bg}, context, callback=() => {}) {
  console.log(canvasId, canvasHeight, canvasWidth, bg, context);
  const ctx = Taro__default.createCanvasContext(canvasId, context);

  // 开始绘制背景图
  ctx.drawImage(bg, 0, 0, toPx(canvasWidth), toPx(canvasHeight));
  
  ctx.draw(false, () => { setTimeout(() => callback(), 500);} );
};

exports.default = fun;
exports.fun = fun;
