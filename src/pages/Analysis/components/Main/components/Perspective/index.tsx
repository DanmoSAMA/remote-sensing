import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import SvgIcon from '@/components/SvgIcon'
import MySelect from './components/MySelect'
import { ProjectStore } from '@/mobx/project'
import { perspectiveStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { objectDetectionColors } from '@/consts/color'
import { throttle } from '@/utils/throttle'

function _Perspective() {
  let odImg = document.querySelector('#od') as HTMLElement
  const [size, setSize] = useState(60)
  const [angle, setAngle] = useState(-15)
  const [showDropDown, setShowDropDown] = useState(false)
  const [imgIndex, setImgIndex] = useState<-1 | 0 | 1 | 2 | 3 | 4 | 5>(-1)
  const dpr = window.devicePixelRatio

  let cubeLayerDoms = document.querySelectorAll('.cube_layer')

  // 判断逻辑
  // const layerNum = ProjectStore.currentShownGroup.info.mark.reduce(
  //   (pre: number, cur: number) => pre + cur
  // )

  // 是否存在目标提取分组
  // @ts-ignore
  const hasOEGroup = ProjectStore.currentShownGroup.info.mark[0] > 0
  // 是否存在地物分类分组
  // @ts-ignore
  const hasTCGroup = ProjectStore.currentShownGroup.info.mark[1] > 0
  // 是否存在目标检测分组
  // @ts-ignore
  const hasODGroup = ProjectStore.currentShownGroup.info.mark[2] > 0
  // 是否存在变化检测分组
  // @ts-ignore
  const hasCDGroup = ProjectStore.currentShownGroup.info.mark[3] > 0

  // 目标提取如果存在，一定是第一张图
  const OEIndex = 0
  // 地物分类可能是第一张、第二张图
  const TCIndex = hasOEGroup ? 1 : 0
  // 目标检测可能是第一、二、三张图
  const ODIndex = hasOEGroup ? (hasTCGroup ? 2 : 1) : hasTCGroup ? 1 : 0

  // 变化检测最为复杂，对应有三张图，此处计算第一张图的index，并暂时不考虑多组变化检测分组
  let CDIndex = 0
  if (hasOEGroup && hasTCGroup && hasODGroup) CDIndex = 3
  else if (
    (!hasOEGroup && hasTCGroup && hasODGroup) ||
    (hasOEGroup && !hasTCGroup && hasODGroup) ||
    (hasOEGroup && hasTCGroup && !hasODGroup)
  )
    CDIndex = 2
  else if (
    (!hasOEGroup && !hasTCGroup && hasODGroup) ||
    (hasOEGroup && !hasTCGroup && !hasODGroup) ||
    (!hasOEGroup && hasTCGroup && !hasODGroup)
  )
    CDIndex = 1
  else CDIndex = 0

  // console.log(
  //   hasOEGroup,
  //   hasTCGroup,
  //   hasODGroup,
  //   OEIndex,
  //   TCIndex,
  //   ODIndex,
  //   CDIndex
  // )

  let cubeCanvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let color: string

  // @ts-ignore
  switch (ProjectStore.currentShownGroup.info.infos[1].type) {
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
    window.addEventListener('resize', throttle(TheDrawCubeMethod, 10))
  }, [])

  useEffect(TheDrawDetailMethod, [imgIndex])

  useEffect(() => {
    window.addEventListener('resize', throttle(TheDrawDetailMethod, 10))
  }, [imgIndex])

  useEffect(() => {
    TheDrawCubeMethod()
  }, [size, ProjectStore.showDetail, ProjectStore.currentShownGroup])

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

  function handleSizeInCube(): Promise<any> {
    odImg = document.querySelector('#od') as HTMLElement
    let imgWidth = 0,
      imgHeight = 0

    if (odImg) {
      imgWidth = odImg.offsetWidth
      imgHeight = odImg.offsetHeight
    }

    return new Promise((resolve) => {
      if (imgWidth && imgHeight) {
        return resolve({ imgWidth, imgHeight })
      }
      setTimeout(() => {
        odImg = document.querySelector('#od') as HTMLElement
        imgWidth = odImg.offsetWidth
        imgHeight = odImg.offsetHeight
        resolve({ imgWidth, imgHeight })
      }, 100)
    })
  }

  function handleWidthInDetail(): Promise<number> {
    let detailWrapper = document.querySelector('#detail_wrapper') as HTMLElement

    let detailWidth = 0

    if (detailWrapper) detailWidth = detailWrapper.offsetWidth

    return new Promise((resolve) => {
      if (detailWidth) {
        return resolve(detailWidth)
      }
      setTimeout(() => {
        detailWrapper = document.querySelector('#detail_wrapper') as HTMLElement
        resolve(detailWrapper.offsetWidth)
      }, 0)
    })
  }

  function drawCubeCanvas(
    imgWidth: number,
    imgHeight: number,
    c: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const img = document.getElementById('cubeImg') as HTMLImageElement

    c.width = imgWidth * dpr
    c.height = imgHeight * dpr
    c.style.width = imgWidth + 'px'
    c.style.height = imgHeight + 'px'

    ctx.scale(dpr, dpr)

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
        imgWidth + 5,
        imgHeight + 5
      )

      // 绘制方框
      // @ts-ignore
      const sw = ProjectStore.currentShownGroup.info.infos[ODIndex].w
      // @ts-ignore
      const sh = ProjectStore.currentShownGroup.info.infos[ODIndex].h
      const ratioX = sw / (imgHeight + 5)
      const ratioY = sh / (imgHeight + 5)

      // 线宽
      ctx.lineWidth = 3
      // 虚线
      ctx.setLineDash([5, 5])
      // 颜色
      ctx.strokeStyle = color

      // @ts-ignore
      ProjectStore.currentShownGroup.info.infos[ODIndex].boxs &&
        // @ts-ignore
        ProjectStore.currentShownGroup.info.infos[ODIndex].boxs.forEach(
          // @ts-ignore
          (item) => {
            // 实际绘制的位置
            const sx = item[0] / ratioX
            const sy = item[1] / ratioY
            // 实际绘制的宽高
            const dw = item[2] / ratioX
            const dh = item[3] / ratioY

            ctx.strokeRect(sx, sy, dw, dh)
          }
        )
    }
  }

  // 改变宽高和绘图，一气呵成
  function TheDrawCubeMethod() {
    handleSizeInCube().then((size: any) => {
      const { imgWidth, imgHeight } = size
      cubeCanvas = document.getElementById('canvas') as HTMLCanvasElement
      ctx = cubeCanvas?.getContext('2d') as CanvasRenderingContext2D
      ctx && drawCubeCanvas(imgWidth, imgHeight, cubeCanvas, ctx)
    })
  }

  function TheDrawDetailMethod() {
    if (ProjectStore.showDetail) {
      handleWidthInDetail().then((detailWidth) => {
        const detailCanvas = document.getElementById(
          'detail_canvas'
        ) as HTMLCanvasElement
        ctx = detailCanvas?.getContext('2d') as CanvasRenderingContext2D
        ctx && drawDetailCanvas(detailWidth, detailCanvas, ctx, imgIndex)
      })
    }
  }

  function viewDetail(_imgIndex: -1 | 0 | 1 | 2 | 3 | 4 | 5) {
    setImgIndex(_imgIndex)
    ProjectStore.setShowDetail(true)
  }

  function drawDetailCanvas(
    detailWidth: number,
    c: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    imgIndex: -1 | 0 | 1 | 2 | 3 | 4 | 5
  ) {
    cubeLayerDoms = document.querySelectorAll('.cube_layer')
    const cubeImg = document.getElementById('cubeImg') as HTMLImageElement

    const img =
      imgIndex !== 2
        ? (cubeLayerDoms[imgIndex] as HTMLImageElement)
        : (cubeLayerDoms[5] as HTMLImageElement)

    c.width = detailWidth * dpr
    c.height = detailWidth * dpr
    c.style.width = detailWidth + 'px'
    c.style.height = detailWidth + 'px'

    ctx.scale(dpr, dpr)

    console.log('测节流')

    // 绘制图片
    if (img) {
      img.onload = draw
      if (img.complete) draw()
    }

    function draw() {
      ctx.drawImage(
        img as CanvasImageSource,
        0,
        0,
        cubeImg.offsetWidth - 5,
        cubeImg.offsetHeight - 5,
        0,
        0,
        detailWidth,
        detailWidth
      )

      if (imgIndex === 2) {
        // 绘制方框
        // @ts-ignore
        const sw = ProjectStore.currentShownGroup.info.infos[ODIndex].w
        // @ts-ignore
        const sh = ProjectStore.currentShownGroup.info.infos[ODIndex].h
        const ratioX = sw / detailWidth
        const ratioY = sh / detailWidth

        // 线宽
        ctx.lineWidth = 3
        // 颜色
        ctx.fillStyle = color
        ctx.strokeStyle = color
        // 透明
        ctx.globalAlpha = 0.5

        // @ts-ignore
        ProjectStore.currentShownGroup.info.infos[ODIndex].boxs &&
          // @ts-ignore
          ProjectStore.currentShownGroup.info.infos[ODIndex].boxs.forEach(
            // @ts-ignore
            (item) => {
              // 实际绘制的位置
              const sx = item[0] / ratioX
              const sy = item[1] / ratioY
              // 实际绘制的宽高
              const dw = item[2] / ratioX
              const dh = item[3] / ratioY

              ctx.fillRect(sx, sy, dw, dh)
              ctx.strokeRect(sx, sy, dw, dh)
            }
          )
      }
    }
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
        id="cubeWrapper"
      >
        {
          /* 目标提取 */
          hasOEGroup && (
            <img
              className="cube_layer"
              style={{
                width: `${size}%`,
                transform: `translateY(${
                  !ProjectStore.showDetail ? (size - 300) / 10 : size / 20
                }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
              }}
              src={ProjectStore.currentShownGroup.pictures[OEIndex].url}
              onClick={() => {
                viewDetail(0)
              }}
            />
          )
        }
        {
          /* 地物分类 */
          hasTCGroup && (
            <img
              className="cube_layer"
              style={{
                width: `${size}%`,
                transform: `translateY(${
                  !ProjectStore.showDetail
                    ? (size - 100) / 10
                    : (size + 150) / 20
                }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
              }}
              src={ProjectStore.currentShownGroup.pictures[TCIndex].url}
              onClick={() => {
                viewDetail(1)
              }}
            />
          )
        }
        {
          /* 目标检测 */
          hasODGroup && (
            <>
              <img
                id="od"
                style={{
                  width: `${size}%`,
                  transform: `translateY(${
                    !ProjectStore.showDetail
                      ? (size + 100) / 10
                      : (size + 300) / 20
                  }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                  border: 'none',
                  cursor: 'default',
                }}
                src={ProjectStore.currentShownGroup.pictures[ODIndex].url}
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
                  ProjectStore.currentShownGroup.pictures[
                    ProjectStore.currentShownGroup.pictures.length - 1
                  ].url
                }
              />
              <canvas
                id="canvas"
                className="cube_layer"
                style={{
                  transform: `translateY(${
                    !ProjectStore.showDetail
                      ? (size + 300) / 10
                      : (size + 450) / 20
                  }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  viewDetail(2)
                }}
              ></canvas>
            </>
          )
        }
        {
          /* 变化检测 */
          hasCDGroup && (
            <>
              <img
                className="cube_layer"
                style={{
                  width: `${size}%`,
                  transform: `translateY(${
                    !ProjectStore.showDetail
                      ? (size + 500) / 10
                      : (size + 600) / 20
                  }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                }}
                src={ProjectStore.currentShownGroup.pictures[CDIndex].url}
                onClick={() => {
                  viewDetail(3)
                }}
              />
              {ProjectStore.showMock && (
                <img
                  style={{
                    width: `${size}%`,
                    transform: `translateY(${
                      !ProjectStore.showDetail
                        ? (size + 699) / 10
                        : (size + 749) / 20
                    }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                    opacity: 0.25,
                  }}
                  src={ProjectStore.currentShownGroup.pictures[CDIndex].url}
                />
              )}
              <img
                className="cube_layer"
                style={{
                  width: `${size}%`,
                  transform: `translateY(${
                    !ProjectStore.showDetail
                      ? (size + 700) / 10
                      : (size + 750) / 20
                  }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                }}
                src={ProjectStore.currentShownGroup.pictures[CDIndex + 1].url}
                onClick={() => {
                  viewDetail(4)
                }}
              />
              {ProjectStore.showMock && (
                <img
                  style={{
                    width: `${size}%`,
                    transform: `translateY(${
                      !ProjectStore.showDetail
                        ? (size + 899) / 10
                        : (size + 899) / 20
                    }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                    opacity: 0.25,
                  }}
                  src={ProjectStore.currentShownGroup.pictures[CDIndex].url}
                />
              )}
              <img
                className="cube_layer"
                style={{
                  width: `${size}%`,
                  transform: `translateY(${
                    !ProjectStore.showDetail
                      ? (size + 900) / 10
                      : (size + 900) / 20
                  }rem) rotateX(57deg) rotateZ(${-20 + angle}deg)`,
                }}
                src={ProjectStore.currentShownGroup.pictures[CDIndex + 2].url}
                onClick={() => {
                  viewDetail(5)
                }}
              />
            </>
          )
        }
      </Box>
      {ProjectStore.showDetail && (
        <Box sx={perspectiveStyles.detail} id="detail_wrapper">
          <canvas
            id="detail_canvas"
            style={{
              borderRadius: '1rem',
              position: 'absolute',
              top: 0,
            }}
          ></canvas>
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
