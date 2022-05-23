/**
 * 基础数据 API 集合类
 * 集成Abstract
 * @date 2021-02-03
 */
import Abstract from '../request/abstract';
import useStorage from "@/hooks/useStorage";

class Basic extends Abstract {
  loginCode(params: any) {
    const url = '/shop/h5/open/user/sms/sign/code';
    return new Promise((resolve) => {
      this.postRequest({ url, params }).then((res) => {
        resolve(res);
      });
    });
  }

  login(params: any) {
    const url = 'api/user/login';
    return new Promise((resolve) => {
      this.postRequest({ url, params }).then((res: any) => {
        resolve(res);
      });
    });
  }
}
export default Basic;

const loginM = new Abstract();
export const login = (data: any) => {
  const url = 'api/user/login';
  return new Promise((resolve) => {
    loginM.postRequest({ url, data }).then((res: any) => {
      useStorage('local', 'set', 'token', res.data.token)
      resolve(res);
    });
  });
};

export const register = (data: any) => {
  const url = 'api/user/register';
  return new Promise((resolve) => {
    loginM.postRequest({ url, data }).then((res: any) => {
      resolve(res);
    });
  });
};
