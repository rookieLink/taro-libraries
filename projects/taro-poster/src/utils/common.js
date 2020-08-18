import Taro from '@tarojs/taro'

const { screenWidth } = Taro.getSystemInfoSync()

export const toPx = function(nrpx = 0) { // 统一算出canvas的单位长度
  // (screenWidth / 750) * npx 设计图大小npx 转canvas px
  return (screenWidth / 750) * nrpx
}

export const saveCode = function(codeBuffer) {
  return new Promise((resolve, reject) => {
    const base64 = Taro.arrayBufferToBase64(codeBuffer)
    const fsm = Taro.getFileSystemManager();
    const FILE_BASE_NAME = 'tmp_base64src';
  
    const filePath = `${Taro.env.USER_DATA_PATH}/${FILE_BASE_NAME}.png`
    fsm.writeFile({
      filePath,
      data: base64,
      encoding: 'base64',
      success(res) {
        // localImagePath.wxCodePath = filePath
        resolve(filePath);
      },
      fail(res) {
        reject(new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  })
}

// 保存图片到本地相册
export const saveImage = (localImage, successCallback, isNet = false) => {
  if (!localImage) {
    Taro.showToast({
      title: '获取图片失败，请稍后重试',
      icon: 'none'
    })
    return
  }

  let _save = () => {
    Taro.saveImageToPhotosAlbum({
      filePath: localImage,
      success() {
        Taro.showToast({
          title: '保存成功'
        })
        successCallback && successCallback()
      },
      fail: () => {
        Taro.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    })
  }
  let save = () => {}
  if (isNet) {
    save = () => {
      Taro.getImageInfo({
        src: localImage,
        success: res => {
          localImage = res.path
          _save()
        }
      })
    }
  } else {
    save = _save
  }
  Taro.getSetting({
    success: res => {
      // 如果没有则获取授权
      if (!res.authSetting['scope.writePhotosAlbum']) {
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',
          success: () => {
            save()
          },
          fail: () => {
            // 首次禁止授权 二次授权无响应的问题
            Taro.showToast({
              title: '请在"右上角菜单->设置"打开相册权限',
              icon: 'none'
            })
          }
        })
      } else {
        // 有则直接保存
        save()
      }
    }
  })
}

export const transCanvasToFile = function(canvasId) {
  Taro.canvasToTempFilePath({
    x: 0,
    y: 0,
    canvasId: canvasId,
    success: res => {
      let shareImg = res.tempFilePath
    },
    fail: res => {
    }
  })
}

export const drawElements = function(elements=[], ctx) {
  elements.forEach(element => {
    console.log(element);
    switch(element.type) {
      case 'TEXT': {
        _drawText(element.config, element.style, ctx);
        break;
      };
      case 'IMAGE': {
        _drawImage(element.config, ctx);
        break;
      };
      case 'RECT' : {
        _drawRect(element.config, element.style, ctx);
        break;
      };
      case 'FILLRECT': {
        _drawFillReact(element.config, element.style, ctx);
        break;
      };
      case 'LINE': break;
      case 'CIRCLE': {
        _drawCircle(element.config, element.style, ctx);
        break;
      };
      case 'FILLCIRCLE': {
        _drawFillCircle(element.config, element.style, ctx);
        break;
      }
      default: break;
    }
    if (element.elements && element.elements.length > 0) {
      ctx.save();
      ctx.clip();
      drawElements(element.elements, ctx);
      ctx.restore();
    }
  })
}

function _drawText({text= '', x= 0, y= 0, maxWidth= 0}, {fontSize= 20, color='black'},  ctx) {
  ctx.save();
  ctx.setFontSize(toPx(fontSize));
  ctx.setFillStyle(color)
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
  ctx.save()
  ctx.setLineWidth(lineWidth)
  ctx.setStrokeStyle(color)
  ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
  ctx.stroke()
  ctx.restore()
}

function _drawFillCircle({x, y, r, sAngle=0, eAngle=360, counterclockwise=false}, {color="#ffffff"}, ctx) {
  ctx.save()
  // ctx.beginPath()
  ctx.setFillStyle(color)
  ctx.arc(toPx(x), toPx(y), toPx(r), sAngle, eAngle, counterclockwise);
  ctx.fill()
  ctx.restore()
}
function _drawLine() {}

// export const 