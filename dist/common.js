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
__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _Taro__default$getSys = Taro__default.getSystemInfoSync(),
    screenWidth = _Taro__default$getSys.screenWidth;

var toPx = function toPx() {
  var nrpx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  // 统一算出canvas的单位长度
  // (screenWidth / 750) * npx 设计图大小npx 转canvas px
  return screenWidth / 750 * nrpx;
};

// 下载网络图片
var downloadFile = function downloadFile(url) {
  var errMsg = '部分图片生成超时或失败，可分享给好友，或稍后再试';
  return new Promise(function (resolve, reject) {
    Taro__default.downloadFile({
      url: url.replace('http://', 'https://'),
      success: function success(res) {
        var statusCode = res.statusCode,
            tempFilePath = res.tempFilePath;

        var isFilePathOK = !tempFilePath.includes('.json'); // 中转接口处理失败会返回json串 这里当异常处理
        if (statusCode === 200 && isFilePathOK) {
          console.log('## download success from: ', url, ' || ----to: ', tempFilePath);
          resolve(tempFilePath);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(errMsg);
        }
      },
      fail: function fail() {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(errMsg); // 一般是域名不合法 需要配置
      }
    });
  });
};

var drawElements = function drawElements() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ctx = arguments[1];

  console.log(element.type);
  switch (element.type) {
    case 'MAIN':case 'FILLRECT':
      {
        _drawFillRect(element, ctx);
        break;
      }case 'RECT':
      {
        _drawRect(element, ctx);
        break;
      }case 'IMAGE':
      {
        _drawImage(element, ctx);
        break;
      }case 'CIRCLE':
      {
        _drawCircle(element, ctx);
        break;
      }case 'FILLCIRCLE':
      {
        _drawFillCircle(element, ctx);
        break;
      }case 'TEXT':
      {
        _drawText(element, ctx);
        break;
      }default:
      {
        console.error('暂未提供绘制该元素的方法，请联系开发者为您提供解决方案');
      }
  }
  if (element.elements && element.elements.length > 0) {
    // ctx.save();
    var imgArray = element.elements.filter(function (item) {
      return item.type === 'IMAGE' && !!item.url;
    });
    var promiseList = [];
    imgArray.forEach(function (item) {
      promiseList.push(downloadFile(item.url).then(function (img) {
        item.source = img;
      }));
    });
    Promise.all(promiseList).then(function (success) {
      element.elements.forEach(function (item) {
        console.log(item);
        drawElements(item, ctx);
      });
      ctx.draw(false, function () {
        setTimeout(function () {
          return callback();
        }, 500);
      });
      // ctx.restore();
    }, function (err) {});
  }
};

// 绘制空心矩形
function _drawRect(_ref, ctx) {
  var _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 0 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 0 : _ref$height,
      _ref$opacity = _ref.opacity,
      opacity = _ref$opacity === undefined ? 1 : _ref$opacity,
      _ref$borderWidth = _ref.borderWidth,
      borderWidth = _ref$borderWidth === undefined ? 1 : _ref$borderWidth,
      _ref$borderRadius = _ref.borderRadius,
      borderRadius = _ref$borderRadius === undefined ? 0 : _ref$borderRadius,
      _ref$borderColor = _ref.borderColor,
      borderColor = _ref$borderColor === undefined ? '#000000' : _ref$borderColor;

  x = toPx(x);
  y = toPx(y);
  width = toPx(width);
  height = toPx(height);
  borderWidth = toPx(borderWidth);
  borderRadius = toPx(borderRadius);
  ctx.save();
  ctx.setGlobalAlpha(opacity);
  ctx.setStrokeStyle(borderColor);
  ctx.setLineWidth(borderWidth);
  if (borderRadius > 0) {
    // 画圆角矩形边框
    _drawRadiusRect({ x: x, y: y, width: width, height: height, borderRadius: borderRadius }, ctx);
    ctx.stroke();
  } else {
    ctx.strokeRect(x, y, width, height);
  }
  ctx.restore();
}
// 绘制实心矩形
function _drawFillRect(_ref2, ctx) {
  var _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? 0 : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? 0 : _ref2$y,
      _ref2$width = _ref2.width,
      width = _ref2$width === undefined ? 0 : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === undefined ? 0 : _ref2$height,
      _ref2$opacity = _ref2.opacity,
      opacity = _ref2$opacity === undefined ? 1 : _ref2$opacity,
      _ref2$borderRadius = _ref2.borderRadius,
      borderRadius = _ref2$borderRadius === undefined ? 0 : _ref2$borderRadius,
      _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === undefined ? '#000000' : _ref2$backgroundColor;

  // 画面
  x = toPx(x);
  y = toPx(y);
  width = toPx(width);
  height = toPx(height);
  borderRadius = toPx(borderRadius);
  console.log(x, y, width, height, borderRadius);

  ctx.save();
  ctx.setGlobalAlpha(opacity);
  ctx.setFillStyle(backgroundColor);
  if (borderRadius > 0) {
    // 画圆角矩形
    _drawRadiusRect({ x: x, y: y, width: width, height: height, borderRadius: borderRadius }, ctx);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, width, height);
  }
  ctx.restore();
}
// 绘制图片
function _drawImage(_ref3, ctx) {
  var _ref3$x = _ref3.x,
      x = _ref3$x === undefined ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === undefined ? 0 : _ref3$y,
      _ref3$width = _ref3.width,
      width = _ref3$width === undefined ? 0 : _ref3$width,
      _ref3$height = _ref3.height,
      height = _ref3$height === undefined ? 0 : _ref3$height,
      _ref3$url = _ref3.url,
      url = _ref3$url === undefined ? '' : _ref3$url,
      source = _ref3.source,
      borderRadius = _ref3.borderRadius;

  x = toPx(x);
  y = toPx(y);
  width = toPx(width);
  height = toPx(height);
  borderRadius = toPx(borderRadius);
  console.log('绘制图片');

  ctx.save();
  if (borderRadius > 0) {
    _drawRadiusRect({ x: x, y: y, width: width, height: height, borderRadius: borderRadius }, ctx);
    ctx.setStrokeStyle('rgba(255,255,255,0)');
    ctx.stroke();
    ctx.clip();
  }
  ctx.drawImage(source, x, y, width, height);
  // ctx.draw(true)
  ctx.restore();
  // ctx.draw(true)
}
// 绘制空心圆形
function _drawCircle(_ref4, ctx) {
  var x = _ref4.x,
      y = _ref4.y,
      r = _ref4.r,
      _ref4$sAngle = _ref4.sAngle,
      sAngle = _ref4$sAngle === undefined ? 0 : _ref4$sAngle,
      _ref4$eAngle = _ref4.eAngle,
      eAngle = _ref4$eAngle === undefined ? 360 : _ref4$eAngle,
      _ref4$counterclockwis = _ref4.counterclockwise,
      counterclockwise = _ref4$counterclockwis === undefined ? false : _ref4$counterclockwis,
      _ref4$borderWidth = _ref4.borderWidth,
      borderWidth = _ref4$borderWidth === undefined ? 0 : _ref4$borderWidth,
      _ref4$borderColor = _ref4.borderColor,
      borderColor = _ref4$borderColor === undefined ? 'blank' : _ref4$borderColor;

  x = toPx(x);
  y = toPx(y);
  r = toPx(r);
  borderWidth = toPx(borderWidth);
  ctx.save();
  ctx.setLineWidth(borderWidth);
  ctx.setStrokeStyle(borderColor);
  ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
  ctx.stroke();
  ctx.restore();
}
// 绘制填充圆形
function _drawFillCircle(_ref5, ctx) {
  var x = _ref5.x,
      y = _ref5.y,
      r = _ref5.r,
      _ref5$sAngle = _ref5.sAngle,
      sAngle = _ref5$sAngle === undefined ? 0 : _ref5$sAngle,
      _ref5$eAngle = _ref5.eAngle,
      eAngle = _ref5$eAngle === undefined ? 360 : _ref5$eAngle,
      _ref5$counterclockwis = _ref5.counterclockwise,
      counterclockwise = _ref5$counterclockwis === undefined ? false : _ref5$counterclockwis,
      _ref5$borderWidth = _ref5.borderWidth,
      borderWidth = _ref5$borderWidth === undefined ? 0 : _ref5$borderWidth,
      _ref5$backgroundColor = _ref5.backgroundColor,
      backgroundColor = _ref5$backgroundColor === undefined ? 'blank' : _ref5$backgroundColor;

  x = toPx(x);
  y = toPx(y);
  r = toPx(r);
  borderWidth = toPx(borderWidth);
  ctx.save();
  ctx.setFillStyle(backgroundColor);
  ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
  ctx.fill();
  ctx.restore();
}
// 绘制文字
/**
 * 渲染一段文字
 */
function _drawText(_ref6, ctx) {
  var x = _ref6.x,
      y = _ref6.y,
      fontSize = _ref6.fontSize,
      _ref6$fontColor = _ref6.fontColor,
      fontColor = _ref6$fontColor === undefined ? "red" : _ref6$fontColor,
      baseLine = _ref6.baseLine,
      _ref6$textAlign = _ref6.textAlign,
      textAlign = _ref6$textAlign === undefined ? 'left' : _ref6$textAlign,
      text = _ref6.text,
      _ref6$opacity = _ref6.opacity,
      opacity = _ref6$opacity === undefined ? 1 : _ref6$opacity,
      _ref6$textDecoration = _ref6.textDecoration,
      textDecoration = _ref6$textDecoration === undefined ? 'none' : _ref6$textDecoration,
      _ref6$width = _ref6.width,
      width = _ref6$width === undefined ? 1000 : _ref6$width,
      _ref6$lineNum = _ref6.lineNum,
      lineNum = _ref6$lineNum === undefined ? 1 : _ref6$lineNum,
      _ref6$lineHeight = _ref6.lineHeight,
      lineHeight = _ref6$lineHeight === undefined ? 0 : _ref6$lineHeight,
      _ref6$fontWeight = _ref6.fontWeight,
      fontWeight = _ref6$fontWeight === undefined ? 'normal' : _ref6$fontWeight,
      _ref6$fontStyle = _ref6.fontStyle,
      fontStyle = _ref6$fontStyle === undefined ? 'normal' : _ref6$fontStyle,
      _ref6$fontFamily = _ref6.fontFamily,
      fontFamily = _ref6$fontFamily === undefined ? "sans-serif" : _ref6$fontFamily;

  x = toPx(x);
  y = toPx(y);
  fontSize = toPx(fontSize);
  width = toPx(width);
  lineNum = Number(lineNum);

  console.log('》》》》》》开始绘制文本内容');
  ctx.save();
  ctx.beginPath();
  ctx.setFontSize(fontSize);
  ctx.setGlobalAlpha(opacity);
  // this.ctx.setFontSize(this.toPx(fontSize));
  ctx.setFillStyle(fontColor);
  ctx.setTextBaseline(baseLine);
  ctx.setTextAlign(textAlign);
  var textWidth = ctx.measureText(text).width;
  var textArr = [];
  if (textWidth > width) {
    // 文本宽度 大于 渲染宽度
    var fillText = '';
    var line = 1;
    for (var i = 0; i <= text.length - 1; i++) {
      // 将文字转为数组，一行文字一个元素
      fillText = fillText + text[i];
      if (ctx.measureText(fillText).width >= width) {
        if (line === lineNum) {
          if (i !== text.length - 1) {
            fillText = fillText.substring(0, fillText.length - 1) + '...';
          }
        }
        if (line <= lineNum) {
          textArr.push(fillText);
        }
        fillText = '';
        line++;
      } else {
        if (line <= lineNum) {
          if (i === text.length - 1) {
            textArr.push(fillText);
          }
        }
      }
    }
    textWidth = width;
  } else {
    textArr.push(text);
  }

  textArr.forEach(function (item, index) {
    ctx.fillText(item, x, y + (lineHeight || fontSize) * index);
  });
  // ctx.draw(true)

  ctx.restore();

  // textDecoration
  if (textDecoration !== 'none') {
    var lineY = y;
    if (textDecoration === 'line-through') {
      // 目前只支持贯穿线
      lineY = y;
      // 小程序画布baseLine偏移阈值
      var threshold = 5;
      // 根据baseLine的不同对贯穿线的Y坐标做相应调整
      switch (baseLine) {
        case 'top':
          lineY += fontSize / 2 + threshold;
          break;
        case 'middle':
          break;
        case 'bottom':
          lineY -= fontSize / 2 + threshold;
          break;
        default:
          lineY -= fontSize / 2 - threshold;
          break;
      }
    }
    ctx.save();
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + textWidth, lineY);
    ctx.setStrokeStyle(color);
    ctx.stroke();
    // ctx.draw(true)

    ctx.restore();
  }

  return textWidth;
}

function _drawRadiusRect(_ref7, ctx) {
  var x = _ref7.x,
      y = _ref7.y,
      width = _ref7.width,
      height = _ref7.height,
      borderRadius = _ref7.borderRadius;

  console.log(x, y, width, height, borderRadius);
  // ctx.fillRect(x, y, width, height);
  x = Number(x);
  y = Number(y);
  width = Number(width);
  height = Number(height);
  borderRadius = Number(borderRadius);

  var br = borderRadius / 2;
  ctx.beginPath();
  ctx.moveTo(x + br, y); // 移动到左上角的点
  ctx.lineTo(x + width - br, y);
  ctx.arc(x + width - br, y + br, br, 2 * Math.PI * 0.75, 2 * Math.PI * 1);
  ctx.lineTo(x + width, y + height - br);
  ctx.arc(x + width - br, y + height - br, br, 0, 2 * Math.PI * 0.25);
  ctx.lineTo(x + br, y + height);
  ctx.arc(x + br, y + height - br, br, 2 * Math.PI * 0.25, 2 * Math.PI * 0.5);
  ctx.lineTo(x, y + br);
  ctx.arc(x + br, y + br, br, 2 * Math.PI * 0.5, 2 * Math.PI * 0.75);
  // ctx.stroke()
  // ctx.fillRect(x, y, width, height);
}

// // 绘制文本
// function _drawText({text= '', x= 0, y= 0, maxWidth= 0}, {fontSize= 20, color='black'},  ctx) {
//   ctx.save();
//   ctx.setFontSize(toPx(fontSize));
//   ctx.setFillStyle(color)
//   ctx.fillText(text, toPx(x), toPx(y));
//   ctx.restore();
// }

// // 第一个参数为config， 第二个参数为style， 第三个参数为canvasContext上下文
// // 绘制矩形
// function _drawRect({x, y, width, height}, {color='black', lineWidth= 1},  ctx) {
//   ctx.save();
//   ctx.setStrokeStyle(color);
//   ctx.setLineWidth(lineWidth);
//   ctx.strokeRect(toPx(x), toPx(y), toPx(width), toPx(height));
//   ctx.restore();
// }

// // 绘制填充矩形
// function _drawFillReact({x, y, width, height}, {color="black"}, ctx) {
//   ctx.save();
//   ctx.setFillStyle(color);
//   ctx.fillRect(toPx(x), toPx(y), toPx(width), toPx(height));
//   ctx.restore();
// }

// // 绘制图片
// function _drawImage({x, y, width, height, source}, ctx) {
//   ctx.save();
//   ctx.drawImage(source, toPx(x), toPx(y), toPx(width), toPx(height));
//   ctx.restore();
// }
// // 绘制圆形
// function _drawCircle({x, y, r, sAngle=0, eAngle=360, counterclockwise=false}, {lineWidth=0, color='blank'}, ctx) {
//   ctx.save()
//   ctx.setLineWidth(lineWidth)
//   ctx.setStrokeStyle(color)
//   ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
//   ctx.stroke()
//   ctx.restore()
// }
// // 绘制填充圆形
// function _drawFillCircle({x, y, r, sAngle=0, eAngle=360, counterclockwise=false}, {color="#ffffff"}, ctx) {
//   ctx.save()
//   // ctx.beginPath()
//   ctx.setFillStyle(color)
//   ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
//   ctx.fill()
//   ctx.restore()
// }
// function _drawLine() {}

var paintCanvas = function paintCanvas(canvasId, configObj, context) {
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

  var ctx = Taro__default.createCanvasContext(canvasId, context);
  drawElements(configObj, ctx);
  // ctx.draw(true);
};

exports.default = paintCanvas;
exports.paintCanvas = paintCanvas;

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