export const pictureStyles = {
  wrapper: {
    position: 'absolute',
    right: '0',
    display: 'flex',
    minWidth: '300px',
    overflow: 'hidden',
    zIndex: -1,
  },
  imgWrapper: {
    '&': {
      position: 'absolute',
      top: 0,
      zIndex: 1,
    },
  },
}
