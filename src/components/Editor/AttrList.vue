<template>
  <div class="attr-list">
    <a-form :label-col="{style: {width: '50px'}}" style="margin-left: -15px">
      <a-form-item v-for="({key,label}, index) in styleKeys" :key="index" :label="label">
        <a-select v-if="selectKey.includes(key)" v-model="curComponent.style[key]">
          <template v-if="key == 'textAlign'">
            <a-option
              v-for="item in textAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-option>
          </template>
          <template v-else-if="key == 'borderStyle'">
            <a-option
              v-for="item in borderStyleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-option>
          </template>
          <template v-else>
            <a-option
              v-for="item in verticalAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-option>
          </template>
        </a-select>
        <a-input v-else v-model.number="curComponent.style[key]" type="number"/>
      </a-form-item>
      <a-form-item v-if="curComponent && !excludes.includes(curComponent.component)" label="内容">
        <a-input v-model="curComponent.propValue" type="textarea"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {styleData} from '@/utils/style'

export default {
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
  height: 100%;
}
</style>
