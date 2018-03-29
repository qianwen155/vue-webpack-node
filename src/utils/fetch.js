import axios from 'axios'
import { Toast } from 'mint-ui'
import { eventHub } from '@/utils/eventHub'
import { getUrlParms } from '@/utils/tool'
// importGoods { jwt } from '@/store/env'
import { jwtOverdue } from './errorCode'

// 创建axios实例
// let jwt
// eventHub.$on('jwt', data => {
//   console.log(data)
//   return data
// })
console.log(getUrlParms('accesstoken'))
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000,                  // 请求超时时间
  headers: {
    Authorization: getUrlParms('accesstoken') ? getUrlParms('accesstoken') : localStorage.getItem('accesstoken')
  },
  validateStatus: function (status) {
    return status >= 200 && status <= 500 // default
  }
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  // 直接添加jwt 验证
  // if (!config.params) {
  //   config.
  // }
  // config.params.jwt = jwt
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === jwtOverdue) {
      Toast({
        message: '登录过期',
        className: 'toast-rem'
      })
      return
    }
    if (res.code >= 500 || res.code === 403 || res.code === 404) {
      eventHub.$emit('serverError', res.code)
    }
    return response
  }, error => {
  return Promise.reject(error)
}
)

export default service
