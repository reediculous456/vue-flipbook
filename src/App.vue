<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <img
          class="logo"
          alt="Vue logo"
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
</template>

<script>
import Flipbook from './components/Flipbook.vue';

export default {
  name: `App`,
  components: {
    Flipbook,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 2rem;

  .logo {
    max-height: 6rem;
    margin-bottom: 2rem;
  }
}
</style>
