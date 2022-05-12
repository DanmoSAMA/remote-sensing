import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import Function from './components/Function'
import { ProjectStore } from '../../../../mobx/project'
import { mainStyles } from './styles'
import { observer } from 'mobx-react-lite'

ProjectStore.updateChosenImgs([
  {
    id: 1,
    url: 'https://z3.ax1x.com/2021/08/17/fInXEF.png',
    name: '图片1'
  },
  {
    id: 2,
    url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
    name: '图片2'
  }
])

function _Main() {
  return (
    <Box sx={mainStyles.wrapper}>
      <Function />
    </Box>
  )
}

const Main = observer(_Main)

export default Main
