<template>
  <b-container>
    <b-row ref="logoRow">
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
          :max-height="maxHeight"
          @size-changed="calculateFlipbookHeight"
        />
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
      maxHeight: 0,
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
  mounted() {
    this.$nextTick(() => {
      this.calculateFlipbookHeight();
    });
  },
  methods: {
    calculateFlipbookHeight() {
      this.maxHeight = document.body.clientHeight - this.$refs.logoRow.clientHeight - $(`.footer`).height();
    },
  },
};
</script>

<style lang="scss" scoped>
  .logo {
    height: 5rem;
    max-width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>
