import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../SvgIcon'
import List from '@mui/material/List'
import Group from './components/Group'
import Item from './components/Item'
import Loading from './components/Loading'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from '../../hooks/useParams'
import { toolBarStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../mobx/project'
import { uploadFile } from '../../network/project/uploadFile'
import { getUpdatedImgs } from '../../network/project/getUpdatedImgs'
import { generateUUID } from '../../utils/uuid'

function _ToolBar() {
  const id = useParams('id') as string
  const [isUploading, setIsUploading] = useState(false)
  const { pathname } = useLocation()

  // console.log(ProjectStore.currentShownGroups)
  console.log(ProjectStore.imgGroups)

  useEffect(() => {
    ProjectStore.init(parseInt(id))

    getUpdatedImgs(id).then((res) => {
      const data = res.data
      const type =
        pathname === '/analysis'
          ? 1
          : pathname === '/change-detection'
          ? 2
          : pathname === '/terrain-classification'
          ? 3
          : pathname === '/object-extract'
          ? 4
          : 5

      ProjectStore.updateImgs(data.pictures)
      ProjectStore.updateImgGroup(data.groups)
      ProjectStore.updateCurShownGroups(type)
      ProjectStore.updateCurShownImgs()
      preload()
    })
  }, [])

  // 图片预加载
  function preload() {
    const preloadImages: HTMLImageElement[] = []
    for (let i = 0; i < ProjectStore.imgs.length; i++) {
      const img = new Image()
      // 将img从数组中移除，减少内存占用
      img.onload = function () {
        const index = preloadImages.indexOf(this as HTMLImageElement)
        if (index !== 1) {
          preloadImages.splice(index, 1)
        }
      }
      img.src = ProjectStore.imgs[i].url
      preloadImages.push(img)
    }
  }

  function clickToUploadFile(fileList: FileList) {
    // 并行发送请求
    setIsUploading(true)
    const reqData = []

    for (const key in fileList) {
      const formData = new FormData()
      // 项目id
      formData.append('projectID', id)
      // 上传图片数量
      formData.append('imgNum', '1')
      // 图片
      formData.append('img1', fileList[key])
      // uuid
      formData.append('uuid1', generateUUID())
      // 图片名
      formData.append('name1', fileList[key].name)

      reqData.push(formData)

      if (parseInt(key) === fileList.length - 1) {
        break
      }
    }

    const promiseArr = []
    for (let i = 0; i < reqData.length; i++) {
      const item = reqData[i]
      promiseArr.push(uploadFile(item))
    }

    return Promise.all(promiseArr).then((res) => {
      getUpdatedImgs(id).then((res) => {
        const data = res.data
        ProjectStore.updateImgs(data.pictures)
        setIsUploading(false)
      })
    })

    // 只发送一个请求
    // const formData = new FormData()

    // // 项目id
    // formData.append('projectID', id)
    // // 上传图片数量
    // formData.append('imgNum', `${fileList.length}`)

    // for (const key in fileList) {
    //   // 图片
    //   formData.append(`img${parseInt(key) + 1}`, fileList[key])
    //   // uuid
    //   formData.append(`uuid${parseInt(key) + 1}`, generateUUID())
    //   // 图片名
    //   formData.append(`name${parseInt(key) + 1}`, fileList[key].name)

    //   if (parseInt(key) === fileList.length - 1) {
    //     break
    //   }
    // }

    // setIsUploading(true)

    // uploadFile(formData).then((res) => {
    //   getUpdatedImgs(id).then((res) => {
    //     const data = res.data
    //     ProjectStore.updateImgs(data.pictures)
    //     setIsUploading(false)
    //   })
    // })
  }

  return (
    <Box sx={toolBarStyles.wrapper}>
      <Box>
        <Box sx={toolBarStyles.top}>
          <Typography fontSize="16px">图层</Typography>
          <input
            accept="image/*"
            id="contained-button-file"
            style={{ display: 'none' }}
            multiple
            type="file"
            onChange={(e) => {
              clickToUploadFile(e.target.files as FileList)
            }}
          />
          <label
            htmlFor="contained-button-file"
            style={{ width: '60%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              component="span"
              style={{
                backgroundColor: '#313131',
                color: '#FCFBF4',
                boxShadow: 'none',
                fontWeight: '300',
                fontSize: '16px'
              }}
            >
              <SvgIcon name="import" />
              导入图片
            </Button>
          </label>
        </Box>
        <List>
          {ProjectStore.imgGroups &&
            ProjectStore.imgGroups.map((item) => (
              <Group group={item} key={item.groupID} />
            ))}
        </List>
        <List>
          {ProjectStore.imgs &&
            ProjectStore.imgs.map((item) => (
              <Item item={item} key={item.uuid} />
            ))}
        </List>
      </Box>
      {isUploading && (
        <Box sx={toolBarStyles.mask}>
          <Loading />
        </Box>
      )}
    </Box>
  )
}

const ToolBar = observer(_ToolBar)

export default ToolBar
