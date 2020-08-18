import Taro from '@tarojs/taro';

const { screenWidth } = Taro.getSystemInfoSync();

const toPx = function(nrpx = 0) { // 统一算出canvas的单位长度
  // (screenWidth / 750) * npx 设计图大小npx 转canvas px
  return (screenWidth / 750) * nrpx
};

const drawElements = function(elements=[], ctx) {
  elements.forEach(element => {
    console.log(element);
    switch(element.type) {
      case 'TEXT': {
        _drawText(element.config, element.style, ctx);
        break;
      }      case 'IMAGE': {
        _drawImage(element.config, ctx);
        break;
      }      case 'RECT' : {
        _drawRect(element.config, element.style, ctx);
        break;
      }      case 'FILLRECT': {
        _drawFillReact(element.config, element.style, ctx);
        break;
      }      case 'LINE': break;
      case 'CIRCLE': {
        _drawCircle(element.config, element.style, ctx);
        break;
      }      case 'FILLCIRCLE': {
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

function _drawText({text= '', x= 0, y= 0, maxWidth= 0}, {fontSize= 20, color='black'},  ctx) {
  ctx.save();
  ctx.setFontSize(toPx(fontSize));
  ctx.setFillStyle(color);
  ctx.fillText(text, toPx(x), toPx(y));
  ctx.restore();
}

// 第一个参数为config， 第二个参数为style， 第三个参数为canvasContext上下文
function _drawRect({x, y, width, height}, {color='black', lineWidth= 1},  ctx) {
  ctx.save();
  ctx.setStrokeStyle(color);
  ctx.setLineWidth(lineWidth);
  ctx.strokeRect(toPx(x), toPx(y), toPx(width), toPx(height));
  ctx.restore();
}

function _drawFillReact({x, y, width, height}, {color="black"}, ctx) {
  ctx.save();
  ctx.setFillStyle(color);
  ctx.fillRect(toPx(x), toPx(y), toPx(width), toPx(height));
  ctx.restore();
}

function _drawImage({x, y, width, height, source}, ctx) {
  ctx.save();
  ctx.drawImage(source, toPx(x), toPx(y), toPx(width), toPx(height));
  ctx.restore();
}

function _drawCircle({x, y, r, sAngle=0, eAngle=360, counterclockwise=false}, {lineWidth=0, color='blank'}, ctx) {
  ctx.save();
  ctx.setLineWidth(lineWidth);
  ctx.setStrokeStyle(color);
  ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
  ctx.stroke();
  ctx.restore();
}

function _drawFillCircle({x, y, r, sAngle=0, eAngle=360, counterclockwise=false}, {color="#ffffff"}, ctx) {
  ctx.save();
  // ctx.beginPath()
  ctx.setFillStyle(color);
  ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
  ctx.fill();
  ctx.restore();
}

// export const

const fun =  function ({canvasId, canvasHeight, canvasWidth, bg, elements=[]}, context, callback=() => {}) {
  console.log(canvasId, canvasHeight, canvasWidth, bg, context);
  const ctx = Taro.createCanvasContext(canvasId, context);

  // 开始绘制背景图
  // ctx.clip()
  ctx.drawImage(bg, 0, 0, toPx(canvasWidth), toPx(canvasHeight));

  drawElements(elements, ctx);
  ctx.draw(false, () => { setTimeout(() => callback(), 500);} );
};

export default fun;
export { fun };
