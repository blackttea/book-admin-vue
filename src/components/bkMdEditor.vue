<template>
  <div class="bk-md-editor" v-if="type === 'editor'">
    <vue-markdown-editor
      v-model="code"
      :include-level="[3, 4]"
      :disabled-menus="[]"
      @upload-image="handleUploadImage" />
    <div class="article">
      <a-form
        :model="formState"
        name="time_related_controls"
        style="display: flex;flex-wrap: wrap"
        :label-col="{ style: { width: '80px',  } }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item name="date-picker" label="封面" class="setting">
          <up-img />
        </a-form-item>
        <a-form-item name="date-picker" v-bind="config" class="setting" label="摘要">
          <a-textarea v-model:value="formState['Abstract']" placeholder="输入摘要" :rows="4" style="width: 60%"/>
        </a-form-item>
        <a-form-item name="date-time-picker" label="文章标签" v-bind="config" class="setting">
          <a-button type="dashed">
            <template #icon><plus-outlined /></template>
            添加文章标签
          </a-button>
        </a-form-item>
        <a-form-item name="column" label="分类专栏" v-bind="config" class="setting">
          <a-button type="dashed">
            <template #icon><plus-outlined /></template>
            新建分类专栏
          </a-button>
        </a-form-item>
        <a-form-item name="column" label="文章类型" v-bind="config" class="setting">
          <a-radio-group v-model:value="formState['column']">
            <a-radio :value="'1'">原创</a-radio>
            <a-radio :value="'2'">转载</a-radio>
            <a-radio :value="'3'">翻译</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="releaseForm" label="发布形式" v-bind="config" class="setting">
          <a-radio-group v-model:value="formState['releaseForm']">
            <a-radio :value="'1'">全部可见</a-radio>
            <a-radio :value="'2'">仅我可见</a-radio>
            <a-radio :value="'3'">粉丝可见</a-radio>
            <a-radio :value="'4'">VIP可见</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="time-picker" label="内容等级" v-bind="config" class="setting">
          <a-radio-group v-model:value="formState['releaseForm']">
            <a-radio :value="'1'">初级</a-radio>
            <a-radio :value="'2'">中级</a-radio>
            <a-radio :value="'3'">高级</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <div class="submit">
            <a-button type="primary" shape="round" style="background-color: #fc5531">发布</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
  <div style="height: 500px; width: 100%;background-color: #fff;overflow: auto" v-else>
    <v-md-preview :text="code" height="500px"/>
  </div>
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
import {reactive, ref} from 'vue';
// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// @ts-ignore
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// @ts-ignore
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
// @ts-ignore
import createCopyCodePreview from '@kangc/v-md-editor/lib/plugins/copy-code/preview';

VMdPreview.use(vuepressTheme, {
  Prism,
}).use(createLineNumbertPlugin()).use(createCopyCodePreview());

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
})
VueMarkdownEditor.use(createLineNumbertPlugin()).use(createCopyCodePlugin());

import upImg from "@/components/upImg.vue";
import { PlusOutlined } from '@ant-design/icons-vue';

export default {
  name: "bkMdEditor",
  props: {
    type: {
      type: String,
      default: 'editor'
    }
  },
  components: {
    VueMarkdownEditor,
    VMdPreview,
    upImg,
    PlusOutlined
  },
  setup() {
    const code = ref(`\`\`\`js
      import Vue from 'vue';
      import VueMarkdownEditor from '@kangc/v-md-editor';
      import '@kangc/v-md-editor/lib/style/base-editor.css';
      import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

      VueMarkdownEditor.use(vuepressTheme);

      Vue.use(VueMarkdownEditor);`
    );

    const formState = reactive({

    });
    const config = {
      rules: [{ type: 'string' as const, required: true, message: 'Please select time!' }],
    };

    const handleUploadImage = (event: any, insertImage: any, files: any) => {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files);
      insertImage({
        url:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp01%2F1ZZH250054149-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663381151&t=055979cf73058dc68b7f30984ab24a9a',
        desc: '七龙珠',
        // width: 'auto',
        // height: 'auto',
      });
    }

    const onFinish = (values: any) => {
      console.log('Success:', values, formState);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return {
      code,
      formState,
      config,
      handleUploadImage,
      onFinish,
      onFinishFailed
    }
  }
}
</script>

<style scoped lang="less">
.bk-md-editor {
  border: 1px solid #f2f2f2;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 0 20px 0 20px;
}

.article {
  margin-top: 20px;
  .setting {
    width: 100%;
  }
}

/* 滚动条宽高，横向滚动条的高，纵向滚动条的宽 */
::-webkit-scrollbar {
  width: 2px;
  height: 10px;
}

/* 滚动轨道 */
::-webkit-scrollbar-track {
  border-radius: 2px;
}

/* 滚动条 */
::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 2px;
}
</style>