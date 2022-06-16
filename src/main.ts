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
import '@/styles/reset.css';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

createApp(App).use(store).use(VXETable).use(router).use(Antd).mount("#app");
