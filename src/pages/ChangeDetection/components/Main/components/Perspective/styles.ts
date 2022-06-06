export const perspectiveStyles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  cube: {
    perspective: '5000px',
    transformStyle: 'preserve-3d',
    width: '70%',
    height: '150vh',
    maxHeight: '150vh',
    boxSizing: 'border-box',
    padding: '0 5rem',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      position: 'absolute',
      top: '20rem',
      height: 'auto',
      cursor: 'pointer'
    }
  },
  cubeAtConer: {
    transformStyle: 'preserve-3d',
    width: '25%',
    position: 'absolute',
    left: '2rem',
    bottom: '25rem',

    '& img': {
      position: 'absolute',
      top: '0',
      height: 'auto',
      cursor: 'pointer'
    }
  },
  detail: {
    width: '68%',
    height: '100%',
    position: 'absolute',
    right: '0'
  },
  button: {
    backgroundColor: '#C39984',
    position: 'fixed',
    right: '270px',
    bottom: '3rem',
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
    position: 'fixed',
    right: '270px',
    bottom: '10rem',
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
  },
  square: {
    width: '100%',
    height: '100%',
    position: 'relative',

    '& img': {
      width: '80%',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      borderRadius: '.5rem'
    }
  }
}
