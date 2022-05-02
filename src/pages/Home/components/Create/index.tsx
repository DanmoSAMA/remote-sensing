import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { createStyles } from './styles'
import { useNavigate, useLocation } from 'react-router-dom'

function Create() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Container sx={createStyles.create}>
      <Typography sx={createStyles.title} variant="h2">
        新建项目
      </Typography>
      <Typography variant="body1" sx={createStyles.text} mb={'40px'}>
        新建项目后创建项目名称，上传所需分析图片后可选择相应功能进行AI智能分析
      </Typography>
      <Typography variant="body1" sx={createStyles.text}>
        支持创建项目后传入多个图片
      </Typography>
      <Typography variant="body1" sx={createStyles.text} mb={'40px'}>
        可实现变化检测、地物分类、目标提取、目标检测等功能 提供全方位视角展示
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={createStyles.button}
        onClick={() => navigate('/home/create')}
      >
        <AddIcon sx={createStyles.icon} />
        新建项目
      </Button>
    </Container>
  )
}

export default Create
