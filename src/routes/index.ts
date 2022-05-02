import loadable from '@loadable/component'
import { RouteConfig } from 'react-router-config'

const routesConfig: RouteConfig[] = [
  {
    path: '/home',
    exact: true,
    element: loadable(() => import('../pages/Home'))
  },
  {
    path: '/home/create',
    exact: true,
    element: loadable(() => import('../pages/Create'))
  },
  {
    path: '/recent',
    exact: true,
    element: loadable(() => import('../pages/Recent'))
  },
  {
    path: '/bin',
    exact: true,
    element: loadable(() => import('../pages/Bin'))
  }
]

export default routesConfig
