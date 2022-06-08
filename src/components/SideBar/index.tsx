import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '../SvgIcon'
import { sideBarItems } from './consts/sideBarItems'
import { sideBarStyles } from './styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { useParams } from '../../hooks/useParams'
import { ProjectStore } from '../../mobx/project'

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const id = useParams('id') as string

  return (
    <Drawer sx={sideBarStyles.drawer} variant="permanent" anchor="left">
      <Box sx={sideBarStyles.logo}>
        <SvgIcon name="logo" />
        <Typography
          variant="h1"
          color="primary"
          fontWeight={300}
          fontSize={'28px'}
          fontFamily={'Comfortaa'}
          width={'160px'}
        >
          AI System
        </Typography>
      </Box>
      <List>
        {sideBarItems.map((item) => (
          <ListItem
            selected={item.route === pathname}
            button
            key={item.id}
            onClick={() => {
              ProjectStore.setShowPerspective(false)
              ProjectStore.setShowDetail(false)
              ProjectStore.setDisplayType(0)
              navigate(`${item.route}?id=${id}`)
            }}
          >
            <ListItemIcon sx={sideBarStyles.icons}>
              <IconButton>{item.icon}</IconButton>
            </ListItemIcon>
            <ListItemText primary={item.label} sx={sideBarStyles.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
