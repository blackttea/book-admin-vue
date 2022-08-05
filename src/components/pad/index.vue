<template>
  <div class="pad">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "pad"
}
</script>

<style lang="less" scoped>
.pad {
  padding: 8px;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>