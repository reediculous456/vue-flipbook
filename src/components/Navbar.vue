<template>
  <b-navbar
    toggleable="sm"
    type="dark"
    variant="dark"
  >
    <b-navbar-brand>ITSC Flipbook</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse
      id="nav-collapse"
      is-nav
    >
      <b-navbar-nav>
        <b-nav-item to="/admin">
          Home
        </b-nav-item>
        <b-nav-item to="/admin/upload">
          Upload
        </b-nav-item>

        <b-nav-item-dropdown text="Users">
          <b-dropdown-item to="/admin/roles">
            Role Assignment
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Settings
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/logout">
          Logout
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { UserService } from '@/services';

export default {
  name: `navbar`,
  data() {
    return {
      user: null,
    };
  },
  async created() {
    this.user = await UserService.whoAmI();
  },
  methods: {
    subIsActive(...paths) {
      return paths.some(path => this.$route.path.indexOf(path) === 0);
    },
  },
};
</script>

<style lang="scss" scoped>
  .navbar {
    margin-bottom: 2rem;
  }

  .nav-link.router-link-exact-active {
    color: white;
  }
</style>
