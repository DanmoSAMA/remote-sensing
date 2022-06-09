import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '../../../../components/SvgIcon'
import projectCover from '../../../../assets/imgs/projectCover.png'
import { useState, useEffect } from 'react'
import { binStyles } from './styles'
import { getToken } from '../../../../utils/token'
import { getBinProjects } from '../../../../network/project/getBinProjects'
import { deleteFromBin } from '../../../../network/project/deleteFromBin'
import { searchProjectsInBin } from '../../../../network/project/searchProjects'
import { moveToRecent } from '../../../../network/project/moveToRecent'
import { useParams } from '../../../../hooks/useParams'
import { Project as ProjectType } from '../../../../types/project/Project'

function Project() {
  const [binProjects, setBinProjects] = useState<ProjectType[]>([])
  const keyword = useParams('keyword')
  let token = getToken()

  useEffect(() => {
    token = getToken()

    if (!keyword) {
      getBinProjects().then((res) => {
        setBinProjects(res.data.projects)
      })
    } else {
      searchProjectsInBin(keyword).then((res) => {
        setBinProjects(res.data.projects)
      })
    }
  }, [token, keyword])

  async function clickToDelete(id: string) {
    if (confirm('确定要将该项目彻底删除吗?')) {
      const res = await deleteFromBin(id)
      if (res.code === 0) {
        getBinProjects().then((res) => {
          setBinProjects(res.data.projects)
        })
      }
    }
  }

  async function clickToRecover(id: string) {
    const res = await moveToRecent(id)
    if (res.code === 0) {
      getBinProjects().then((res) => {
        setBinProjects(res.data.projects)
      })
    }
  }

  return (
    <Box sx={binStyles.wrapper}>
      {binProjects?.slice(0, 8).map((item) => (
        <Box key={item.id} sx={{ position: 'relative' }}>
          <Box sx={binStyles.item}>
            <img src={projectCover} />
            <Typography sx={binStyles.bottom}>{item.name}</Typography>
          </Box>
          <Box className="mask" sx={binStyles.mask}>
            <Box
              sx={binStyles.middle}
              mb={'1rem'}
              onClick={() => {
                clickToRecover(item.id.toString())
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
                clickToDelete(item.id.toString())
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
