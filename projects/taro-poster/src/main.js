import Taro, {showLoading} from '@tarojs/taro'

export const fun =  function () {
  Taro.showLoading();
  setTimeout(() => {
    Taro.hideLoading()
  }, 5000)
}

export default fun
