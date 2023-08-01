import React from 'react';
import { Container, Stack } from '@mui/material';
import { Link as RouterLink, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  return (
    <Container sx={{ align: 'center' }}>
      <Stack>
        <RouterLink to="/">Go Home</RouterLink>
        Error page... TODO build <br />
        {JSON.stringify(error, null, 2).replace('/n', '<br/>')}
      </Stack>
    </Container>
  );
}

export default ErrorPage;
