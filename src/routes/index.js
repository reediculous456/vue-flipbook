import adminRoutes from './admin';
import errorRoutes from './error';

export default [
  {
    component: () => import(`../pages/Home`),
    meta: {
      title: `SoIT Annual Report`,
    },
    name: `Home`,
    path: `/`,
  },
  ...adminRoutes,
  ...errorRoutes,
  // This route must second be last!
  {
    component: () => import(`../pages/FlipbookWrapper`),
    name: `Flipbook`,
    path: `/:org_code/:url`,
  },
  // This route must be last!
  {
    component: () => import(`@/pages/error/Error404`),
    meta: {
      title: `404 (Page Not Found)`,
    },
    path: `*`,
  },
];
