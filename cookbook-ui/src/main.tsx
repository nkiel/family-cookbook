import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App'
import CookbookHome from './components/CookbookHome';
import RecipeView from './components/RecipeView';
import ErrorPage from './components/ErrorPage';
import './index.css'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" element={<CookbookHome />} />
      <Route path="/recipe/:rid" element={<RecipeView />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
