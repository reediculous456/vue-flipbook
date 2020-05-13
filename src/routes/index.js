import adminRoutes from './admin';
import errorRoutes from './error';

export default [
  {
    component: () => import(`../views/Home.vue`),
    meta: {
      title: `SoIT Annual Report`,
    },
    name: `Home`,
    path: `/`,
  },
  ...adminRoutes,
  // These routes must be last!
  ...errorRoutes,
];
