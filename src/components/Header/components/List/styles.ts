export const listStyles = {
  list: {
    '&': {
      display: 'flex'
    }
  },
  item: {
    '&': {
      width: '142px',
      height: '48px',
      lineHeight: '48px',
      textAlign: 'center',
      color: '#fff',
      marginRight: '36px',

      borderRadius: '10px'
    },
    '& .MuiTypography-root': {
      fontSize: '18px',
      fontWeight: '300'
    },
    '&.Mui-selected': {
      backgroundColor: 'primary.light',
      color: 'secondary.main'
    },
    '&.Mui-selected .MuiTypography-root': {
      fontWeight: '400'
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'primary.light',
      color: 'secondary.main'
    }
  }
}
