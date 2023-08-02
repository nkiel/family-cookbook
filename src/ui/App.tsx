import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import AppHeader from './components/AppHeader';

import './App.css';

const appTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box>
        <AppHeader />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
export default App;
