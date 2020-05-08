import 'mutationobserver-shim';
import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import { BIcon, BIconArrowLeft, BIconArrowRight } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.component(`BIcon`, BIcon);
Vue.component(`BIconArrowLeft`, BIconArrowLeft);
Vue.component(`BIconArrowRight`, BIconArrowRight);
