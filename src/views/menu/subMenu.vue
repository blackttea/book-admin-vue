<template>
  <!-- 具体的菜单 -->
  <a-menu-item v-if="menu.path && !hasChildren" :key="`${menu.id}`" :title="menu.name">
    <div class="menu-item">
      <span v-if="level > 1 || !collapse">{{menu.name}}</span>
    </div>
  </a-menu-item>
  <!-- 菜单 -->
  <template v-else>
    <a-sub-menu :key="`${menu.id}`">
      <template v-slot:title>
        <div class="menu-item">
          <!-- 当收缩菜单时，第一级不显示文字 -->
          <span v-if="level > 1 || !collapse">{{menu.name}}</span>
        </div>
      </template>
      <!-- 遍历children菜单 -->
      <template v-for="sub in menu.children" v-bind:key="`${sub.id}`">
        <sub-menu :menu="sub" :level="level + 1" :collapse="collapse" :theme="theme"/>
      </template>
    </a-sub-menu>
  </template>
</template>
<script>

export default {
  components: {
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
    //菜单层级
    level: {
      type: Number,
      default: 1,
    },
    currentKeyPath: {
      type: Array,
    },
    collapse: {
      type: Boolean,
    },
    theme: {
      type: String,
    },
    selectedKeys: {
      type: Array,
    },
  },
  computed: {
    hasChildren () {
      return (
        this.menu.children &&
        this.menu.children != null &&
        this.menu.children.length > 0
      );
    },
    isSelected () {
      if (!this.menu || !this.selectedKeys) {
        return false;
      }
      return this.selectedKeys.some((k) => k == this.menu.id);
    },
  },
};
</script>

<style scoped>
.menu-item {
  font-size: 14px;
  display: flex;
}
</style>
