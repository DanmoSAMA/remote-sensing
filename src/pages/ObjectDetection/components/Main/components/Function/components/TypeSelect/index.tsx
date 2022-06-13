import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { mainStyles } from '../../../../styles'
import { selectItems } from './consts/selectItems'

function _TypeSelect() {
  const [objectType, setObjectType] = useState('')

  return (
    <FormControl required sx={{ marginBottom: '10px', minWidth: '100%' }}>
      <Select
        value={objectType}
        onChange={(e) => {
          setObjectType(e.target.value)
        }}
        sx={mainStyles.select}
        displayEmpty
      >
        <MenuItem value="" disabled>
          <span style={{ color: '#ADADA8' }}>请选择将要分析的图片</span>
        </MenuItem>
        {selectItems.map((item, index) => (
          <MenuItem value={item.label} sx={mainStyles.selectItem} key={item.id}>
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const TypeSelect = observer(_TypeSelect)

export default TypeSelect
