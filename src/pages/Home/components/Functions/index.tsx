import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { functionsStyles } from './styles'
import { functionItems } from './consts/functionItems'

function Functions() {
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
              <Typography fontSize={16} color={'secondary'} fontWeight={300}>
                {item.label}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={functionsStyles.hoverItem}>
            <CardContent>
              <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="search" sx={functionsStyles.icon}>
                  {item.icon}
                </IconButton>
              </Container>
              <Typography
                fontSize={16}
                color={'secondary'}
                fontWeight={300}
                textAlign="center"
                mb={'10px'}
              >
                {item.label}
              </Typography>
              <Typography fontSize={12} color={'#000'} fontWeight={300}>
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
