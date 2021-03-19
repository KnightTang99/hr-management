import axios from 'axios'
import Message from 'element-ui' // 导入element-ui弹框组件
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 从.env.development拿到的开发环境时的接口，为什么不补全接口？？？
  timeout: 5000
})
service.interceptors.request.use()
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data // 每个返回的response都被一个data包裹，对其进行解构,
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message)) // 为什么需要返回
    }
  },
  error => {
    // 所有非2xx的请求都会走这里
    Message.error(error.message)
    return Promise.reject(error)
  }
)
export default service
