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
    createPoster('canvas-show', {
      "type": "MAIN",
      "label": "海报整体配置",
      "width": "750",
      "height": "1334",
      "backgroundColor": "pink",
      "elements": [
        {
          "type": "IMAGE",
          "label": "背景图片",
          "url": "https://oss.turingsenseai.com/1597910548470148198.png",
          "x": "0",
          "y": "0",
          "width": "750",
          "height": "1334"
        },
        {
          "type": "FILLRECT",
          "label": "头像底部",
          "x": "150",
          "y": "150",
          "r": "40",
          "sAngle": "0",
          "eAngle": "360",
          "backgroundColor": "#ffffff",
          "opacity": "1"
        },
        {
          "type": "IMAGE",
          "label": "头像显示",
          "url": "https://oss.turingsenseai.com/1597910548470148198.png",
          "x": "112",
          "y": "112",
          "width": "76",
          "height": "76",
          "borderRadius": "76"
        },
        {
          "type": "TEXT",
          "label": "昵称",
          "x": "220",
          "y": "140",
          "text": "rookieLink",
          "fontColor": "#ffffff",
          "fontSize": "30",
          "textAlign": "left",
          "lineNum": "1"
        }
      ]
    }, this.$scope, () => {
      console.log('绘制成功！')
    })
  }

  drawPoster() {
    createPoster('canvas-show', {
      "type": "MAIN",
      "label": "海报整体配置",
      "width": "750",
      "height": "1334",
      "backgroundColor": "pink",
      "elements": [
        {
          "type": "IMAGE",
          "label": "背景图片",
          "url": "https://oss.turingsenseai.com/1597910548470148198.png",
          "x": "0",
          "y": "0",
          "width": "750",
          "height": "1334"
        },
        {
          "type": "FILLRECT",
          "label": "头像底部",
          "x": "150",
          "y": "150",
          "r": "40",
          "sAngle": "0",
          "eAngle": "360",
          "backgroundColor": "#ffffff",
          "opacity": "1"
        },
        {
          "type": "IMAGE",
          "label": "头像显示",
          "url": "https://oss.turingsenseai.com/1597910548470148198.png",
          "x": "112",
          "y": "112",
          "width": "76",
          "height": "76",
          "borderRadius": "76"
        },
        {
          "type": "TEXT",
          "label": "昵称",
          "x": "220",
          "y": "140",
          "text": "rookieLink",
          "fontColor": "#ffffff",
          "fontSize": "30",
          "textAlign": "left",
          "lineNum": "1"
        }
      ]
    }, this, () => {
      console.log('绘制成功！')
    })
  }


  componentDidHide () {}

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
        <Text onClick={this.drawPoster.bind(this)}>绘制海报</Text>
        <Canvas className="canvas-poster" canvas-id="canvas-show" style="width:750rpx; height: 1334rpx"></Canvas>

      </View>
    )
  }
}
