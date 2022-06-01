export const perspectiveStyles = {
  wrapper: {
    perspective: '5000px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
      top: 0
    }
  },
  img1: {
    width: '60%',
    height: '60%',
    transform: 'translateY(-100px) rotateX(65deg) rotateZ(-20deg)'
  },
  img2: {
    width: '60%',
    height: '60%',
    transform: 'translateY(120px) rotateX(65deg) rotateZ(-20deg)'
  },
  img3: {
    width: '60%',
    height: '60%',
    transform: 'translateY(360px) rotateX(65deg) rotateZ(-20deg)'
  }
}
