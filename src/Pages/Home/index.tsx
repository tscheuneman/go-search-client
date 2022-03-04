import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface Index {
    uid: string;
    createdAt: string;
    updatedAt: string;
    primaryKey: string;
}

function Home(): React.ReactElement {
    const [indexes, setIndexes] = useState<Index[]>([]);

    useEffect(() => {
        fetch('http://localhost/admin/index').then(res => res.json()).then(response => {
            setIndexes(response);
        }).catch(err => console.error(err));
        console.log('load page props');
    }, []);

    return (
        <>
            <Typography variant="h4" component="div">
                Indexes
            </Typography>
            <br />
            <Grid container spacing={2}>
            {
                indexes.map(index => (
                    <Grid item xs={6}>
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
                    </Grid>
                ))
            }
            </Grid>
        </>
    );
}

export default Home;
