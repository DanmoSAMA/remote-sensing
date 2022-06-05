// 将项目移动至回收站

import { request } from '../request'

export async function deleteProject(id: string) {
  const res = await request({
    method: 'DELETE',
    url: `/v1/project/${id}`
  })

  return res
}
