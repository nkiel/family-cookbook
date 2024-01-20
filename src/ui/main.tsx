import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { RecipeLoader, RecipesLoader } from './components/recipe/RecipeLoader';
import RecipesList from './components/recipe/RecipesList';
import RecipeRoute from './components/recipe/RecipeRoute';
import RecipeEdit from './components/recipe/RecipeEdit';
import RecipeView from './components/recipe/RecipeView';
import ErrorPage from './components/ErrorPage';
import './index.css';

// TODO look into [https://reactrouter.com/en/main/routers/create-browser-router#basename]
const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'recipes',
        children: [
          {
            path: '',
            loader: RecipesLoader,
            element: <RecipesList />,
          },
          {
            path: ':rid?',
            loader: RecipeLoader,
            element: <RecipeRoute />,
            children: [
              {
                path: '',
                element: <RecipeView />,
              },
              {
                path: 'edit',
                element: <RecipeEdit />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
