export const searchStyles = {
  wrapper: {
    '&': {
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      width: '25rem'
    }
  },
  input: {
    '&': {
      backgroundColor: 'primary.light',
      boxSizing: 'border-box',
      borderRadius: '25px',
      width: '18.75rem',
      fontSize: '18px',
      position: 'relative',
      left: '46px'
    },
    '& .MuiInput-input': {
      height: '50px',
      lineHeight: '50px',
      padding: '0 55px 0 10px',
      boxSizing: 'border-box'
    },
    '&:focus': {
      border: 'none'
    }
  },
  search: {
    '&': {
      backgroundColor: 'primary.main',
      height: '50px',
      width: '50px'
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
