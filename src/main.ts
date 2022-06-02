import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// @ts-ignore
import store from "./store/index.js";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import '@/custom-component' // 注册自定义组件

import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'

createApp(App).use(store).use(router).use(Antd).mount("#app");
