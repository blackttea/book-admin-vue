/**
 * 存储封装
 * @param type local or session (Storage)
 * @param operation set-设置 get-获得 clear-清除 remove-移除
 * @param key 设置或者移除时需要的键名
 * @param value 设置值
 * @returns {any}
 */

const useStorage = (type: string = 'local', operation: string, key='', value: any = '') => {
  const storage = type === 'local' ? localStorage : sessionStorage;
  switch (operation) {
    case "get":
      return storage.getItem(key) ? JSON.parse(storage.getItem(key) || '') : '';
    case "set":
      if (typeof key === "string") {
        storage.setItem(key, JSON.stringify(value))
      }
      break
    case "clear":
      storage.clear();
      break
    case "remove":
      if (typeof key === "string") {
        storage.removeItem(key);
      }
      break
  }
}

export default useStorage;