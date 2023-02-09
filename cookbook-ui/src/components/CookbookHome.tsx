import { Card, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import RecipeList from './RecipeList';

function CookbookHome() {
  const [searchTxt, setSearchTxt] = useState('');

  return (
    <Container maxWidth="lg">
      <Card sx={{ mt: 2, mb: 2 }}>
        <TextField
          id="recipe-search"
          label="Search"
          variant="filled"
          fullWidth
          value={searchTxt}
          onChange={(event) => setSearchTxt(event.target.value)}
        />
        <RouterLink to="/recipe/new">New Recipe</RouterLink>
      </Card>
      <Container>
        <RecipeList searchParams={{ search: searchTxt, type: '' }} />
      </Container>
    </Container>
  );
}

export default CookbookHome;
