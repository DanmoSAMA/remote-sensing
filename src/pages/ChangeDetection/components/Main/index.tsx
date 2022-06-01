import Box from '@mui/material/Box'
import Image from './components/Image'
import Function from './components/Function'
import Perspective from './components/Perspective'
import { mainStyles } from './styles'
import { observer } from 'mobx-react-lite'

function _Main() {
  return (
    <Box sx={mainStyles.wrapper}>
      {/* <Image /> */}
      {/* <Function /> */}
      <Perspective groupId={43} />
    </Box>
  )
}

const Main = observer(_Main)

export default Main
