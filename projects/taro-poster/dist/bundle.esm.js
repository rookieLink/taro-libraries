import Taro from '@tarojs/taro';
import 'prop-types';

const { screenWidth } = Taro.getSystemInfoSync();

const toPx = function(nrpx = 0) { // 统一算出canvas的单位长度
  // (screenWidth / 750) * npx 设计图大小npx 转canvas px
  return (screenWidth / 750) * nrpx
};

// 下载网络图片
const downloadFile = (url) => {
  const errMsg = '部分图片生成超时或失败，可分享给好友，或稍后再试';
  return new Promise((resolve, reject) => {
    Taro.downloadFile({
      url: url.replace('http://', 'https://'),
      success: res => {
        let {statusCode, tempFilePath} = res;
        const isFilePathOK = !tempFilePath.includes('.json'); // 中转接口处理失败会返回json串 这里当异常处理
        if (statusCode === 200 && isFilePathOK) {
          console.log('## download success from: ', url, ' || ----to: ', tempFilePath);
          resolve(tempFilePath);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(errMsg);
        }
      },
      fail: () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(errMsg); // 一般是域名不合法 需要配置
      }
    });
  })
};

const drawElements = function(element={}, ctx) {
  console.log(element.type);
  switch(element.type) {
    case 'MAIN': case 'FILLRECT': {
      _drawFillRect(element, ctx);
      break;
    }    case 'RECT': {
      _drawRect(element, ctx);
      break;
    }    case 'IMAGE': {
      _drawImage(element, ctx);
      break;
    }    case 'CIRCLE': {
      _drawCircle(element, ctx);
      break;
    }    case 'FILLCIRCLE': {
      _drawFillCircle(element, ctx);
      break;
    }    case 'TEXT': {
      _drawText(element, ctx);
      break;
    }    default: {
      console.error('暂未提供绘制该元素的方法，请联系开发者为您提供解决方案');
    }
  }
  if (element.elements && element.elements.length > 0) {
    // ctx.save();
    const imgArray = element.elements.filter(item => {
      return item.type==='IMAGE' && !!item.url;
    });
    const promiseList = [];
    imgArray.forEach(item => {
      promiseList.push(
        downloadFile(item.url).then(img => {
          item.source = img;
        }));
    });
    Promise.all(promiseList).then(success => {
      element.elements.forEach(item => {
        console.log(item);
        drawElements(item, ctx);
      });
      ctx.draw(false, () => { setTimeout(() => callback(), 500);} );
    // ctx.restore();
    }, err => {
    });
  }
};

// 绘制空心矩形
function _drawRect({x=0, y=0, width=0, height=0, opacity=1,borderWidth=1,borderRadius=0, borderColor='#000000'}, ctx) {
  x=toPx(x);
  y=toPx(y);
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
      _drawRadiusRect({x, y, width, height, borderRadius}, ctx);
      ctx.stroke();
  } else {
      ctx.strokeRect(x, y, width, height);
  }
  ctx.restore();
}
// 绘制实心矩形
function _drawFillRect({x=0, y=0, width=0, height=0, opacity=1,borderRadius=0, backgroundColor='#000000'}, ctx) {
  // 画面
  x=toPx(x);
  y=toPx(y);
  width = toPx(width);
  height = toPx(height);
  borderRadius = toPx(borderRadius);
  console.log(x, y, width, height, borderRadius);

  ctx.save();
  ctx.setGlobalAlpha(opacity);
  ctx.setFillStyle(backgroundColor);
  if (borderRadius > 0) {
    // 画圆角矩形
    _drawRadiusRect({x, y, width, height, borderRadius}, ctx);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, width, height);
  }
  ctx.restore();
}
// 绘制图片
function _drawImage({x=0, y=0, width=0, height=0, url='', source, borderRadius}, ctx) {
  x=toPx(x);
  y=toPx(y);
  width = toPx(width);
  height = toPx(height);
  borderRadius = toPx(borderRadius);
  console.log('绘制图片');

  ctx.save();
  if(borderRadius > 0) {
    _drawRadiusRect({x, y, width, height, borderRadius}, ctx);
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
function _drawCircle({x, y, r, sAngle=0, eAngle=360, counterclockwise=false, borderWidth=0, borderColor='blank'},  ctx) {
  x=toPx(x);
  y=toPx(y);
  r=toPx(r);
  borderWidth = toPx(borderWidth);
  ctx.save();
  ctx.setLineWidth(borderWidth);
  ctx.setStrokeStyle(borderColor);
  ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
  ctx.stroke();
  ctx.restore();
}
// 绘制填充圆形
function _drawFillCircle({x, y, r, sAngle=0, eAngle=360, counterclockwise=false, borderWidth=0, backgroundColor='blank'}, ctx) {
  x=toPx(x);
  y=toPx(y);
  r=toPx(r);
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
function _drawText({ x, y, fontSize, fontColor="red", baseLine, textAlign = 'left', text, opacity = 1, textDecoration = 'none',
  width=1000, lineNum = 1, lineHeight = 0, fontWeight = 'normal', fontStyle = 'normal', fontFamily = "sans-serif"}, ctx) {
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
    let textWidth = ctx.measureText(text).width;
    const textArr = [];
     if (textWidth > width) {
      // 文本宽度 大于 渲染宽度
      let fillText = '';
      let line = 1;
      for (let i = 0; i <= text.length - 1 ; i++) {  // 将文字转为数组，一行文字一个元素
        fillText = fillText + text[i];
        if (ctx.measureText(fillText).width >= width) {
          if (line === lineNum) {
            if (i !== text.length - 1) {
              fillText = fillText.substring(0, fillText.length - 1) + '...';
            }
          }
          if(line <= lineNum) {
            textArr.push(fillText);
          }
          fillText = '';
          line++;
        } else {
          if(line <= lineNum) {
            if(i === text.length -1){
               textArr.push(fillText);
            }
          }
        }
      }
      textWidth = width;
    } else {
      textArr.push(text);
    }

    textArr.forEach((item, index) => {
        ctx.fillText(item, x, y + (lineHeight || fontSize) * index);
    });
    // ctx.draw(true)

    ctx.restore();

    // textDecoration
    if (textDecoration !== 'none') {
        let lineY = y;
        if (textDecoration === 'line-through') {
            // 目前只支持贯穿线
            lineY = y;
            // 小程序画布baseLine偏移阈值
            let threshold = 5;
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

function _drawRadiusRect({x, y, width, height, borderRadius}, ctx) {
  console.log(x, y, width, height, borderRadius);
  // ctx.fillRect(x, y, width, height);
  x = Number(x);
  y = Number(y);
  width = Number(width);
  height = Number(height);
  borderRadius = Number(borderRadius);


  const br = borderRadius / 2;
  ctx.beginPath();
  ctx.moveTo(x + br, y);    // 移动到左上角的点
  ctx.lineTo(x + width - br, y);
  ctx.arc(x + width - br, y + br, br, 2 * Math.PI * (3 / 4), 2 * Math.PI * (4 / 4));
  ctx.lineTo(x + width, y + height - br);
  ctx.arc(x + width - br, y + height - br, br, 0, 2 * Math.PI * (1 / 4));
  ctx.lineTo(x + br, y + height);
  ctx.arc(x + br, y + height - br, br, 2 * Math.PI * (1 / 4), 2 * Math.PI * (2 / 4));
  ctx.lineTo(x, y + br);
  ctx.arc(x + br, y + br, br, 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
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

const paintCanvas =  function (canvasId, configObj, context, callback=() => {}) {
  const ctx = Taro.createCanvasContext(canvasId, context);
  drawElements(configObj, ctx);
  // ctx.draw(true);
};

export default paintCanvas;
export { paintCanvas };
