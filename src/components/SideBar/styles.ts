export const sideBarStyles = {
  drawer: {
    width: 320,

    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: 'primary.main',
      color: '#000',
      borderRight: 'none',
      paddingTop: '80px',
      marginTop: '100px'
    },
    '& .Mui-selected': {
      backgroundColor: '#fff!important'
    },
    '& .Mui-selected:hover': {
      backgroundColor: '#fff'
    },
    '& .MuiListItem-root': {
      marginLeft: '15px',
      borderRadius: '10px',
      height: '60px'
    }
  },
  icons: {
    color: '#000',
    marginLeft: '20px'
  },
  text: {
    '& span': {
      marginLeft: '-10px',
      fontWeight: '600',
      fontSize: '20px'
    }
  }
}
