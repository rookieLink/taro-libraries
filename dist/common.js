(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./projects/taro-poster/dist/main.js":
/*!*******************************************!*\
  !*** ./projects/taro-poster/dist/main.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var Taro = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");
var Taro__default = _interopDefault(Taro);

var _Taro__default$getSys = Taro__default.getSystemInfoSync(),
    screenWidth = _Taro__default$getSys.screenWidth;

var toPx = function toPx() {
  var nrpx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  // 统一算出canvas的单位长度
  // (screenWidth / 750) * npx 设计图大小npx 转canvas px
  return screenWidth / 750 * nrpx;
};

// import mainBgPath from './../test/image/poster-bg.png'
var fun = function fun(_ref, context) {
  var canvasId = _ref.canvasId,
      canvasHeight = _ref.canvasHeight,
      canvasWidth = _ref.canvasWidth,
      bg = _ref.bg;
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  console.log(canvasId, canvasHeight, canvasWidth, bg, context);
  var ctx = Taro__default.createCanvasContext(canvasId, context);

  // 开始绘制背景图
  ctx.drawImage(bg, 0, 0, toPx(canvasWidth), toPx(canvasHeight));

  ctx.draw(false, function () {
    setTimeout(function () {
      return callback();
    }, 500);
  });
};

exports.default = fun;
exports.fun = fun;

/***/ }),

/***/ "./projects/taro-poster/index.js":
/*!***************************************!*\
  !*** ./projects/taro-poster/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _main = __webpack_require__(/*! ./dist/main */ "./projects/taro-poster/dist/main.js");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mainfun from './src/main'
console.log(typeof _main2.default === 'undefined' ? 'undefined' : _typeof(_main2.default));

// mainfun()
exports.default = _main2.default;

/***/ })

}]);