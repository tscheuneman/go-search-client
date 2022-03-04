import React from 'react';
import Box from '@mui/material/Box';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { StyledLink, Container } from './styles';

function App() {
  return (
    <Router>
      <div className="App">
        <Box style={{
          background: '#333',
          width: '100%',
          paddingTop: '20px',
          paddingBottom: '20px',
          marginBottom: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,.25)'
        }}>
          <Container>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/indexes">Indexes</StyledLink>
          </Container>
        </Box>
        <Container>
          <Routes>
            <Route path="/" element={<>Hello</>} />
            <Route path="/indexes" element={<>Indexes</>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
