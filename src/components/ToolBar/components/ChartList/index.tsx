import Box from '@mui/material/Box'
import { observer } from 'mobx-react-lite'
import { resultColors } from '@/consts/color'
import { ProjectStore } from '@/mobx/project'

type Props = {
  detectType: 1 | 2 | 3 | 4 | 5
  // 面积占比/图块数量
  displayType: 1 | 2
}

function _ChartList(props: Props) {
  const { detectType, displayType } = props

  const currentInfo =
  detectType !== 1
    ? ProjectStore.currentShownGroup.info
    // @ts-ignore
    : ProjectStore.currentShownGroup.info.infos[1]

  const data =
    displayType === 1
      // @ts-ignore
      ? currentInfo.colors.map((item, index) => {
          switch (detectType) {
            case 1:
            case 3:
              switch (index) {
                case 0:
                  return {
                    name: '建筑',
                    value: item
                  }
                case 1:
                  return {
                    name: '耕地',
                    value: item
                  }
                case 2:
                  return {
                    name: '林地',
                    value: item
                  }
                case 3:
                  return {
                    name: '其他',
                    value: item
                  }
                case 4:
                  return {
                    name: '未知',
                    value: item
                  }
              }
            case 4:
              break
            case 2:
            case 5:
              switch (index) {
                case 0:
                  return {
                    name: '其他',
                    value: item
                  }
                case 1:
                  return {
                    name: '道路',
                    value: item
                  }
              }
          }
      })
      // @ts-ignore
      : currentInfo.nums.map((item, index) => {
          switch (detectType) {
            case 1:
              break
            case 2:
            case 3:
              switch (index) {
                case 0:
                  return {
                    name: '建筑',
                    value: item
                  }
                case 1:
                  return {
                    name: '耕地',
                    value: item
                  }
                case 2:
                  return {
                    name: '林地',
                    value: item
                  }
                case 3:
                  return {
                    name: '其他',
                    value: item
                  }
                case 4:
                  return {
                    name: '未知',
                    value: item
                  }
              }
            case 4:
              break
            case 5:
              switch (index) {
                case 0:
                  return {
                    name: '其他',
                    value: item
                  }
                case 1:
                  return {
                    name: '道路',
                    value: item
                  }
              }
          }
      })
  
  return (
    <Box
      sx={{
        width: '100px',
        marginLeft: '10px'
      }}
    >
      {/*@ts-ignore*/}
      {data.map((item: any, index) => (
        <Box
          sx={{
            width: '120px',
            height: '25px',
            lineHeight: '25px',
            display: 'flex',
            alignItems: 'center'
          }}
          key={item}
        >
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: resultColors[index],
              marginRight: '5px'
            }}
          ></Box>
          {item ? item.name : ''}(
          {displayType === 1 && item ? (item.value * 100).toFixed(2) + '%' : item ? item.value : '0%'}
          )
        </Box>
      ))}
    </Box>
  )
}

const ChartList = observer(_ChartList)

export default ChartList
