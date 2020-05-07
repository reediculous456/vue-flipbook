<template>
  <b-container id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
