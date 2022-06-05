import Grid from '@mui/material/Grid'
import Header from '../../components/Header'
import Form from './components/Form'
import Picture from './components/Picture'
import Functions from '../../pages/Home/components/Functions'
import { useState } from 'react'
import { createStyles } from './styles'

function Create() {
  const [projectName, setProjectName] = useState('')
  const [projectId, setProjectId] = useState(0)

  return (
    <>
      <Header />
      <Grid sx={createStyles.body}>
        <Form
          projectName={projectName}
          setProjectName={setProjectName}
          projectId={projectId}
          setProjectId={setProjectId}
        />
        <Functions name={projectName} id={projectId} />
        <Picture />
      </Grid>
    </>
  )
}

export default Create
