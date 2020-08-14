import Taro, {showLoading} from '@tarojs/taro'
import {toPx} from './utils/common'
// import mainBgPath from './../test/image/poster-bg.png'
export const fun =  function ({canvasId, canvasHeight, canvasWidth, bg}, context, callback=() => {}) {
  console.log(canvasId, canvasHeight, canvasWidth, bg, context)
  const ctx = Taro.createCanvasContext(canvasId, context)

  // 开始绘制背景图
  ctx.drawImage(bg, 0, 0, toPx(canvasWidth), toPx(canvasHeight))
  
  ctx.draw(false, () => { setTimeout(() => callback(), 500)} )
}

export default fun
