import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import { projectStyles } from './styles'

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
    <Box sx={projectStyles.wrapper}>
      {data.map((item) => (
        <Box key={item.id} sx={{ position: 'relative' }}>
          <Box sx={projectStyles.item}>
            <img src={item.coverSrc} />
            <Typography
              textAlign={'center'}
              color={'secondary.main'}
              fontSize={14}
              mt={'20px'}
              mb={'1.5rem'}
            >
              {item.name}
            </Typography>
          </Box>
          <div className="mask" style={projectStyles.mask}>
            <Box sx={projectStyles.middle} mt={'5.45rem'} mb={'1.2rem'}>
              <SvgIcon name="open" />
              <Typography
                color={'000'}
                fontSize={14}
                fontWeight={600}
                ml={'0.5rem'}
              >
                打开项目
              </Typography>
            </Box>
            <Box sx={projectStyles.middle} mb={'1.5rem'}>
              <SvgIcon name="recover" />
              <Typography
                color={'000'}
                fontSize={14}
                fontWeight={600}
                ml={'0.5rem'}
              >
                恢复项目
              </Typography>
            </Box>
            <Box sx={projectStyles.middle} mb={'1.5rem'}>
              <SvgIcon name="delete" />
              <Typography
                color={'000'}
                fontSize={14}
                fontWeight={600}
                ml={'0.5rem'}
              >
                彻底删除
              </Typography>
            </Box>
            <Typography
              textAlign={'center'}
              color={'secondary.main'}
              fontSize={14}
              mt={'20px'}
              mb={'10px'}
            >
              {item.name}
            </Typography>
          </div>
        </Box>
      ))}
    </Box>
  )
}

export default Project
