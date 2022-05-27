<template>
<!--  <div></div>-->
<!--  <button @click='loginT'>登录</button>-->
<!--  <button @click='registers'>登录</button>-->
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { login, register } from './api/login';
import { useUserStore } from '@/store/user'

export default defineComponent({
  props: {
    msg: String,
  },
  setup() {
    const userStore = useUserStore();
    const loginT = () => {
      console.log('click');
      login({ username: 'admin', password: '123456' }).then((res) => {
        console.log(userStore.token)
      });
    };

    const registers = () => {
      register({accountName: 'admin2', realName: 'admin1', password: '123456', repassword: '123456', mobile: 12345678903}).then(() => {

      })
    }

    return {
      loginT,
      registers
    };
  },
});
</script>
<style lang='less'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
