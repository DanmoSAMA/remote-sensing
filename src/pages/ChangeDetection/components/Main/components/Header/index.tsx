import Box from '@mui/material/Box'
import SvgIcon from '../../../../../../components/SvgIcon'
import { ProjectStore } from '../../../../../../mobx/project'
import { mainStyles } from '../../styles'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

function _Header() {
  const navigate = useNavigate()

  return (
    <Box sx={mainStyles.header}>
      {!ProjectStore.showPerspective ? (
        <Box
          sx={mainStyles.headerLeft}
          onClick={() => {
            navigate('/recent')
          }}
        >
          <SvgIcon name="left" class="main header left" />
          回到最近项目
        </Box>
      ) : (
        <Box
          sx={mainStyles.headerLeft}
          onClick={() => {
            ProjectStore.setShowPerspective(false)
          }}
        >
          <SvgIcon name="change_rule" class="main header left" />
          更换检测条件
        </Box>
      )}
      <div>{ProjectStore.name}</div>
    </Box>
  )
}

const Header = observer(_Header)

export default Header
