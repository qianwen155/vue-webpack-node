/**
 * 过滤时间
 * @param {*} time
 */
import swal from 'sweetalert2'
function periodDay (time) {
  // 初始化时间戳
  time = time.replace(/-/g, '/')
  const cObj = new Date(time)
  const tObj = new Date()
  // 获得创建年月日
  const Y = cObj.getFullYear() + '-'
  const M = (cObj.getMonth() + 1 < 10 ? '0' + (cObj.getMonth() + 1) : cObj.getMonth() + 1) + '-'
  const D = cObj.getDate() + ' '
  // 计算时间差
  const createTime = new Date(cObj.getFullYear(), cObj.getMonth(), cObj.getDate())
  const nowTime = new Date(tObj.getFullYear(), tObj.getMonth(), tObj.getDate())
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const millisBetween = nowTime.getTime() - createTime.getTime()

  let date = {}
  date.hours = tObj.getHours() - cObj.getHours()
  date.days = millisBetween / millisecondsPerDay

  if (date.days === 0) {
    if (date.hours < 2) {
      date.str = '刚刚发布'
      return date
    }
    date.str = date.hours + '小时之前'
    return date
  }
  if (date.days < 7) {
    date.str = date.days + '天前'
    return date
  }
  if (date.days >= 7 && date.days < 30) {
    date.str = (date.days / 7).toFixed(0) + '周前'
    return date
  }
  date.str = Y + M + D
  return date
}

function imgHandle (url, width, height) {
  const fontSize = document.documentElement.style.fontSize.split('px')[0]
  return url + '?imageView2/1/w/' + (fontSize / 75 * width).toFixed(0) + '/h/' + (fontSize / 75 * height).toFixed(0) + '/q/50'
}
function getUrlParms (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}
function myToast (type, text) {
  swal({
    type: type,
    text: text,
    showConfirmButton: false,
    width: '70%',
    timer: 1500
  })
}
export { periodDay, imgHandle, getUrlParms, myToast }
export default periodDay
