import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../SvgIcon'
import { toolBarStyles } from './styles'

export default function ToolBar() {
  return (
    <Box sx={toolBarStyles.wrapper}>
      <Box sx={toolBarStyles.top}>
        <Typography>图层</Typography>
        <Button variant="contained">
          <SvgIcon name="import" />
          导入图片
        </Button>
      </Box>
    </Box>
  )
}
