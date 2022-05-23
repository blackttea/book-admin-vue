/**
 * 判断 | 返回 元素类型
 * @param value 元素
 * @param type 判断类型-'string' || 'String' 'number' || 'Number' [type 不填, 只返回值]
 */
const useGetType = (value: any, type: string = '') => {
  const dataType = Object.prototype.toString.call(value)
  switch (type){
    case 'string' || 'String':
      return dataType === '[object String]'
    case 'number' || 'Number':
      return dataType === '[object Number]'
    case 'boolean' || 'Boolean':
      return dataType === '[object Boolean]'
    case 'symbol' || 'Symbol':
      return dataType === '[object Symbol]'
    case 'undefined' || 'Undefined':
      return dataType === '[object Undefined]'
    case 'null' || 'Null':
      return dataType === '[object Null]'
    case 'date' || 'Date':
      return dataType === '[object Date]'
    case 'array' || 'Array':
      return dataType === '[object Array]'
    case 'regExp' || 'RegExp':
      return dataType === '[object RegExp]'
    case 'error' || 'Error':
      return dataType === '[object Error]'
    case 'dom' || 'Dom':
      return dataType === '[object HTMLDocument]'
    case 'window' || 'Window':
      return dataType === '[object global]'
    case 'object' || 'Object':
      return dataType === '[object Object]'
    case '':
      return dataType
  }
}

export default useGetType