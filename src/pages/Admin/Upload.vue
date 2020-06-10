<template>
  <b-row>
    <b-col>
      <Upload @uploaded="onFileUploaded" />
    </b-col>
  </b-row>
</template>

<script>
import Upload from '@/components/Upload';

export default {
  name: `FileUpload`,
  components: {
    Upload,
  },
  methods: {
    onFileUploaded(file) {
      this.$router.push(`/admin/file/${file.id}`);
    },
  },
};
</script>
