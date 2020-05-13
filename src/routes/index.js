export default [
  {
    component: () => import(`../views/Home.vue`),
    meta: {
      title: `SoIT Annual Report`,
    },
    name: `Home`,
    path: `/`,
  },
  {
    component: () => import(`../views/About.vue`),
    name: `About`,
    path: `/about`,
  },
];
