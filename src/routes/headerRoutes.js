import * as React from 'react';
import Header from '../common/Header';

const headerRoutes = [
  { path: '*', element: <Header />, exact: true },
];


export default headerRoutes;