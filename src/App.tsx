import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'
import './styles/index.css'

function App() {
  return (
    <Grid container>
      <Header />
      <Outlet />
    </Grid>
  )
}

export default App
