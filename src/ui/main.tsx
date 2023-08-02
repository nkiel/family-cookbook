import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import CookbookHome, { CookbookLoader } from './components/CookbookHome';
import RecipePage, { RecipeLoader } from './components/recipe/RecipePage';
import ErrorPage from './components/ErrorPage';
import './index.css';

// TODO look into [https://reactrouter.com/en/main/routers/create-browser-router#basename]
const router = createBrowserRouter(
  [
    {
      path: '',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          loader: CookbookLoader,
          element: <CookbookHome />,
        },
        {
          path: 'recipe/:rid?',
          element: <RecipePage />,
          loader: RecipeLoader,
        },
      ],
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
