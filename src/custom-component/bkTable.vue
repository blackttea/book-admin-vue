<template>
  <vxe-grid v-bind="gridOptions1">
  </vxe-grid>

</template>

<script>
import {reactive} from "vue";

export default {
  name: "table",
  props:['grid1'],
  setup(props) {
    const gridOptions1 = reactive(props.grid1);
    return {
      gridOptions1
    }
  }
}
</script>

<style scoped>

</style>