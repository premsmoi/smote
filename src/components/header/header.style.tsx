import { HEADER_HIGHT } from '@src/const';
import { createUseStyles } from 'react-jss';

export const useHeaderStyles = createUseStyles({
  header: {
    fontSize: 36,
    borderBottom: '1px solid lightgray',
    height: HEADER_HIGHT
  },
  logo: {
    textDecoration: 'none',
    color: '#027ffe',
    marginLeft: 16,
    lineHeight: `${HEADER_HIGHT}px`
  },
  logoutButton: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: '0px',
    width: '50px',
    height: HEADER_HIGHT,
    '& svg': {
      fontSize: '2rem'
    }
  }
});
