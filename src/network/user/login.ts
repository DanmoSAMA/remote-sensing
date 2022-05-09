import { request } from '../request'
import { LoginReqData } from '../../types/user/login'

export async function register(data: LoginReqData) {
  const res = await request({
    method: 'POST',
    data,
    url: '/v1/session'
  })

  return !!res.data
}
