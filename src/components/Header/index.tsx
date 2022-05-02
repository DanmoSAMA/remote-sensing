import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { headerStyles } from './styles'
import List from './components/List'
import Search from './components/Search'
import Button from './components/Button'
import SvgIcon from '../SvgIcon/index'

export default function Navbar() {
  return (
    <AppBar position="static" sx={headerStyles.appBar}>
      <Toolbar variant="dense">
        <Box sx={headerStyles.logo}>
          <SvgIcon name="logo" />
          <Typography
            variant="h1"
            color="primary"
            fontWeight={300}
            fontSize={'30px'}
            fontFamily={'Comfortaa'}
            width={'10rem'}
          >
            AI System
          </Typography>
        </Box>
        <List />
        <Box sx={headerStyles.search}>
          <Search />
          <Button />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
