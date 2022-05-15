import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { formStyles } from '../../styles'
import { useForm } from '../../hooks/useForm'
import { FormConfig } from '../../../../../../types/user/ConfigOpts'
import { login } from '../../../../../../network/user/login'

type Props = {
  showLogin: boolean
  setShowLogin: (val: boolean) => void
}

const formConfig: FormConfig = {
  account: {
    validator: () => true
  },
  password: {
    validator: () => true
  }
}

export default function Login(props: Props) {
  const { showLogin, setShowLogin } = props
  const { form, setForm, formIsValidate, doValidate } = useForm(formConfig)

  async function clickToLogin(account: string, password: string) {
    const reqData = {
      account,
      password
    }
    const resData = await login(reqData)
    console.log(resData)
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
      <form style={formStyles.form}>
        <input
          type="text"
          placeholder="输入您的账号"
          style={formStyles.input.login}
          className="form_input"
          autoComplete="true"
          onChange={(e) => {
            setForm({ account: e.target.value })
          }}
        />
        <input
          type="password"
          placeholder="输入您的密码"
          style={formStyles.input.login}
          className="form_input"
          autoComplete="true"
          onChange={(e) => {
            setForm({ password: e.target.value })
          }}
        />
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
