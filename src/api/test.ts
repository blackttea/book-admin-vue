import Abstract from '../request/abstract';
import useStorage from "@/hooks/useStorage";

const loginM = new Abstract();
export const getTable = (data: any) => {
  const url = 'api/commodity/list';
  return new Promise((resolve) => {
    loginM.postRequest({ url, data }).then((res: any) => {
      useStorage('local', 'set', 'token', res.data.token)
      resolve(res);
    });
  });
};