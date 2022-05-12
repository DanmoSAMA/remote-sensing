import Box from '@mui/material/Box'
import SvgIcon from '../../../../../../../../components/SvgIcon'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { WaitingGroup } from '../../../../../../../../types/project/ImgType'
import { ProjectStore } from '../../../../../../../../mobx/project'
import { mainStyles } from '../../../../styles'
import { observer } from 'mobx-react-lite'

type Props = {
  item: WaitingGroup
}

function _MySelect(props: Props) {
  const { item } = props

  return (
    <Box
      key={item.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}
    >
      <SvgIcon name="close" class="main close" />
      <Box sx={{ marginLeft: '10px', width: '90%' }}>
        <FormControl required sx={{ marginBottom: '10px', minWidth: '100%' }}>
          <Select
            value={item.oldImg.name}
            onChange={(e) => {
              ProjectStore.updateWaitingImgs(
                item.id,
                0,
                JSON.parse(e.target.value)
              )
              console.log(ProjectStore.waitingGroups)
            }}
            displayEmpty
            sx={mainStyles.select}
          >
            <MenuItem value="">
              <span style={{ color: '#ADADA8' }}>请选择将要分析的图片</span>
            </MenuItem>
            {ProjectStore.imgs.map((item) => (
              <MenuItem
                value={JSON.stringify(item)}
                sx={{ color: 'secondary.main' }}
                key={item.id}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required sx={{ marginBottom: '0px', minWidth: '100%' }}>
          <Select
            value={item.newImg.name}
            onChange={(e) =>
              ProjectStore.updateWaitingImgs(
                item.id,
                1,
                JSON.parse(e.target.value)
              )
            }
            displayEmpty
            sx={mainStyles.select}
          >
            <MenuItem value="">
              <span style={{ color: '#ADADA8' }}>请选择将要分析的图片</span>
            </MenuItem>
            {ProjectStore.imgs.map((item) => (
              <MenuItem
                value={JSON.stringify(item)}
                sx={{ color: 'secondary.main' }}
                key={item.id}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

const MySelect = observer(_MySelect)

export default MySelect
