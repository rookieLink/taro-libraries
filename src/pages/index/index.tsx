import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import './index.scss'
// import  createPoster  from 'taro-poster';
import createPoster from './../../../projects/taro-poster/index'

import bg from './../../../assests/image/invite-poster-bg.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // const ctx = Taro.createCanvasContext('canvas-show', this)

    // // 开始绘制背景图
    // ctx.drawImage(bg, 0, 0, 200, 300)
    
    // ctx.draw(false, () => { setTimeout(() => {}, 500)} )
    createPoster({
      canvasId: 'canvas-show', 
      canvasWidth: 750, 
      canvasHeight: 1334, 
      bg,
      elements: [
        // toPx(89), toPx(77), toPx(45), 0, 360, false
        {type: 'FILLCIRCLE', config: {x: 89, y: 77, r: 45, sAngle: 0, eAngle: 360, counterclockwise: false}, style: {color: '#ffffff'}},
        {type: 'CIRCLE', config: {x: 89, y: 77, r: 45, sAngle: 0, eAngle: 360, counterclockwise: false}, style: {color: '#ffffff', lineWidth: 0 },
          elements:[
            {type: 'IMAGE', config: {x: 10, y: 16, height: 200, width: 200, source: bg}}
          ]
        },
        {type: 'TEXT', config: {x: 152, y: 70, text: 'rookielink'}, style: {color: '#ffffff', fontSize: 40}},
        {type: 'TEXT', config: {x: 152, y: 110, text: '邀请您参加鉴定'}, style: {color: '#ffffff', fontSize: 24}},

        // {type: 'RECT', config: {x: 152, y: 110, height: 20, width: 50}, style: {color: 'red', lineWidth: 1}, elements: [
        //   {type: 'FILLRECT', config: {x: 20, y: 90, height: 20, width: 50}, style: {color: 'green'}}
        // ]},
        // {type: 'FILLRECT', config: {x: 20, y: 140, height: 20, width: 50}, style: {color: 'gray'}},
        // {type: 'IMAGE', config: {x: 20, y: 180, height: 800, width: 300, source: bg}}
      ]
    }, this)
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
        <Text>绘制海报</Text>
        <Canvas className="canvas-poster" canvas-id="canvas-show" style="width:750rpx; height: 1334rpx"></Canvas>

      </View>
    )
  }
}
