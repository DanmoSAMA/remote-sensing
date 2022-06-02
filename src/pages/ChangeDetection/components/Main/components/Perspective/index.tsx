import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../../../components/SvgIcon'
import { ProjectStore } from '../../../../../../mobx/project'
import { perspectiveStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

type Props = {
  setShowPerspective: (val: boolean) => void
}

function _Perspective(props: Props) {
  const { setShowPerspective } = props
  const [size, setSize] = useState(54)
  const [angle, setAngle] = useState(0)
  const [showDetail, setShowDetail] = useState(false)

  function zoom() {
    if (size <= 60) {
      setSize(size + 2)
    }
  }

  function lessen() {
    if (size >= 50) {
      setSize(size - 2)
    }
  }

  // todo
  function viewDetail() {
    setShowDetail(true)
  }

  return (
    <Box sx={perspectiveStyles.wrapper}>
      <Box
        sx={
          !showDetail ? perspectiveStyles.cube : perspectiveStyles.cubeAtConer
        }
      >
        <img
          style={{
            width: `${size}%`,
            transform: `translateY(${
              !showDetail ? -size / 10 : -size / 20
            }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`
          }}
          src={
            'https://remotetest.oss-cn-beijing.aliyuncs.com/project/2/23/1b761ae25ccd47c8953f03c922cd2dbd.jpg'
          }
          onClick={viewDetail}
        />
        <img
          style={{
            width: `${size}%`,
            transform: `translateY(${
              !showDetail ? (size + 10) / 10 : (size + 10) / 20
            }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`
          }}
          src={
            'https://remotetest.oss-cn-beijing.aliyuncs.com/project/2/23/1b761ae25ccd47c8953f03c922cd2dbd.jpg'
          }
          onClick={viewDetail}
        />
        <img
          style={{
            width: `${size}%`,
            transform: `translateY(${
              !showDetail ? (size + 130) / 10 : (size + 130) / 20
            }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`
          }}
          src={
            'https://remotetest.oss-cn-beijing.aliyuncs.com/project/2/23/1b761ae25ccd47c8953f03c922cd2dbd.jpg'
          }
          onClick={viewDetail}
        />
      </Box>
      {showDetail && (
        <Box sx={perspectiveStyles.detail}>
          <img
            src="https://remotetest.oss-cn-beijing.aliyuncs.com/project/2/23/1b761ae25ccd47c8953f03c922cd2dbd.jpg"
            style={{
              width: '100%',
              borderRadius: '1rem',
              position: 'absolute',
              top: '0'
            }}
          />
          <div
            onClick={() => {
              setShowDetail(false)
            }}
          >
            <SvgIcon name="detail_close" class="perspective detail_close" />
          </div>
        </Box>
      )}

      <List sx={perspectiveStyles.sidebar}>
        <ListItem
          button
          onClick={() => {
            setAngle(angle + 10)
          }}
        >
          <SvgIcon name="cursor_pointer" />
        </ListItem>
        <ListItem button onClick={lessen}>
          <SvgIcon name="bigger" />
        </ListItem>
        <ListItem button onClick={zoom}>
          <SvgIcon name="smaller" />
        </ListItem>
      </List>
      <Button
        variant="contained"
        sx={perspectiveStyles.button}
        onClick={() => {
          setShowPerspective(false)
        }}
      >
        切换视角
      </Button>
    </Box>
  )
}

const Perspective = observer(_Perspective)

export default Perspective
