<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div @click="gotoRou">goto login</div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
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
