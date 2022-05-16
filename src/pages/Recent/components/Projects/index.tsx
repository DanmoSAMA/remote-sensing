import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import projectCover from '../../../../assets/imgs/projectCover.png'
import { useState, useEffect } from 'react'
import { projectStyles } from './styles'
import { getRecentProjects } from '../../../../network/project/getRecentProjects'
import { getToken } from '../../../../utils/token'

// const data = [
//   {
//     id: 1,
//     editedTime: '2022.5.1',
//     name: '项目名称',
//     coverSrc: 'http://cdn.danmoits.com/a-cat.png'
//   },
//   {
//     id: 2,
//     editedTime: '2022.5.1',
//     name: '项目名称',
//     coverSrc: 'http://cdn.danmoits.com/a-cat.png'
//   },
//   {
//     id: 3,
//     editedTime: '2022.5.1',
//     name: '项目名称',
//     coverSrc: 'http://cdn.danmoits.com/a-cat.png'
//   },
//   {
//     id: 4,
//     editedTime: '2022.5.1',
//     name: '项目名称',
//     coverSrc: 'http://cdn.danmoits.com/a-cat.png'
//   },
//   {
//     id: 5,
//     editedTime: '2022.5.1',
//     name: '项目名称',
//     coverSrc: 'http://cdn.danmoits.com/a-cat.png'
//   },
//   {
//     id: 6,
//     editedTime: '2022.5.1',
//     name: '项目名称',
//     coverSrc: 'http://cdn.danmoits.com/a-cat.png'
//   }
// ]

function Project() {
  const [recentProjects, setRecentProjects] = useState(null)
  let token = getToken()

  useEffect(() => {
    token = getToken()
    getRecentProjects().then((res) => {
      setRecentProjects(res.data.projects)
    })
  }, [token])

  return (
    <Box sx={projectStyles.wrapper}>
      {recentProjects?.slice(0, 8).map((item) => (
        <Box key={item.id} sx={{ position: 'relative' }}>
          <Box sx={projectStyles.item}>
            {/* <img src={item.coverSrc} /> */}
            <img src={projectCover} />
            <Typography sx={projectStyles.bottom}>{item.name}</Typography>
          </Box>
          <div className="mask" style={projectStyles.mask}>
            <Typography color={'secondary.main'} fontSize={'1rem'}>
              最近编辑于
            </Typography>
            <Typography color={'secondary.main'} fontSize={'1rem'}>
              {/* {item.editedTime} */}
              2022.5.1
            </Typography>
            <Box sx={projectStyles.middle} mt={'1rem'} mb={'1rem'}>
              <SvgIcon name="open" />
              <Typography
                color={'000'}
                fontSize={'1rem'}
                fontWeight={600}
                ml={'0.5rem'}
              >
                打开项目
              </Typography>
            </Box>
            <Box sx={projectStyles.middle}>
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
            <Typography sx={projectStyles.bottom}>{item.name}</Typography>
          </div>
        </Box>
      ))}
    </Box>
  )
}

export default Project
