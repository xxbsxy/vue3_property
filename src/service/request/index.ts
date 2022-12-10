import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import LocalCache from '@/utils/cache'
import { ElMessage } from 'element-plus'
import router from '@/router'
class Request {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        const token = LocalCache.getCache('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        if (res.data.msg) {
          ElMessage.success(res.data.msg)
        }
        return res.data.data
      },
      (err) => {
        console.log(err.response)
        if (err.response.data.msg) {
          if (err.response.data.msg === '无效的token') {
            ElMessage.error('登录过期,请重新登录')
            router.push('/login')
          } else {
            ElMessage.error(err.response.data.msg)
          }
        }
        return err
      }
    )
  }
  request(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
  put(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'PUT' })
  }
  delete(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }
}
export default Request
