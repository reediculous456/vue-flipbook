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
      await FileService.upload({}, formData);
      this.file = null;
      this.disableUpload = false;
    },
  },
};
</script>
