import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
    useParams
  } from "react-router-dom";

import { DragAndDrop } from '../../Components/DragAndDrop';

function Index(): React.ReactElement {
    const [document, setDocument] = useState<Set<string>>();
    const { id: indexId } = useParams();
    useEffect(() => {
        fetch(`http://localhost/admin/index/${indexId}/document?limit=1`).then(res => res.json()).then(response => {
            if(response[0]) {
                const tmpSet = new Set<string>();
                Object.keys(response[0]).forEach(key => {
                    tmpSet.add(key);
                });
                console.log('SetWords', document)
                setDocument(tmpSet);
            }
        }).catch(err => console.error(err));
        console.log('load page props');
    }, []);

    return (
        <>
            <Typography variant="h5" component="div">
                Configure { indexId }
            </Typography>
            <hr />
            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={6}>
                    <DragAndDrop heading='Displayed Fields' />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div">
                        Searchable Fields
                    </Typography>
                </Grid>
            </Grid>

            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div">
                        Filterable Fields
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div">
                        Sortable Fields
                    </Typography>
                </Grid>
            </Grid>

            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div">
                        Ranking Order
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div">
                        Ignored Words
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default Index;
