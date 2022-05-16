import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState, useRef } from 'react'
import { formStyles } from '../../styles'
import { useForm } from '../../hooks/useForm'
import { FormConfig } from '../../../../../../types/user/ConfigOpts'
import { login } from '../../../../../../network/user/login'
import { setToken } from '../../../../../../utils/token'

type Props = {
  showLogin: boolean
  setShowLogin: (val: boolean) => void
  setShowDialogue: (val: boolean) => void
}

const formConfig: FormConfig = {
  account: {
    validator: (s) => s.length > 0
  },
  password: {
    validator: (s) => s.length > 0
  }
}

const color = ['#E46A69', '#908F8E']

export default function Login(props: Props) {
  const { showLogin, setShowLogin, setShowDialogue } = props
  const { form, setForm, formIsValidate, doValidate } = useForm(formConfig)
  const [isCorrect, setIsCorrect] = useState(true)

  const formRef = useRef()

  async function clickToLogin(account: string, password: string) {
    const reqData = {
      account,
      password
    }
    const resData = await login(reqData)
    const token = resData.data?.token

    if (token) {
      setForm({ account: '', password: '' })
      formRef.current.reset()
      setToken(token)
      setShowDialogue(false)
      location.reload()
    }
  }

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
      <form style={formStyles.form} ref={formRef}>
        <input
          type="text"
          placeholder="输入您的账号"
          style={formStyles.input}
          className="form_input"
          autoComplete="true"
          onChange={(e) => {
            setForm({ account: e.target.value })
          }}
          onBlur={() => {
            doValidate('account')
          }}
        />
        <Typography
          sx={formStyles.hint}
          margin="5px 0"
          width="95%"
          style={{
            color: color[0],
            visibility: !formIsValidate.account ? 'visible' : 'hidden'
          }}
        >
          账号不能为空
        </Typography>
        <input
          type="password"
          placeholder="输入您的密码"
          style={formStyles.input}
          className="form_input"
          autoComplete="true"
          onChange={(e) => {
            setForm({ password: e.target.value })
          }}
          onBlur={() => {
            doValidate('password')
          }}
        />
        <Typography
          sx={formStyles.hint}
          margin="5px 0"
          width="95%"
          style={{
            color: color[0],
            visibility: !formIsValidate.password ? 'visible' : 'hidden'
          }}
        >
          密码不能为空
        </Typography>
        <Typography
          sx={formStyles.hint}
          mb="5px"
          style={{ color: color[0], display: !isCorrect ? 'block' : 'none' }}
        >
          账号或密码错误，请重新输入
        </Typography>
      </form>
      <Button
        variant="contained"
        sx={formStyles.button}
        onClick={() => {
          clickToLogin(form.account, form.password)
        }}
      >
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
