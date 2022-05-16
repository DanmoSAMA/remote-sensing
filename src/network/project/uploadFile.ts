import { request } from '../request'

export async function uploadFile(data) {
  // 要求data是form-data
  // 后期重构时，添加类型约束
  const res = await request({
    method: 'POST',
    data,
    url: '/v1/project/picture'
  })

  return res
}
