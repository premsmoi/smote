import { HEADER_HIGHT } from '@src/const';
import { createUseStyles } from 'react-jss';

export const useBoardStyles = createUseStyles({
  board: {
    position: 'relative',
    height: `calc(100vh - ${HEADER_HIGHT}px - 1px)`
  },
  editBoardDialog: {
    '& .content': {
      display: 'grid',
      rowGap: '10px'
    }
  },
  toolbar: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    height: '45px',
    zIndex: 2,
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    borderRadius: '8px'
  },
  boardName: {
    fontSize: '30px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '250px'
  },
  buttonContainer: {
    '& .add-button': {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      zIndex: 2,
      backgroundColor: '#1976d2',
      color: 'white',
      boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
    },

    '& button': {
      marginLeft: '10px'
    },

    '& svg': {
      cursor: 'pointer'
    }
  },
  boardContainer: {
    overflow: 'scroll',
    height: `calc(100vh - ${HEADER_HIGHT}px - 1px)`,

    /* Hide scrollbar for Chrome, Safari, and Opera */
    '&::-webkit-scrollbar': {
      display: 'none'
    },

    '-ms-overflow-style': 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,

    '& .board-area': {
      width: '2560px',
      height: '1440px',
      position: 'relative'
    }
  }
});
