import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

import Home from './pages/Home'
import Recent from './pages/Recent'
import Bin from './pages/Bin'
import Create from './pages/Create'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />}>
            <Route path="create" element={<Create />} />
          </Route>
          <Route path="recent" element={<Recent />} />
          <Route path="bin" element={<Bin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)
