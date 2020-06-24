<template>
  <b-row v-if="contentReady">
    <b-col lg="4">
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
          v-if="!file.published"
          block
          variant="success"
          @click="update"
        >
          Save Draft
        </b-btn>
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
          @click="deleteFile"
        >
          Delete
        </b-btn>
      </b-card>
    </b-col>
    <b-col lg="8">
      <file-edit
        :file.sync="file"
      />
      <page-edit
        v-for="page in orderBy(file.pages, `page_number`)"
        :key="page.id"
        :page.sync="page"
      />
    </b-col>
  </b-row>
  <loader v-else />
</template>

<script>
import { orderBy } from 'lodash';
import { FileService } from '@/services';
import FileInfo from '@/components/FileInfo';
import FileEdit from '@/components/FileEdit';
import PageEdit from '@/components/PageEdit';
import toastr from '@/plugins/notifications';

export default {
  name: `FileEditPage`,
  components: {
    FileInfo,
    FileEdit,
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
    async deleteFile() {
      if (await this.confirmDelete()) {
        await FileService.delete(this.file.id);
        toastr.success(`Successfully Deleted Flipbook`);
        this.$router.push(`/admin`);
      }
    },
    async update() {
      this.file = await FileService.update(this.file.id, this.file);
      this.accessibilityAck = false;
      toastr.success(`Successfully Updated Flipbook`);
    },
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
    async confirmDelete() {
      return await this.$bvModal.msgBoxConfirm(
        this.$createElement(`div`, [
          this.$createElement(`p`, `You are about to delete this file.`),
          this.$createElement(`p`, `This cannot be undone.`),
          this.$createElement(`p`, `Would you like to continue?`),
        ]),
        {
          title: `Warning!`,
          size: `md`,
          buttonSize: `sm`,
          okVariant: `danger`,
          okTitle: `YES`,
          cancelTitle: `NO`,
          footerClass: `p-2`,
          centered: true,
        },
      );
    },
  },
};
</script>
