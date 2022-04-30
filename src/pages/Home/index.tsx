import Container from '@mui/material/Container'
import Create from './components/Create'
import { homeStyles } from './styles'

function Home() {
  return (
    <Container sx={homeStyles.body}>
      <Create />
    </Container>
  )
}

export default Home
