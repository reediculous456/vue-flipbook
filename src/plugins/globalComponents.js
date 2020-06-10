import Vue from 'vue';
const loader = () => import(`@/components/Loader`);

Vue.component(`loader`, loader);
