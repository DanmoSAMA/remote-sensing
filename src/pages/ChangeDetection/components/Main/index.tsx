import Box from '@mui/material/Box'
import Image from './components/Image'
import Function from './components/Function'
import Perspective from './components/Perspective'
import { mainStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

function _Main() {
  const [showPerspective, setShowPerspective] = useState(false)

  return (
    <Box sx={mainStyles.wrapper}>
      {!showPerspective ? (
        <>
          <Image setShowPerspective={setShowPerspective} />
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
