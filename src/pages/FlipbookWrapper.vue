<template>
  <b-container>
    <b-row ref="logoRow">
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
        <Flipbook
          v-if="file"
          :pages="orderBy(file.pages, `page_number`)"
          :ratio="file.size_ratio"
          :max-height="maxHeight"
          @size-changed="calculateFlipbookHeight"
        />
        <loader v-else />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { orderBy } from 'lodash';
import Flipbook from '@/components/Flipbook';
import { FileService, FlipbookService } from '@/services';

export default {
  name: `FlipbookWrapper`,
  components: {
    Flipbook,
  },
  data() {
    return {
      maxHeight: 0,
      file: null,
    };
  },
  async beforeCreate() {
    const { file_id, org_code, url } = this.$route.params;
    const flipbook = await FlipbookService.get({ org_code, url });
    if (file_id) {
      this.file = await FileService.getById(file_id);
    } else if (flipbook) {
      this.file = flipbook.file;
      document.title = this.file.name;
    } else {
      this.$router.push(`/error/404?message=${encodeURI(`Cannot locate flipbook at "/${org_code}/${url}"`)}`);
    }
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
    orderBy,
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
