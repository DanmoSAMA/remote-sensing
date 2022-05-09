import { HttpRes } from '../HttpRes'

export type RegisterReqData = {
  // 用户邮箱
  account: string
  // 用户密码
  password: string
}

export type RegisterReq = HttpRes<RegisterReqData>
