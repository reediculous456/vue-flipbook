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
  name: `Admin`,
  components: {
    Upload,
  },
  methods: {
    onFileUploaded(file) {
      console.log(file);
    },
  },
};
</script>
