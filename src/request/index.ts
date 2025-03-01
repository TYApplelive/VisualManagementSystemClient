import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'

// ! 前端的接口数据应该按照
// ! 后端的传输数据来进行类型的构建
// ! 目的是为了避免类型错误，方便编译器提示
type Result<T> = {
  result: boolean
  tips: string
  date: string
  data: T
}

export class Request {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = { timeout: 6000, baseURL: 'http://localhost:2007' }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res
      },
      (error: AxiosError) => {
        let message = ''
        if (error.response)
          switch (error.response.status) {
            case 400:
              message = '请求错误(400)'
              break
            case 401:
              message = '未授权，请重新登录(401)'
              // 这里可以做清空storage并跳转到登录页的操作
              break
            case 403:
              message = '拒绝访问(403)'
              break
            case 404:
              message = '请求出错(404)'
              break
            case 408:
              message = '请求超时(408)'
              break
            case 500:
              message = '服务器错误(500)'
              break
            case 501:
              message = '服务未实现(501)'
              break
            case 502:
              message = '网络错误(502)'
              break
            case 503:
              message = '服务不可用(503)'
              break
            case 504:
              message = '网络超时(504)'
              break
            case 505:
              message = 'HTTP版本不受支持(505)'
              break
            default:
              message = `连接出错(${error.response.status})!`
          }
        // TODO 可在此处对message进行自定义处理
        // TODO ...code...
        // TODO 此处不处理，直接返回
        return Promise.reject({ ...error, message })
      }
    )
  }
  //请求方法
  public async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config)
  }

  public async post<T, U>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config)
  }

  public async put<T, U>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config)
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config)
  }
}

export default new Request({})
