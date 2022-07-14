import {createStore} from 'vuex'
import animation from './animation'
import compose from './compose'
import contextmenu from './contextmenu'
import copy from './copy'
import event from './event'
import layer from './layer'
import snapshot from './snapshot'
import lock from './lock'

export default createStore({
  state: {
    ...animation.state,
    ...compose.state,
    ...contextmenu.state,
    ...copy.state,
    ...event.state,
    ...layer.state,
    ...snapshot.state,
    ...lock.state,

    editMode: 'edit', // 编辑器模式 edit preview
    canvasStyleData: { // 页面全局数据
      width: '100%',
      height: '100%',
      scale: 100,
    },
    isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
    componentData: [], // 画布组件数据
    curComponent: null,
    curComponentIndex: null,
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
    dragIndex: 0,
    addTimes: 0
  },
  mutations: {
    ...animation.mutations,
    ...compose.mutations,
    ...contextmenu.mutations,
    ...copy.mutations,
    ...event.mutations,
    ...layer.mutations,
    ...snapshot.mutations,
    ...lock.mutations,

    setClickComponentStatus(state, status) {
      state.isClickComponent = status
    },

    setEditMode(state, mode) {
      state.editMode = mode
    },

    setInEditorStatus(state, status) {
      state.isInEdiotr = status
    },

    setCanvasStyle(state, style) {
      state.canvasStyleData = style
    },

    setCurComponent(state, {component, index}) {
      state.curComponent = component
      state.curComponentIndex = index
    },

    setShapeStyle({curComponent}, {top, left, width, height, rotate}) {
      if (top) curComponent.style.top = top
      if (left) curComponent.style.left = left
      if (width) curComponent.style.width = width
      if (height) curComponent.style.height = height
      if (rotate) curComponent.style.rotate = rotate
    },

    setShapeSingleStyle({curComponent}, {key, value}) {
      curComponent.style[key] = value
    },

    setComponentData(state, componentData = []) {
      state.componentData = componentData
      // Vue.set(state, 'componentData', componentData)
    },

    addComponent(state, {component, index}) {
      if (state.addTimes === 0) {
        if (index !== undefined) {
          state.componentData.splice(index, 0, component)
        } else {
          state.componentData.push(component)
        }
      }
    },
    editComponent(state, {component}) {
      for (let i in state.componentData) {
        if (component.id === state.componentData[i].id) {
          Object.assign(state.componentData[i], component)
          break
        }
      }
    },
    addInto(state, {com, component}) {
      component.parent = com.id
      state.componentData.push(component);
      state.addTimes += 1
    },
    deleteComponent(state, index) {
      if (index === undefined) {
        index = state.curComponentIndex
      }

      if (index == state.curComponentIndex) {
        state.curComponentIndex = null
        state.curComponent = null
      }

      if (/\d/.test(index)) {
        state.componentData.splice(index, 1)
      }
    },
  },
})
