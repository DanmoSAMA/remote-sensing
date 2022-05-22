import Box from '@mui/material/Box'
import Image from './components/Image'
import Function from './components/Function'
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
