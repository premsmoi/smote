import { createUseStyles } from 'react-jss';

export const useBoardItemStyles = createUseStyles({
  boardItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '50px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',

    '& a': {
      textDecoration: 'none',
      color: 'black'
    }
  }
});
