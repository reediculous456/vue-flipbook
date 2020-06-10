const BASE_URL = `/admin`;

export default [
  {
    children: [
      {
        component: () => import(`@/pages/Admin/Home`),
        path: ``,
      },
      {
        component: () => import(`@/pages/Admin/Upload`),
        meta: {
          title: `ITSC Flipbook - Upload`,
        },
        path: `upload`,
      },
      {
        component: () => import(`@/pages/Admin/RoleAssignment`),
        meta: {
          title: `ITSC Flipbook - Role Assignment`,
        },
        path: `roles`,
      },
      {
        component: () => import(`@/pages/Admin/FileEdit`),
        meta: {
          title: `ITSC Flipbook - Edit File`,
        },
        path: `file/:file_id`,
      },
    ],
    component: () => import(`@/pages/Admin`),
    meta: {
      title: `ITSC Flipbook - Admin`,
    },
    path: `${BASE_URL}`,
  },
  {
    component: () => import(`@/pages/FlipbookWrapper`),
    meta: {
      title: `ITSC Flipbook - Edit File`,
    },
    path: `${BASE_URL}/preview/:file_id`,
  },
];
