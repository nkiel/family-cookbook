import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import CookbookHome, { CookbookLoader } from './components/CookbookHome';
import RecipePage, { RecipeLoader } from './components/RecipePage';
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
          // path: 'recipe/:rid?',
          path: 'recipe',
          element: <RecipePage />,
          loader: RecipeLoader,
          // path: 'recipe',
          // children: [
          //   {
          //     path: '',
          //     element: <RecipeView />,
          //   },
          // ],
        },
      ],
    },
  ],
  // { basename: process.env.APP_BASEURL ? `/${process.env.APP_BASEURL}` : '' }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
