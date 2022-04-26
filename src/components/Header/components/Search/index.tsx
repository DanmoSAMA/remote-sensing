import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { searchStyles } from './styles'

function Search() {
  return (
    <IconButton aria-label="search" sx={searchStyles.search}>
      <SearchIcon sx={searchStyles.icon} />
    </IconButton>
  )
}

export default Search
