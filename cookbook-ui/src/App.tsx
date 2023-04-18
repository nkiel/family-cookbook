import { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  ThemeProvider,
  createTheme,
  Toolbar,
  Typography,
} from '@mui/material';
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
