import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import useAppConfig from '../services/useAppConfig';

function AppHeader() {
  const navigate = useNavigate();
  const config = useAppConfig();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h1" onClick={() => navigate('/')}>
          {config.appTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
