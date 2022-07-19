import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '@/components/SvgIcon'
import Login from './components/Login'
import Register from './components/Register'
import { formStyles } from './styles'
import { useShowLogin } from './hooks/useShowLogin'
import './index.css'

type Props = {
  showDialogue: boolean
  setShowDialogue: (val: boolean) => void
}

export default function Form(props: Props) {
  const { showLogin, setShowLogin } = useShowLogin()
  const { showDialogue, setShowDialogue } = props

  return (
    <>
      <Box
        sx={Object.assign(formStyles.wrapper, {
          display: showDialogue ? 'flex' : 'none'
        })}
      >
        <Box
          sx={formStyles.iconWrapper}
          onClick={() => {
            setShowDialogue(false)
            setShowLogin(true)
          }}
        >
          <SvgIcon name="cross" class="form cross" />
        </Box>

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
        <Login
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setShowDialogue={setShowDialogue}
        />
        <Register
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setShowDialogue={setShowDialogue}
        />
      </Box>
      <Box
        sx={{
          ...formStyles.mask,
          display: showDialogue ? 'block' : 'none'
        }}
      ></Box>
    </>
  )
}
