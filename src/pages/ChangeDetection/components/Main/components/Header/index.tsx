import Box from '@mui/material/Box'
import { ProjectStore } from '../../../../../../mobx/project'
import { mainStyles } from '../../styles'
import { observer } from 'mobx-react-lite'

function _Header() {
  return (
    <Box sx={mainStyles.header}>
      <div>{ProjectStore.name}</div>
    </Box>
  )
}

const Header = observer(_Header)

export default Header
