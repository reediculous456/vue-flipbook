<template>
  <div id="flipbook">
    <div><img src="../assets/annualReport/SoIT_AR2020 1.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 2.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 3.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 4.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 5.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 6.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 7.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 8.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 9.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 10.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 11.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 12.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 13.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 14.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 15.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 16.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 17.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 18.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 19.jpeg"></div>
    <div><img src="../assets/annualReport/SoIT_AR2020 20.jpeg"></div>
  </div>
</template>

<script>
import '@/lib/turn.js';

export default {
  name: `Flipbook`,
  mounted() {
    $(`#flipbook`).turn({
      width: 922,
      height: 600,
      elevation: 50,
      gradients: true,
    });
  },
};
</script>

<style lang="scss" scoped>
 #flipbook {
   img {
     height: 600px;
   }
 }
</style>
