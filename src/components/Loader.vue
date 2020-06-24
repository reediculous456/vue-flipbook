<template>
  <lottie
    :options="options"
    :width="width"
    :height="height"
    @animCreated="handleAnimation"
  />
</template>

<script>
import Lottie from 'vue-lottie';
import LoadingLottie from '@/assets/loader.json';

export default {
  name: `loader`,
  components: {
    Lottie,
  },
  props: {
    width: { type: Number, default: 500 },
    height: { type: Number, default: 500 },
  },
  data() {
    return {
      options: { animationData: LoadingLottie },
      animationSpeed: 1.0,
      animation: null,
    };
  },
  methods: {
    handleAnimation(animation) {
      this.animation = animation;
      this.animation.setSpeed(this.animationSpeed);
    },
  },
};
</script>
