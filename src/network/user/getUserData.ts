import { request } from '../request'

export async function getUserData() {
  const res = await request({
    method: 'GET',
    url: '/v1/user'
  })

  return res
}
