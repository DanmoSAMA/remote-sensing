export const functionsStyles = {
  wrapper: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    width: '100vw',
    minWidth: '1000px',
    justifyContent: 'space-evenly',
    boxSizing: 'border-box',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    backgroundColor: 'primary.dark',
    boxShadow: '0 2px 8px rgba(0, 0, 0, .5)',

    '&:hover + .MuiPaper-root': {
      display: 'flex',
    },
  },
  icon: {
    backgroundColor: '#fff',
    marginBottom: '5px',
    zIndex: 0,

    '&:hover': {
      backgroundColor: '#fff',
    },
    '& svg': {
      zoom: 1.4,
    },
  },
  hoverItem: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'primary.dark',
    boxShadow: '0 2px 8px rgba(0, 0, 0, .5)',
    position: 'absolute',
    zIndex: 11,
    cursor: 'pointer',

    // '& + .mask': {
    //   width: '100vw',
    //   height: '100vh',
    //   position: 'fixed',
    //   backgroundColor: 'rgba(0, 0, 0, .5)',
    //   top: 0,
    //   left: 0,
    //   zIndex: 10,
    //   display: 'none'
    // },

    '&:hover': {
      display: 'flex',
    },
    '&:hover + .mask': {
      display: 'block',
    },
  },
}
