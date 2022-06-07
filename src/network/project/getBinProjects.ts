import { request } from '../request'

export async function getBinProjects() {
  const res = await request({
    method: 'GET',
    url: '/v1/project/recycle'
  })

  return res
}
