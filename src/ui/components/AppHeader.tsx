import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import useAppConfig from '../services/useAppConfig';
import { getEnv } from '../../common/AppEnv';

function AppHeader() {
  const navigate = useNavigate();
  const config = useAppConfig();
  const env = getEnv();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h1" onClick={() => navigate('/')}>
          {config.appTitle}
        </Typography>
        {env}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
