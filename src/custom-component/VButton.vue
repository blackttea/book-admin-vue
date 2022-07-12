<template>
  <div style="width: 100%">
    <button class="v-button">{{ value }}</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    element: {
      type: Object,
      default: () => {
      },
    },
  },
  setup() {
    const onChange = (current: number) => {
      console.log(current);
    };
    return {
      onChange
    }
  }
}
</script>

<style lang="scss" scoped>
.v-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  width: 100%;
  height: 100%;
  font-size: 14px;

  &:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }

  &:hover {
    background-color: #ecf5ff;
    color: #3a8ee6;
  }
}
</style>
