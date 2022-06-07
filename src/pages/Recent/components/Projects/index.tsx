import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import projectCover from '../../../../assets/imgs/projectCover.png'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projectStyles } from './styles'
import { getRecentProjects } from '../../../../network/project/getRecentProjects'
import { searchProjects } from '../../../../network/project/searchProjects'
import { moveToBin } from '../../../../network/project/moveToBin'
import { getToken } from '../../../../utils/token'
import { ProjectStore } from '../../../../mobx/project'
import { useParams } from '../../../../hooks/useParams'

function Project() {
  const navigate = useNavigate()
  const [recentProjects, setRecentProjects] = useState([])
  const keyword = useParams('keyword')
  let token = getToken()

  useEffect(() => {
    token = getToken()

    if (!keyword) {
      getRecentProjects().then((res) => {
        setRecentProjects(res.data.projects)
      })
    } else {
      searchProjects(keyword).then((res) => {
        setRecentProjects(res.data.projects)
      })
    }
  }, [token, keyword])

  async function clickToMove(id: string) {
    if (confirm('确定要将该项目移动至回收站吗?')) {
      const res = await moveToBin(id)
      if (res.code === 0) {
        getRecentProjects().then((res) => {
          setRecentProjects(res.data.projects)
        })
      }
    }
  }

  return (
    <Box sx={projectStyles.wrapper}>
      {recentProjects?.slice(0, 8).map((item) => (
        <Box key={item.id} sx={{ position: 'relative' }}>
          <Box sx={projectStyles.item}>
            <img src={projectCover} />
            <Typography sx={projectStyles.bottom}>{item.name}</Typography>
          </Box>
          <div className="mask" style={projectStyles.mask}>
            <Typography color={'secondary.main'} fontSize={'1rem'}>
              最近编辑于
            </Typography>
            <Typography color={'secondary.main'} fontSize={'1rem'}>
              {item.lastVisit}
            </Typography>
            <Box
              sx={projectStyles.middle}
              mt={'1rem'}
              mb={'1rem'}
              onClick={() => {
                ProjectStore.setProjectName(item.name)
                navigate(`/change-detection?id=${item.id}`)
              }}
            >
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
            <Box
              sx={projectStyles.middle}
              onClick={() => {
                clickToMove(item.id)
              }}
            >
              <SvgIcon name="delete" />
              <Typography
                color={'000'}
                fontSize={'1rem'}
                fontWeight={600}
                ml={'0.5rem'}
              >
                删除项目
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
