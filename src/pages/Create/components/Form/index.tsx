import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import { formStyles } from './styles'
import { useState } from 'react'
import { createProject } from '../../../../network/project/createProject'

type Props = {
  projectName: string
  setProjectName: (val: string) => void
  projectId: number
  setProjectId: (val: number) => void
}

export default function Form(props: Props) {
  const { projectName, setProjectName, projectId, setProjectId } = props
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
      {/* <Box sx={formStyles.right}>
        <Box sx={formStyles.upload}>
          <input
            accept="image/*"
            id="contained-button-file"
            style={{ display: 'none' }}
            multiple
            type="file"
          />
          <label
            htmlFor="contained-button-file"
            style={{ width: '60%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              sx={formStyles.button}
              style={{ width: '100%' }}
              // 这一行必须
              component="span"
            >
              <AddIcon style={{ marginRight: '1rem' }} />
              上传图片
            </Button>
          </label>
          <Typography
            width={'60%'}
            textAlign={'center'}
            mt={'3rem'}
            fontSize={'1.1rem'}
          >
            可在此处上传项目所需分析图片，也可在功能区上传图片
          </Typography>
        </Box>
      </Box> */}
    </Box>
  )
}
