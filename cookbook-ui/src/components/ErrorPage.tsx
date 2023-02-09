import React from 'react';
import { Container, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function ErrorPage() {
  return (
    <Container sx={{align: 'center'}}>
      <Stack>
        <RouterLink to="/">Go Home</RouterLink>
        Error page... TODO, build
      </Stack>
    </Container>
  );
}

export default ErrorPage;
