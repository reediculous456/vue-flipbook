import Vue from 'vue';
import LoginRoot from '@/LoginPage';
import toastr from '@/plugins/notifications';

const errorHandler = function(err) {
  toastr.error(err);
};

Vue.config.devtools = true;
Vue.config.errorHandler = errorHandler;

new Vue({
  render: h => h(LoginRoot),
}).$mount(`#login`);
