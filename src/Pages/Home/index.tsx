import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import {
    Link
  } from "react-router-dom";

import { ModalForm } from '../../Components/ModalForm';

import { ApiRequest } from '../../utils/apiRequest';

interface Index {
    uid: string;
    createdAt: string;
    updatedAt: string;
    primaryKey: string;
}

function Home(): React.ReactElement {
    const [indexes, setIndexes] = useState<Index[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        getIndexes();
    }, []);

    const getIndexes = () => {
        ApiRequest('/admin/index', (response) => {
            setIndexes(response);
        });
    }

    const handleOnSubmit = (value: Record<string, string>) => {
        ApiRequest('/admin/index', (response) => {
            getIndexes();
            setOpen(false)
        }, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }

        });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h4" component="div">
                        Indexes
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
                        <AddIcon /> Add Index
                    </Button>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
            {
                indexes.map(index => (
                    <Grid item xs={6}>
                        <Link style={{
                            textDecoration: 'none'
                        }} to={`/index/${index?.uid}`}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        { index?.uid || "Name" }
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        Last Updated: { new Date(index?.updatedAt).toLocaleDateString() }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))
            }
            </Grid>
            <ModalForm
                heading='Add an Index'
                open={open}
                setOpen={setOpen}
                fields={[{
                    name: 'slug'
                }]}
                onSubmit={handleOnSubmit}
            />
        </>
    );
}

export default Home;
