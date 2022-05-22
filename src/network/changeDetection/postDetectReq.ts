import { request } from '../request'

export async function postDetectReq(data) {
  const res = await request({
    method: 'POST',
    data,
    url: '/v1/project/picture/cd'
  })

  return res
}
