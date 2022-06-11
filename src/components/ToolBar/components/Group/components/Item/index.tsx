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
}

function _Item(props: Props) {
  const { item } = props
  const { showDropDown, setShowDropDown } = useShowDropDown()

  return (
    <ListItem key={item.uuid} sx={toolBarStyles.listItemInGroup}>
      <Box
        onClick={() => {
          ProjectStore.setLayerStatus(item.uuid)
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
