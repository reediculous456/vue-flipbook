<template>
  <b-container>
    <b-row>
      <b-col cols="6">
        <admin-role-card />
      </b-col>
      <b-col cols="6">
        <user-role-card />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminRoleCard from '@/components/RoleAssignment/Admin';
import UserRoleCard from '@/components/RoleAssignment/User';

export default {
  name: `role-assignment`,
  components: {
    AdminRoleCard,
    UserRoleCard,
  },
};
</script>
