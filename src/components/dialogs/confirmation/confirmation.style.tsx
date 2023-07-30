import { createUseStyles } from 'react-jss';

export const useConfirmationStyles = createUseStyles({
  confirmationDialog: {
    '& .MuiPaper-root': {
      padding: '8px 16px'
    },
    '& .MuiTypography-root': {
      padding: '8px 0px'
    },
    '& .MuiDialogContent-root': {
      padding: '0px'
    },
    '& .MuiDialogActions-root': {
      padding: '8px 0px'
    }
  }
});
