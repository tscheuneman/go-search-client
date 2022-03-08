import React, { FC, useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

import { StyledTextField } from './styled';
import { ConfigValues } from '../../Pages/Index/types';


export interface TextEditorProps {
    heading: string;
    type: ConfigValues;
}

export const TextEditor = ({ heading, type }: TextEditorProps) => {
    const [items, setItems] = useState<string[]>([]);
    const { id: indexId } = useParams();

    useEffect(() => {
      fetch(`http://localhost/admin/index/${indexId}/configure/globals`).then(res => res.json()).then(response => {
        const result = response[type];
        if(result) {
          setItems(result.map((res: string) => res))
        }
    }).catch(err => console.error(err));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event?.target?.value;
      setItems(value.split('\n'));
    };

    return (
      <>
            <Typography style={{ marginBottom: '10px' }} variant="h6" component="div">
                { heading }
            </Typography>
            <StyledTextField
              label="Seperated By Newlines"
              multiline 
              value={items.join('\n')}
              rows={8}
              onChange={handleChange}
            />
      </>
    )
  }
