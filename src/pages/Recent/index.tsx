import Box from '@mui/material/Box'
import Projects from './components/Projects'
import { recentStyles } from './styles'

const data = [
  {
    id: 1,
    editedTime: '2022.5.1',
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 2,
    editedTime: '2022.5.1',
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 3,
    editedTime: '2022.5.1',
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 4,
    editedTime: '2022.5.1',
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 5,
    editedTime: '2022.5.1',
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 6,
    editedTime: '2022.5.1',
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  }
]

function Recent() {
  return (
    <Box sx={recentStyles.wrapper}>
      <Projects />
    </Box>
  )
}

export default Recent
