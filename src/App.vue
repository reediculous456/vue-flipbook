<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <img
            class="logo"
            alt="SoIT logo"
            src="./assets/logo.png"
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col class="d-flex justify-content-center">
          <Flipbook />
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Flipbook from '@/components/Flipbook.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: `App`,
  components: {
    Flipbook,
    Footer,
  },
};
</script>

<style lang="scss">
body {
  height: 100vh;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 2rem;

  .logo {
    max-height: 6rem;
    max-width: 100%;
    margin-bottom: 2rem;
  }
}
</style>
