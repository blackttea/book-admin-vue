// import {defineStore} from 'pinia'
// import {login} from "@/api/login";
//
// export const useUserStore = defineStore({
//   id: 'user',
//   state: () => {
//     return {
//       token: '',
//       routers: [],
//       menus: [],
//     }
//   },
//   actions: {
//     updateToken(token: string) {
//       this.token = token;
//     },
//     clearMenu() {
//       this.menus.length = 0;
//     },
//     getMenu(menu_item: object | Array<object>) {
//       // @ts-ignore
//       this.menus.push(menu_item);
//     },
//     async login(params: object) {
//       return login(params);
//     }
//   }
// })
