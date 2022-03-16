import React, { FC, useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export interface ModalFormProps {
    heading: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
    fields: ModalFormFieldInterface[];
    onSubmit: (value:  Record<string, string>) => void;
}

export interface ModalFormFieldInterface {
    name: string;
}

export const ModalForm = ({ heading, open, setOpen, fields, onSubmit }: ModalFormProps) => {
    const fieldState: Record<string, string> = {};

    fields.forEach(field => {
        fieldState[field.name] = "";
    });

    const [formFields, setFormFields] = useState(fieldState);

    const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = evt.target.value;
        setFormFields({
            ...setFormFields,
            [field]: value,
        });
    }
    
    return (
      <>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        >
            <Paper style={{
                padding: '20px',
                width: '80%',
                maxWidth: '600px',
                margin: '40px auto',
            }}
            elevation={5}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h5">
                            { heading }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {Object.keys(formFields).map(field => {
                            return (
                                <TextField 
                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(evt, field)} 
                                    key={field}
                                    label={field}
                                    value={formFields[field]}
                                />
                            )
                        })}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                            onClick={() => onSubmit(formFields)}
                            >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
      </>
    )
  }
