import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import { binStyles } from './styles'

const data = [
  {
    id: 1,
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 2,
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 3,
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 4,
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 5,
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  },
  {
    id: 6,
    name: '项目名称',
    coverSrc: 'http://cdn.danmoits.com/a-cat.png'
  }
]

function Project() {
  return (
    <Box sx={binStyles.wrapper}>
      {data.map((item) => (
        <Box key={item.id} sx={{ position: 'relative' }}>
          <Box sx={binStyles.item}>
            <img src={item.coverSrc} />
            <Typography sx={binStyles.bottom}>{item.name}</Typography>
          </Box>
          <div className="mask" style={binStyles.mask}>
            <Box sx={binStyles.middle} mb={'1rem'}>
              <SvgIcon name="open" />
              <Typography fontSize={'1rem'} fontWeight={600} ml={'0.5rem'}>
                打开项目
              </Typography>
            </Box>
            <Box sx={binStyles.middle} mb={'1rem'}>
              <SvgIcon name="recover" />
              <Typography fontSize={'1rem'} fontWeight={600} ml={'0.5rem'}>
                恢复项目
              </Typography>
            </Box>
            <Box sx={binStyles.middle} mb={'1rem'}>
              <SvgIcon name="delete" />
              <Typography
                color={'000'}
                fontSize={'1rem'}
                fontWeight={600}
                ml={'0.5rem'}
              >
                彻底删除
              </Typography>
            </Box>
            <Typography sx={binStyles.bottom}>{item.name}</Typography>
          </div>
        </Box>
      ))}
    </Box>
  )
}

export default Project
