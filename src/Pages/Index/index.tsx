import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
    useParams
  } from "react-router-dom";

import { ConfigValues } from './types';
import { TextEditor } from '../../Components/TextEditor';

function Index(): React.ReactElement {
    const [searchableFields, setSearchableFields] = useState<string[]>([]);
    const [displayFields, setDisplayFields] = useState<string[]>([]);
    const [filterableFields, setFilterableFields] = useState<string[]>([]);
    const [sortableFields, setSortableFields] = useState<string[]>([]);

    const { id: indexId } = useParams();
    useEffect(() => {
        fetch(`http://localhost/admin/index/${indexId}/configure/globals`).then(res => res.json()).then(response => {
            const searchableResponse: string[] = response[ConfigValues.SEARCH_CONFIG] || ["*"];
            const displayResponse: string[] = response[ConfigValues.DISPLAY_CONFIG] || ["*"];;
            const filterableResponse: string[] = response[ConfigValues.FILTERABLE_CONFIG] || [];;
            const sortableResponse: string[] = response[ConfigValues.SORTABLE_CONFIG] || [];;

            setSearchableFields(searchableResponse)
            setDisplayFields(displayResponse)
            setFilterableFields(filterableResponse);
            setSortableFields(sortableResponse);

        }).catch(err => console.error(err));
    }, []);

    const setItems = (event: React.ChangeEvent<HTMLTextAreaElement>, mutator: React.Dispatch<React.SetStateAction<any>>) => {
        const value = event.target.value;
        mutator(value.split('\n'));
    }

    return (
        <>
            <Typography variant="h5" component="div">
                Configure { indexId }
            </Typography>
            <hr />
            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={6}>
                    <TextEditor setItems={setItems} mutator={setDisplayFields} state={displayFields} heading='Displayed Fields' />
                </Grid>
                <Grid item xs={6}>
                    <TextEditor setItems={setItems} mutator={setSearchableFields} state={searchableFields} heading='Searchable Fields' />
                </Grid>
            </Grid>

            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={6}>
                    <TextEditor setItems={setItems} mutator={setFilterableFields} state={filterableFields} heading='Filterable Fields' />
                </Grid>
                <Grid item xs={6}>
                    <TextEditor setItems={setItems} mutator={setSortableFields} state={sortableFields} heading='Sortable Fields' />
                </Grid>
            </Grid>
        </>
    );
}

export default Index;
