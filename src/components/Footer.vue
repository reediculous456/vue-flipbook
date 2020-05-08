<template>
  <footer class="footer">
    <b-container>
      <span>
        Developed by students, faculty, and alumni at the <a
          href="https://cech.uc.edu/schools/it/centers/itsolutionscenter.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Information Technology Solutions Center
        </a>
      </span>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: `Footer`,
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 60px;
}
</style>
