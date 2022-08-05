<template>
  <div class="attr-list">
    <a-form :label-col="{style: {width: '100%'}}" style="margin-left: -15px;overflow-y: auto" layout="vertical">
      <a-form-item v-for="({key,label}, index) in styleKeys" :key="index" :label="label" class="form-item">
        <a-input v-model:value="curComponent.style[key]"/>
      </a-form-item>
      <a-form-item v-if="curComponent && !excludes.includes(curComponent.component)" label="内容" class="form-item">
        <a-input v-model="curComponent.propValue" type="textarea"/>
      </a-form-item>
      <a-form-item label="样式" class="form-item">
        <a-input v-model:value="curStyle" type="textarea" readonly @click="attrShow = true"/>
      </a-form-item>
    </a-form>
  </div>
  <a-modal v-model:visible="attrShow" title="元素属性" @ok="addAttr" width="800px" ok-text="确认" cancel-text="取消">
    <div class="attr-label">属性名:</div>
    <a-input v-model:value="addLabel" placeholder="名称" />
    <div class="attr-label">代码:</div>
    <a-textarea v-model:value="addValue" placeholder="输入代码" :rows="4" />
  </a-modal>
</template>

<script>
import {styleData} from '@/utils/style'
import { ref } from 'vue';
import {useStore} from "vuex";
import useEval from "@/hooks/useEval";
export default {
  components: {  },
  data() {
    return {
      excludes: ['Picture', 'Group'], // 这些组件不显示内容
      textAlignOptions: [
        {
          label: '左对齐',
          value: 'left',
        },
        {
          label: '居中',
          value: 'center',
        },
        {
          label: '右对齐',
          value: 'right',
        },
      ],
      borderStyleOptions: [
        {
          label: '实线',
          value: 'solid',
        },
        {
          label: '虚线',
          value: 'dashed',
        },
      ],
      verticalAlignOptions: [
        {
          label: '上对齐',
          value: 'top',
        },
        {
          label: '居中对齐',
          value: 'middle',
        },
        {
          label: '下对齐',
          value: 'bottom',
        },
      ],
      selectKey: ['textAlign', 'borderStyle', 'verticalAlign'],
      styleData,
    }
  },
  setup (){
    const addLabel = ref('');
    const addValue = ref('');
    const store = useStore();
    const attrShow = ref(false);
    const curStyle = ref("");
    const addAttr = () => {
      store.state.curComponent.style[addLabel.value] = addValue.value;
    }
    return {
      addLabel,
      addValue,
      curStyle,
      attrShow,
      addAttr
    }
  },
  computed: {
    styleKeys() {
      if (this.$store.state.curComponent) {
        const curComponentStyleKeys = Object.keys(this.$store.state.curComponent.style)
        return this.styleData.filter(item => curComponentStyleKeys.includes(item.key))
      }
      return []
    },
    curComponent() {
      return this.$store.state.curComponent
    },
  },
}
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 0 20px 20px;
  .form-item{
    padding: 10px;
    box-shadow: 2px 5px 8px rgba(143, 149, 178, 0.15);
  }
  .attr-label {
    padding: 20px 0 20px 0;
  }
}
</style>
