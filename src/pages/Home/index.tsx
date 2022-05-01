import Grid from '@mui/material/Grid'
import Create from './components/Create'
import Picture from './components/Picture'
import { homeStyles } from './styles'

function Home() {
  return (
    <Grid sx={homeStyles.body}>
      <Create />
      <Picture />
    </Grid>
  )
}

export default Home
