<template>
  <div
    ref="flipbook"
    class="flipbook"
  >
    <!-- Next button -->
    <div
      ignore="1"
      class="next-button"
      @click="onNextClick"
    >
      <b-icon icon="arrow-right" />
    </div>
    <!-- Previous button -->
    <div
      ignore="1"
      class="previous-button"
      @click="onPrevClick"
    >
      <b-icon icon="arrow-left" />
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 1.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 2.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 3.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 4.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 5.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 6.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 7.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 8.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 9.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 10.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 11.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 12.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 13.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 14.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 15.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 16.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 17.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 18.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 19.jpeg">
    </div>
    <div class="page">
      <img src="../assets/annualReport/SoIT_AR2020 20.jpeg">
    </div>
  </div>
</template>

<script>
import '@/lib/turn.js';
import '@/lib/hash.js';

export default {
  name: `Flipbook`,
  data() {
    return {
      ratio: 1.5,
    };
  },
  mounted() {
    const that = this;

    $(this.$refs.flipbook).turn({
      accelerations: true,
      gradients: true,
      when: {
        turning(e, page) {
          Hash.go(`page/${page}`).update();

          if (page === 1) { $(`.previous-button`).hide(); }
          else { $(`.previous-button`).show(); }

          if (page === $(that.$refs.flipbook).turn(`pages`)) { $(`.next-button`).hide(); }
          else { $(`.next-button`).show(); }
        },
        turned(e, page) {
          if (page === 1) { $(`.previous-button`).hide(); }
          else { $(`.previous-button`).show(); }

          if (page === $(that.$refs.flipbook).turn(`pages`)) { $(`.next-button`).hide(); }
          else { $(`.next-button`).show(); }
        },
      },
    });

    this.$nextTick(function() {
      window.addEventListener(`resize`, this.getWindowSize);
      this.getWindowSize();

      Hash.on(`^page/([0-9]+)$`, {
        yep(path, parts) {
          const [ , page ] = parts;

          if (page !== undefined) {
            if ($(that.$refs.flipbook).turn(`is`)) {
              $(that.$refs.flipbook).turn(`page`, page);
            }
          }
        },
        nop() {
          if ($(that.$refs.flipbook).turn(`is`)) {
            $(that.$refs.flipbook).turn(`page`, 1);
          }
        },
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener(`resize`, this.getWindowSize);
  },
  methods: {
    getWindowSize() {
      const { height, width } = this.resize();
      $(this.$refs.flipbook).turn(`size`, width, height);
    },
    resize() {
      const el = this.$refs.flipbook;
      // reset the width and height to the css defaults
      el.style.width = ``;
      el.style.height = ``;

      let width = el.clientWidth;
      let height = Math.round(width / this.ratio);
      const padded = Math.round(document.body.clientHeight * 0.9);

      // if the height is too big for the window, constrain it
      if (height > padded) {
        height = padded;
        width = Math.round(height * this.ratio);
      }

      // set the width and height matching the aspect ratio
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;

      return { width, height };
    },
    onNextClick() {
      $(this.$refs.flipbook).turn(`next`);
    },
    onPrevClick() {
      $(this.$refs.flipbook).turn(`previous`);
    },
  },
};
</script>

<style lang="scss" scoped>
.flipbook {
  margin: 0 auto;
  width: 100%;
  height: 90%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .page {
    height: 100%;

    img {
      max-width: 100%;
      height: 100%;
    }
  }

  .next-button,
  .previous-button{
    width:22px;
    height:100%;
    position:absolute;
    top:0;
    background-color: black;
    opacity: 0;

    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      fill: white;
    }

    &:hover {
      opacity: 0.2;
    }
  }

  .next-button{
    right:-22px;
    border-radius:0 15px 15px 0;
  }

  .previous-button{
    left:-22px;
    border-radius:15px 0 0 15px;
  }
}
</style>
