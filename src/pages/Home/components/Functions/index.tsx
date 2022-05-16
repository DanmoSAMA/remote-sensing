import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { functionsStyles } from './styles'
import { functionItems } from './consts/functionItems'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../../../../network/project/createProject'

type Props = {
  name: string
  id: number
}

function Functions(props: Props) {
  const navigate = useNavigate()
  const { name, id } = props

  function clickFunctionItem(name: string, route: string) {
    // 在项目创建之前点击，则新建未命名项目
    if (name === '') {
      createProject({ name: '未命名项目' }).then((res) => {
        navigate(`${route}?id=${res.data.projectID}`)
      })
      return
    }
    // 在项目创建之后点击，需要带上该项目的id
    navigate(`${route}?id=${id}`)
  }

  return (
    <Box sx={functionsStyles.wrapper}>
      {functionItems.map((item) => (
        <Box key={item.label}>
          <Card sx={functionsStyles.item}>
            <CardContent>
              <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="search" sx={functionsStyles.icon}>
                  {item.icon}
                </IconButton>
              </Container>
              <Typography
                fontSize={'1.2rem'}
                color={'secondary'}
                fontWeight={300}
              >
                {item.label}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={functionsStyles.hoverItem}
            onClick={() => clickFunctionItem(name, item.route)}
          >
            <CardContent>
              <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="search" sx={functionsStyles.icon}>
                  {item.icon}
                </IconButton>
              </Container>
              <Typography
                fontSize={'1.2rem'}
                color={'secondary'}
                fontWeight={300}
                textAlign="center"
                mb={'0.5rem'}
              >
                {item.label}
              </Typography>
              <Typography fontSize={'0.9rem'} color={'#000'} fontWeight={300}>
                {item.descripion}
              </Typography>
            </CardContent>
          </Card>
          <div className="mask"></div>
        </Box>
      ))}
    </Box>
  )
}

export default Functions
