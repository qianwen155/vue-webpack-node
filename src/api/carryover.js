import fetch from '@/utils/fetch'
// import Cookies from 'js-cookie'
// 账户信息
function getAccountMsg () {
  return fetch({
    url: 'v1/accounts/withdrawal?',
    method: 'get',
    timeout: 5000
  })
}
// 提现信息
function postCarryover (data) {
  return fetch({
    url: 'v1/accounts/transfer',
    method: 'post',
    timeout: 5000,
    data: data
  })
}
// 申转账历史
function getCarryoverList (page, type) {
  return fetch({
    url: 'v1/accounts/voucher-history?pagesize=10&page=' + page + '&type=' + type,
    method: 'get',
    timeout: 5000
  })
}
// 转账详情
function getCarryoverDetail (vid) {
  return fetch({
    url: 'v1/accounts/vouchers/' + vid,
    method: 'get',
    timeout: 5000
  })
}
function getAccountList (contain) {
  return fetch({
    url: 'v1/accounts/transfer?contain=' + contain,
    method: 'get',
    timeout: 5000
  })
}
export default getAccountMsg
export { getAccountMsg, postCarryover, getCarryoverList, getCarryoverDetail, getAccountList }
