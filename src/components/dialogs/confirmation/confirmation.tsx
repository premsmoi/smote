import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { confirmationDialog } from '@src/atoms/confirmation-dialog';
import { useConfirmationStyles } from './confirmation.style';

const ConfirmationDialog = () => {
  const classes = useConfirmationStyles();
  const [data, setData] = useRecoilState(confirmationDialog);
  const { title, message, isShow, onConfirm, onClose } = data;

  const handleClose = () => {
    if (!onClose) {
      hideDialog();
      return;
    }

    onClose().then(hideDialog);
  };

  const handleConfirm = () => {
    onConfirm().then(hideDialog);
  };

  const hideDialog = () => {
    setData({ ...data, isShow: false });
  };

  return (
    <Dialog className={classes.confirmationDialog} open={isShow}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText className="message">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleConfirm}
          data-testid="confirmation-ok"
        >
          OK
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
