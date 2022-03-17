import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { ModalForm } from '../../Components/ModalForm';
import { ConfirmDelete } from '../../Components/ConfirmDelete';

import {
    useParams,
    Link
  } from "react-router-dom";

import EventBus from '../../utils/eventbus';
import { getCookie } from '../../utils/getCookie';
import { ApiRequest } from '../../utils/apiRequest';
import { EVENTS } from '../../constants';

function Users(): React.ReactElement {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [users, setUsers] = useState([]);

    const userId = getCookie('go-search-user');

    useEffect(() => {
        setInitalPageData();
    }, []);

    const setInitalPageData = () => {
        ApiRequest(`/admin/users`, (response) => {
            setUsers(response);
        });
    };

    const handleAddUser = (value: any) => {
        ApiRequest(`/admin/users`, (response) => {
            setInitalPageData();
            setOpen(false)
        }, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }

        });
    }

    const handleDeleteUser = () => {
        console.log(userId);
        ApiRequest(`/admin/users/${userId}`, (response) => {
            setOpenDialog(false);
            EventBus.trigger(EVENTS.NAVIGATE, '/users');
        }, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <Typography variant="h5" component="div">
                    Users
                </Typography>
                </Grid>
                <Grid style={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
                item xs={6}>
                    <Button
                        variant="contained"
                        component="label"
                        onClick={() => setOpen(true)}
                        >
                        <AddIcon /> Add User
                    </Button>
                </Grid>
            </Grid>
            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={12}>
                    {
                        users.map((user: any) => {
                            const isAuthed = user.Id === userId;
                            return(
                                <Card style={{
                                    marginTop: '20px',
                                    background: isAuthed ? '#f4f4f4' : undefined
                                }}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography variant="h5" component="div">
                                                        { user?.Username || "Name" }
                                                    </Typography>
                                            </Grid>
                                            <Grid style={{
                                                display: 'flex',
                                                justifyContent: 'end'
                                            }} item xs={6}>
                                                    {isAuthed &&
                                                         <Button color="error" onClick={() => { setOpenDialog(true) }}>
                                                            <DeleteIcon />
                                                        </Button>
                                                    }
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <ModalForm
                heading='Add a User'
                open={open}
                setOpen={setOpen}
                fields={[
                {
                    name: 'username'
                },
                {
                    name: 'password',
                    type: 'password'
                }
                ]}
                onSubmit={handleAddUser}
            />
            <ConfirmDelete
                heading="Delete?"
                open={openDialog}
                setOpen={setOpenDialog}
                handleNo={() => { setOpenDialog(false) }}
                handleYes={handleDeleteUser}
            />
        </>
    );
}

export default Users;
