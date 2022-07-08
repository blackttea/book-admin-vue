// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
}
import bkInput from '@/custom-component/bkInput.vue'
import Picture from '@/custom-component/Picture'
import RectShape from '@/custom-component/RectShape'
import VButton from '@/custom-component/VButton'
import VText from '@/custom-component/VText'

// 编辑器左侧组件列表
const list = [
  {
    component: VText,
    label: '文字',
    style: {
      width: 200,
      height: 22,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      propValue: '双击编辑文字',
      id: 'test'
    },
    icon: 'wenben',
    attributes: {
      value: '_inputValue',
      onInput: ($event) => {},
    },
    text: '_inputValue',
    dataList: [{name: '_inputValue', value: ''}],
  },
  {
    id: 0,
    component: VButton,
    label: '按钮',
    propValue: '按钮',
    icon: 'button',
    style: {
      width: '100px',
      height: '50px',
      borderWidth: 1,
      borderColor: '',
      borderRadius: '',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      backgroundColor: '',
    },
    attributes: {
      value: '_inputValue',
      onInput: ($event) => {},
      propValue: '按钮',
    },
    text: '按钮',
    dataList: [{name: '_inputValue', value: ''}],
  },
  {
    component: Picture,
    label: '图片',
    icon: 'tupian',
    style: {
      width: '300px',
      height: '200px',
      borderRadius: '',
    },
    attributes: {
      value: '_inputValue',
      onInput: ($event) => {},
      propValue: require('@/assets/title.jpg'),
    },
    text: '_inputValue',
    dataList: [{name: '_inputValue', value: ''}],
  },
  {
    component: RectShape,
    label: '矩形',
    icon: 'juxing',
    style: {
      width: '200px',
      height: '200px',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      borderRadius: '',
      verticalAlign: 'middle',
    },
    attributes: {
      value: '_inputValue',
      onInput: ($event) => {},
      ref: 'butt_',
      propValue: '&nbsp;',
    },
    text: '_inputValue',
    dataList: [{name: '_inputValue', value: ''}],
  },
  {
    component: bkInput,
    label: '输入框',
    icon: '',
    style: {
      width: 200,
      height:50,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      borderRadius: '',
      verticalAlign: 'middle',
    },
    attributes: {
      value: '_inputValue',
      onInput: ($event) => {},
      ref: 'butt_',
      propValue: '&nbsp;',
    },
    text: '_inputValue',
    dataList: [{name: '_inputValue', value: ''}],
  },
]

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = {...commonStyle, ...item.style}
  list[i] = {...commonAttr, ...item}
}

export default list
