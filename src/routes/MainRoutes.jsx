import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const CreateUser = Loadable(lazy(() => import('pages/component-overview/createUser')));
const Users = Loadable(lazy(() => import('pages/component-overview/users')));
const Loans = Loadable(lazy(() => import('pages/component-overview/loans')));
const Products = Loadable(lazy(() => import('pages/component-overview/products')));
const Notification = Loadable(lazy(() => import('pages/component-overview/notification')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'loans',
      element: <Loans />
    },
    {
      path: 'create-user',
      element: <CreateUser />
    },
    {
      path: 'notification',
      element: <Notification />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
