import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from '@utils/routes';

const router = createBrowserRouter(ROUTES);

export function Router() {
  return <RouterProvider router={router} />;
}
