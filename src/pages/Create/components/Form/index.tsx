import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { formStyles } from './styles'
import { useState } from 'react'
import { createProject } from '../../../../network/project/createProject'
import { ProjectStore } from '../../../../mobx/project'

type Props = {
  projectName: string
  setProjectName: (val: string) => void
  setProjectId: (val: number) => void
}

export default function Form(props: Props) {
  const { projectName, setProjectName, setProjectId } = props
  const [isCreated, setIsCreated] = useState(false)

  async function clickToCreateProject() {
    if (projectName.length === 0 || projectName.length > 50)
      return alert('项目名称不合法')

    setIsCreated(true)

    const reqData = {
      name: projectName
    }
    const res = await createProject(reqData)
    setProjectId(res.data.projectID)
    ProjectStore.setProjectName(projectName)
  }

  return (
    <Box sx={formStyles.wrapper}>
      <FormControl variant="standard" sx={formStyles.left}>
        <Input
          disableUnderline={true}
          placeholder="请输入项目名称（不多于50个字符）"
          sx={formStyles.input}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={formStyles.button}
          style={{ display: !isCreated ? 'block' : 'none' }}
          onClick={() => {
            clickToCreateProject()
          }}
        >
          完成创建
        </Button>
        <Typography
          color={'secondary.main'}
          fontSize={'1.2rem'}
          height={'4rem'}
          style={{ display: isCreated ? 'block' : 'none' }}
        >
          创建项目完成，可使用下方功能进行分析
        </Typography>
      </FormControl>
    </Box>
  )
}
