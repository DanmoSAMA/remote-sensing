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

export type WaitingGroup = {
  id: number
  oldImg: Img
  newImg: Img
}
