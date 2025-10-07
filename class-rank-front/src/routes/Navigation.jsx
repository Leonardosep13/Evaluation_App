import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import routes from './routes';

export const router = createBrowserRouter(
  routes.map(route => ({
    path: route.path,
    element: React.createElement(
      route.layout,
      null,
      React.createElement(route.component)
    )
  }))
);
