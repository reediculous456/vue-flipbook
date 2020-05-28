const BASE_URL = `/error`;

export default [
  {
    component: () => import(`@/pages/error/Error403`),
    meta: {
      title: `403 (Forbidden)`,
    },
    path: `${BASE_URL}/403/:message?`,
  },
  {
    component: () => import(`@/pages/error/Error404`),
    meta: {
      title: `404 (Page Not Found)`,
    },
    path: `${BASE_URL}/404/:message?`,
  },
  {
    component: () => import(`@/pages/error/Error500`),
    meta: {
      title: `500 (Server Error)`,
    },
    path: `${BASE_URL}/500/:message?`,
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
