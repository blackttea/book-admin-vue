<template>
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in breadcrumbList" :key="item.id">
        {{ item.name }}
        <template #overlay v-if="item.children">
          <a-menu>
            <a-menu-item v-for="m in item.children" :key="m.id">
              {{ m.name }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
export default {
  name: "breadcrumb",
  props: {
    breadcrumbList: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    console.log(props.breadcrumbList)
  }
}
</script>

<style scoped>

</style>