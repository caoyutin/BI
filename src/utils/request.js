import axios from 'axios'
// import { getToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://10.240.10.173:8080',
  // 超时
  timeout: 10000
})
// request拦截器
// service.interceptors.request.use(
//   config => {
//     app.$vux.loading.show({
//       text: '数据加载中……'
//     });
//   },
//   error => {
//     console.log(error)
//     Promise.reject(error)
//   }
// )


export default service
