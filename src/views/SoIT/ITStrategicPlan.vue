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
  name: `ITStrategicPlan`,
  components: {
    Flipbook,
  },
  data() {
    return {
      maxHeight: 0,
      pages: [
        { image: `strategicPlan/IT Strategic Plan 1.jpeg`, isDouble: false },
        { image: `strategicPlan/IT Strategic Plan 2.jpeg`, isDouble: true },
        { image: `strategicPlan/IT Strategic Plan 3.jpeg`, isDouble: true },
        { image: `strategicPlan/IT Strategic Plan 4.jpeg`, isDouble: true },
        { image: `strategicPlan/IT Strategic Plan 5.jpeg`, isDouble: true },
        { image: `strategicPlan/IT Strategic Plan 6.jpeg`, isDouble: true },
        { image: `strategicPlan/IT Strategic Plan 7.jpeg`, isDouble: false },
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
