<template>
  <div class="home">
    <Toolbar/>
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <ComponentList/>
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor/>
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <a-tabs v-model:activeKey="activeName">
          <a-tab-pane tab="属性" key="attr">
            <AttrList v-if="curComponent"/>
            <p v-else class="placeholder">请选择组件</p>
          </a-tab-pane>
          <el-tab-pane tab="动画" key="animation">
            <AnimationList v-if="curComponent"/>
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
          <a-tab-pane tab="事件" key="events">
            <EventList v-if="curComponent"/>
            <p v-else class="placeholder">请选择组件</p>
          </a-tab-pane>
        </a-tabs>
      </section>
    </main>
  </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import AttrList from '@/components/AttrList' // 右侧属性列表
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import {deepCopy} from '@/utils/utils'
import {mapState} from 'vuex'
import generateID from '@/utils/generateID'
import {listenGlobalKeyDown} from '@/utils/shortcutKey'
import {reactive, toRefs} from "vue";
import store from "@/store";

export default {
  components: {Editor, ComponentList, AttrList, AnimationList, EventList, Toolbar},
  setup() {
    const data = reactive({
      activeName: 'attr',
      reSelectAnimateIndex: undefined,
    });

    const methods = {
      restore() {
        // 用保存的数据恢复画布
        if (localStorage.getItem('canvasData')) {
          store.commit('setComponentData', this.resetID(JSON.parse(localStorage.getItem('canvasData'))))
        }

        if (localStorage.getItem('canvasStyle')) {
          store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
        }
      },
      resetID(data) {
        data.forEach(item => {
          item.id = generateID()
        })
        return data
      },
      handleDrop(e) {
        e.preventDefault()
        e.stopPropagation()
        const index = e.dataTransfer.getData('index')
        const rectInfo = this.editor.getBoundingClientRect()
        console.log(this)
        if (index) {
          const component = deepCopy(componentList[index])
          component.style.top = e.clientY - rectInfo.y
          component.style.left = e.clientX - rectInfo.x
          component.id = generateID()
          store.commit('addComponent', {component})
          store.commit('recordSnapshot')
        }
      },
      handleDragOver(e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      },
      handleMouseDown(e) {
        e.stopPropagation()
        store.commit('setClickComponentStatus', false)
        store.commit('setInEditorStatus', true)
      },
      deselectCurComponent(e) {
        if (!this.isClickComponent) {
          store.commit('setCurComponent', {component: null, index: null})
        }
        // 0 左击 1 滚轮 2 右击
        if (e.button != 2) {
          store.commit('hideContextMenu')
        }
      },
    }
    return {
      ...toRefs(data),
      ...methods
    }
  },
  computed: mapState([
    'componentData',
    'curComponent',
    'isClickComponent',
    'canvasStyleData',
    'editor',
  ]),
  created() {
    this.restore()
    // 全局监听按键事件
    listenGlobalKeyDown()
  },
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
