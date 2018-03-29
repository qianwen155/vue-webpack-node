import fetch from '@/utils/fetch'
// import Cookies from 'js-cookie'
// 账户信息
function getAccountMsg () {
  return fetch({
    url: 'v1/accounts/withdrawal',
    method: 'get',
    timeout: 5000
  })
}
// 提现信息
function postTransfer (data) {
  return fetch({
    url: 'v1/accounts/withdrawal',
    method: 'post',
    timeout: 5000,
    data: data
  })
}
// 申请提现
function getTransferList (page) {
  return fetch({
    url: 'v1/accounts/voucher-history?pagesize=10&page=' + page + '&type=WITHDRAWAL',
    method: 'get',
    timeout: 5000
  })
}
// 转账详情
function getTransferDetail (vid) {
  return fetch({
    url: 'v1/accounts/vouchers/' + vid,
    method: 'get',
    timeout: 5000
  })
}
export default getAccountMsg
export { getAccountMsg, postTransfer, getTransferList, getTransferDetail }
