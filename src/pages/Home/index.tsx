// import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Create from './components/Create'
import { homeStyles } from './styles'

function Home() {
  return (
    <Grid sx={homeStyles.body}>
      <Create />
    </Grid>
  )
}

export default Home
