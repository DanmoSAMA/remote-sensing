import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Slider from '@mui/material/Slider'
import SvgIcon from '../../../../../../components/SvgIcon'
import MySelect from './components/MySelect'
import { ProjectStore } from '../../../../../../mobx/project'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { perspectiveStyles } from './styles'
import { objectDetectionColors } from '../../../../../../consts/color'

function _Perspective() {
  let squareImg = document.querySelector('#squareImg') as HTMLElement
  const [size, setSize] = useState(500)
  const [angle, setAngle] = useState(-7)
  const [imgHeight, setImgHeight] = useState(
    squareImg ? squareImg.offsetHeight : 0
  )
  const [showDropDown, setShowDropDown] = useState(false)
  // 得到dpr
  const dpr = window.devicePixelRatio

  let imageData: ImageData
  let color: string

  switch (ProjectStore.currentShownGroup.info.type) {
    case 'playground':
      color = objectDetectionColors[0].color
      break
    case 'aircraft':
      color = objectDetectionColors[1].color
      break
    case 'overpass':
      color = objectDetectionColors[2].color
      break
    case 'oiltank':
      color = objectDetectionColors[3].color
      break
  }

  useEffect(() => {
    window.addEventListener('resize', handleHeight)
  }, [])

  useEffect(() => {
    handleHeight()
  }, [])

  // cube canvas
  useEffect(() => {
    const c = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = c.getContext('2d') as CanvasRenderingContext2D
    const img = document.getElementById('cubeImg') as HTMLElement

    // 解决模糊问题
    // 画布大小
    // const logicalWidth = c.width
    // const logicalHeight = c.height
    // // 将canvas画布大小转换成物理像素大小
    // c.width = logicalWidth * dpr
    // c.height = logicalHeight * dpr
    // // 将canvas元素大小设置成逻辑像素大小
    // c.style.width = logicalWidth + 'px'
    // c.style.height = logicalHeight + 'px'
    // // 此时画布内容是缩小的，因此使用scale放大
    // ctx.scale(dpr, dpr)

    c.width = !ProjectStore.showDetail ? size : size / 2.5
    c.height = !ProjectStore.showDetail ? size : size / 2.5
    c.style.width = c.width + 'px'
    c.style.height = c.height + 'px'

    // 绘制图片
    img.onload = () => {
      ctx.drawImage(
        img as CanvasImageSource,
        0,
        0,
        img.offsetWidth,
        img.offsetHeight,
        0,
        0,
        size,
        size
      )

      // 绘制方框
      const sw = ProjectStore.currentShownGroup.info.w
      const ratio = sw / size

      // 线宽
      ctx.lineWidth = 3
      // 虚线
      ctx.setLineDash([5, 5])
      // 颜色
      ctx.strokeStyle = color

      ProjectStore.currentShownGroup.info.boxs.forEach((item) => {
        // 实际绘制的位置
        const sx = item[0] / ratio
        const sy = (item[1] + item[3]) / ratio
        // 实际绘制的宽高
        const dw = item[2] / ratio
        const dh = item[3] / ratio

        ctx.strokeRect(sx, sy, dw, dh)
      })
    }
  }, [])

  function zoom() {
    if (size <= 620) {
      setSize(size + 10)
    }
  }

  function lessen() {
    if (size >= 400) {
      setSize(size - 10)
    }
  }

  function viewDetail() {
    ProjectStore.setShowDetail(true)

    const c = document.getElementById('detail_canvas') as HTMLCanvasElement
    const ctx = c.getContext('2d') as CanvasRenderingContext2D
    const img = document.getElementById('cubeImg') as HTMLElement

    c.width = 500 * dpr
    c.height = 500 * dpr
    c.style.width = '500px'
    c.style.height = '500px'
    ctx.scale(dpr, dpr)

    // 绘制图片
    ctx.drawImage(
      img as CanvasImageSource,
      0,
      0,
      img.offsetWidth,
      img.offsetHeight,
      0,
      0,
      500,
      500
    )

    // 绘制方框
    const sw = ProjectStore.currentShownGroup.info.w
    const ratio = sw / size

    // 线宽
    ctx.lineWidth = 3
    // 颜色
    ctx.fillStyle = color
    ctx.strokeStyle = color
    // 透明
    ctx.globalAlpha = 0.5

    ProjectStore.currentShownGroup.info.boxs.forEach((item) => {
      // 实际绘制的位置
      const sx = item[0] / ratio
      const sy = (item[1] + item[3]) / ratio
      // 实际绘制的宽高
      const dw = item[2] / ratio
      const dh = item[3] / ratio

      ctx.fillRect(sx, sy, dw, dh)
      ctx.strokeRect(sx, sy, dw, dh)
    })
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
              width: !ProjectStore.showDetail ? `${size}px` : `${size / 2.5}px`,
              height: !ProjectStore.showDetail
                ? `${size}px`
                : `${size / 2.5}px`,
              transform: `translateY(${
                !ProjectStore.showDetail ? -5 : 5
              }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`,
              cursor: 'default'
            }}
            src={ProjectStore.currentShownGroup.pictures[0].url}
          />
          <img
            style={{
              width: 'auto',
              height: 'auto',
              visibility: 'hidden',
              position: 'absolute'
            }}
            id="cubeImg"
            src={ProjectStore.currentShownGroup.pictures[1].url}
          />
          <canvas
            id="canvas"
            style={{
              width: !ProjectStore.showDetail ? `${size}px` : `${size / 2.5}px`,
              height: !ProjectStore.showDetail
                ? `${size}px`
                : `${size / 2.5}px`,
              transform: `translateY(${
                !ProjectStore.showDetail ? (size - 380) / 10 : (size - 200) / 20
              }rem) rotateX(65deg) rotateZ(${-20 + angle}deg)`,
              cursor: 'pointer'
            }}
            onClick={() => {
              viewDetail()
            }}
          ></canvas>
        </Box>
      ) : (
        <Box sx={perspectiveStyles.square}>
          <img
            src={ProjectStore.imgGroups[0].pictures[0].url}
            id="squareImg"
            style={{ opacity: 0 }}
          />
          {ProjectStore.currentShownImgs.map((item, index) => (
            <img
              src={item.url}
              style={{
                display: item.isShown && item.groupShown ? 'block' : 'none'
              }}
              key={item.uuid + index}
            />
          ))}
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
                background: `url(${ProjectStore.coverImg.url})`,
                backgroundSize: 'cover',
                transition: 'none'
              }
            }}
          />
        </Box>
      )}
      <Box
        sx={perspectiveStyles.detail}
        style={{
          visibility: ProjectStore.showDetail ? 'visible' : 'hidden'
        }}
      >
        <canvas
          id="detail_canvas"
          style={{
            width: '500px',
            borderRadius: '1rem',
            position: 'absolute',
            top: 0,
            right: 0,
            zoom: 1.2
          }}
          width="500"
          height="500"
        ></canvas>
        <div
          onClick={() => {
            ProjectStore.setShowDetail(false)
          }}
        >
          <SvgIcon name="detail_close" class="perspective detail_close" />
        </div>
      </Box>

      <Box
        sx={perspectiveStyles.result}
        onClick={() => {
          ProjectStore.setShowResultAnalysis()
        }}
      >
        结果分析
      </Box>
      <List
        sx={perspectiveStyles.sidebar}
        style={{ top: ProjectStore.displayType === 0 ? 'auto' : '10rem' }}
      >
        {ProjectStore.displayType === 0 ? (
          <>
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
          </>
        ) : (
          <Box sx={{ position: 'relative' }}>
            {showDropDown && (
              <Box sx={perspectiveStyles.sidebarDropdown}>
                <div style={{ color: '#01555A', marginBottom: '10px' }}>
                  请选择应用遮罩的图层：
                </div>
                <MySelect />
              </Box>
            )}
            <ListItem
              button
              onClick={(e) => {
                setShowDropDown(!showDropDown)
              }}
            >
              <SvgIcon name="move" />
            </ListItem>
          </Box>
        )}
      </List>
      <Box
        sx={perspectiveStyles.button}
        onClick={() => {
          ProjectStore.setDisplayType(ProjectStore.displayType === 0 ? 1 : 0)
          ProjectStore.setShowDetail(false)
          ProjectStore.setShowResultAnalysis(false)
        }}
      >
        切换视角
      </Box>
    </Box>
  )
}

const Perspective = observer(_Perspective)

export default Perspective
