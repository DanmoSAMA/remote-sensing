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
    padding: '0 5px',
    position: 'relative'
  },
  listGroup: {
    borderRadius: '10px',
    border: '1px solid #fff',
    padding: '0 0 0 10px',
    marginLeft: '20px',
    borderTop: 'none'
  },
  listItemInGroup: {
    color: '#fff',
    borderBottom: '1px solid #979693',
    padding: '10px 0',
    height: '40px',
    position: 'relative'
  },
  listParent: {
    color: '#fff',
    height: '50px',
    border: '1px solid #fff',
    borderRadius: '10px',
    padding: '0 5px',
    position: 'relative'
  },
  dropDown: {
    position: 'absolute',
    width: '88px',
    height: '87px',
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
  }
}
