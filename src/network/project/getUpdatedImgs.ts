import { request } from '../request'

export async function getUpdatedImgs(id: string) {
  const res = await request({
    method: 'GET',
    url: `/v1/project/${id}`
  })

  return res
}
