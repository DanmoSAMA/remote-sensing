export const headerStyles = {
  appBar: {
    '&': {
      height: '80px',
      backgroundColor: '#313131',
      lineHeight: '80px',
      color: '#000',
      boxShadow: 'none',
      position: 'fixed',
      top: 0,
      zIndex: 1
    },
    '& .MuiToolbar-root': {
      height: '80px',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 53px 0 36px'
    }
  },
  logo: {
    '&': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .svg-icon': {
      // fontSize: '40px'
      zoom: '1.6',
      marginRight: '5px'
    }
  },
  search: {
    '&': {
      display: 'flex',
      alignItems: 'center'
    }
  }
}
