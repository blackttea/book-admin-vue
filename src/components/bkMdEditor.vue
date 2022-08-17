<template>
  <vue-markdown-editor v-model:value="code" height="500px" />
</template>

<script lang="ts">
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// @ts-ignore
import Prism from 'prismjs';
import { ref } from 'vue';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

export default {
  name: "bkMdEditor",
  components: {
    VueMarkdownEditor
  },
  setup() {
    const code = ref('');
    return {
      code
    }
  }
}
</script>

<style scoped>

</style>