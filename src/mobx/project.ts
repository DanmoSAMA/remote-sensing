import { makeAutoObservable } from 'mobx'
import { Img, ImgGroup, WaitingGroup } from '../types/project/imgType'
import { generateUUID } from '../utils/uuid'
import { postDetectReq } from '../network/changeDetection/postDetectReq'
import { getUpdatedImgs } from '../network/project/getUpdatedImgs'
import { getRecentProjects } from '../network/project/getRecentProjects'

// 项目相关信息
class ProjectState {
  // 项目id
  id = 0
  // 项目名称
  name = ''
  // 未分组的图片信息
  imgs = []
  // 分组图片信息
  imgGroups = []
  // 被选中的图，在页面上呈现
  chosenImgs = []
  // 当前是否展示视图
  showPerspective = false
  // 是否显示放大的图片
  showDetail = false

  /* 变化检测 */
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
  // 展示轴测 or 平面
  displayType: 0 | 1 = 0

  /* 其他 */
  // 被选中的图
  chosenImg = {
    uuid: '',
    name: '',
    url: ''
  }

  // 目前展示的组
  currentShownGroup = {
    groupID: 0,
    groupName: '',
    pictures: [
      {
        uuid: '',
        name: '',
        url: ''
      },
      {
        uuid: '',
        name: '',
        url: ''
      },
      {
        uuid: '',
        name: '',
        url: ''
      }
    ]
  }

  constructor() {
    makeAutoObservable(this)
  }

  // id改变，初始化store
  init(id: number) {
    if (id !== this.id) {
      this.id = id
      this.imgs = []
      this.imgGroups = []
      this.chosenImgs = []
      this.waitingGroupId = 0
      this.waitingGroups = [
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
      this.setProjectName('')
      this.showPerspective = false
    }
  }
  // 设置项目名称
  async setProjectName(name: string) {
    if (name !== '') this.name = name
    else if (this.name !== '') return
    else {
      const res = await getRecentProjects()
      const projects = res.data.projects
      const t = projects.find((item) => (item.id = this.id))
      this.name = t.name
      // console.log(this.name)
    }
  }
  // 在上传图片后更新
  updateImgs(val) {
    this.imgs = val
  }
  // 在检测完成后更新
  updateImgGroup(val) {
    this.imgGroups = val
  }
  // 设置选中的图片，即waitingGroups的第一组，用于在左侧显示
  updateChosenImgs(val) {
    // console.log(val)
    this.chosenImgs = val
  }
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
      // 在img中找
      let img = this.imgs.find((item) => item.name === val)
      // 在groups中找
      if (!img) {
        for (const group of this.imgGroups) {
          img = group.pictures.find((item) => item.name === val)
          if (img) break
        }
      }
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
    if (this.waitingGroups.length > 1) {
      this.waitingGroups = this.waitingGroups.filter((item) => item.id !== id)
    }
  }
  // 开始变化检测
  async changeDetect() {
    // 构造请求数据
    const reqData = []
    for (let i = 0; i < this.waitingGroups.length; i++) {
      const item = this.waitingGroups[i]
      const t = {
        projectID: parseInt(this.id),
        oldUUID: item.oldImg.uuid,
        newUUID: item.newImg.uuid,
        targetUUID: generateUUID()
      }
      if (t.oldUUID !== '' && t.newUUID !== '') {
        reqData.push(t)
      }
    }

    // 并行发送请求
    const promiseArr = []
    for (let i = 0; i < reqData.length; i++) {
      const item = reqData[i]
      promiseArr.push(postDetectReq(item))
    }

    return Promise.all(promiseArr).then((res) => {
      // console.log(res)
      getUpdatedImgs(this.id.toString()).then((res) => {
        const data = res.data
        ProjectStore.updateImgs(data.pictures)
        ProjectStore.updateImgGroup(data.groups)
        ProjectStore.updateCurShownGroup(data.groups.at(-1).groupID)
      })
    })
  }
  // 修改目前展示的组
  updateCurShownGroup(groupID: number) {
    console.log(groupID)
    const t = this.imgGroups.find((item) => item.groupID === groupID)
    console.log(t)
    this.currentShownGroup = {
      groupID: groupID,
      groupName: t.groupName,
      pictures: t.pictures
    }
  }
  // 修改chosenImg
  updateChosenImg(val: string) {
    let img = this.imgs.find((item) => item.name === val)

    if (!img) {
      for (const group of this.imgGroups) {
        img = group.pictures.find((item) => item.name === val)
        if (img) break
      }
    }
    this.chosenImg = img
  }
  // 修改展示状态
  setShowPerspective(val: boolean) {
    this.showPerspective = val
  }
  // 展示图片细节
  setShowDetail(val: boolean) {
    this.showDetail = val
  }
  // 开始地物分类 todo
  async terrainClassification() {
    // 构造请求数据
    // 发送请求
  }
}

export const ProjectStore = new ProjectState()
