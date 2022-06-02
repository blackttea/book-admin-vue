<template>
<div>
  <h1>{{fTitle}}</h1>
  <button @click="editTitle">add</button>
</div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "404.vue",
  props: ['title'],
  emits: ['edit-t'],
  setup(props, context) {
    const fTitle = ref(props.title);
    const editTitle = () => {
      fTitle.value += '5555';
      context.emit('edit-t', fTitle.value)
    }
    return {
      fTitle,
      editTitle
    }
  }
}
</script>

<style scoped>

</style>