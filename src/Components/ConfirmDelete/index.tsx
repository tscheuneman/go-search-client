import React, { FC, useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


export interface ModalFormProps {
    heading: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
    handleYes: () => void;
    handleNo: () => void;
}

export interface ModalFormFieldInterface {
    name: string;
}

export const ConfirmDelete = ({ heading, open, setOpen, handleYes, handleNo }: ModalFormProps) => {
    return (
      <>
        <Dialog
        fullScreen={false}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                { heading }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" autoFocus onClick={handleNo}>
                    Disagree
                </Button>
                <Button onClick={handleYes} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
      </>
    )
  }

