import Vue from 'vue';
import '@/plugins/bootstrap-vue';
import App from '@/App.vue';
import router from '@/plugins/router';
import toastr from '@/plugins/notifications';

Vue.config.productionTip = false;
Vue.config.errorHandler = (err) => {
  const { response } = err;
  toastr.error(
    response ? `\n ${response.data.err.message}` : err,
    response ? `Error ${response.status}: ${response.statusText}` : undefined,
  );
  console.error(response ? response : err); // eslint-disable-line no-console
};

new Vue({
  render: h => h(App),
  router,
}).$mount(`#app`);
