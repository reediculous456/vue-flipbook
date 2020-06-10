const BASE_URL = `/soit`;

export default [
  {
    component: () => import(`@/pages/SoIT/AnnualReport`),
    meta: {
      title: `SoIT Annual Report`,
    },
    path: `${BASE_URL}/annual-report`,
  },
  {
    component: () => import(`@/pages/SoIT/ITStrategicPlan`),
    meta: {
      title: `SoIT Strategic Plan`,
    },
    path: `${BASE_URL}/strategic-plan`,
  },
  {
    component: () => import(`@/pages/SoIT/EarlyITOverview`),
    meta: {
      title: `SoIT Early IT Overview`,
    },
    path: `${BASE_URL}/early-it-overview`,
  },
];
