import { request } from '../request'
import { RegisterReqData } from '../../types/user/register'

export async function register(data: RegisterReqData) {
  const res = await request({
    method: 'POST',
    data,
    url: '/v1/user'
  })

  return !!res.data
}
