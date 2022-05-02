export const sideBarStyles = {
  drawer: {
    width: 230,
    borderRadius: '20px',

    '& .MuiDrawer-paper': {
      width: 230,
      height: '98vh',
      boxSizing: 'border-box',
      backgroundColor: '#313131',
      color: '#fff',
      borderRight: 'none',
      borderRadius: '20px',
      marginLeft: '10px',
      marginTop: '10px'
    },
    '& .Mui-selected': {
      backgroundColor: '#fff'
    },
    '& .Mui-selected span': {
      color: 'secondary.main'
    },
    '& .Mui-selected:hover': {
      backgroundColor: '#fff'
    },
    '& .MuiListItem-root': {
      marginLeft: '10%',
      width: '90%',
      borderTopLeftRadius: '25px',
      borderBottomLeftRadius: '25px',
      height: '60px',
      marginTop: '30px'
    }
  },
  icons: {
    color: '#000',

    '& .MuiIconButton-root': {
      backgroundColor: '#fff',

      '& svg': {
        zoom: 1.4
      }
    }
  },
  text: {
    marginLeft: '16px',
    '& span': {
      marginLeft: '-10px',
      fontWeight: '300',
      fontSize: '18px'
    }
  },
  logo: {
    '&': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    '& .svg-icon': {
      zoom: '1.6',
      marginRight: '5px'
    }
  }
}
