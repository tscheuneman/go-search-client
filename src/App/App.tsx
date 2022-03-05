import React from 'react';
import Box from '@mui/material/Box';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from '../Pages/Home';
import Index from '../Pages/Index';

import { StyledLink, Container } from './styles';

function App() {
  return (
    <Router>
      <div className="App">
        <Box style={{
          background: '#333',
          width: '100%',
          marginBottom: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,.25)'
        }}>
          <Container>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/endpoints">Search Endpoints</StyledLink>
          </Container>
        </Box>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index/:id" element={<Index />} />
            <Route path="/endpoints" element={<>Search Endpoints</>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
