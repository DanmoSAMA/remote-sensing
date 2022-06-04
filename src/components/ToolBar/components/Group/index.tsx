import Box from '@mui/material/Box'
import SvgIcon from '../../../SvgIcon'
import ListItem from '@mui/material/ListItem'
import Item from './components/Item'
import Divider from '@mui/material/Divider'
import { toolBarStyles } from '../../styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../../../mobx/project'
import { deleteGroup } from '../../../../network/project/deleteGroup'
import { getUpdatedImgs } from '../../../../network/project/getUpdatedImgs'
import { ImgGroup, Img } from '../../../../types/project/ImgType'
import { useState } from 'react'
import { useShowDropDown } from '../../hooks/useShowDropdown'
import { useParams } from '../../../../hooks/useParams'

type Props = {
  group: ImgGroup
}

function _Group(props: Props) {
  const { group } = props
  const [isClosed, setIsClosed] = useState(true)
  const { showDropDown, setShowDropDown } = useShowDropDown()
  const projectID = useParams('id') as string

  async function clickToDeleteGroup() {
    const reqData = {
      projectID: parseInt(projectID),
      groupID: group.groupID
    }
    if (window.confirm('确定要删除该组吗?')) {
      const res = await deleteGroup(reqData)
      console.log(res)
      if (res.code === 0) {
        getUpdatedImgs(projectID).then((res) => {
          const data = res.data
          ProjectStore.updateImgGroup(data.groups)
        })
      }
    }
  }

  return (
    <Box sx={{ marginBottom: '20px', position: 'relative' }}>
      <ListItem
        sx={toolBarStyles.listParent}
        onClick={() => {
          ProjectStore.updateCurShownGroup(group.groupID)
          ProjectStore.setShowPerspective(true)
        }}
      >
        <SvgIcon name="eye" class="toolbar" />
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
