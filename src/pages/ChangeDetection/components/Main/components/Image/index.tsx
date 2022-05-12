import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../../../components/SvgIcon'
import { ProjectStore } from '../../../../../../mobx/project'
import { mainStyles } from '../../styles'
import { observer } from 'mobx-react-lite'

function _Image() {
  return (
    <Box sx={mainStyles.image}>
      {ProjectStore.chosenImgs.length > 0 ? (
        ProjectStore.chosenImgs.map((item) => (
          <img src={item.url} key={item.id} />
        ))
      ) : (
        <Box sx={mainStyles.placeholder}>
          <SvgIcon name="not_upload" />
          <Typography color="#fff" fontSize={'1.2rem'} width="65%" mt={'20px'}>
            当前未上传待分析图像，请先在检测区中上传待分析图像
          </Typography>
        </Box>
      )}
    </Box>
  )
}

const Image = observer(_Image)

export default Image
