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
    <template v-for="(page, i) in pages">
      <div
        :key="i"
        :class="{ 'page': true, 'double': page.is_double }"
      >
        <img
          :src="`data:image/png;base64,${page.image}`"
          :alt="page.alt_text"
          :longdesc="page.long_description"
        >
      </div>
    </template>
  </div>
</template>

<script>
import '@/lib/turn.js';
import '@/lib/hash.js';
import '@/lib/scissor.js';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export default {
  name: `Flipbook`,
  props: {
    pages: { required: true, type: Array },
    ratio: { type: Number, default: 1.5 },
    maxHeight: { required: true, type: Number },
  },
  watch: {
    maxHeight() {
      this.getWindowSize();
    },
  },
  mounted() {
    const that = this;

    $(`.flipbook .double`).scissor();

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

          $(`.page.odd`).scissor({ isResize: true });
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
      window.addEventListener(`keydown`, (e) => {
        switch (e.keyCode) {
          case LEFT_ARROW:
            $(that.$refs.flipbook).turn(`previous`);
            e.preventDefault();
            break;
          case RIGHT_ARROW:
            $(that.$refs.flipbook).turn(`next`);
            e.preventDefault();
            break;
        }
      });

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
      this.$emit(`size-changed`);
      const { height, width } = this.resize();
      $(this.$refs.flipbook).turn(`size`, width, height);
      $(`.page.odd`).scissor({ isResize: true });
    },
    resize() {
      const el = this.$refs.flipbook;
      // reset the width and height to the css defaults
      el.style.width = ``;
      el.style.height = ``;

      let width = el.clientWidth;
      let height = Math.round(width / this.ratio);
      const padded = Math.round(this.maxHeight);

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
        height: 100%;
      }

      &:not(.double) > img {
        max-width: 100%;
      }
    }

    .next-button {
      right: -22px;
      border-radius: 0 15px 15px 0;
    }

    .previous-button {
      left: -22px;
      border-radius: 15px 0 0 15px;
    }

    .next-button,
    .previous-button {
      width: 22px;
      height: 100%;
      position: absolute;
      top: 0;
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
  }
</style>
