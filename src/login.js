import Vue from 'vue';
import LoginRoot from '@/LoginPage';
import toastr from '@/plugins/notifications';

Vue.config.devtools = true;
Vue.config.errorHandler = (err) => {
  const { response } = err;
  toastr.error(
    response ? `\n ${response.data.err.message}` : err,
    response ? `Error ${response.status}: ${response.statusText}` : undefined,
  );
  console.error(response ? response : err); // eslint-disable-line no-console
};

new Vue({
  render: h => h(LoginRoot),
}).$mount(`#login`);
