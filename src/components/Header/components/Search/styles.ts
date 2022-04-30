export const searchStyles = {
  wrapper: {
    '&': {
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      width: '400px'
    }
  },
  input: {
    '&': {
      backgroundColor: 'primary.light',
      boxSizing: 'border-box',
      borderRadius: '25px',
      width: '300px',
      fontSize: '18px',
      position: 'relative',
      left: '50px'
    },
    '& .MuiInput-input': {
      height: '50px',
      lineHeight: '50px',
      padding: '0 10px'
    },
    '&:focus': {
      border: 'none'
    }
  },
  search: {
    '&': {
      backgroundColor: 'primary.main',
      height: '50px',
      width: '50px',
      marginRight: '40px'
    },
    '&:hover': {
      backgroundColor: 'primary.main'
    }
  },
  icon: {
    '&': {
      color: 'secondary.main',
      fontSize: '30px'
    }
  }
}
