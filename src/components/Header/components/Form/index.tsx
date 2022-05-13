import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../SvgIcon'
import Login from './components/Login'
import Register from './components/Register'
import { formStyles } from './styles'
import { useShowLogin } from './hooks/useShowLogin'
import './index.css'

export default function Form() {
  const { showLogin, setShowLogin } = useShowLogin()

  return (
    <Box sx={formStyles.wrapper}>
      <Typography
        height="2.5rem"
        lineHeight="2.5rem"
        fontSize="1.5rem"
        color="secondary.main"
        fontWeight={500}
      >
        <SvgIcon name="logo" />
        欢迎使用AI遥感系统
      </Typography>
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      <Register showLogin={showLogin} setShowLogin={setShowLogin} />
    </Box>
  )
}
