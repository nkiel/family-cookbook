/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Card, CircularProgress } from '@mui/material';
import React from 'react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';

export default function RecipeRoute() {
  const data = useLoaderData();

  return (
    <Card sx={{ m: 2 }}>
      <React.Suspense fallback={<CircularProgress />}>
        <Await resolve={data.recipe} errorElement={<p>ERROR LOADING RECIPE</p>}>
          <Outlet />
        </Await>
      </React.Suspense>
    </Card>
  );
}
