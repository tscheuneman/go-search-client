import styled from 'styled-components';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

export const StyledLink = styled(Link)`
    color:#fff;
    font-size:1.2rem;
    margin-right:15px;
`;

export const Container = styled(Box)`
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
`;