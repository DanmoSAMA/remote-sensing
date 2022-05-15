import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { formStyles } from '../../styles'

type Props = {
  showLogin: boolean
  setShowLogin: (val: boolean) => void
}

export default function Login(props: Props) {
  const { showLogin, setShowLogin } = props

  return (
    <Box
      sx={{
        display: showLogin ? 'flex' : 'none',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form style={formStyles.form}>
        <input
          type="text"
          placeholder="输入您的账号"
          style={formStyles.input.login}
          className="form_input"
          autoComplete="true"
        />
        <input
          type="password"
          placeholder="输入您的密码"
          style={formStyles.input.login}
          className="form_input"
          autoComplete="true"
        />
      </form>
      <Button variant="contained" sx={formStyles.button}>
        登录
      </Button>
      <Typography display="flex" mt="20px" fontSize=".9rem" color="#B6B5B3">
        未使用过该系统？
        <Typography
          fontSize=".9rem"
          color="secondary.main"
          fontWeight={500}
          sx={{ cursor: 'pointer' }}
          onClick={() => setShowLogin(false)}
        >
          点击注册
        </Typography>
      </Typography>
    </Box>
  )
}
