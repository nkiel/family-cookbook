import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Container,
  FormGroup,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import {
  Link as RouterLink,
  useLoaderData,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AddIcon from '@mui/icons-material/Add';
import useApi from '../services/useApi';
import Recipe from '../common/models/Recipe';
import { ZoomOutMapOutlined } from '@mui/icons-material';

async function CookbookLoader() {
  const api = useApi();
  let recipes = await api.getRecipeList();
  console.log('CookbookLoader recipes', recipes);
  return recipes;
}

function CookbookHome() {
  const rList = useLoaderData();
  const [searchTxt, setSearchTxt] = useState('');
  const api = useApi();

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

  const updateSearchTxt = (txt: String) => {
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
          <Stack direction={'row'}>
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
            <RouterLink to={`./recipe/${value._id}`}>
              <CardHeader
                title={value.title}
                subheader={value.createTime.toDateString()}
              />
            </RouterLink>
            <CardContent>
              <Typography>{value.description}</Typography>
              {value.length && (
                <Typography>
                  {value.length.cook} & {value.length.prep}
                </Typography>
              )}
            </CardContent>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default CookbookHome;
export { CookbookLoader };
