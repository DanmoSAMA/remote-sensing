import Box from '@mui/material/Box'
import SvgIcon from '../../../SvgIcon'
import ListItem from '@mui/material/ListItem'
import { toolBarStyles } from '../../styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../../../mobx/project'
import { ImgGroup, Img } from '../../../../types/project/ImgType'
import { useState } from 'react'

type Props = {
  group: ImgGroup
}

function _Group(props: Props) {
  const { group } = props
  const [isClosed, setIsClosed] = useState(true)

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <ListItem sx={toolBarStyles.listParent}>
        <SvgIcon name="eye" class="toolbar" />
        <SvgIcon name="folder" class="toolbar folder" />
        {group.name}
        <div onClick={() => setIsClosed(!isClosed)}>
          <SvgIcon name={isClosed ? 'down' : 'up'} class="toolbar up_down" />
        </div>
        <div>
          <SvgIcon name="more" class="toolbar right" />
        </div>
      </ListItem>
      <Box
        sx={toolBarStyles.listGroup}
        style={{ display: isClosed ? 'none' : 'block' }}
      >
        {group.members.map((item: Img) => (
          // 嵌套li会有warning，暂时不理会
          <ListItem key={item.id} sx={toolBarStyles.listItemInGroup}>
            <SvgIcon name="eye" class="toolbar" />
            {item.name}
            <SvgIcon name="more" class="toolbar right" />
          </ListItem>
        ))}
      </Box>
    </Box>
  )
}

const Group = observer(_Group)

export default Group
