import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Register from './register.tsx'
import Login from './login.tsx'
import Home from './home.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const isTokenExists = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? true : false;
};

const router = createBrowserRouter([
  { path: "/", element: isTokenExists() ? <Home /> : <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
