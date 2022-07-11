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
          <a-tab-pane tab="动画" key="animation">
            <AnimationList v-if="curComponent"/>
            <p v-else class="placeholder">请选择组件</p>
          </a-tab-pane>
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
import ComponentList from '@/components/Editor/ComponentList' // 左侧列表组件
import AttrList from '@/components/Editor/AttrList' // 右侧属性列表
import AnimationList from '@/components/Editor/AnimationList' // 右侧动画列表
import EventList from '@/components/Editor/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Editor/Toolbar'
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

<style lang="less">
.home {
  height: 100vh;
  background: #fff;
  padding: 0 30px 30px 30px;
  main {
    height: calc(100% - 50px);
    box-shadow: 0px 0px 25px #ccc;
    border-radius: 6px;
    padding: 20px;
    display: flex;
    flex-wrap: nowrap;

    .left {
      height: 100%;
      width: 100px;
      overflow-y: auto;
    }

    .right {
      height: 100%;
      overflow: auto;
      width: 202px;
      padding-left: 20px;
    }

    .center {
      height: 100%;
      width: calc(~"100% - 200px");
      border-bottom: 1px solid #f2f2f2;
      border-right: 1px solid #f2f2f2;
      overflow: auto;

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

/* 滚动条宽高，横向滚动条的高，纵向滚动条的宽 */
::-webkit-scrollbar {
  width: 2px;
  height: 10px;
}

/* 滚动轨道 */
::-webkit-scrollbar-track {
  border-radius: 2px;
}

/* 滚动条 */
::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 2px;
}

</style>
