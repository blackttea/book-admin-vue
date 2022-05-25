import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useStorage from "@/hooks/useStorage";
import {useUserStore} from "@/store/user";
import {message} from "ant-design-vue";
import generateRoutes from "@/router/generateRoutes";
import useGetTree from "@/hooks/useGetTree";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/404',
    name: "404",
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/login/index.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/auth-redirect'];

router.beforeEach(async(to, from, next) => {
  // 开启页面进度条
  NProgress.start()
  const user = useUserStore();
  const hasToken = useStorage('local', 'get', 'token')
  const data = await user.login({username: 'admin', password: '123456'});
  // @ts-ignore
  const route = useGetTree(generateRoutes(data.data.menus));
  // @ts-ignore
  route.forEach((r) => {
    // @ts-ignore
    router.addRoute(r)
  })

  console.log(router.options.routes)
  debugger
  if (hasToken) {
    if (to.path === '/') {
      // 已登录，跳转到: '/'
      next('/login')
      NProgress.done() // 关闭页面进度条
    } else {
      // 是否通过用户信息拿到角色信息
      const hasRoles = user.token
      if (hasRoles) {
        // 登录过并且有角色信息，直接进入下一个路由
        next()
      } else {
        try {
          const data = await user.login({username: 'admin', password: '123456'});
          // @ts-ignore
          const route = useGetTree(generateRoutes(data.data.menus));
          // @ts-ignore
          router.addRoute(route)
          next()
        } catch (error) {
          console.log(error)
          // // 清除token，跳转登录页
          NProgress.done()
        }
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      // 访问的路径处于白名单中
      next(`/404`)
    } else {
      // 没有登录，跳转登录页
      next(`/404`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})


router.afterEach(() => {
  NProgress.done();
})
export default router;
