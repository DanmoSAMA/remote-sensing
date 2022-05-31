import Box from '@mui/material/Box'
import { mainStyles } from '../../../../styles'

export default function Loading() {
  return (
    // 最外层圆 - 内层圆 - 旋转的扇形
    <Box sx={mainStyles.loading}>
      <Box sx={mainStyles.loading.inner}>正在分析中</Box>
      <Box sx={mainStyles.loading.rotate}></Box>
    </Box>
  )
}
