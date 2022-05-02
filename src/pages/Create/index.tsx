import Grid from '@mui/material/Grid'
import Header from '../../components/Header'
import Form from './components/Form'
import Functions from '../../pages/Home/components/Functions'
import { createStyles } from './styles'

function Create() {
  return (
    <>
      <Header />
      <Grid sx={createStyles.body}>
        <Form />
        <Functions />
      </Grid>
    </>
  )
}

export default Create
