import { request } from '../request'

export async function postSortReq(data) {
  const res = await request({
    method: 'POST',
    data,
    url: '/v1/project/picture/gs'
  })

  return res
}
