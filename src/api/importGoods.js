import fetch from '@/utils/fetch'

function importGoods (data) {
  return fetch({
    url: '/v1/business',
    method: 'post',
    timeout: 5000,
    data: data
  })
}
function getTitle () {
  return fetch({
    url: 'v1/business/title',
    method: 'get',
    timeout: 5000
  })
}
export { importGoods, getTitle }
