import { HttpRes } from '../HttpRes'

export type LoginReqData = {
  // 用户邮箱
  account: string
  // 用户密码
  password: string
}

export type LoginReq = HttpRes<LoginReqData>
