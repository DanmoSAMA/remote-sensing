export const toolBarStyles = {
  wrapper: {
    position: 'absolute',
    height: '89vh',
    width: '240px',
    right: '10px',
    top: '10vh',
    backgroundColor: '#313131',
    borderRadius: '20px',
    padding: '10px',
    boxSizing: 'border-box'
  },
  top: {
    height: '30px',
    lineHeight: '30px',
    display: 'flex',
    justifyContent: 'space-between',

    '& p': {
      lineHeight: '30px',
      color: 'primary.light',
      fontWeight: 300,
      ml: '20px'
    },
    '& button': {
      backgroundColor: '#313131',
      boxShadow: 'none',
      color: 'primary.light',
      fontWeight: '300'
    },
    '& button:hover': {
      backgroundColor: '#313131',
      boxShadow: 'none'
    },
    '& svg': {
      marginRight: '6px'
    }
  },
  list: {},
  listItem: {
    color: '#fff',
    height: '40px',
    lineHeight: '40px',
    borderRadius: '10px',
    border: '1px solid #fff',
    marginBottom: '10px'
  }
}
