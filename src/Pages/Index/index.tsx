import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    useParams,
    Link
  } from "react-router-dom";

import { ConfigValues } from './types';
import { TextEditor } from '../../Components/TextEditor';
import { ModalForm } from '../../Components/ModalForm';
import { ConfirmDelete } from '../../Components/ConfirmDelete';

import EventBus from '../../utils/eventbus';
import { ApiRequest } from '../../utils/apiRequest';
import { EVENTS } from '../../constants';

function Index(): React.ReactElement {
    const [searchableFields, setSearchableFields] = useState<string[]>([]);
    const [displayFields, setDisplayFields] = useState<string[]>([]);
    const [filterableFields, setFilterableFields] = useState<string[]>([]);
    const [sortableFields, setSortableFields] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [searches, setSearches] = useState<any[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { id: indexId } = useParams();
    useEffect(() => {
        ApiRequest(`/admin/index/${indexId}/configure/globals`, (response: Record<ConfigValues, string[]|undefined>) => {
            const searchableResponse: string[] = response[ConfigValues.SEARCH_CONFIG] || ["*"];
            const displayResponse: string[] = response[ConfigValues.DISPLAY_CONFIG] || ["*"];
            const filterableResponse: string[] = response[ConfigValues.FILTERABLE_CONFIG] || [];
            const sortableResponse: string[] = response[ConfigValues.SORTABLE_CONFIG] || [];

            setSearchableFields(searchableResponse)
            setDisplayFields(displayResponse)
            setFilterableFields(filterableResponse);
            setSortableFields(sortableResponse);
        });
        setSearchEndpoints();

    }, []);

    const setItems = (event: React.ChangeEvent<HTMLTextAreaElement>, mutator: React.Dispatch<React.SetStateAction<any>>) => {
        const value = event.target.value;
        mutator(value.split('\n'));
    }

    const setSearchEndpoints = () => {
        ApiRequest(`/admin/index/${indexId}/configure/search`, (response: any[]|undefined) => {
            setSearches(response || [])
        });
    }

    const saveConfig = () => {
        const saveRequest = {
            config: {
                displayed_fields: displayFields,
                searchable_fields: searchableFields,
                filterable_fields: filterableFields,
                sortable_fields: sortableFields,
            }
        };

        ApiRequest(`/admin/index/${indexId}/configure/globals`, () => ({}), {
            method: 'POST',
            body: JSON.stringify(saveRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const handleFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const target = evt.target;
        if(target?.files?.[0]) {
            const fileReader = new FileReader();

            fileReader.addEventListener("load", () => {
                const result = fileReader?.result;
                const JsonResult = JSON.parse(result as string);
                ApiRequest(`/admin/index/${indexId}/document`, () => {
                    setLoading(false);
                }, {
                    method: 'POST',
                    body: JSON.stringify({ documents: JsonResult }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }, false);

            fileReader.readAsText(target?.files?.[0]);
        }
    }

    const handleOnSubmit = (value: Record<string, string>) => {
        ApiRequest(`/admin/index/${indexId}/configure/search`, () => {
            setSearchEndpoints();
            setOpen(false)
        }, {
            method: 'POST',
            body: JSON.stringify({ config: {
                ...value,
            } }),
            headers: {
                'Content-Type': 'application/json'
            }

        });
    }

    const handleDeleteIndex = () => {
        ApiRequest(`/admin/index/${indexId}`, () => {
            setOpenDialog(false);
            EventBus.trigger(EVENTS.NAVIGATE, '/');
        }, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        });
    }

    return (
        <>
            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={6}>
                    <Button color="error" style={{
                        float: 'left'
                    }}
                    onClick={() => { setOpenDialog(true) }}
                    >
                        <DeleteIcon />
                    </Button>
                    <Typography variant="h5" component="div">
                        Configure { indexId }
                    </Typography>
                </Grid>
                <Grid style={{
                    display: 'flex',
                    justifyContent: 'end'
                }} 
                item xs={6}>
                    {
                        loading
                        ?
                            <CircularProgress size={20} />
                        :
                            <Button
                            variant="contained"
                            component="label"
                            >
                                Upload File
                                <input
                                    accept="application/json"
                                    type="file"
                                    onChange={handleFileUpload}
                                    hidden
                                />
                            </Button>
                    }

                </Grid>
            </Grid>

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
            <hr />
            <br />
            <Button onClick={saveConfig} variant="contained">Save</Button>
            <br />
            <br />
            <hr />
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <Typography variant="h5" component="div">
                    Search Indexes
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
                        <AddIcon /> Add Endpoint
                    </Button>
                </Grid>
            </Grid>

            <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                <Grid item xs={12}>
                    {
                        searches.map((search: { Slug?: string, UpdatedAt: string }) => {
                            return(
                                <Link style={{
                                    textDecoration: 'none'
                                }} to={`/index/${indexId}/search/${search?.Slug}`}>
                                <Card style={{
                                    marginTop: '20px'
                                }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                             { search?.Slug || "Name" }
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            Last Updated: { new Date(search.UpdatedAt).toLocaleDateString() }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <ModalForm
                heading='Add a Search Endpoint'
                open={open}
                setOpen={setOpen}
                fields={[{
                    name: 'slug'
                }]}
                onSubmit={handleOnSubmit}
            />
            <ConfirmDelete
                heading="Delete?"
                open={openDialog}
                setOpen={setOpenDialog}
                handleNo={() => { setOpenDialog(false) }}
                handleYes={handleDeleteIndex}
            />
        </>
    );
}

export default Index;
