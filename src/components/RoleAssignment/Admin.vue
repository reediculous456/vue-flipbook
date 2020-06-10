<template>
  <b-card no-body>
    <template v-slot:header>
      <b-card-title
        v-b-toggle.adminRole
        title-tag="h3"
        class="mb-0"
      >
        Admin Role Assignment
      </b-card-title>
    </template>

    <b-collapse
      id="adminRole"
      visible
    >
      <b-card-body v-if="contentReady">
        <b-form-group>
          <div
            v-for="user in users"
            :key="user.id"
            class="text-left"
          >
            <user-detail
              :user-prop="user"
              :options-prop="{ role_id: role.id }"
              @remove-user="removeUser"
            />
          </div>
        </b-form-group>
        <user-create
          :options="{ role_id: role.id }"
          @create-user="createUser"
        />
      </b-card-body>
      <loader
        v-else
        width="350"
        height="350"
      />
    </b-collapse>
  </b-card>
</template>

<script>
import { orderBy } from 'lodash';
import { RoleService, UserService } from '@/services';
import UserCreate from '@/components/User/UserCreate';
import UserDetail from '@/components/User/UserDetail';
import toastr from '@/plugins/notifications';

export default {
  name: `AdminRoleCard`,
  components: {
    UserDetail,
    UserCreate,
  },
  data() {
    return {
      contentReady: false,
      users: [],
      role: null,
    };
  },
  async created() {
    const [ adminRole ] = await RoleService.getByCodes(`ADMIN`);
    this.role = adminRole;
    this.contentReady = true;
    const users = await UserService.getByRole(adminRole.id);
    this.users.push(...orderBy(users, `name`));
  },
  methods: {
    createUser(newUser) {
      this.users.push(newUser);
      toastr.success(`Assigned user: ${newUser.name}`);
    },
    removeUser(data) {
      const { user_id } = data;
      this.users = this.users.filter(user => user.id !== user_id);
      toastr.success(`Removed user`);
    },
  },
};
</script>
