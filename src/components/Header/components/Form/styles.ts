export const formStyles = {
  wrapper: {
    width: '28rem',
    height: '34rem',
    minWidth: '330px',
    minHeight: '420px',
    maxHeight: '550px',
    maxWidth: '450px',
    backgroundColor: 'primary.light',
    position: 'absolute',
    top: '50vh',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '10',
    borderRadius: '0.6rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    cursor: 'default',

    '& .svg-icon': {
      zoom: 1.4,
      marginRight: '.5rem'
    }
  },
  iconWrapper: {
    position: 'absolute',
    top: '10px',
    right: '2px',
    cursor: 'pointer',
    height: '30px',
    width: '30px',
    lineHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  input: {
    height: '38px',
    width: '100%',
    outline: 'none',
    border: '1px solid #BFBEBA',
    borderRadius: '5px',
    backgroundColor: '#E5E5E5',
    padding: '0 10px',
  },
  button: {
    width: '75%',
    marginTop: '20px',
    height: '38px',
    backgroundColor: 'secondary.main',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '300',

    '&:hover': {
      backgroundColor: 'secondary.main'
    }
  },
  formHint: {
    fontSize: '12px',
    color: '#908F8E'
  },
  switchHint: {
    fontSize: '.9rem',
    color: '#01555A',
    fontWeight: 500,
    cursor: 'pointer',
  },
  mask: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    cursor: 'default',
  }
}
