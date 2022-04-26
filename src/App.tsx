import Header from './components/Header'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'
import './styles/index.css'

function App() {
  return (
    <Grid container>
      <Header />
      <SideBar />
      <Outlet />
    </Grid>
  )
}

export default App
