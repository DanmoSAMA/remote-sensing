// 将项目移动至回收站

import { request } from '../request'

export async function moveToBin(id: string) {
  const res = await request({
    method: 'POST',
    url: `/v1/project/${id}/delete`
  })

  return res
}
