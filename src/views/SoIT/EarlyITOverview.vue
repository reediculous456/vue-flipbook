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
          :ratio="1.28"
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
  name: `EarlyITOverview`,
  components: {
    Flipbook,
  },
  data() {
    return {
      maxHeight: 0,
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
