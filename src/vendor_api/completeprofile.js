import fetch from '@/utils/fetch'
function getProfile (type, phone) {
  return fetch({
    url: '/v1/vendors/account-audits',
    method: 'get'
  })
}
function getVerityCode (type, phone) {
  return fetch({
    url: '/v1/vendors/' + type + '-captcha?phone=' + phone,
    method: 'post'
  })
}
function postProfile (data) {
  return fetch({
    url: '/v1/vendors/account-audits',
    method: 'post',
    data: data,
    timeout: 5000
  })
}
export { getProfile, getVerityCode, postProfile }
