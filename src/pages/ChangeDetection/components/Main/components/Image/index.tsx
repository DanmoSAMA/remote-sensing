import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../../../components/SvgIcon'
import { ProjectStore } from '../../../../../../mobx/project'
import { mainStyles } from '../../styles'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

type Props = {
  setShowPerspective: (val: boolean) => void
}

function _Image(props: Props) {
  const { setShowPerspective } = props

  useEffect(() => {
    const firstGroup = ProjectStore.waitingGroups[0]
    if (firstGroup.oldImg.uuid !== '' || firstGroup.newImg.uuid !== '') {
      ProjectStore.updateChosenImgs([
        ProjectStore.waitingGroups[0].oldImg,
        ProjectStore.waitingGroups[0].newImg
      ])
    }
  }, [JSON.stringify(ProjectStore.waitingGroups)])

  return (
    <Box sx={mainStyles.image}>
      {ProjectStore.chosenImgs.length > 0 ? (
        ProjectStore.chosenImgs.map((item, index) => (
          <img src={item.url} key={item.uuid + index} />
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
