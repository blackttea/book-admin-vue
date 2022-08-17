<template>
  <div class="editor-container">
    <div class="editor">
      <Toolbar
        style="border-bottom: 1px solid #ccc; height: 40px"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: calc(100% - 40px)"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  props: ['value'],
  emits: ['update:value'],
  setup(props: any, context: any) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref(props.value)

    // 模拟 ajax 异步获取内容
    onMounted(() => {
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    watch(valueHtml, (newVal) => context.emit('update:value', newVal), {
      deep: true, immediate: true
    })
    watch(() => props.value, (newVal) => {
      valueHtml.value = newVal
    }, {
      deep: true
    })

    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  }
}
</script>
<style lang="less">
.editor-container{
  padding: 20px;
  width: 100%;
  height: 100%;
  .editor{
    width: 100%;
    height: 100%;
    min-height: 300px;
    border: 1px solid rgb(204, 204, 204);
  }
}
</style>