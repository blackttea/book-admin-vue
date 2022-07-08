<template>
  <a-popconfirm v-bind="$props">
    <a-button type="primary" danger v-if="type === 'all'">
      <template #icon><DeleteOutlined /></template>
      批量删除
    </a-button>
    <span class="vx-button" v-else> <DeleteOutlined /> 删除 </span>
  </a-popconfirm>
</template>

<script>
import { defineComponent } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "VxButtonDelete",
  props: ['type'],
  components: {
    DeleteOutlined,
  },
});
</script>

<style scoped>
.vx-button {
  color: #ff406d;
  cursor: pointer;
  margin: 0 4px;
}
</style>