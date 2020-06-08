<template>
  <b-row v-if="contentReady">
    <b-col md="4">
      <b-card>
        <file-info :file="file" />
        <b-form-group>
          <b-form-checkbox v-model="accessibilityAck">
            I acknowledge that I have provided sufficient alternative text and long descriptions.
          </b-form-checkbox>
          <small>
            If a reviewer finds that the provided text is not sufficient, your flipbook will be unpublished.
          </small>
        </b-form-group>
        <b-btn
          :disabled="!allowSave"
          block
          variant="success"
          @click="publish"
        >
          {{ file.published ? `Update` : `Publish` }}
        </b-btn>
        <b-btn
          v-if="file.published"
          block
          variant="warning"
          @click="unpublish"
        >
          Unpublish
        </b-btn>
        <b-btn
          v-if="!file.published"
          block
          variant="danger"
        >
          Delete
        </b-btn>
      </b-card>
    </b-col>
    <b-col md="8">
      <page-edit
        v-for="page in orderBy(file.pages, `page_number`)"
        :key="page.id"
        :page.sync="page"
      />
    </b-col>
  </b-row>
</template>

<script>
import { orderBy } from 'lodash';
import { FileService } from '@/services';
import FileInfo from '@/components/FileInfo';
import PageEdit from '@/components/PageEdit';
import toastr from '@/plugins/notifications';

export default {
  name: `FileEdit`,
  components: {
    FileInfo,
    PageEdit,
  },
  data() {
    return {
      file: null,
      accessibilityAck: false,
      contentReady: false,
    };
  },
  computed: {
    hasAltText() {
      return this.file.pages.every(page => page.alt_text);
    },
    hasLongDescription() {
      return this.file.pages.every(page => page.long_description);
    },
    allowSave() {
      return this.accessibilityAck && this.hasAltText && this.hasLongDescription;
    },
  },
  async created() {
    this.file = await FileService.getById(this.$route.params.file_id);
    this.contentReady = true;
  },
  methods: {
    async publish() {
      this.file = await FileService.publish(this.file.id, this.file);
      this.accessibilityAck = false;
      toastr.success(`Successfully Published Flipbook`);
    },
    async unpublish() {
      this.file = await FileService.unpublish(this.file.id);
      this.accessibilityAck = false;
      toastr.success(`Successfully Unpublished Flipbook`);
    },
    orderBy,
  },
};
</script>
