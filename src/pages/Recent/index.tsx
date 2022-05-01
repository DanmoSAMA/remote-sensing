import Box from '@mui/material/Box'
import Projects from './components/Projects'
import { recentStyles } from './styles'

function Recent() {
  return (
    <Box sx={recentStyles.wrapper}>
      <Projects />
    </Box>
  )
}

export default Recent
