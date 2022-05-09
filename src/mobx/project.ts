import { makeAutoObservable } from 'mobx'
import { Img, ImgGroup } from '../types/project/imgType'

// 项目相关信息
class ProjectState {
  // 未分组的图片信息
  imgs: Img[] = []
  // 分组图片信息
  imgGroups: ImgGroup[] = []

  constructor() {
    makeAutoObservable(this)
  }

  // 在上传图片后更新，应为async
  updateImgs(val: Img[]) {
    this.imgs = val
  }
  // 在检测完成后更新，应为async
  updateImgGroup(val: ImgGroup[]) {
    this.imgGroups = val
  }
}

export const ProjectStore = new ProjectState()
