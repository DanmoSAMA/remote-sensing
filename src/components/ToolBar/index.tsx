import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SvgIcon from '../SvgIcon'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { toolBarStyles } from './styles'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from '../../mobx/project'

ProjectStore.updateImgs([
  {
    id: 1,
    url: 'https://z3.ax1x.com/2021/08/17/fInXEF.png',
    name: '图片1'
  },
  {
    id: 2,
    url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
    name: '图片2'
  },
  {
    id: 3,
    url: 'https://z3.ax1x.com/2021/08/17/fInRHS.png',
    name: '图片3'
  }
])

ProjectStore.updateImgGroup([
  {
    name: '组1',
    members: [
      {
        id: 1,
        url: 'https://z3.ax1x.com/2021/08/17/fInXEF.png',
        name: '图片1'
      },
      {
        id: 2,
        url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
        name: '图片2'
      }
    ]
  },
  {
    name: '组2',
    members: [
      {
        id: 2,
        url: 'https://z3.ax1x.com/2021/08/17/fIn4hj.png',
        name: '图片2'
      },
      {
        id: 3,
        url: 'https://z3.ax1x.com/2021/08/17/fInRHS.png',
        name: '图片3'
      }
    ]
  }
])

function _ToolBar() {
  return (
    <Box sx={toolBarStyles.wrapper}>
      <Box sx={toolBarStyles.top}>
        <Typography>图层</Typography>
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
            component="span"
            style={{
              backgroundColor: '#313131',
              color: '#FCFBF4',
              boxShadow: 'none',
              fontWeight: '300'
            }}
          >
            <SvgIcon name="import" />
            导入图片
          </Button>
        </label>
      </Box>
      <List>
        {ProjectStore.imgGroups.map((item) => (
          <ListItem key={item.id} sx={toolBarStyles.listItem}>
            {item.name}
          </ListItem>
        ))}
      </List>
      <List sx={toolBarStyles.list}>
        {ProjectStore.imgs.map((item) => (
          <ListItem key={item.id} sx={toolBarStyles.listItem}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const ToolBar = observer(_ToolBar)

export default ToolBar
