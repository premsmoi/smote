import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';

interface Props {
    title: string;
    message: string;
    isShow: boolean;
    onConfirm: () => any;
    onClose: () => any;
};

const ConfirmationDialog = (props: Props) => {
    const { title, message, isShow, onConfirm, onClose } = props;

    return (
        <Dialog className="confirmationDialog" open={isShow}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText className="message"  >
                    {message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onConfirm}>OK</Button>
                    <Button variant="outlined" onClick={onClose}>
                        CANCEL
                    </Button>
                </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;