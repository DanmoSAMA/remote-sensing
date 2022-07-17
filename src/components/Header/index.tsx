import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import SvgIcon from '@/components/SvgIcon/index'
import List from './components/List'
import Search from './components/Search'
import Button from './components/Button'
import { headerStyles } from './styles'

export default function Navbar() {
  return (
    <AppBar position="static" sx={headerStyles.appBar}>
      <Toolbar variant="dense">
        <Box sx={headerStyles.logo}>
          <SvgIcon name="logo" class="header logo" />
          <SvgIcon name="font" class="header font" />
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
