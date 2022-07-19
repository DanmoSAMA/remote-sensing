import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { checkLogin } from '@/utils/checkLogin'
import { createStyles } from './styles'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'

function Create() {
  const navigate = useNavigate()
  const breakPoint = useMediaQuery('(min-width:1000px)')
  const textStyles = {
    ...createStyles.text,
    fontSize: breakPoint ? '1.5rem' : '15px',
    lineHeight: breakPoint ? '2.5rem' : '25px',
  }

  async function createProject() {
    const res = await checkLogin()
    if (!res) {
      return alert('请先登录')
    }
    navigate('/home/create')
  }

  return (
    <Container
      sx={{
        ...createStyles.create,
        top: breakPoint ? '10rem' : '100px',
        left: breakPoint ? '14.5rem' : '145px',
      }}
    >
      <Typography
        sx={{
          ...createStyles.title,
          fontSize: breakPoint ? '4rem' : '30px',
          marginBottom: breakPoint ? '2.375rem' : '20px',
        }}
        variant="h2"
      >
        新建项目
      </Typography>
      <Typography variant="body1" sx={textStyles} mb={'40px'}>
        新建项目后创建项目名称，上传所需分析图片后可选择相应功能进行AI智能分析
      </Typography>
      <Typography
        variant="body1"
        sx={createStyles.text}
        style={{
          fontSize: breakPoint ? '1.5rem' : '15px',
          lineHeight: breakPoint ? '2.5rem' : '25px',
        }}
      >
        支持创建项目后传入多个图片
      </Typography>
      <Typography variant="body1" sx={textStyles} mb={'40px'}>
        可实现变化检测、地物分类、目标提取、目标检测等功能 提供全方位视角展示
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          ...createStyles.button,
          fontSize: breakPoint ? '1.5rem' : '15px',
          height: breakPoint ? '5.375rem' : '50px',
          width: breakPoint ? '23.5625rem' : '220px',
          lineHeight: breakPoint ? '5.375rem' : '50px',
        }}
        onClick={() => createProject()}
      >
        <AddIcon
          sx={{
            fontSize: breakPoint ? '2.375rem' : '16px',
            marginRight: breakPoint ? '1rem' : '10px',
          }}
        />
        新建项目
      </Button>
    </Container>
  )
}

export default Create
