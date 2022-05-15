import { request } from '../request'
import {
  RegisterReqData,
  RegisterRes,
  RegisterResData
} from '../../types/user/register'

export async function register(data: RegisterReqData) {
  const resData = await request({
    method: 'POST',
    data,
    url: '/v1/user'
  })

  return resData
}
