import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import { ProjectStore } from '../../../../mobx/project'
import { mainStyles } from './styles'

ProjectStore.updateChosenImgs([
  {
    id: 1,
    url: 'https://z3.ax1x.com/2021/08/17/fInXEF.png',
    name: '图片1'
  },
  {
    id: 2,
    url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
    name: '图片2'
  }
])

export default function Main() {
  return (
    <Box sx={mainStyles.wrapper}>
      <Box sx={mainStyles.image}>
        {ProjectStore.chosenImgs.map((item) => (
          <img src={item.url} key={item.id} />
        ))}
      </Box>
      <Box sx={mainStyles.function}>
        <Typography
          fontSize={20}
          color={'secondary.main'}
          fontWeight={500}
          mt={'5px'}
        >
          变化检测
        </Typography>
        <Box sx={mainStyles.function_inner}>
          <Box sx={mainStyles.upper}>
            <Typography
              fontSize={'1rem'}
              color={'secondary.main'}
              fontWeight={400}
              mb={'5px'}
            >
              待分析图片
            </Typography>
            <Box sx={mainStyles.pairItem}>todo...</Box>
            <Box sx={mainStyles.addNext}>
              <SvgIcon name="add" />
              <Typography
                fontSize={'0.8rem'}
                color={'secondary.main'}
                fontWeight={600}
                ml={'5px'}
              >
                添加下一组
              </Typography>
            </Box>
          </Box>
          <Box sx={mainStyles.resultName}>
            <Typography
              fontSize={'1rem'}
              color={'secondary.main'}
              fontWeight={400}
              mb={'5px'}
            >
              结果名称
            </Typography>
            <input
              type="text"
              placeholder="请输入结果分析名称，不超过50个字符"
              style={{
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
                height: '30px',
                padding: '5px',
                borderRadius: '10px',
                border: '1px solid #01555A'
              }}
            />
            <Typography
              fontSize={'0.75rem'}
              color={'secondary.main'}
              fontWeight={400}
              mt={'5px'}
            >
              注：若输出多个分析结果，将会按照结果名称+数字的格式输出
            </Typography>
          </Box>
          <Box sx={mainStyles.btnArea}>
            <Button variant="contained" color="secondary">
              开始检测
            </Button>
            <Button variant="contained" color="info">
              取消
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
