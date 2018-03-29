import fetch from '@/utils/fetch'
// import Cookies from 'js-cookie'

function getAccountMsg () {
  return fetch({
    url: 'v1/accounts-vendor',
    method: 'get',
    timeout: 5000
  })
}
function getVendorVouchers (page) {
  return fetch({
    url: '/v1/accounts-vendor/vendor-vouchers?pagesize=10&page=' + page,
    method: 'get',
    timeout: 5000
  })
}
function getAccountList (page) {
  return fetch({
    url: 'v1/accounts-vendor/vouchers?pagesize=10&page=' + page,
    method: 'get',
    timeout: 5000
  })
}
export default getAccountMsg
export { getAccountMsg, getVendorVouchers, getAccountList }
