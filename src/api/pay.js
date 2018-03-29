import fetch from '@/utils/fetch'
// 获取账户信息
function getPayInfo (data) {
  return fetch({
    url: 'v1/pay/payInfo', //?sttaus=' + status + '&code=' + code + '&channel=' + channel,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 5000,
    data: data
  })
}
function postPayData (data) {
  return fetch({
    url: '/v1/pay/payment-ticket',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 5000,
    data: data
  })
}
// 获取二维码
function getQrcode (data) {
  return fetch({
    url: '/v1/pay/qrcode',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 5000,
    responseType: 'blob',
    data: data
  })
}
export default getPayInfo
export { getPayInfo, postPayData, getQrcode }

