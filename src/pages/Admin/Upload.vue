<template>
  <b-row>
    <b-col>
      <Upload />
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
};
</script>
