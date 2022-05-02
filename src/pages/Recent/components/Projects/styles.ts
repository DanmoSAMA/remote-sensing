export const projectStyles = {
  wrapper: {
    width: '100%',
    height: '60vh',
    display: 'grid',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'primary.light',
    gridTemplateColumns: '20% 20% 20% 20%',
    marginTop: '5rem',
    justifyItems: 'center'
  },
  item: {
    width: '18rem',
    height: '18rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    '&:hover + .mask': {
      display: 'flex!important'
    },
    '& + .mask:hover': {
      display: 'flex!important'
    },
    '& img': {
      width: '11rem',
      borderRadius: '1rem'
    }
  },
  mask: {
    display: 'none',
    // display: 'flex',
    width: '18rem',
    height: '18rem',
    backgroundColor: 'rgba(226, 222, 205, .7)',
    position: 'absolute',
    top: '0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1rem',
    boxShadow: '0 5px 8px rgba(0, 0, 0, .3)'
  },
  middle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    textAlign: 'center',
    color: 'secondary.main',
    fontSize: '1rem',
    position: 'absolute',
    bottom: '0.7rem'
  }
}
