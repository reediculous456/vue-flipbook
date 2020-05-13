import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: `history`,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || `ITSC Flipbook`;
  next();
});

export default router;
