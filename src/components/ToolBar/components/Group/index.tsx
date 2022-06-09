import Box from '@mui/material/Box'
import SvgIcon from '../../../SvgIcon'
import ListItem from '@mui/material/ListItem'
import Item from './components/Item'
import Divider from '@mui/material/Divider'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toolBarStyles } from '../../styles'
import { ProjectStore } from '../../../../mobx/project'
import { deleteGroup } from '../../../../network/project/deleteGroup'
import { getUpdatedImgs } from '../../../../network/project/getUpdatedImgs'
import { Img, Group as ImgGroup } from '../../../../types/project/ImgAndGroup'
import { useShowDropDown } from '../../hooks/useShowDropdown'
import { useParams } from '../../../../hooks/useParams'

type Props = {
  group: ImgGroup
}

function _Group(props: Props) {
  const { group } = props
  const [isClosed, setIsClosed] = useState(true)
  const { showDropDown, setShowDropDown } = useShowDropDown()
  const { pathname } = useLocation()
  const projectID = useParams('id') as string
  // 当前组是否有效
  const [isValid, setIsValid] = useState(
    (pathname === '/analysis' && group.groupType === 1) ||
      (pathname === '/change-detection' && group.groupType === 2) ||
      (pathname === '/terrain-classification' && group.groupType === 3) ||
      (pathname === '/object-extract' && group.groupType === 4) ||
      (pathname === '/object-detection' && group.groupType === 5)
  )

  async function clickToDeleteGroup() {
    const reqData = {
      projectID: parseInt(projectID),
      groupID: group.groupID
    }
    if (confirm('确定要删除该组吗?')) {
      const res = await deleteGroup(reqData)
      // .log(res)
      if (res.code === 0) {
        getUpdatedImgs(projectID).then((res) => {
          const data = res.data
          ProjectStore.updateImgGroup(data.groups)
        })
      }
    }
  }

  return (
    <Box
      sx={{
        marginBottom: '20px',
        position: 'relative'
      }}
    >
      <ListItem
        sx={toolBarStyles.listParent}
        onClick={() => {
          if (isValid) {
            ProjectStore.setShowPerspective(true)
            ProjectStore.setShowDetail(false)
            ProjectStore.updateCurShownGroup(group.groupID)

            // switch (pathname) {
            //   case '/analysis':
            //     break
            //   case 'change-detection':
            //     ProjectStore.updateCurShownGroup(group.groupID)
            //     break
            //   case '/terrain-classification':
            //     break
            //   case '/object-extract':
            //     break
            //   case '/object-detection':
            // }
          }
        }}
        style={{
          cursor: isValid ? 'cursor' : 'default',
          backgroundColor: isValid ? '#273839' : '#313131'
        }}
      >
        {ProjectStore.displayType === 1 && (
          <SvgIcon name="eye" class="toolbar" />
        )}

        <SvgIcon name="folder" class="toolbar folder" />
        {`${group.groupName.slice(0, 4)}${
          group.groupName.length > 4 ? '...' : ''
        }`}
        <div
          onClick={(e) => {
            setIsClosed(!isClosed)
            e.stopPropagation()
          }}
        >
          <SvgIcon name={isClosed ? 'down' : 'up'} class="toolbar up_down" />
        </div>
        <div
          onClick={(e) => {
            setShowDropDown(!showDropDown)
            e.stopPropagation()
          }}
        >
          <SvgIcon name="more" class="toolbar right" />
        </div>
      </ListItem>
      <Box
        sx={toolBarStyles.dropDown}
        onClick={(e) => e.stopPropagation()}
        style={{ display: showDropDown ? 'block' : 'none', top: '50px' }}
      >
        <ListItem sx={toolBarStyles.dropDownItem}>
          <SvgIcon name="rename" class="toolbar dropdown" />
          重命名
        </ListItem>
        <Divider color="secondary" variant="middle" />
        <ListItem
          sx={toolBarStyles.dropDownItem}
          onClick={() => {
            clickToDeleteGroup()
          }}
        >
          <SvgIcon name="tb_bin" class="toolbar dropdown" />
          移除
        </ListItem>
      </Box>

      <Box
        sx={toolBarStyles.listGroup}
        style={{ display: isClosed ? 'none' : 'block' }}
      >
        {group.pictures.map((item: Img) => (
          // 嵌套li会有warning，暂时不理会
          <Item item={item} key={item.uuid} />
        ))}
      </Box>
    </Box>
  )
}

const Group = observer(_Group)

export default Group
