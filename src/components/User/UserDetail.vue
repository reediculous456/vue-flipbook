<template>
  <span>
    - {{ user.name }} <b-icon
      icon="x-circle-fill"
      class="user-remove"
      aria-hidden="true"
      @click="removeUser"
    />
  </span>
</template>

<script>
import { UserService } from '@/services';

export default {
  name: `user-detail`,
  props: {
    userProp: { type: Object, required: true },
    optionsProp: { type: Object, required: true },
  },
  data() {
    return {
      user: this.userProp,
      options: this.optionsProp,
    };
  },
  methods: {
    async removeUser() {
      this.options.user_id = this.user.id;
      await UserService.deassign({
        user_id: this.user.id,
        organization_id: this.options.organization_id,
      });
      this.$emit(`remove-user`, this.options);
    },
  },
};
</script>

<style lang="scss" scoped>
  .user-remove {
    color: black;
    padding-left: 1rem;

    &:hover {
      color: #b22222;
    }
  }
</style>
