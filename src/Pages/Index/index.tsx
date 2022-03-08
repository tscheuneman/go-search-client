import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
    useParams
  } from "react-router-dom";

import { ConfigValues } from './types';
import { TextEditor } from '../../Components/TextEditor';

function Index(): React.ReactElement {
    const [fields, setFields] = useState<Set<string>>();
    const { id: indexId } = useParams();
    useEffect(() => {
        fetch(`http://localhost/admin/index/${indexId}/document?limit=1`).then(res => res.json()).then(response => {
            if(response[0]) {
                const tmpSet = new Set<string>();
                Object.keys(response[0]).forEach(key => {
                    tmpSet.add(key);
                });
                console.log('SetWords', fields)
                setFields(tmpSet);
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
                    <TextEditor heading='Displayed Fields' type={ConfigValues.SEARCH_CONFIG} />
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
