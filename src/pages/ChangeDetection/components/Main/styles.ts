export const mainStyles = {
  wrapper: {
    width: '100%',
    height: '82vh',
    margin: '100px 270px 0 230px',
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
    width: '80%',
    borderRadius: '20px',
    position: 'absolute',
    left: '20%',
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
    padding: '15px'
  },
  pairItem: {},
  addNext: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  resultName: {
    padding: '15px'
  },
  btnArea: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',

    '& button': {
      borderRadius: '10px',
      height: '42px',
      fontWeight: '400',
      boxShadow: '0 3px 2px rgba(0, 0, 0, .3)'
    },

    '& button:nth-of-type(1)': {
      width: '50%',
      marginRight: '12px'
    },
    '& button:nth-of-type(2)': {
      width: '40%',
      color: 'secondary.main'
    }
  }
}
