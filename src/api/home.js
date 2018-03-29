import fetch from '@/utils/fetch'
// import Cookies from 'js-cookie'

function getAccountMsg () {
  return fetch({
    url: 'v1/accounts',
    method: 'get',
    timeout: 5000
  })
}
function getAccountList (page) {
  return fetch({
    url: 'v1/accounts/vouchers?pagesize=10&page=' + page,
    method: 'get',
    timeout: 5000
  })
}
export default getAccountMsg
export { getAccountMsg, getAccountList }
