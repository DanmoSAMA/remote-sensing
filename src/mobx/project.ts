import { makeAutoObservable } from 'mobx'
import { Img, ImgGroup, WaitingGroup } from '../types/project/imgType'

// 项目相关信息
class ProjectState {
  // 未分组的图片信息
  imgs: Img[] = []
  // 分组图片信息
  imgGroups: ImgGroup[] = []
  // 被选中的两张图，在页面上呈现
  chosenImgs: Img[] = []
  // 待分析图片组
  waitingGroupId: number = 0
  waitingGroups: WaitingGroup[] = [
    {
      id: this.waitingGroupId,
      oldImg: {
        id: 0,
        name: '',
        url: ''
      },
      newImg: {
        id: 0,
        name: '',
        url: ''
      }
    }
  ]

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
  // 设置选中的图片，其实也是waitingGroups的第一组，用于在左侧显示
  updateChosenImgs(val: Img[]) {
    this.chosenImgs = val
  }
  // 插入空waitingImgs(纯前端行为)
  addWaitingImgs() {
    this.waitingGroups.push({
      id: ++this.waitingGroupId,
      oldImg: {
        id: 0,
        name: '',
        url: ''
      },
      newImg: {
        id: 0,
        name: '',
        url: ''
      }
    })
  }
  // 修改waitingImgs
  updateWaitingImgs(id: number, type: 0 | 1, val: Img) {
    const pair = this.waitingGroups.find((item) => item.id === id)
    if (pair) {
      if (type === 0) {
        pair.oldImg = val
      } else {
        pair.newImg = val
      }
    }
  }
}

export const ProjectStore = new ProjectState()
