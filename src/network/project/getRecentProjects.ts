import { request } from '../request'

export async function getRecentProjects() {
  const res = await request({
    method: 'GET',
    url: '/v1/project'
  })

  return res
}
