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
        <input
          accept="image/*"
          id="contained-button-file"
          style={{ display: 'none' }}
          multiple
          type="file"
        />
        <label
          htmlFor="contained-button-file"
          style={{ width: '60%', display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            component="span"
            style={{
              backgroundColor: '#313131',
              color: '#FCFBF4',
              boxShadow: 'none',
              fontWeight: '300'
            }}
          >
            <SvgIcon name="import" />
            导入图片
          </Button>
        </label>
      </Box>
    </Box>
  )
}
