export const formStyles = {
  wrapper: {
    width: '28rem',
    height: '34rem',
    maxHeight: '550px',
    maxWidth: '450px',
    backgroundColor: '#bfa',
    position: 'absolute',
    top: '50vh',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '10',
    borderRadius: '0.6rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',

    '& .svg-icon': {
      zoom: 1.4,
      marginRight: '.5rem'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px'
  },
  input: {
    height: '38px',
    width: '100%',
    outline: 'none',
    border: '1px solid #BFBEBA',
    borderRadius: '5px',
    backgroundColor: '#E5E5E5',
    padding: '0 10px',
    boxSizing: 'border-box',
    marginBottom: '25px'
    // 不生效，写css了...
    // '&:focus': {
    //   borderColor: '1px solid #01555A!important'
    // }
  },
  button: {
    width: '70%',
    marginTop: '20px',
    height: '38px',
    backgroundColor: 'secondary.main',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '300',

    '&:hover': {
      backgroundColor: 'secondary.main'
    }
  }
}
