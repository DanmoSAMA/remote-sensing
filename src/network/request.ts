import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { HttpRes } from '../types/HttpRes'
import { BE_DOMAIN } from '../consts/domain'
import { getToken } from '../utils/token'

// 记录对哪些url的请求正在进行中, 若上一次请求未完成则不进行下一次请求
const requestSet = new Set<string>()

export async function request<T>(config: AxiosRequestConfig) {
  // 判断两个请求是否完全相同的 key
  // 后置! 使null和undefined类型可以赋值给其他类型并通过编译，表示该变量值可空
  const key =
    JSON.stringify(config.data) + config.url! + JSON.stringify(config.params)

  if (requestSet.has(key)) {
    // 已经有一个一样的请求在路上了, 啥都不做
    return {
      status: 400,
      msg: '请求过于频繁',
      data: null
    }
  } else {
    requestSet.add(key)

    // 根据指定配置创建一个新的 axios
    const instance = axios.create({
      baseURL: BE_DOMAIN,
      timeout: 60000
    })

    // 添加请求拦截器
    instance.interceptors.request.use(
      // 在发送请求之前做些什么
      (config) => {
        const token = getToken()
        if (token) config.headers.Authorization = token.value
        return config
      },
      // 对请求错误做些什么
      (err) => {
        console.error(err)
        return err
      }
    )

    return new Promise<HttpRes<T | null>>((resolve, reject) => {
      instance(config)
        .then((res: AxiosResponse<HttpRes<T>>) => {
          if (res.data) {
            if (res.status !== 200) {
              alert(res.data.msg)
              resolve({ ...res.data, data: null })
            } else {
              // 直接取得data
              resolve(res.data)
            }
          } else {
            console.log('# request then', { res })
            throw new Error('出错了')
          }
        })
        .catch((err: (Error & AxiosError) | null) => {
          // 归一化 err 为 string
          let errStr = ''

          if (!err) {
            console.error('# request !err', { err })
            errStr = '出错了'
          } else if ((err as AxiosError).response) {
            // 是出错了的 http 请求
            console.error('# request AxiosError', { err })
            errStr = '出错了'
          } else if ((err as Error) instanceof Error) {
            errStr = err.message
          } else {
            console.error('# _request unknown err', { err })
            errStr = '出错了'
          }

          resolve({ data: null, status: 400, msg: errStr })
        })
        .finally(() => {
          requestSet.delete(key)
        })
    })
  }
}
