const BASE_URL = `/admin`;

export default [
  {
    children: [
      {
        component: () => import(`@/pages/Admin/Upload`),
        path: `upload`,
      },
    ],
    component: () => import(`@/pages/Admin`),
    meta: {
      title: `ITSC Flipbook - Admin`,
    },
    path: `${BASE_URL}`,
  },
];
