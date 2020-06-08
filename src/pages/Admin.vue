<template>
  <div id="admin">
    <Navbar />
    <b-container>
      <router-view :key="$route.fullPath" />
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: `Admin`,
  components: {
    Navbar,
  },
  beforeCreate() {
    document.body.style.overflow = `auto`;
  },
};
</script>

<style lang="scss">
  #admin {
    text-align: left;
  }
</style>

<style lang="scss" scoped>
  .container {
    margin-top: 5rem;
    margin-bottom: 10rem;
  }
</style>
