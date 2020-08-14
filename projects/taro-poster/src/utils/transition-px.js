const { screenWidth } = Taro.getSystemInfoSync()
export const toPx = function(nrpx = 0) { // 统一算出canvas的单位长度
  // (screenWidth / 750) * npx 设计图大小npx 转canvas px
  return (screenWidth / 750) * nrpx
}