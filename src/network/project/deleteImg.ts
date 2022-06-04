import { request } from '../request'

export async function deleteImg(data) {
  const res = await request({
    method: 'DELETE',
    data,
    url: '/v1/project/picture'
  })

  return res
}
