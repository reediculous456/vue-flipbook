<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';

export default {
  name: `App`,
  components: {
    Footer,
  },
};
</script>

<style lang="scss">
  @import '~vue-multiselect/dist/vue-multiselect.min.css';
  @import '~toastr';

  body {
    height: 100vh;
    overflow: hidden;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
