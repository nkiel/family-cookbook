import {
  Button,
  CardContent,
  CardHeader,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useMemo } from 'react';
import { Link as RouterLink, useLoaderData } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Log from '../../common/Logger';
import api from '../services/api';
import Recipe from '../../common/models/Recipe';

async function CookbookLoader() {
  const recipes = await api.getRecipeList();
  Log.debug('CookbookLoader recipes', recipes);
  return recipes;
}

function CookbookHome() {
  const rList = useLoaderData() as Recipe[];
  const [searchTxt, setSearchTxt] = useState('');

  const rListFiltered = useMemo(
    () =>
      Array.isArray(rList)
        ? rList.filter(
            (value) =>
              value.title.includes(searchTxt) ||
              value.description?.includes(searchTxt)
          )
        : [],
    [rList, searchTxt]
  );

  const updateSearchTxt = (txt: string) => {
    setSearchTxt(txt);
  };

  return (
    <Container>
      <Stack spacing={2} sx={{ py: 2, alignItems: 'center' }}>
        <Paper
          sx={{
            width: 0.8,
            position: 'sticky',
            top: 30,
          }}
        >
          <Stack direction="row">
            <TextField
              id="recipe-search"
              label="Search"
              variant="filled"
              fullWidth
              value={searchTxt}
              onChange={(event) => updateSearchTxt(event.target.value)}
            />
            <Button href="/recipe">
              <AddIcon />
            </Button>
          </Stack>
        </Paper>
        {rListFiltered.map((value) => (
          <Paper sx={{ width: 1 }}>
            <RouterLink to={`./recipe/${value._id.toString()}`}>
              <CardHeader
                title={value.title}
                subheader={
                  value.createTime ? value.createTime.toDateString() : undefined
                }
              />
            </RouterLink>
            <CardContent>
              <Typography>{value.description}</Typography>
              <Typography>
                {value.cookTime} & {value.prepTime}
              </Typography>
            </CardContent>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default CookbookHome;
export { CookbookLoader };
