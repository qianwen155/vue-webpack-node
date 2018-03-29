import fetch from '@/utils/fetch'

function getVerityCode (type, phone) {
  return fetch({
    url: '/v1/vendors/' + type + '-captcha?phone=' + phone,
    method: 'post'
  })
}
function postPassword (data) {
  return fetch({
    url: '/v1/accounts/init-password',
    method: 'post',
    data: data,
    timeout: 5000
  })
}
export { getVerityCode, postPassword }
