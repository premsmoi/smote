import { createUseStyles } from 'react-jss';

export const useHomeStyles = createUseStyles({
  home: {
    '& .button-container': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 16px'
    }
  },
  createBoardDialog: {
    '& .content': {
      display: 'grid',
      rowGap: '10px'
    }
  }
});
