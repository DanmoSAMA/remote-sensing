import Box from '@mui/material/Box'
import SvgIcon from '../../../../../../../../components/SvgIcon'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { WaitingGroup } from '../../../../../../../../types/project/ImgType'
import { ProjectStore } from '../../../../../../../../mobx/project'
import { mainStyles } from '../../../../styles'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

type Props = {
  item: WaitingGroup
}

function _MySelect(props: Props) {
  const { item } = props
  const [imgsToSelect, setImgsToSelect] = useState([])

  useEffect(() => {
    for (const img of ProjectStore.imgs) {
      setImgsToSelect((oldArray) => [...oldArray, img])
    }
    for (const group of ProjectStore.imgGroups) {
      setImgsToSelect((oldArray) => [...oldArray, group.pictures[0]])
      setImgsToSelect((oldArray) => [...oldArray, group.pictures[1]])
    }
    console.log(imgsToSelect)
  }, [ProjectStore.imgs.length])

  return (
    <Box
      key={item.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}
    >
      <div
        onClick={() => {
          ProjectStore.deleteWaitingImgs(item.id)
        }}
      >
        <SvgIcon name="close" class="main close" />
      </div>

      <Box sx={{ marginLeft: '10px', width: '90%' }}>
        <FormControl required sx={{ marginBottom: '10px', minWidth: '100%' }}>
          <Select
            value={item.oldImg.name}
            onChange={(e) => {
              ProjectStore.updateWaitingImgs(item.id, 0, e.target.value)
            }}
            displayEmpty
            sx={mainStyles.select}
          >
            <MenuItem value="">
              <span style={{ color: '#ADADA8' }}>请选择将要分析的图片</span>
            </MenuItem>
            {imgsToSelect.map((item) => (
              <MenuItem
                value={item.name}
                sx={{ color: 'secondary.main' }}
                key={item.uuid}
              >
                {`${item.name.slice(0, 24)}${
                  item.name.length > 24 ? '...' : ''
                }`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required sx={{ marginBottom: '0px', minWidth: '100%' }}>
          <Select
            value={item.newImg.name}
            onChange={(e) =>
              ProjectStore.updateWaitingImgs(item.id, 1, e.target.value)
            }
            displayEmpty
            sx={mainStyles.select}
          >
            <MenuItem value="">
              <span style={{ color: '#ADADA8' }}>请选择将要分析的图片</span>
            </MenuItem>
            {imgsToSelect.map((item) => (
              <MenuItem
                value={item.name}
                sx={{ color: 'secondary.main' }}
                key={item.uuid}
              >
                {`${item.name.slice(0, 24)}${
                  item.name.length > 24 ? '...' : ''
                }`}
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
