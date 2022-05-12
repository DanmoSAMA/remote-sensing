import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import Image from './components/Image'
import Function from './components/Function'
import { ProjectStore } from '../../../../mobx/project'
import { mainStyles } from './styles'
import { observer } from 'mobx-react-lite'

function _Main() {
  return (
    <Box sx={mainStyles.wrapper}>
      <Image />
      <Function />
    </Box>
  )
}

const Main = observer(_Main)

export default Main
