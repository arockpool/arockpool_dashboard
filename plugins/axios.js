export default function({ $axios, redirect, req }) {
  /*
   ** 基本配置
   */
  $axios.defaults.timeout = 15 * 1000
  /*
   ** 拦截器
   */
  $axios.interceptors.request.use((config) => {
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  $axios.onRequest(config => {

  })
  $axios.interceptors.response.use((res) => {
    if (res.data && res.data.code != 0) {
      if (res.data.code == 99905) {
        return
      }
    }
    return res.data
  }, (error) => {
    return Promise.reject(error)
  })
  $axios.onError(error => {
    //redirect('/404')
  })
}
