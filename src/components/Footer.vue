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
          <img
            src="../assets/ITSC.png"
            alt="ITSC Logo"
          >
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
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    z-index: 999;
    background-color: var(--body);

    .container {
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }

    img {
      max-height: 4rem;
      padding: 0.5rem;
    }
  }
</style>
