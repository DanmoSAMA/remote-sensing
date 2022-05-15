import { request } from '../request'
import { RegisterReqData, RegisterResData } from '../../types/user/register'

export async function register(
  data: RegisterReqData
): Promise<RegisterResData> {
  const res = await request({
    method: 'POST',
    data,
    url: '/v1/user'
  })

  return res.data as Promise<RegisterResData>
}
