export const toolBarStyles = {
  wrapper: {
    position: 'fixed',
    height: '90.5vh',
    width: '240px',
    right: '10px',
    top: '9vh',
    backgroundColor: '#313131',
    borderRadius: '20px',
    padding: '10px',
    boxSizing: 'border-box',
    overflow: 'auto',
    zIndex: 1,
    userSelect: 'none'
  },
  top: {
    height: '30px',
    lineHeight: '30px',
    display: 'flex',
    justifyContent: 'space-between',

    '& p': {
      lineHeight: '30px',
      color: '#fff',
      fontWeight: 300,
      ml: '20px'
    },
    '& button': {
      backgroundColor: '#313131',
      boxShadow: 'none',
      color: '#fff',
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
  listItem: {
    color: '#fff',
    height: '50px',
    lineHeight: '50px',
    borderRadius: '10px',
    border: '1px solid #fff',
    marginBottom: '20px',
    padding: '0 10px',
    position: 'relative',
    fontSize: '15px'
  },
  listGroup: {
    borderRadius: '10px',
    border: '1px solid #fff',
    padding: '0 0 0 8px',
    marginLeft: '20px',
    borderTop: 'none',
    fontSize: '15px'
  },
  listItemInGroup: {
    color: '#fff',
    borderBottom: '1px solid #979693',
    padding: '10px 0',
    height: '40px',
    position: 'relative',
    fontSize: '15px'
  },
  listParent: {
    color: '#fff',
    height: '50px',
    border: '1px solid #fff',
    borderRadius: '10px',
    padding: '0 10px',
    position: 'relative',
    fontSize: '15px',
    cursor: 'pointer'
  },
  dropDown: {
    position: 'absolute',
    width: '88px',
    height: '87px',
    paddingLeft: '10px',
    backgroundColor: '#fff',
    right: 0,
    top: '49px',
    zIndex: 1,
    borderRadius: '5px',
    color: 'secondary.main'
  },
  dropDownItem: {
    height: '43px',
    lineHeight: '43px',
    padding: '0px',
    cursor: 'pointer'
  },
  mask: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: '#313131',
    opacity: '.9'
  }
}
