// 对象序列化，undefined和函数丢失问题
const JSONStringify = (option: any) => {
  return JSON.stringify(option,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === 'function') {
        return val.toString();
      }
      // 处理undefined丢失问题
      if (typeof val === 'undefined') {
        return 'undefined';
      }
      return val;
    },
    2
  )
}
// 对象序列化解析
const JSONParse = (objStr: any) => {
  return JSON.parse(objStr, (k, v) => {
    const fun = ['require', 'function', '() =>'];
    if (typeof v === 'string' && v.indexOf && fun.some((f) => {return v.indexOf(f) > -1})) {
      return new Function(`return ${v}`)
    }
    return v;
  });
}

export {JSONStringify, JSONParse}