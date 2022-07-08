<template>
  <a-input placeholder="请输入" v-model:value="value" v-bind="$attrs"></a-input>
</template>

<script>
export default {
  name: "bkInput",
  setup() {
    return{
      value: 'test'
    }
  }
}
</script>

<style scoped>

</style>