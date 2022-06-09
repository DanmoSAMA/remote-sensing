import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../SvgIcon'
import List from '@mui/material/List'
import Group from './components/Group'
import Item from './components/Item'
import { useEffect } from 'react'
import { useParams } from '../../hooks/useParams'
import { toolBarStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../mobx/project'
import { uploadFile } from '../../network/project/uploadFile'
import { getUpdatedImgs } from '../../network/project/getUpdatedImgs'
import { generateUUID } from '../../utils/uuid'

function _ToolBar() {
  const id = useParams('id') as string

  useEffect(() => {
    ProjectStore.init(parseInt(id))

    getUpdatedImgs(id).then((res) => {
      const data = res.data

      ProjectStore.updateImgs(data.pictures)
      ProjectStore.updateImgGroup(data.groups)

      // console.log(data)

      preload()
    })
  }, [])

  // 图片预加载
  function preload() {
    const preloadImages = []
    for (let i = 0; i < ProjectStore.imgs.length; i++) {
      const img = new Image()
      img.onload = function () {
        const index = preloadImages.indexOf(this)
        if (index !== 1) {
          preloadImages.splice(index, 1)
        }
      }
      img.src = ProjectStore.imgs[i].url
      preloadImages.push(img)
    }
  }

  function clickToUploadFile(fileList) {
    const reqData = new FormData()

    // 项目id
    reqData.append('projectID', id)
    // 上传图片数量
    reqData.append('imgNum', `${fileList.length}`)

    for (const key in fileList) {
      // 图片
      reqData.append(`img${parseInt(key) + 1}`, fileList[key])
      // uuid
      reqData.append(`uuid${parseInt(key) + 1}`, generateUUID())
      // 图片名
      reqData.append(`name${parseInt(key) + 1}`, fileList[key].name)

      if (parseInt(key) === fileList.length - 1) {
        break
      }
    }

    uploadFile(reqData).then((res) => {
      if (res.code === 1000) alert('图片已存在')
      else {
        getUpdatedImgs(id).then((res) => {
          const data = res.data
          ProjectStore.updateImgs(data.pictures)
        })
      }
    })
  }

  return (
    <Box sx={toolBarStyles.wrapper}>
      <Box sx={toolBarStyles.top}>
        <Typography fontSize="16px">图层</Typography>
        <input
          accept="image/*"
          id="contained-button-file"
          style={{ display: 'none' }}
          multiple
          type="file"
          onChange={(e) => {
            clickToUploadFile(e.target.files)
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
          ProjectStore.imgs.map((item) => <Item item={item} key={item.uuid} />)}
      </List>
    </Box>
  )
}

const ToolBar = observer(_ToolBar)

export default ToolBar
