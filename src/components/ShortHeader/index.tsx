import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import List from '@/components/Header/components/List'
import Search from '@/components/Header/components/Search'
import Button from '@/components/Header/components/Button'
import { shortHeaderStyles } from './styles'

export default function ShortHeader() {
  return (
    <AppBar position="static" sx={shortHeaderStyles.appBar}>
      <Toolbar variant="dense">
        <List />
        <Box sx={shortHeaderStyles.search}>
          <Search />
          <Button />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
