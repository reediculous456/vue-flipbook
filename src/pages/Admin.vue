<template>
  <div>
    <Navbar />
    <b-container>
      <router-view :key="$route.fullPath" />
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: `Admin`,
  components: {
    Navbar,
  },
};
</script>
