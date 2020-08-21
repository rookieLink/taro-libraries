import Taro, {showLoading} from '@tarojs/taro'
import {toPx, drawElements} from './utils/common'

export const paintCanvas =  function (canvasId, configObj, context, callback=() => {}) {
  const ctx = Taro.createCanvasContext(canvasId, context);
  drawElements(configObj, ctx);
  // ctx.draw(true);
}

export default paintCanvas;
