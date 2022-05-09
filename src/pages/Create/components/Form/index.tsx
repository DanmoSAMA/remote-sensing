import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import { formStyles } from './styles'

export default function Form() {
  return (
    <Box sx={formStyles.wrapper}>
      <FormControl variant="standard" sx={formStyles.left}>
        <Input
          disableUnderline={true}
          placeholder="请输入项目名称（不多于50个字符）"
          sx={formStyles.input}
        />
        <Button variant="contained" sx={formStyles.button}>
          完成创建
        </Button>
      </FormControl>
      <Box sx={formStyles.right}>
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
      </Box>
    </Box>
  )
}
