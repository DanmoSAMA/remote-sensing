/*@ts-ignore*/
import loadable from '@loadable/component'
/*@ts-ignore*/
import { RouteConfig } from 'react-router-config'

const Home = loadable(() => import('../pages/Home')),
  Create = loadable(() => import('../pages/Create')),
  Recent = loadable(() => import('../pages/Recent')),
  Bin = loadable(() => import('../pages/Bin')),
  Analysis = loadable(() => import('../pages/Analysis')),
  CD = loadable(() => import('../pages/ChangeDetection')),
  TC = loadable(() => import('../pages/TerrainClassification')),
  OE = loadable(() => import('../pages/ObjectExtract')),
  OD = loadable(() => import('../pages/ObjectDetection'))

// 先全部preload，避免闪烁发生
Home.preload()
Create.preload()
Recent.preload()
Bin.preload()
Analysis.preload()
CD.preload()
TC.preload()
OE.preload()
OD.preload()

const routesConfig: RouteConfig[] = [
  {
    path: '/home',
    exact: true,
    element: Home,
  },
  {
    path: '/home/create',
    exact: true,
    element: Create,
  },
  {
    path: '/recent',
    exact: true,
    element: Recent,
  },
  {
    path: '/bin',
    exact: true,
    element: Bin,
  },
  {
    path: '/analysis',
    exact: true,
    element: Analysis,
  },
  {
    path: '/change-detection',
    exact: true,
    element: CD,
  },
  {
    path: '/terrain-classification',
    exact: true,
    element: TC,
  },
  {
    path: '/object-extract',
    exact: true,
    element: OE,
  },
  {
    path: '/object-detection',
    exact: true,
    element: OD,
  },
]

export default routesConfig
