import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteIcon from '@mui/icons-material/Delete'

export const sideBarItems = [
  {
    id: 1,
    icon: <AccountBalanceIcon />,
    label: '主页',
    route: 'home'
  },
  {
    id: 2,
    icon: <AccessTimeIcon />,
    label: '最近项目',
    route: 'recent'
  },
  {
    id: 3,
    icon: <DeleteIcon />,
    label: '回收站',
    route: 'bin'
  }
]
