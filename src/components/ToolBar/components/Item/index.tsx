import Box from '@mui/material/Box'
import SvgIcon from '../../../SvgIcon'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import { toolBarStyles } from '../../styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../../../mobx/project'
import { deleteImg } from '../../../../network/project/deleteImg'
import { getUpdatedImgs } from '../../../../network/project/getUpdatedImgs'
import { updateImgName } from '../../../../network/project/updateImgName'
import { Img } from '../../../../types/project/ImgAndGroup'
import { useShowDropDown } from '../../hooks/useShowDropdown'
import { useParams } from '../../../../hooks/useParams'
import { useState } from 'react'

type Props = {
  item: Img
}

function _Item(props: Props) {
  const { item } = props
  const { showDropDown, setShowDropDown } = useShowDropDown()
  const projectID = useParams('id') as string
  const [isEdited, setIsEdited] = useState(false)
  const [imgName, setImgName] = useState('')

  async function clickToDeleteImg(uuid: string) {
    const reqData = {
      projectID: parseInt(projectID),
      pictures: [uuid]
    }
    if (window.confirm('确定要删除该图片吗?')) {
      const res = await deleteImg(reqData)
      if (res.code === 0) {
        getUpdatedImgs(projectID).then((res) => {
          const data = res.data
          ProjectStore.updateImgs(data.pictures)
        })
      }
    }
  }

  return (
    <ListItem key={item.uuid} sx={toolBarStyles.listItem}>
      {ProjectStore.displayType === 1 && (
        <SvgIcon name="eye_hidden" class="toolbar" />
      )}
      {!isEdited &&
        `${item.name.slice(0, 14)}${item.name.length > 14 ? '...' : ''}`}
      {isEdited && (
        <input
          type="text"
          style={{
            width: '70%',
            height: '100%',
            padding: '0 35px 0 0',
            outline: 'none',
            border: 'none',
            backgroundColor: '#313131',
            color: '#fcfbf4',
            fontSize: '15px'
          }}
          maxLength={18}
          onChange={(e) => {
            setImgName(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.nativeEvent.key === 'Enter') {
              const reqData = {
                projectID: parseInt(projectID),
                uuid: item.uuid,
                name: imgName
              }
              updateImgName(reqData).then((res) => {
                getUpdatedImgs(projectID).then((res) => {
                  ProjectStore.updateImgs(res.data.pictures)
                  setIsEdited(false)
                  setShowDropDown(false)
                })
              })
            }
          }}
        />
      )}

      <div
        onClick={(e) => {
          setShowDropDown(!showDropDown)
          e.stopPropagation()
        }}
      >
        <SvgIcon name="more" class="toolbar right" />
      </div>
      <Box
        sx={toolBarStyles.dropDown}
        onClick={(e) => e.stopPropagation()}
        style={{ display: showDropDown ? 'block' : 'none' }}
      >
        <ListItem
          sx={toolBarStyles.dropDownItem}
          onClick={() => {
            setIsEdited(true)
          }}
        >
          <SvgIcon name="rename" class="toolbar dropdown" />
          重命名
        </ListItem>
        <Divider color="secondary" variant="middle" />
        <ListItem
          sx={toolBarStyles.dropDownItem}
          onClick={() => {
            clickToDeleteImg(item.uuid)
          }}
        >
          <SvgIcon name="tb_bin" class="toolbar dropdown" />
          移除
        </ListItem>
      </Box>
    </ListItem>
  )
}

const Item = observer(_Item)

export default Item
