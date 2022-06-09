import { HttpRes } from '../HttpRes'

export type Img = {
  uuid: string
  url: string
  name: string
}

export type Group = {
  groupID: number
  groupName: string
  groupType: 1 | 2 | 3 | 4 | 5
  pictures: Img[]
}

export type WaitingGroup = {
  id: number
  oldImg: Img
  newImg: Img
}

// 删除图片
export type DeleteImgReqData = {
  projectID: number
  // uuid 数组
  pictures: string[]
}
export type DeleteImgResData = {}
export type DeleteImgRes = HttpRes<DeleteImgResData>

// 删除组
export type DeleteGroupReqData = {
  projectID: number
  groupID: number
}
export type DeleteGroupResData = {}
export type DeleteGroupRes = HttpRes<DeleteImgResData>

// 获得当前项目的组和图片
export type GetUpdatedResData = {
  groups: Group[]
  pictures: Img[]
}
export type GetUpdatedRes = HttpRes<GetUpdatedResData>

// 上传图片
export type UploadImgReqData = FormData
export type UploadImgResData = {}
export type UploadImgRes = HttpRes<UploadImgResData>
