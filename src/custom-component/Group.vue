<template>
  <div class="group">
    <div>
      <template v-for="item in propValue" :key="item.id">
        <component
          :is="item.component"
          :id="'component' + item.id"
          class="component"
          :style="item.groupStyle"
          :prop-value="item.propValue"
          :element="item"
        />
      </template>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    propValue: {
      type: Array,
      default: () => [],
    },
    element: {
      type: Object,
      default: () => {
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.group {
  & > div {
    position: relative;
    width: 100%;
    height: 100%;

    .component {
      position: absolute;
    }
  }
}
</style>
