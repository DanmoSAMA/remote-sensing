import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { sideBarItems } from './consts/sideBarItems'
import { sideBarStyles } from './styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { Grid } from '@mui/material'

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Grid>
      <Drawer sx={sideBarStyles.drawer} variant="permanent" anchor="left">
        <List>
          {sideBarItems.map((item) => (
            <ListItem
              selected={`/${item.route}` === pathname}
              button
              key={item.id}
              onClick={() => navigate(item.route)}
            >
              <ListItemIcon sx={sideBarStyles.icons}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} sx={sideBarStyles.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Grid>
  )
}
