import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../../../components/SvgIcon'
import { ProjectStore } from '../../../../../../mobx/project'
import { perspectiveStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

type Props = {
  groupId: number
}

function _Perspective(props: Props) {
  const { groupId } = props
  const [show, setShow] = useState(true)
  let group = null

  // useEffect(() => {
  //   setTimeout(() => {
  //     group = ProjectStore.imgGroups[0]
  //     console.log(group.pictures[0].url)
  //     setShow(true)
  //   }, 1000)
  // }, [])

  return (
    <Box sx={perspectiveStyles.wrapper}>
      <Box sx={perspectiveStyles.cube}>
        <img
          style={perspectiveStyles.img1}
          src={
            'https://remotetest.oss-cn-beijing.aliyuncs.com/project/2/23/1b761ae25ccd47c8953f03c922cd2dbd.jpg'
          }
        />
        <img
          style={perspectiveStyles.img2}
          src={
            'https://remotetest.oss-cn-beijing.aliyuncs.com/project/2/23/1b761ae25ccd47c8953f03c922cd2dbd.jpg'
          }
        />
        <img
          style={perspectiveStyles.img3}
          src={
            'https://remotetest.oss-cn-beijing.aliyuncs.com/project/2/23/1b761ae25ccd47c8953f03c922cd2dbd.jpg'
          }
        />
      </Box>
    </Box>
  )
}

const Perspective = observer(_Perspective)

export default Perspective
