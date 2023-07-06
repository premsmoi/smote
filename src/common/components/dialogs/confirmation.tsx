import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { confirmationDialog } from '../../../atoms/confirmationDialog';

const ConfirmationDialog = () => {
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
        <Dialog className="confirmationDialog" open={isShow}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText className="message"  >
                    {message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleConfirm}>OK</Button>
                    <Button variant="outlined" onClick={handleClose}>
                        CANCEL
                    </Button>
                </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;