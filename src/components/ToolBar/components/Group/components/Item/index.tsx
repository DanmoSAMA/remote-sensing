// import Box from '@mui/material/Box'
// import SvgIcon from '../../../SvgIcon'
// import ListItem from '@mui/material/ListItem'
// import Divider from '@mui/material/Divider'
// import { toolBarStyles } from '../../styles'
// import { observer } from 'mobx-react-lite'
// import { ProjectStore } from '../../../../mobx/project'
// import { Img } from '../../../../types/project/ImgType'
// import { useShowDropDown } from '../../hooks/useShowDropdown'

// type Props = {
//   item: Img
// }

// function _Item(props: Props) {
//   const { item } = props
//   const { showDropDown, setShowDropDown } = useShowDropDown()

//   return (
//     <ListItem key={item.id} sx={toolBarStyles.listItem}>
//       <SvgIcon name="eye" class="toolbar" />
//       {item.name}
//       <div
//         onClick={(e) => {
//           setShowDropDown(!showDropDown)
//           e.stopPropagation()
//         }}
//       >
//         <SvgIcon name="more" class="toolbar right" />
//       </div>
//       <Box
//         sx={toolBarStyles.dropDown}
//         onClick={(e) => e.stopPropagation()}
//         style={{ display: showDropDown ? 'block' : 'none' }}
//       >
//         <ListItem sx={toolBarStyles.dropDownItem}>
//           <SvgIcon name="rename" class="toolbar dropdown" />
//           重命名
//         </ListItem>
//         <Divider color="secondary" variant="middle" />
//         <ListItem sx={toolBarStyles.dropDownItem}>
//           <SvgIcon name="tb_bin" class="toolbar dropdown" />
//           移除
//         </ListItem>
//       </Box>
//     </ListItem>
//   )
// }

// const Item = observer(_Item)

// export default Item
