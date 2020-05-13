const BASE_URL = `/admin`;

export default [
  {
    component: () => import(`@/views/Admin`),
    meta: {
      title: `ITSC Flipbook - Admin`,
    },
    path: `${BASE_URL}`,
  },
];
