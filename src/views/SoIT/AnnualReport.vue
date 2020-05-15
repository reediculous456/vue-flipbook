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
        <Flipbook :pages="pages" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Flipbook from '@/components/Flipbook.vue';

export default {
  name: `AnnualReport`,
  components: {
    Flipbook,
  },
  data() {
    return {
      pages: [
        { image: `annualReport/SoIT_AR2020 1.jpeg` },
        { image: `annualReport/SoIT_AR2020 2.jpeg` },
        { image: `annualReport/SoIT_AR2020 3.jpeg` },
        { image: `annualReport/SoIT_AR2020 4.jpeg` },
        { image: `annualReport/SoIT_AR2020 5.jpeg` },
        { image: `annualReport/SoIT_AR2020 6.jpeg` },
        { image: `annualReport/SoIT_AR2020 7.jpeg` },
        { image: `annualReport/SoIT_AR2020 8.jpeg` },
        { image: `annualReport/SoIT_AR2020 9.jpeg` },
        { image: `annualReport/SoIT_AR2020 10.jpeg` },
        { image: `annualReport/SoIT_AR2020 11.jpeg` },
        { image: `annualReport/SoIT_AR2020 12.jpeg` },
        { image: `annualReport/SoIT_AR2020 13.jpeg` },
        { image: `annualReport/SoIT_AR2020 14.jpeg` },
        { image: `annualReport/SoIT_AR2020 15.jpeg` },
        { image: `annualReport/SoIT_AR2020 16.jpeg` },
        { image: `annualReport/SoIT_AR2020 17.jpeg` },
        { image: `annualReport/SoIT_AR2020 18.jpeg` },
        { image: `annualReport/SoIT_AR2020 19.jpeg` },
        { image: `annualReport/SoIT_AR2020 20.jpeg` },
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
