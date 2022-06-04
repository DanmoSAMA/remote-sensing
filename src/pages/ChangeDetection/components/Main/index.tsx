import Box from '@mui/material/Box'
import Image from './components/Image'
import Function from './components/Function'
import Perspective from './components/Perspective'
import Header from './components/Header'
import { mainStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

function _Main() {
  const [showPerspective, setShowPerspective] = useState(true)

  return (
    <Box sx={mainStyles.wrapper}>
      <Header />
      {!showPerspective ? (
        <>
          <Image />
          <Function setShowPerspective={setShowPerspective} />
        </>
      ) : (
        <Perspective setShowPerspective={setShowPerspective} />
      )}
    </Box>
  )
}

const Main = observer(_Main)

export default Main
