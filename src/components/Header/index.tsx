import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { headerStyles } from './styles'
import Search from './components/Search'
import Button from './components/Button'

export default function Navbar() {
  return (
    <AppBar position="static" sx={headerStyles.appBar}>
      <Toolbar variant="dense">
        <Typography variant="h1" color="inherit" fontWeight={500} fontSize={36}>
          系统名
        </Typography>
        <Box sx={headerStyles.search}>
          <Typography
            variant="subtitle1"
            color="inherit"
            fontWeight={500}
            fontSize={18}
          >
            关于我们
          </Typography>
          <Search />
          <Button />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
