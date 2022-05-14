import Box from '@mui/material/Box'
import { buttonStyles } from './styles'
import { useShowDialgue } from '../../hooks/useShowDialogue'
import Form from '../Form'

function _Button() {
  const { showDialogue, setShowDialogue } = useShowDialgue()

  return (
    <Box sx={buttonStyles.button}>
      <span onClick={() => setShowDialogue(true)}>登录</span>
      <Form showDialogue={showDialogue} setShowDialogue={setShowDialogue} />
    </Box>
  )
}

export default _Button
