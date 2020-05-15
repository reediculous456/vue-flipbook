<template>
  <b-container>
    <b-row>
      <b-col>
        <img
          class="logo"
          alt="SoIT logo"
          src="../../assets/logo.png"
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <Flipbook
          :pages="pages"
          ratio="1.28"
          padding="0.75"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Flipbook from '@/components/Flipbook.vue';

export default {
  name: `EarlyITOverview`,
  components: {
    Flipbook,
  },
  data() {
    return {
      pages: [
        { image: `earlyIT/Early IT Overview 1.jpeg` },
        { image: `earlyIT/Early IT Overview 2.jpeg` },
        { image: `earlyIT/Early IT Overview 3.jpeg` },
        { image: `earlyIT/Early IT Overview 4.jpeg` },
        { image: `earlyIT/Early IT Overview 5.jpeg` },
        { image: `earlyIT/Early IT Overview 6.jpeg` },
        { image: `earlyIT/Early IT Overview 7.jpeg` },
        { image: `earlyIT/Early IT Overview 8.jpeg` },
      ],
    };
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
