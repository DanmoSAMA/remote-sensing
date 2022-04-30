import Button from '@mui/material/Button'
import { buttonStyles } from './styles'

function _Button() {
  return (
    <Button variant="contained" sx={buttonStyles.button}>
      登录
    </Button>
  )
}

export default _Button
