import axios, { AxiosRequestConfig } from 'axios';
import { timeout, errRetry } from "@/request/config";
import useStorage from "@/hooks/useStorage";

// axios 实例
const instance = axios.create({
  timeout,
  responseType: 'json',
});

const pendingRequest = new Map();

//addPendingRequest：用于把当前请求信息添加到 pendingRequest 对象中
const addPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateReqKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel);
    }
  });
}

// removePendingRequest：检查是否存在重复请求，若存在则取消已发的请求
const removePendingRequest = (config: AxiosRequestConfig) =>  {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken('重复请求， 稍后再试!');
    pendingRequest.delete(requestKey);
  }
}

// clearPending 清空 pending 中的请求（在路由跳转时调用）
const clearPending = () => {
  for (const [requestKey, cancelToken] of pendingRequest) {
    cancelToken(requestKey)
  }
  pendingRequest.clear()
}

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    const token = useStorage('local', 'get', 'token')
    const  token_type= "Bearer"
    token && request?.headers ? request.headers['Authorization'] = `${token_type} ${token}`  || '' : '';
    removePendingRequest(request);
    addPendingRequest(request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    const req = JSON.parse(JSON.stringify(response.config));
    req.data = req.data ? JSON.parse(req.data) : req.data
    req.params = req.params ? JSON.parse(req.params) : req.params
    removePendingRequest(req);
    const errorCode = response?.data?.errorCode;
    switch (errorCode) {
      case '401':
        // 根据errorCode，对业务做异常处理(和后端约定)
        break;
      default:
        break;
    }
    return response;
  },
  (error) => {
    const response = error.response;
    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 400:
        //  页面找不到
        break;
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        break;
      default:
        // 接口异常
        break;
    }
    // 超时重新请求
    const config = error.config;
    // 全局的请求次数,请求的间隙
    if (config && RETRY_COUNT && errRetry.includes(error.message)) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { msg: error.message });
      }
      // 增加重试计数
      config.__retryCount++;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }
    return Promise.reject(response || { msg: error.message });
  }
);

function generateReqKey(config: any) {
  const { method, url, params, data } = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
}
export default instance;
