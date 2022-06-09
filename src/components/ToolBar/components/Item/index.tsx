import Box from '@mui/material/Box'
import SvgIcon from '../../../SvgIcon'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import { toolBarStyles } from '../../styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../../../mobx/project'
import { deleteImg } from '../../../../network/project/deleteImg'
import { getUpdatedImgs } from '../../../../network/project/getUpdatedImgs'
import { Img } from '../../../../types/project/ImgAndGroup'
import { useShowDropDown } from '../../hooks/useShowDropdown'
import { useParams } from '../../../../hooks/useParams'

type Props = {
  item: Img
}

function _Item(props: Props) {
  const { item } = props
  const { showDropDown, setShowDropDown } = useShowDropDown()
  const projectID = useParams('id') as string

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
    <ListItem key={item.id} sx={toolBarStyles.listItem}>
      {ProjectStore.displayType === 1 && <SvgIcon name="eye" class="toolbar" />}
      {`${item.name.slice(0, 14)}${item.name.length > 14 ? '...' : ''}`}
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
        <ListItem sx={toolBarStyles.dropDownItem}>
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
