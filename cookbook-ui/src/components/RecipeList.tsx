import { css } from '@emotion/react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Recipe from '../common/models/Recipe';
import useApi from '../services/useApi';

type RecipeListProps = {
  searchParams?: {
    search: string;
    type: string;
  };
};
const searchDefaults = {
  search: '',
  type: '',
};

function RecipeList({ searchParams = searchDefaults }: RecipeListProps) {
  const [rList, setRList] = useState<Recipe[]>([]);
  const api = useApi();

  const loadCompleteList = async () => {
    const list = await api.getRecipeList();
    setRList(list);
  };

  useEffect(() => {
    loadCompleteList();
  }, []);

  return (
    <Stack spacing={2}>
      {rList
        .filter(
          (value) =>
            value.title.includes(searchParams.search) ||
            value.description?.includes(searchParams.search)
        )
        .map((value) => (
          <Card>
            <RouterLink to={`/recipe/${value._id}`}>
              <CardHeader
                title={value.title}
                subheader={value.createTime.toString()}
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
          </Card>
        ))}
    </Stack>
  );
}
RecipeList.defaultProps = {
  searchParams: searchDefaults,
};

export default RecipeList;
