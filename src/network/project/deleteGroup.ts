import { request } from '../request'

export async function deleteGroup(data) {
  const res = await request({
    method: 'DELETE',
    data,
    url: '/v1/project/group'
  })

  return res
}
