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
import VText from '@/custom-component/VText';
import { defineAsyncComponent } from 'vue'
import bkTable from '@/custom-component/bkTable';
import bkForm from "@/custom-component/bkForm";
import {JSONStringify} from '@/hooks/useJSON'
// 编辑器左侧组件列表
const list = [
  {
    id: 0,
    component: 'div',
    label: 'div',
    propValue: 'div',
    icon: 'm-div',
    style: {
      width: '50%',
      height: '10%',
      borderWidth: 1,
      borderColor: '',
      borderRadius: '',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      backgroundColor: '#f2f2f2',
      display: 'flex',
      flexWrap: 'wrap'
    },
    attributes: {
    },
    dataList: [{name: '_inputValue', value: ''}],
  },
  {
    id: 0,
    component: 'span',
    label: 'span',
    propValue: 'span',
    icon: 'm-span',
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
      backgroundColor: '#f2f2f2',
    },
    attributes: {
    },
  },
  {
    id: 0,
    component: defineAsyncComponent(() => import('@/custom-component/VButton')),
    label: '按钮',
    value: '按钮',
    icon: 'anniu',
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
      onInput: ($event) => {},
      onClick: () => { alert('hellow!')},
      value: '按钮',
    },
    text: '按钮',
    dataList: [{name: '_inputValue', value: ''}],
  },
  {
    component: Picture,
    label: '图片',
    icon: 'img',
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
    component: bkInput,
    label: '输入',
    icon: 'checkbox-weixuan',
    style: {
      width: '100px',
      height: '50px',
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
      propValue: '&nbsp;',
    },
    text: '_inputValue',
    dataList: [{name: '_inputValue', value: 'fwfef'}],
  },
  {
    component: bkTable,
    label: '表格',
    icon: 'checkbox-weixuan',
    style: {
      width: '100%',
      height: '100%',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      color: '',
      borderWidth: 1,
      backgroundColor: '',
      borderRadius: '',
      verticalAlign: 'middle',
    },
    attributes: {
      value: '_inputValue',
      onInput: ($event) => {},
      propValue: '&nbsp;',
      grid1: '_grid'
    },
    text: '_inputValue',
    dataList: [{name: '_inputValue', value: 'fwfef'},{name: '_grid', value: {
        border: true,
        align: null,
        columnConfig: {
          resizable: true
        },
        columns: [
          { type: 'seq', width: 50 },
          { field: 'columnId', title: 'columnId' },
          { field: 'createBy', title: 'createBy', showHeaderOverflow: true },
          { field: 'description', title: 'description', showOverflow: true },
          { field: 'marketPrice', title: 'marketPrice', showOverflow: true },
          { field: 'name', title: 'name', showOverflow: true },
          { field: 'saleMoney', title: 'saleMoney', showOverflow: true },
        ],
        data: []
      }}],
  },
  {
    component: bkForm,
    label: '表单',
    icon: 'checkbox-weixuan',
    style: {
      width: '100%',
      height: '10%',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      color: '',
      borderWidth: 1,
      backgroundColor: '',
      borderRadius: '',
      verticalAlign: 'middle',
    },
    attributes: {
      value: '_inputValue',
      onInput: ($event) => {},
      propValue: '&nbsp;',
    },
    text: '_inputValue',
    dataList: [{name: '_inputValue', value: 'fwfef'}],
  },
]

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = {...commonStyle, ...item.style}
  list[i] = {...commonAttr, ...item}
}

export default list
