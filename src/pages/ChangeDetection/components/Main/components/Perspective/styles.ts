export const perspectiveStyles = {
  wrapper: {
    perspective: '5000px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  cube: {
    transformStyle: 'preserve-3d',
    width: '70%',
    height: '82vh',
    boxSizing: 'border-box',
    padding: '5rem',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      position: 'absolute',
      top: '0',
      height: 'auto',
      cursor: 'pointer'
    }
  },
  cubeAtConer: {
    transformStyle: 'preserve-3d',
    width: '25%',
    position: 'absolute',
    left: '2rem',
    bottom: '20rem',

    '& img': {
      position: 'absolute',
      top: '0',
      height: 'auto',
      cursor: 'pointer'
    }
  },
  detail: {
    width: '77%',
    height: '100%',
    position: 'absolute',
    right: '0'
  },
  button: {
    backgroundColor: '#C39984',
    position: 'absolute',
    right: 0,
    bottom: '5rem',
    height: '6rem',
    width: '6rem',
    color: '#E2DECD',
    fontSize: '1.2rem',
    padding: 0,

    '&:hover': {
      backgroundColor: '#C39984'
    }
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    bottom: '12rem',
    width: '3rem',

    '& .MuiListItem-root': {
      width: '3rem',
      height: '3rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'primary.dark',
      borderBottom: '2px solid #CFB3A0',
      padding: '0',

      '& svg': {
        zoom: '1.3'
      }
    },
    '& .MuiListItem-root:last-child': {
      border: 'none'
    }
  }
}
