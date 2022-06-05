import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import SvgIcon from '../../../../../../components/SvgIcon'
import { ProjectStore } from '../../../../../../mobx/project'
import { perspectiveStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

function _Perspective() {
  const [size, setSize] = useState(85)
  const [angle, setAngle] = useState(-7)
  const [showDetail, setShowDetail] = useState(false)
  const [detailImgUrl, setDetailImgUrl] = useState('')

  function zoom() {
    if (size <= 100) {
      setSize(size + 2)
    }
  }

  function lessen() {
    if (size >= 50) {
      setSize(size - 2)
    }
  }

  function viewDetail(type: 0 | 1 | 2) {
    setShowDetail(true)
    setDetailImgUrl(ProjectStore.currentShownGroup.pictures[type].url)
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
          src={ProjectStore.currentShownGroup.pictures[0].url}
          onClick={() => {
            viewDetail(0)
          }}
        />
        <img
          style={{
            width: `${size}%`,
            transform: `translateY(${
              !showDetail ? (size + 10) / 10 : (size + 10) / 20
            }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`
          }}
          src={ProjectStore.currentShownGroup.pictures[2].url}
          onClick={() => {
            viewDetail(1)
          }}
        />
        <img
          style={{
            width: `${size}%`,
            transform: `translateY(${
              !showDetail ? (size + 130) / 10 : (size + 130) / 20
            }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`
          }}
          src={ProjectStore.currentShownGroup.pictures[1].url}
          onClick={() => {
            viewDetail(2)
          }}
        />
      </Box>
      {showDetail && (
        <Box sx={perspectiveStyles.detail}>
          <img
            src={detailImgUrl}
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
          ProjectStore.setShowPerspective(false)
        }}
      >
        切换视角
      </Button>
    </Box>
  )
}

const Perspective = observer(_Perspective)

export default Perspective
