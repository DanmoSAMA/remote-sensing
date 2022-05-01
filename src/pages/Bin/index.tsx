import Box from '@mui/material/Box'
import Projects from './components/Projects'
import { binStyles } from './styles'

function Recent() {
  return (
    <Box sx={binStyles.wrapper}>
      <Projects />
    </Box>
  )
}

export default Recent
