<template>
  <span>
    <b-form-group>
      <multiselect
        v-model="user"
        placeholder="LastName, FirstName LastName, or Username"
        label="name"
        track-by="username"
        :searchable="true"
        :internal-search="false"
        :loading="isLoading"
        :close-on-select="true"
        :options="users"
        @search-change="findUser"
      >
        <template slot="noOptions">Please search for a user</template>
        <template slot="noResult">No users match your search</template>
        <template
          slot="option"
          slot-scope="props"
        >
          <b>Name:</b> {{ props.option.name }} <b>Username:</b> {{ props.option.username }}
        </template>
        <template
          slot="singleLabel"
          slot-scope="props"
        >
          {{ props.option.name }} - {{ props.option.username }}
        </template>
      </multiselect>
    </b-form-group>
    <b-form-group class="clearfix mb-0">
      <b-btn
        variant="secondary"
        class="float-right"
        @click="create"
      >
        Submit
      </b-btn>
    </b-form-group>
  </span>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { debounce } from 'lodash';
import { ActiveDirectoryService, UserService } from '@/services';

export default {
  name: `user-create`,
  components: {
    Multiselect,
  },
  props: {
    options: { type: Object, required: true },
  },
  data() {
    return {
      user: null,
      users: [],
      isLoading: false,
    };
  },
  methods: {
    findUser: debounce(function(query) {
      if (query) {
        this.isLoading = true;
        ActiveDirectoryService.search(query)
          .then(response => {
            this.users = response;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      }
    }, 500),
    async create() {
      const newUser = await UserService.assign({
        role_id: this.options.role_id,
        username: this.user.username,
        organization_id: this.options.organization_id,
      });
      this.$emit(`create-user`, newUser, this.options);
      this.user = null;
    },
  },
};
</script>
