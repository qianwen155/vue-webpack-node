/**
 * 解析url参数
 * @param url 完整的url
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
function urlParse (url) {
  // let url = window.location.search
  // console.log(window.location.search)
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
export default urlParse
