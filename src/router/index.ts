import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/login/index.vue";
import register from "../views/login/register.vue";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useStorage from "@/hooks/useStorage";
// import {useUserStore} from "@/store/user";
import {message} from "ant-design-vue";
import generateRoutes from "@/router/generateRoutes";
import useGetTree from "@/hooks/useGetTree";


interface res {
  data: {
    menus?: any;
    token: string;
  };
  code: number;
  message?: string;
}
const routes: Array<RouteRecordRaw> = [

  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: '/404',
    name: "404",
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/tesst1.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

NProgress.configure({ showSpinner: false });
const whiteList = ['/login', '/register', '404'];

// router.beforeEach(async(to, from, next) => {
//   const user = useUserStore();
//   const localRoute = useStorage('local', 'get', 'route')
//   if (localRoute) {
//     addRoute(localRoute, user)
//   }
//   // 开启页面进度条
//   NProgress.start()
//   const hasToken = useStorage('local', 'get', 'token')
//   // useStorage('local', 'remove', 'token')
//   if (hasToken) {
//     if (to.name === 'login') {
//       next('/')
//       NProgress.done();
//     } else {
//       if (to.matched.length === 0) { await router.push(to.path); }
//       next()
//     }
//   } else {
//     // not login
//     if (whiteList.some((n) => n === to.name)) {
//       // 在免登录名单，直接进入
//       next();
//     } else {
//       if (user.menus.length === 0) {
//         try {
//           const data = await user.login({username: 'admin', password: '123456'}) as res;
//           useStorage('local', 'set', 'route', data);
//           useStorage('local', 'set', 'token', data.data.token);
//           addRoute(data, user)
//           next('/');
//         } catch (error) {
//           console.log(error)
//           // 清除token，跳转登录页
//           next({ path: '/'});
//           NProgress.done()
//         }
//       } else {
//         next();
//       }
//       NProgress.done()
//     }
//   }
// })
//
// const addRoute = (data: res, user: any) => {
//   const route = useGetTree(generateRoutes(data.data.menus));
//   user.updateToken(data.data.token)
//   for (let item of route) {
//     let r = item as RouteRecordRaw;
//     if (!router.options.routes.some((route) => {return route.path === r.path}))
//       router.options.routes.push(r);
//     router.addRoute(r)
//   }
// }
//
// router.afterEach(() => {
//   NProgress.done();
// })
export default router;
