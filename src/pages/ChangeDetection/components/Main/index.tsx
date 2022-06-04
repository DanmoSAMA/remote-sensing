import Box from '@mui/material/Box'
import Image from './components/Image'
import Function from './components/Function'
import Perspective from './components/Perspective'
import Header from './components/Header'
import { mainStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../../../mobx/project'

function _Main() {
  return (
    <Box sx={mainStyles.wrapper}>
      <Header />
      {!ProjectStore.showPerspective ? (
        <>
          <Image />
          <Function />
        </>
      ) : (
        <Perspective />
      )}
    </Box>
  )
}

const Main = observer(_Main)

export default Main
