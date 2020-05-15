const BASE_URL = `/soit`;

export default [
  {
    component: () => import(`@/views/SoIT/AnnualReport`),
    meta: {
      title: `SoIT Annual Report`,
    },
    path: `${BASE_URL}/annual-report`,
  },
];
