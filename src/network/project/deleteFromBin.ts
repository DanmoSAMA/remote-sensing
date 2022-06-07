// 将项目彻底删除

import { request } from '../request'

export async function deleteFromBin(id: string) {
  const res = await request({
    method: 'DELETE',
    url: `/v1/project/${id}`
  })

  return res
}
