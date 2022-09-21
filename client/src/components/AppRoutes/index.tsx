import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import { PrivateRoute } from './PrivateRoute';

export const AppRoutes: FC = () => (
  <Routes>
    {Object.values(PUBLIC_ROUTES).map(({ PATH, COMPONENT }) => (
      <Route key={PATH} path={PATH} element={COMPONENT} />
    ))}

    {Object.values(PRIVATE_ROUTES).map(({ PATH, COMPONENT }) => (
      <Route
        key={PATH}
        path={PATH}
        element={<PrivateRoute component={COMPONENT} />}
      />
    ))}

    <Route path="*" element={<Navigate to={PUBLIC_ROUTES.NOT_FOUND.PATH} />} />
  </Routes>
);
