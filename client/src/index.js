import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import Signup from './views/Signup';
import Login from './views/Login';
import NotFound from './views/404';
import Dashboard from './views/Dashboard';
import UserOrders from './views/UserOrders';
import Cart from './views/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: "/user/orders",
    element: <UserOrders />,
  },
  {
    path: "/user/cart",
    element: <Cart />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

root.render(
  <div className='bg-zinc-100 min-h-screen'>
    <RouterProvider router={router} />
  </div>
);

