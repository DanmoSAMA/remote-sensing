import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Slider from '@mui/material/Slider'
import SvgIcon from '../../../../../../components/SvgIcon'
import MySelect from './components/MySelect'
import { ProjectStore } from '../../../../../../mobx/project'
import { perspectiveStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { objectDetectionColors } from '../../../../../../consts/color'

function _Perspective() {
  let odImg = document.querySelector('#od') as HTMLElement
  const [size, setSize] = useState(60)
  const [angle, setAngle] = useState(-15)
  const [detailImgUrl, setDetailImgUrl] = useState('')
  const [showDropDown, setShowDropDown] = useState(false)
  // const layerNum = ProjectStore.currentShownGroup.info.mark.reduce(
  //   (pre: number, cur: number) => pre + cur
  // );
  const hasCDGroup = ProjectStore.currentShownGroup.info.mark[3] > 0

  let cubeCanvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
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
    window.addEventListener('resize', TheDrawMethod)
  }, [])

  useEffect(() => {
    TheDrawMethod()
  }, [size, ProjectStore.showDetail])

  function zoom() {
    if (size <= 75) {
      setSize(size + 2)
    }
  }

  function lessen() {
    if (size >= 45) {
      setSize(size - 2)
    }
  }

  function viewDetail(type: 0 | 1 | 2) {
    ProjectStore.setShowDetail(true)
    setDetailImgUrl(ProjectStore.currentShownGroup.pictures[type].url)
  }

  function handleHeight(): Promise<number> {
    odImg = document.querySelector('#od') as HTMLElement
    return new Promise((resolve) => {
      if (odImg) {
        return resolve(odImg.offsetHeight)
      }
      odImg = document.querySelector('#od') as HTMLElement
      odImg.onload = () => {
        resolve(odImg.offsetHeight)
      }
    })
  }

  function drawCubeCanvas(
    imgHeight: number,
    c: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const img = document.getElementById('cubeImg') as HTMLImageElement

    console.log(imgHeight)

    c.width = imgHeight
    c.height = imgHeight
    c.style.width = c.width + 'px'
    c.style.height = c.height + 'px'

    // 绘制图片
    img.onload = draw
    if (img.complete) draw()

    function draw() {
      ctx.drawImage(
        img as CanvasImageSource,
        0,
        0,
        img.offsetWidth,
        img.offsetHeight,
        0,
        0,
        imgHeight + 2,
        imgHeight + 2
      )

      // 绘制方框
      const sw = ProjectStore.currentShownGroup.info.w
      const sh = ProjectStore.currentShownGroup.info.h
      const ratioX = sw / size
      const ratioY = sh / size

      // 线宽
      ctx.lineWidth = 3
      // 虚线
      ctx.setLineDash([5, 5])
      // 颜色
      ctx.strokeStyle = color

      ProjectStore.currentShownGroup.info.boxs.forEach((item) => {
        // 实际绘制的位置
        const sx = item[0] / ratioX
        const sy = item[1] / ratioY
        // 实际绘制的宽高
        const dw = item[2] / ratioX
        const dh = item[3] / ratioY

        ctx.strokeRect(sx, sy, dw, dh)
      })
    }
  }

  // 改变宽高和绘图，一气呵成
  function TheDrawMethod() {
    handleHeight().then((imgHeight: number) => {
      // cube canvas
      cubeCanvas = document.getElementById('canvas') as HTMLCanvasElement
      ctx = cubeCanvas.getContext('2d') as CanvasRenderingContext2D
      drawCubeCanvas(imgHeight, cubeCanvas, ctx)
    })
  }

  return (
    <Box
      sx={
        !ProjectStore.showDetail
          ? perspectiveStyles.wrapper
          : perspectiveStyles.wrapperInDetailMode
      }
    >
      <Box
        sx={
          !ProjectStore.showDetail
            ? perspectiveStyles.cube
            : perspectiveStyles.cubeAtConer
        }
      >
        {/* 目标提取 */}
        <img
          style={{
            width: `${size}%`,
            transform: `translateY(${
              !ProjectStore.showDetail ? (size - 300) / 10 : size / 20
            }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
          }}
          src={ProjectStore.currentShownGroup.pictures[0].url}
          onClick={() => {
            viewDetail(0)
          }}
        />
        {/* 地物分类 */}
        <img
          style={{
            width: `${size}%`,
            transform: `translateY(${
              !ProjectStore.showDetail ? (size - 100) / 10 : (size + 150) / 20
            }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
          }}
          src={ProjectStore.currentShownGroup.pictures[1].url}
          onClick={() => {
            viewDetail(1)
          }}
        />
        {/* 目标检测 */}
        <>
          <img
            id="od"
            style={{
              width: `${size}%`,
              transform: `translateY(${
                !ProjectStore.showDetail ? (size + 100) / 10 : (size + 300) / 20
              }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
              // border: 'none',
              cursor: 'default',
            }}
            src={ProjectStore.currentShownGroup.pictures[2].url}
          />
          <img
            style={{
              width: 'auto',
              height: 'auto',
              visibility: 'hidden',
              position: 'absolute',
            }}
            id="cubeImg"
            src={
              hasCDGroup
                ? ProjectStore.currentShownGroup.pictures[
                    ProjectStore.currentShownGroup.pictures.length - 2
                  ].url
                : ProjectStore.currentShownGroup.pictures[
                    ProjectStore.currentShownGroup.pictures.length - 1
                  ].url
            }
          />
          <canvas
            id="canvas"
            style={{
              transform: `translateY(${
                !ProjectStore.showDetail ? (size + 300) / 10 : (size + 450) / 20
              }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
              cursor: 'pointer',
            }}
          ></canvas>
        </>
        {/* 变化检测 */}
        <>
          <img
            style={{
              width: `${size}%`,
              transform: `translateY(${
                !ProjectStore.showDetail
                  ? (size + 500) / 10
                  : (size - 1200) / 20
              }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
            }}
            src={ProjectStore.currentShownGroup.pictures[3].url}
            onClick={() => {
              viewDetail(1)
            }}
          />
          {ProjectStore.showMock && (
            <img
              style={{
                width: `${size}%`,
                transform: `translateY(${
                  !ProjectStore.showDetail
                    ? (size + 699) / 10
                    : (size + 599) / 20
                }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                opacity: 0.25,
              }}
              src={ProjectStore.currentShownGroup.pictures[3].url}
            />
          )}
          <img
            style={{
              width: `${size}%`,
              transform: `translateY(${
                !ProjectStore.showDetail ? (size + 700) / 10 : (size + 600) / 20
              }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
            }}
            src={ProjectStore.currentShownGroup.pictures[4].url}
            onClick={() => {
              viewDetail(1)
            }}
          />
          {ProjectStore.showMock && (
            <img
              style={{
                width: `${size}%`,
                transform: `translateY(${
                  !ProjectStore.showDetail
                    ? (size + 899) / 10
                    : (size + 749) / 20
                }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                opacity: 0.25,
              }}
              src={ProjectStore.currentShownGroup.pictures[3].url}
            />
          )}
          <img
            style={{
              width: `${size}%`,
              transform: `translateY(${
                !ProjectStore.showDetail ? (size + 900) / 10 : (size + 750) / 20
              }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
            }}
            src={ProjectStore.currentShownGroup.pictures[5].url}
            onClick={() => {
              viewDetail(1)
            }}
          />
        </>
      </Box>
      {ProjectStore.showDetail && (
        <Box sx={perspectiveStyles.detail}>
          <img
            src={detailImgUrl}
            style={{
              width: '100%',
              borderRadius: '1rem',
              position: 'absolute',
              top: '0',
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
        <Box
          sx={perspectiveStyles.mock}
          onClick={() => {
            ProjectStore.setShowMock(!ProjectStore.showMock)
          }}
        >
          输出模拟{ProjectStore.showMock ? '开' : '关'}
        </Box>
      )}
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
          <Box sx={{ position: 'absolute', bottom: '3.5rem' }}>
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
    </Box>
  )
}

const Perspective = observer(_Perspective)

export default Perspective
