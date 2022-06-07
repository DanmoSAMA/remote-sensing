import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import projectCover from '../../../../assets/imgs/projectCover.png'
// import { useNavigate } from 'react-router-dom'
import { binStyles } from './styles'
import { getToken } from '../../../../utils/token'
// import { ProjectStore } from '../../../../mobx/project'
import { useState, useEffect } from 'react'
import { getBinProjects } from '../../../../network/project/getBinProjects'
import { deleteFromBin } from '../../../../network/project/deleteFromBin'
import { moveToRecent } from '../../../../network/project/moveToRecent'

function Project() {
  // const navigate = useNavigate()
  const [recentProjects, setRecentProjects] = useState([])
  let token = getToken()

  useEffect(() => {
    token = getToken()
    getBinProjects().then((res) => {
      setRecentProjects(res.data.projects)
    })
  }, [token])

  async function clickToDelete(id: string) {
    if (confirm('确定要将该项目彻底删除吗?')) {
      const res = await deleteFromBin(id)
      if (res.code === 0) {
        getBinProjects().then((res) => {
          setRecentProjects(res.data.projects)
        })
      }
    }
  }

  async function clickToRecover(id: string) {
    const res = await moveToRecent(id)
    if (res.code === 0) {
      getBinProjects().then((res) => {
        setRecentProjects(res.data.projects)
      })
    }
  }

  return (
    <Box sx={binStyles.wrapper}>
      {recentProjects?.slice(0, 8).map((item) => (
        <Box key={item.id} sx={{ position: 'relative' }}>
          <Box sx={binStyles.item}>
            <img src={projectCover} />
            <Typography sx={binStyles.bottom}>{item.name}</Typography>
          </Box>
          <Box className="mask" sx={binStyles.mask}>
            {/* <Box
              sx={binStyles.middle}
              mb={'1rem'}
              onClick={() => {
                ProjectStore.setProjectName(item.name)
                navigate(`/change-detection?id=${item.id}`)
              }}
            >
              <SvgIcon name="open" />
              <Typography fontSize={'1rem'} fontWeight={600} ml={'0.5rem'}>
                打开项目
              </Typography>
            </Box> */}
            <Box
              sx={binStyles.middle}
              mb={'1rem'}
              onClick={() => {
                clickToRecover(item.id)
              }}
            >
              <SvgIcon name="recover" />
              <Typography fontSize={'1rem'} fontWeight={600} ml={'0.5rem'}>
                恢复项目
              </Typography>
            </Box>
            <Box
              sx={binStyles.middle}
              mb={'1rem'}
              onClick={() => {
                clickToDelete(item.id)
              }}
            >
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
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Project
