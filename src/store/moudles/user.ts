// user.js模块
// 导出
interface u_state {
  token: string,
  router: []
}
export default {
  namespaced: true, // 为每个模块添加一个前缀名，保证模块命明不冲突
  state: {
    token: '',
    router: []
  },
  mutations: {
    setToken (state: u_state, token: string) {
      state.token = token
    }
  },
  actions: {}
}

