<template>
  <b-card no-body>
    <template v-slot:header>
      <b-card-title
        v-b-toggle.boxRole
        title-tag="h3"
        class="mb-0"
      >
        User Role Assignment
      </b-card-title>
    </template>

    <b-collapse
      id="boxRole"
      visible
    >
      <b-card-body v-if="contentReady">
        <b-form-select
          v-model="organization_id"
          class="mb-2"
        >
          <b-form-select-option
            v-for="org in organizations"
            :key="org.id"
            :value="org.id"
          >
            {{ org.name }}
          </b-form-select-option>
        </b-form-select>
        <b-form-group>
          <div
            v-for="user in users"
            :key="user.id"
            class="text-left"
          >
            <user-detail
              :user-prop="user"
              :options-prop="{ role_id: role.id, organization_id }"
              @remove-user="removeUser"
            />
          </div>
        </b-form-group>
        <user-create
          :options="{ role_id: role.id, organization_id }"
          @create-user="createUser"
        />
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import { orderBy } from 'lodash';
import { OrganizationService, RoleService, UserService } from '@/services';
import UserCreate from '@/components/User/UserCreate';
import UserDetail from '@/components/User/UserDetail';
import toastr from '@/plugins/notifications';

export default {
  name: `box-role-card`,
  components: {
    UserDetail,
    UserCreate,
  },
  data() {
    return {
      contentReady: false,
      organizations: [],
      organization_id: null,
      users: [],
      role: null,
    };
  },
  watch: {
    organization_id(val) {
      this.loadUsers(val);
    },
  },
  async created() {
    const [ userRole ] = await RoleService.getByCodes(`USER`);
    this.role = userRole;
    this.contentReady = true;
    const organizations = await OrganizationService.getList();
    this.organizations = orderBy(organizations, `name`);
    [{ id: this.organization_id }] = this.organizations;
  },
  methods: {
    async loadUsers(organization_id) {
      const users = await UserService.getByOrganization(organization_id);
      this.users = orderBy(users, `name`);
    },
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
