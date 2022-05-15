import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useEffect } from 'react'
import { formStyles } from '../../styles'
import { useForm } from '../../hooks/useForm'
import { FormConfig } from '../../../../../../types/user/ConfigOpts'
import { register } from '../../../../../../network/user/register'

type Props = {
  showLogin: boolean
  setShowLogin: (val: boolean) => void
}

const formConfig: FormConfig = {
  account: {
    validator: (s) =>
      /^(?=.*[a-z])(?=.*\d)[a-z]{1}[a-z\d]{3,15}$/.test(s) ? true : false
  },
  password: {
    validator: (s) => (/^[a-zA-Z\d]{8,20}$/.test(s) ? true : false)
  }
}

export default function Register(props: Props) {
  const { showLogin, setShowLogin } = props
  const { form, setForm, formIsValidate, doValidate } = useForm(formConfig)
  const [checkPw, setCheckPw] = useState('')
  const [pwNotSame, setPwNotSame] = useState(true)

  useEffect(() => {
    doValidate()
  }, [])

  async function clickToRegister(account: string, password: string) {
    if (formIsValidate.account && formIsValidate.password && !pwNotSame) {
      const reqData = {
        account,
        password
      }
      const resData = await register(reqData)
      if (resData.code === '0') alert('注册成功')
    } else console.log('账号或密码的格式错误，或两次输入的密码不同')
  }

  return (
    <Box
      sx={{
        display: !showLogin ? 'flex' : 'none',
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
          style={formStyles.input.register}
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
          style={{ color: !formIsValidate.account ? '#E46A69' : '#908F8E' }}
        >
          账号以字母开头，由小写英文字母和数字组成的4-16位字符
        </Typography>
        <input
          type="password"
          placeholder="输入您的密码"
          style={formStyles.input.register}
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
          style={{ color: !formIsValidate.password ? '#E46A69' : '#908F8E' }}
        >
          长度8-20位，仅可包括数字、大写字母、小写字母
        </Typography>
        <input
          type="password"
          placeholder="确认您的密码"
          style={formStyles.input.register}
          className="form_input"
          autoComplete="true"
          onChange={(e) => {
            setCheckPw(e.target.value)
          }}
          onBlur={() => {
            if (checkPw === form.password && checkPw.length !== 0) {
              setPwNotSame(false)
            } else {
              setPwNotSame(true)
            }
          }}
        />
        <Typography
          sx={formStyles.hint}
          margin="5px 0"
          style={{ color: pwNotSame ? '#E46A69' : '#908F8E' }}
        >
          两次输入的密码不同，请重新确认您的密码
        </Typography>
        {/* <Typography
          sx={formStyles.hint}
          margin="5px 0"
          style={{ color: '#E46A69' }}
        >
          账号已被注册
        </Typography> */}
      </form>
      <Button
        variant="contained"
        sx={formStyles.button}
        onClick={() => {
          clickToRegister(form.account, form.password)
        }}
      >
        注册
      </Button>
      <Typography display="flex" mt="20px" fontSize=".9rem" color="#B6B5B3">
        已有账户？
        <Typography
          fontSize=".9rem"
          color="secondary.main"
          fontWeight={500}
          sx={{ cursor: 'pointer' }}
          onClick={() => setShowLogin(true)}
        >
          去登录
        </Typography>
      </Typography>
    </Box>
  )
}
