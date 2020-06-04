<template>
  <div>
    <b-form-file
      ref="file"
      v-model="file"
      accept=".pdf"
      required
      placeholder="Choose a .pdf file"
    />
    <b-button
      :disabled="disableUpload"
      class="mr-2"
      @click="uploadFile"
    >
      Submit
    </b-button>
  </div>
</template>

<script>
import { FileService } from '@/services/File.service.js';
import toastr from '@/plugins/notifications';

export default {
  name: `Upload`,
  data() {
    return {
      file: null,
      disableUpload: false,
    };
  },
  methods: {
    async uploadFile() {
      this.disableUpload = true;
      const formData = new FormData();
      formData.append(`file`, this.file);
      toastr.info(`File upload in progress... You will be redirected when it is completed`);
      const file = await FileService.upload({}, formData);
      this.$emit(`uploaded`, file);
      this.file = null;
      this.disableUpload = false;
    },
  },
};
</script>
