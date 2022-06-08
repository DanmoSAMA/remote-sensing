import { keyframes } from '@mui/system'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const mainStyles = {
  wrapper: {
    width: '100%',
    height: '82vh',
    margin: '10px 270px 0 230px',
    display: 'flex'
  },
  image: {
    width: '63%',
    marginRight: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: '20px',
    position: 'relative',
    backgroundColor: 'secondary.light',

    '& img': {
      height: '100%',
      borderRadius: '20px',
      position: 'absolute'
    },
    '& img:nth-of-type(2)': {
      left: '20%'
    }
  },
  placeholder: {
    backgroundColor: 'secondary.main',
    height: '100%',
    width: '100%',
    borderRadius: '20px',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
      zoom: '3'
    }
  },
  function: {
    width: '37%',
    position: 'relative'
  },
  function_inner: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '94%',
    backgroundColor: 'primary.dark',
    borderRadius: '20px',
    boxSizing: 'border-box',
    padding: '10px'
  },
  upper: {
    padding: '15px',
    maxHeight: '500px',
    overflow: 'auto'
  },
  select: {
    backgroundColor: '#fff',
    color: 'secondary.main'
  },
  addNext: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  resultName: {
    padding: '0 15px 15px 15px'
  },
  btnArea: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    left: '0',
    display: 'flex',
    justifyContent: 'center',

    '& button': {
      borderRadius: '10px',
      height: '42px',
      fontWeight: '400',
      boxShadow: '0 3px 2px rgba(0, 0, 0, .3)',
      width: '70%'
    }

    // '& button:nth-of-type(1)': {
    //   width: '50%',
    //   marginRight: '12px'
    // },
    // '& button:nth-of-type(2)': {
    //   width: '40%',
    //   color: 'secondary.main'
    // }
  },
  loading: {
    '&': {
      width: '15rem',
      backgroundColor: '#719A93',
      height: '15rem',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      bottom: '30px',
      overflow: 'hidden'
    },
    inner: {
      width: '12rem',
      height: '12rem',
      backgroundColor: 'primary.main',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'secondary.main',
      fontSize: '1.2rem',
      position: 'absolute',
      zIndex: 1
    },
    rotate: {
      width: '7.5rem',
      height: '7.5rem',
      position: 'absolute',
      zIndex: 0,
      left: '50%',
      top: '50%',
      backgroundColor: 'secondary.main',
      transformOrigin: 'left top',
      animation: `${spin} 2s infinite linear`
    }
  }
}
