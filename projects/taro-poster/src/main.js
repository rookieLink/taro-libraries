import Taro, {showLoading} from '@tarojs/taro'
import {toPx, drawElements} from './utils/common'

export const fun =  function ({canvasId, canvasHeight, canvasWidth, bg, elements=[]}, context, callback=() => {}) {
  console.log(canvasId, canvasHeight, canvasWidth, bg, context);
  const ctx = Taro.createCanvasContext(canvasId, context);

  // 开始绘制背景图
  // ctx.clip()
  ctx.drawImage(bg, 0, 0, toPx(canvasWidth), toPx(canvasHeight));

  drawElements(elements, ctx);
  ctx.draw(false, () => { setTimeout(() => callback(), 500)} );
}

export default fun;
