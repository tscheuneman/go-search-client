import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from '../Pages/Home';
import Index from '../Pages/Index';
import Searches from '../Pages/Searches';
import Login from '../Pages/Login';
import Users from '../Pages/Users';

import EventBus from '../utils/eventbus';
import { EVENTS } from '../constants';

import { StyledLink, Container } from './styles';

interface SnackBarProps {
  open: boolean;
  message: string;
}

function App() {

  const [error, setError] = useState<SnackBarProps>({
    open: false,
    message: ''
  });

  useEffect(() => {
    EventBus.subscribe(EVENTS.NAVIGATE, (path: string) => {
      window.location.assign(path);
    });
    EventBus.subscribe(EVENTS.API_ERROR_DISPLAY, (message: string) => {
      setErrorMessage(message);
    });
  }, []);

  const setErrorMessage = (message: string) => {
    setError({
      open: true,
      message: message,
    });
  }

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
            <StyledLink to="/users">Users</StyledLink>
          </Container>
        </Box>
        <Container>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/index/:id" element={<Index />} />
            <Route path="/index/:id/search/:search_slug" element={<Searches />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<>Pages doesn't exist</>} />
          </Routes>
          <Snackbar
            open={error.open}
            onClose={() => setError({
              open: false,
              message: '',
            })}
            autoHideDuration={6000}
          >
            <Alert severity="error">
              { error.message }
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </Router>
  );
}

export default App;
