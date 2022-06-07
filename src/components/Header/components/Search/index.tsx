import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import { searchStyles } from './styles'
import { useShowInput } from './hooks/useShowInput'
import { searchProjects } from '../../../../network/project/searchProjects'

function Search() {
  const { showInput, setShowInput } = useShowInput()

  return (
    <Box sx={searchStyles.wrapper}>
      <FormControl variant="standard" onClick={(e) => e.stopPropagation()}>
        <Input
          sx={searchStyles.input}
          disableUnderline={true}
          style={{ display: showInput ? 'inline-block' : 'none' }}
        />
      </FormControl>
      <IconButton
        aria-label="search"
        sx={searchStyles.search}
        onClick={(e) => {
          e.stopPropagation()
          setShowInput(!showInput)
        }}
      >
        <SearchIcon sx={searchStyles.icon} />
      </IconButton>
    </Box>
  )
}

export default Search
