import * as React from 'react';

const CONTENT_ROUTES = {
  LOGIN: React.lazy(() => import('../components/Login')),
  ARMA_TU_PLAN: React.lazy(() => import('../components/ArmaTuPlan')),
  CASO_GRACIAS: React.lazy(() => import('../components/CasoGracias')),
};

const contentRoutes = [
  {
    path: '/',
    element: <CONTENT_ROUTES.LOGIN />,
    exact: true,
  },
  {
    path: '/arma-tu-plan',
    element: <CONTENT_ROUTES.ARMA_TU_PLAN />,
    exact: true,
  },
  {
    path: '/caso-gracias',
    element: <CONTENT_ROUTES.CASO_GRACIAS />,
    exact: true,
  },
];

export default contentRoutes;