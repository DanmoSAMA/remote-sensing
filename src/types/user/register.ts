import { HttpRes } from '../HttpRes'

export type RegisterReqData = {
  // 用户邮箱
  account: string
  // 用户密码
  password: string
}

export type RegisterResData = {
  code: string
  msg: string
  data: null | object
}

export type RegisterRes = HttpRes<RegisterResData>
