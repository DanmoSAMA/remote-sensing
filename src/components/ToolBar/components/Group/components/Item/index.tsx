import Box from '@mui/material/Box'
import SvgIcon from '../../../../../SvgIcon'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import { toolBarStyles } from '../../../../styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../../../../../mobx/project'
import { Img } from '../../../../../../types/project/ImgAndGroup'
import { useShowDropDown } from '../../../../hooks/useShowDropdown'

type Props = {
  item: Img
  groupID: number
}

function _Item(props: Props) {
  const { item, groupID } = props
  const { showDropDown, setShowDropDown } = useShowDropDown()

  return (
    <ListItem
      key={item.uuid}
      style={{
        backgroundColor:
          item.groupID === ProjectStore.coverImg.groupID &&
          item.uuid === ProjectStore.coverImg.uuid &&
          ProjectStore.displayType === 1
            ? '#0F4A4E'
            : '#313131'
      }}
      sx={toolBarStyles.listItemInGroup}
    >
      <Box
        onClick={() => {
          ProjectStore.setLayerDisplayStatus(groupID, item.uuid)
        }}
      >
        {ProjectStore.displayType === 1 ? (
          item.isShown ? (
            <SvgIcon name="eye" class="toolbar" />
          ) : (
            <SvgIcon name="eye_hidden" class="toolbar" />
          )
        ) : (
          ''
        )}
      </Box>
      <div
        style={{
          width: ProjectStore.displayType === 0 ? '150px' : '120px',
          height: '40px',
          lineHeight: '40px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {item.name}
      </div>
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
        style={{ display: showDropDown ? 'block' : 'none', top: '40px' }}
      >
        <Box sx={toolBarStyles.dropDownItem}>
          <SvgIcon name="rename" class="toolbar dropdown" />
          重命名
        </Box>
        <Divider color="secondary" variant="middle" />
        <Box sx={toolBarStyles.dropDownItem}>
          <SvgIcon name="tb_bin" class="toolbar dropdown" />
          移除
        </Box>
      </Box>
    </ListItem>
  )
}

const Item = observer(_Item)

export default Item
