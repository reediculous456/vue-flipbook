import adminRoutes from './admin';
import errorRoutes from './error';
import soitRoutes from './soit';

export default [
  {
    component: () => import(`../pages/Home`),
    meta: {
      title: `SoIT Annual Report`,
    },
    name: `Home`,
    path: `/`,
  },
  ...soitRoutes,
  ...adminRoutes,
  // These routes must be last!
  ...errorRoutes,
];
