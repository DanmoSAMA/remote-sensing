// 将项目移动至回收站

import { request } from '../request'

export async function moveToRecent(id: string) {
  const res = await request({
    method: 'POST',
    url: `/v1/project/${id}/recover`
  })

  return res
}
