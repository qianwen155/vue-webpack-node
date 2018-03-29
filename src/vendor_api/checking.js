import fetch from '@/utils/fetch'
// 账户信息
function getAccountMsg () {
  return fetch({
    url: 'v1/accounts-vendor',
    method: 'get',
    timeout: 5000
  })
}

// 月账单
function getMonthly () {
  return fetch({
    url: 'v1/accounts-vendor/monthly-vouchers?pageSize=10',
    method: 'get',
    timeout: 5000
  })
}
function getMonthlyList (page) {
  return fetch({
    url: 'v1/accounts-vendor/monthly-vouchers?pageSize=10&page=' + page,
    method: 'get',
    timeout: 5000
  })
}
// 某月详情
function getMonthlyDetail (mid) {
  return fetch({
    url: 'v1/accounts-vendor/vouchers/' + '?month=' + mid + '&pageSize=10',
    method: 'get',
    timeout: 5000
  })
}
function getAccountList (mid, page) {
  return fetch({
    url: 'v1/accounts-vendor/vouchers?month=' + mid + '&pageSize=10&page=' + page,
    method: 'get',
    timeout: 5000
  })
}

function postCheckData (months) {
  return fetch({
    url: '/v1/accounts-vendor/send-statement-of-account?months=' + months,
    method: 'post',
    timeout: 5000
  })
}
export default getAccountMsg
export { getAccountMsg, getMonthly, getMonthlyList, getMonthlyDetail, getAccountList, postCheckData }

