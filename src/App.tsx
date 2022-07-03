import SideBar from './components/SideBar'
import ToolBar from './components/ToolBar'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import routes from './routes'
import { Grid } from '@mui/material'
import './styles/index.css'

function App() {
  const { pathname } = useLocation()

  return (
    <Grid container>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {routes.map((item, i) => {
          return (
            <Route
              key={i}
              path={item.path as string}
              element={<item.element />}
            />
          )
        })}
      </Routes>
    </Grid>
  )
}

export default App
