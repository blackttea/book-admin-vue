const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 代理跨域的配置
    proxy: {
      // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
      "/api": {
        target: "http://192.168.1.20:3000/", // 我们要代理的真实接口地址
        changeOrigin: true, // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
        // 路径重写（非必选）
        // 如果我们不光要使得域名修改,而且还需要改变其它路径,则需要做路径重写
        // 比如 我们想把请求的api去掉（真实后台没有api前缀情况）
        // localhost:8888/api/login -> www.baidu.com/login
        // pathRewrite: {
        //   "^/api": "",
        // },
      },
    },
  },
});
