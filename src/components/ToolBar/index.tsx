import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../SvgIcon'
import List from '@mui/material/List'
import Group from './components/Group'
import Item from './components/Item'
import { useState } from 'react'
import { toolBarStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../mobx/project'
import { uploadFile } from '../../network/project/uploadFile'
import { generateUUID } from '../../utils/uuid'
import { useSearchParams } from 'react-router-dom'

// ProjectStore.updateImgs([
//   {
//     id: 1,
//     url: 'https://z3.ax1x.com/2021/08/17/fInXEF.png',
//     name: '图片1'
//   },
//   {
//     id: 2,
//     url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
//     name: '图片2'
//   },
//   {
//     id: 3,
//     url: 'https://z3.ax1x.com/2021/08/17/fInRHS.png',
//     name: '图片3'
//   }
// ])

// ProjectStore.updateImgGroup([
//   {
//     id: 1,
//     name: '组1',
//     members: [
//       {
//         id: 1,
//         url: 'https://z3.ax1x.com/2021/08/17/fInXEF.png',
//         name: '图片1'
//       },
//       {
//         id: 2,
//         url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
//         name: '图片2'
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: '组2',
//     members: [
//       {
//         id: 2,
//         url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
//         name: '图片2'
//       },
//       {
//         id: 3,
//         url: 'https://z3.ax1x.com/2021/08/17/fInRHS.png',
//         name: '图片3'
//       }
//     ]
//   }
// ])

function _ToolBar() {
  // 一次可选择多张图片，所以是数组
  const [fileList, setFileList] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  let id = ''

  for (const [key, value] of searchParams) {
    if (key === 'id') id = value
  }

  function clickToUploadFile() {
    const reqData = new FormData()

    // 项目id
    reqData.append('id', id)
    // 上传图片数量
    reqData.append('imgNum', `${fileList.length}`)

    fileList.forEach((item, index) => {
      reqData.append(`img${index + 1}`, item)
      const uuid = generateUUID(item)
      reqData.append(`uuid${index + 1}`, `${uuid}`)
    })

    uploadFile(reqData).then((res) => {
      console.log(res)
    })
  }

  return (
    <Box sx={toolBarStyles.wrapper}>
      <Box sx={toolBarStyles.top}>
        <Typography>图层</Typography>
        <input
          accept="image/*"
          id="contained-button-file"
          style={{ display: 'none' }}
          multiple
          type="file"
          onChange={(e) => {
            setFileList(e.target.files)
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
              fontWeight: '300'
            }}
            onClick={() => {
              clickToUploadFile()
            }}
          >
            <SvgIcon name="import" />
            导入图片
          </Button>
        </label>
      </Box>
      <List>
        {ProjectStore.imgGroups.map((item) => (
          <Group group={item} key={item.id} />
        ))}
      </List>
      <List>
        {ProjectStore.imgs.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </List>
    </Box>
  )
}

const ToolBar = observer(_ToolBar)

export default ToolBar
