export type Img = {
  id: number
  url: string
  name: string
}

export type ImgGroup = {
  id: number
  name: string
  members: Img[]
}
