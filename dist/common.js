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

var drawElements = function drawElements() {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var ctx = arguments[1];

  elements.forEach(function (element) {
    console.log(element);
    switch (element.type) {
      case 'TEXT':
        {
          _drawText(element.config, element.style, ctx);
          break;
        }case 'IMAGE':
        {
          _drawImage(element.config, ctx);
          break;
        }case 'RECT':
        {
          _drawRect(element.config, element.style, ctx);
          break;
        }case 'FILLRECT':
        {
          _drawFillReact(element.config, element.style, ctx);
          break;
        }case 'LINE':
        break;
      case 'CIRCLE':
        {
          _drawCircle(element.config, element.style, ctx);
          break;
        }case 'FILLCIRCLE':
        {
          _drawFillCircle(element.config, element.style, ctx);
          break;
        }
    }
    if (element.elements && element.elements.length > 0) {
      ctx.save();
      ctx.clip();
      drawElements(element.elements, ctx);
      ctx.restore();
    }
  });
};

function _drawText(_ref, _ref2, ctx) {
  var _ref$text = _ref.text,
      text = _ref$text === undefined ? '' : _ref$text,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$maxWidth = _ref.maxWidth,
      maxWidth = _ref$maxWidth === undefined ? 0 : _ref$maxWidth;
  var _ref2$fontSize = _ref2.fontSize,
      fontSize = _ref2$fontSize === undefined ? 20 : _ref2$fontSize,
      _ref2$color = _ref2.color,
      color = _ref2$color === undefined ? 'black' : _ref2$color;

  ctx.save();
  ctx.setFontSize(toPx(fontSize));
  ctx.setFillStyle(color);
  ctx.fillText(text, toPx(x), toPx(y));
  ctx.restore();
}

// 第一个参数为config， 第二个参数为style， 第三个参数为canvasContext上下文
function _drawRect(_ref3, _ref4, ctx) {
  var x = _ref3.x,
      y = _ref3.y,
      width = _ref3.width,
      height = _ref3.height;
  var _ref4$color = _ref4.color,
      color = _ref4$color === undefined ? 'black' : _ref4$color,
      _ref4$lineWidth = _ref4.lineWidth,
      lineWidth = _ref4$lineWidth === undefined ? 1 : _ref4$lineWidth;

  ctx.save();
  ctx.setStrokeStyle(color);
  ctx.setLineWidth(lineWidth);
  ctx.strokeRect(toPx(x), toPx(y), toPx(width), toPx(height));
  ctx.restore();
}

function _drawFillReact(_ref5, _ref6, ctx) {
  var x = _ref5.x,
      y = _ref5.y,
      width = _ref5.width,
      height = _ref5.height;
  var _ref6$color = _ref6.color,
      color = _ref6$color === undefined ? "black" : _ref6$color;

  ctx.save();
  ctx.setFillStyle(color);
  ctx.fillRect(toPx(x), toPx(y), toPx(width), toPx(height));
  ctx.restore();
}

function _drawImage(_ref7, ctx) {
  var x = _ref7.x,
      y = _ref7.y,
      width = _ref7.width,
      height = _ref7.height,
      source = _ref7.source;

  ctx.save();
  ctx.drawImage(source, toPx(x), toPx(y), toPx(width), toPx(height));
  ctx.restore();
}

function _drawCircle(_ref8, _ref9, ctx) {
  var x = _ref8.x,
      y = _ref8.y,
      r = _ref8.r,
      _ref8$sAngle = _ref8.sAngle,
      sAngle = _ref8$sAngle === undefined ? 0 : _ref8$sAngle,
      _ref8$eAngle = _ref8.eAngle,
      eAngle = _ref8$eAngle === undefined ? 360 : _ref8$eAngle,
      _ref8$counterclockwis = _ref8.counterclockwise,
      counterclockwise = _ref8$counterclockwis === undefined ? false : _ref8$counterclockwis;
  var _ref9$lineWidth = _ref9.lineWidth,
      lineWidth = _ref9$lineWidth === undefined ? 0 : _ref9$lineWidth,
      _ref9$color = _ref9.color,
      color = _ref9$color === undefined ? 'blank' : _ref9$color;

  ctx.save();
  ctx.setLineWidth(lineWidth);
  ctx.setStrokeStyle(color);
  ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
  ctx.stroke();
  ctx.restore();
}

function _drawFillCircle(_ref10, _ref11, ctx) {
  var x = _ref10.x,
      y = _ref10.y,
      r = _ref10.r,
      _ref10$sAngle = _ref10.sAngle,
      sAngle = _ref10$sAngle === undefined ? 0 : _ref10$sAngle,
      _ref10$eAngle = _ref10.eAngle,
      eAngle = _ref10$eAngle === undefined ? 360 : _ref10$eAngle,
      _ref10$counterclockwi = _ref10.counterclockwise,
      counterclockwise = _ref10$counterclockwi === undefined ? false : _ref10$counterclockwi;
  var _ref11$color = _ref11.color,
      color = _ref11$color === undefined ? "#ffffff" : _ref11$color;

  ctx.save();
  // ctx.beginPath()
  ctx.setFillStyle(color);
  ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
  ctx.fill();
  ctx.restore();
}

// export const

var fun = function fun(_ref12, context) {
  var canvasId = _ref12.canvasId,
      canvasHeight = _ref12.canvasHeight,
      canvasWidth = _ref12.canvasWidth,
      bg = _ref12.bg,
      _ref12$elements = _ref12.elements,
      elements = _ref12$elements === undefined ? [] : _ref12$elements;
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  console.log(canvasId, canvasHeight, canvasWidth, bg, context);
  var ctx = Taro__default.createCanvasContext(canvasId, context);

  // 开始绘制背景图
  // ctx.clip()
  ctx.drawImage(bg, 0, 0, toPx(canvasWidth), toPx(canvasHeight));

  drawElements(elements, ctx);
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