<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div @click="gotoRou">goto login</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {
  },
  setup() {
    const router = useRouter();
    const gotoRou = () =>  {
      router.push('/404')
    }
    return{
      gotoRou
    }
  }
});
</script>
