<template>
  <b-container>
    <b-row>
      <b-col>
        <img
          class="logo"
          alt="SoIT logo"
          src="../assets/logo.png"
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
import Flipbook from '@/components/Flipbook.vue';

export default {
  name: `Home`,
  components: {
    Flipbook,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  max-height: 6rem;
  max-width: 100%;
  margin-bottom: 2rem;
}
</style>
