/**
 * axios基础构建
 * @date 2022-05-23
 */
import { HOST } from './config';
import instance from './intercept';
import { AxiosRequest, CustomResponse } from './types';
import { message } from 'ant-design-vue';

// 外部传入的baseUrl
const reqURL = HOST,
  header: object = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
class Abstract {
  private apiAxios({ baseURL = reqURL, headers = header, method, url, data, params, responseType }: AxiosRequest): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      instance({ baseURL, headers, method, url, params, data, responseType })
        .then((res: any) => {
          // 200:服务端业务处理正常结束
          if (res.data.code) {
            if (res.data.data && res.data.code === 200) {
              resolve(res.data);
            } else {
              message.error(res.data?.msg || res.msg).then(() => {
                resolve({
                  status: false,
                  message: res.data?.message,
                  data: res.data?.data,
                  origin: res.data,
                });
              });
            }
          } else {
            resolve({ status: false, message: res.data?.msg, data: null });
          }
        })
        .catch((err) => {
          const messages = err?.data?.msg || err?.msg;
          message.error(messages);
          reject({ status: false, messages, data: null });
        });
    });
  }

  /**
   * GET类型的网络请求
   */
  protected getRequest({ url, data, params, responseType, show }: AxiosRequest) {
    return this.apiAxios({
      method: 'GET', url, data, params, responseType, show
    });
  }

  /**
   * POST类型的网络请求
   */
  postRequest({ url, data, params, responseType, show }: AxiosRequest) {
    return this.apiAxios({
      method: 'POST',
      url,
      data,
      params,
      responseType,
      show,
    });
  }

  /**
   * PUT类型的网络请求
   */
  protected putRequest({ url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'PUT', url, data, params, responseType });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteRequest({ url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'DELETE', url, data, params, responseType });
  }
}

export default Abstract;
