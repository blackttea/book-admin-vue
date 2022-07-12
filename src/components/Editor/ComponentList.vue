<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="list"
      :data-index="index"
      draggable="true"
    >
      <span class="iconfont" :class="'icon-' + item.icon"></span>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import componentList from '@/custom-component/component-list'

export default {
  data() {
    return {
      componentList,
    }
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index)
    },
  },
}
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .list {
    width: 80%;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      cursor: grabbing;
    }

    .iconfont {
      margin-right: 4px;
      font-size: 20px;
    }

    .icon-wenben,
    .icon-tupian {
      font-size: 18px;
    }
  }
}
</style>