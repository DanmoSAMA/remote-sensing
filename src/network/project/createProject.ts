import { request } from '../request'

export async function createProject(data) {
  const res = await request({
    method: 'POST',
    data,
    url: '/v1/project'
  })

  return res
}
