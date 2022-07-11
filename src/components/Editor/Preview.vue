<template>
  <div v-if="show" class="bg">
    <a-button class="close" @click="close">关闭</a-button>
    <div class="canvas-container">
      <div class="canvas"
        :style="{ width: canvasStyleData.width,
        height: canvasStyleData.height}"
      >
<!--        <ComponentWrapper-->
<!--          v-for="(item, index) in componentData"-->
<!--          :key="index"-->
<!--          :config="item"-->
<!--        />-->
        <test :cure-component="componentData"/>
      </div>
    </div>
  </div>
</template>

<script>
import {getStyle} from '@/utils/style'
import {mapState} from 'vuex'
import ComponentWrapper from './ComponentWrapper'
import {changeStyleWithScale} from '@/utils/translate'
import test from "@/views/test";
export default {
  components: {ComponentWrapper, test},
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: mapState([
    'componentData',
    'canvasStyleData',
  ]),
  methods: {
    changeStyleWithScale,

    getStyle,

    close() {
      this.$emit('close', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, .5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .canvas-container {
    width: calc(100% - 10px);
    height: calc(100% - 60px);

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>