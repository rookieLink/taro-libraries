import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import './index.scss'
// import  createPoster  from 'taro-poster';
import createPoster from './../../../projects/taro-poster/index'

import bg from './../../../assests/image/poster-bg.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // const ctx = Taro.createCanvasContext('canvas-show', this)

    // // 开始绘制背景图
    // ctx.drawImage(bg, 0, 0, 200, 300)
    
    // ctx.draw(false, () => { setTimeout(() => {}, 500)} )
    createPoster({canvasId: 'canvas-show', canvasWidth: 750, canvasHeight: 300, bg}, this)
  }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Canvas className="canvas-poster" canvas-id="canvas-show"></Canvas>

      </View>
    )
  }
}
