import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { createStyles } from './styles'

function Create() {
  return (
    <Container sx={createStyles.create}>
      <Typography
        variant="h2"
        color="inherit"
        fontWeight={500}
        fontSize={40}
        mb={10}
      >
        新建项目
      </Typography>
      <Typography
        variant="body1"
        color="inherit"
        fontWeight={500}
        fontSize={16}
        lineHeight={2}
        mb={10}
      >
        新建项目后创建项目名称，上传所需分析图片后可选择相应功能进行AI智能分析
      </Typography>
      <Button variant="contained" color="secondary" sx={createStyles.button}>
        新建项目
      </Button>
    </Container>
  )
}

export default Create
