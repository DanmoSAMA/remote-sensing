export type HttpRes<T = unknown> = {
  status: number
  msg: string
  data: T
}