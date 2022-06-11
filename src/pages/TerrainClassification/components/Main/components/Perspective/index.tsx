import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Slider from '@mui/material/Slider'
import SvgIcon from '../../../../../../components/SvgIcon'
import { ProjectStore } from '../../../../../../mobx/project'
import { perspectiveStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'

function _Perspective() {
  let squareImg = document.querySelector('#squareImg') as HTMLElement
  const [size, setSize] = useState(85)
  const [angle, setAngle] = useState(-7)
  const [detailImgUrl, setDetailImgUrl] = useState('')
  const [imgHeight, setImgHeight] = useState(
    squareImg ? squareImg.offsetHeight : 0
  )

  useEffect(() => {
    window.addEventListener('resize', handleHeight)
  }, [])

  useEffect(() => {
    handleHeight()
  })

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
    ProjectStore.setShowDetail(true)
    setDetailImgUrl(ProjectStore.currentShownGroup.pictures[type].url)
  }

  function handleHeight() {
    squareImg = document.querySelector('#squareImg') as HTMLElement
    squareImg && setImgHeight(squareImg.offsetHeight)
    if (imgHeight === 0) {
      setTimeout(() => {
        squareImg = document.querySelector('#squareImg') as HTMLElement
        squareImg && setImgHeight(squareImg.offsetHeight)
      }, 200)
    }
  }

  return (
    <Box sx={perspectiveStyles.wrapper}>
      {ProjectStore.displayType === 0 ? (
        <Box
          sx={
            !ProjectStore.showDetail
              ? perspectiveStyles.cube
              : perspectiveStyles.cubeAtConer
          }
        >
          <img
            style={{
              width: `${size}%`,
              transform: `translateY(${
                !ProjectStore.showDetail ? -size / 10 : -size / 20
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
                !ProjectStore.showDetail ? (size + 10) / 10 : (size + 10) / 20
              }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`
            }}
            src={ProjectStore.currentShownGroup.pictures[1].url}
            onClick={() => {
              viewDetail(1)
            }}
          />
        </Box>
      ) : (
        <Box sx={perspectiveStyles.square}>
          {ProjectStore.currentShownGroup.pictures[1].isShown && (
            <img
              src={ProjectStore.currentShownGroup.pictures[1].url}
              id="squareImg"
            />
          )}
          {ProjectStore.currentShownGroup.pictures[0].url !== '' &&
            ProjectStore.currentShownGroup.pictures[0].isShown && (
              <Slider
                defaultValue={50}
                sx={{
                  height: `${imgHeight}px`,
                  padding: '0',

                  '& .MuiSlider-rail': {
                    backgroundColor: 'transparent'
                  },
                  '& .MuiSlider-track': {
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0',
                    background: `url(${ProjectStore.currentShownGroup.pictures[0].url})`,
                    backgroundSize: 'cover',
                    transition: 'none'
                  }
                }}
              />
            )}
        </Box>
      )}
      {ProjectStore.showDetail && (
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
              ProjectStore.setShowDetail(false)
            }}
          >
            <SvgIcon name="detail_close" class="perspective detail_close" />
          </div>
        </Box>
      )}
      {ProjectStore.displayType === 0 && (
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
      )}
      <Button
        variant="contained"
        sx={perspectiveStyles.button}
        onClick={() => {
          ProjectStore.setDisplayType(ProjectStore.displayType === 0 ? 1 : 0)
          ProjectStore.setShowDetail(false)
        }}
      >
        切换视角
      </Button>
    </Box>
  )
}

const Perspective = observer(_Perspective)

export default Perspective
