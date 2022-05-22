import { makeAutoObservable } from 'mobx'
import { Img, ImgGroup, WaitingGroup } from '../types/project/imgType'
import { generateUUID } from '../utils/uuid'
import { postDetectReq } from '../network/changeDetection/postDetectReq'

// 项目相关信息
class ProjectState {
  // 项目id
  id = 0
  // 未分组的图片信息
  imgs: Img[] = []
  // 分组图片信息
  imgGroups: ImgGroup[] = []
  // 被选中的两张图，在页面上呈现
  chosenImgs: Img[] = []
  // 待分析图片组，用于渲染页面
  waitingGroupId: number = 0
  // 初始化
  waitingGroups = [
    {
      id: this.waitingGroupId,
      oldImg: {
        uuid: '',
        name: '',
        url: ''
      },
      newImg: {
        uuid: '',
        name: '',
        url: ''
      }
    }
  ]

  constructor() {
    makeAutoObservable(this)
  }

  // 设置id
  setID(id: string) {
    this.id = id
  }
  // 在上传图片后更新
  updateImgs(val: Img[]) {
    this.imgs = val
  }
  // 在检测完成后更新
  updateImgGroup(val: ImgGroup[]) {
    this.imgGroups = val
  }
  // 设置选中的图片，也是waitingGroups的第一组，用于在左侧显示
  updateChosenImgs(val: Img[]) {
    console.log(val)
    this.chosenImgs = val
  }
  // waitingImgs等一系列操作是前端行为
  // 插入空waitingImgs
  addWaitingImgs() {
    this.waitingGroups.push({
      id: ++this.waitingGroupId,
      oldImg: {
        uuid: '',
        name: '',
        url: ''
      },
      newImg: {
        uuid: '',
        name: '',
        url: ''
      }
    })
  }
  // 修改waitingImgs
  updateWaitingImgs(id: number, type: 0 | 1, val: string) {
    const pair = this.waitingGroups.find((item) => item.id === id)
    if (pair) {
      const img = this.imgs.find((item) => item.name === val)
      if (img) {
        if (type === 0) {
          pair.oldImg = img
        } else {
          pair.newImg = img
        }
      }
    }
  }
  // 删除waitingImgs
  deleteWaitingImgs(id: number) {
    this.waitingGroups = this.waitingGroups.filter((item) => item.id !== id)
  }
  // 开始检测
  async detect() {
    // 构造请求数据
    const reqData = []
    for (let i = 0; i < this.waitingGroups.length; i++) {
      const item = this.waitingGroups[i]
      const t = {
        projectID: parseInt(this.id),
        originUUID: [],
        targetUUID: generateUUID()
      }
      t.originUUID.push(item.oldImg.uuid)
      t.originUUID.push(item.newImg.uuid)
      if (t.originUUID[0] !== '' && t.originUUID[1] !== '') {
        reqData.push(t)
      }
    }
    console.log(reqData)

    // 并行发送请求
    for (let i = 0; i < reqData.length; i++) {
      const item = reqData[i]
      // console.log(item)
      console.log('开始检测')
      postDetectReq(item).then((res) => {
        console.log(res)
        location.reload()
      })
    }
  }
}

export const ProjectStore = new ProjectState()
