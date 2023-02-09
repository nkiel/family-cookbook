import { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

import './App.css';

function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h1">
            <RouterLink to="/">Kiel Cookbook</RouterLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="page">
        <Outlet />
      </Container>
    </Box>
  );
}
export default App;
