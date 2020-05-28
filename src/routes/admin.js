const BASE_URL = `/admin`;

export default [
  {
    children: [
      {
        component: () => import(`@/views/Admin/Upload`),
        path: `upload`,
      },
    ],
    component: () => import(`@/views/Admin`),
    meta: {
      title: `ITSC Flipbook - Admin`,
    },
    path: `${BASE_URL}`,
  },
];
