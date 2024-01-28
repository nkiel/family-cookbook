import React from 'react';
import { css } from '@emotion/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';
import useAppConfig from '../services/useAppConfig';
import { getEnv } from '../../common/AppEnv';

function AppHeader() {
  const navigate = useNavigate();
  const config = useAppConfig();
  const env = getEnv();

  const linkStyle = css`
    &:hover {
      color: white;
    }
  `;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h1" onClick={() => navigate('/recipes')}>
          {config.appTitle}
        </Typography>
        {env}
      </Toolbar>
      <Toolbar>
        <Link
          to="/recipes"
          color="inherit"
          underline="none"
          component={ReactLink}
          css={linkStyle}
        >
          Recipes
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
