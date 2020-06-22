<template>
  <div>
    <b-form-group
      label="Organization"
    >
      <b-form-select
        v-model="$v.form.organization_id.$model"
        value-field="id"
        text-field="name"
        :options="organizations"
        :state="validateState('organization_id')"
        @input="onOrganizationChange"
      >
        <template v-slot:first>
          <b-form-select-option
            :value="null"
            disabled
          >
            Please Select an Organization
          </b-form-select-option>
        </template>
      </b-form-select>
    </b-form-group>
    <b-form-group
      label="URL"
      label-for="url-input"
    >
      <b-input-group :prepend="orgShortcode">
        <b-form-input
          id="url-input"
          v-model="$v.form.url.$model"
          name="url-input"
          :state="validateState('url')"
          aria-describedby="url-feedback"
          :disabled="!form.organization_id"
          :formatter="urlFormatter"
          :lazy-formatter="true"
          lazy
          style="border-radius: 0.25em;"
        />
        <b-form-invalid-feedback
          v-if="!$v.hasConflictingFiles"
          id="url-feedback"
        >
          URL already exists.
        </b-form-invalid-feedback>
      </b-input-group>
    </b-form-group>

    <b-form-group>
      <b-form-file
        ref="file"
        v-model="file"
        accept=".pdf"
        required
        placeholder="Choose a .pdf file"
      />
    </b-form-group>
    <b-form-group>
      <b-button
        :disabled="!allowSubmit"
        class="mr-2"
        @click="uploadFile"
      >
        Submit
      </b-button>
    </b-form-group>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { FileService, OrganizationService, UserService } from '@/services';
import toastr from '@/plugins/notifications';

export default {
  name: `Upload`,
  mixins: [ validationMixin ],
  data() {
    return {
      file: null,
      disableUpload: false,
      selectedOrganization: null,
      organizations: [],
      user: null,
      conflictingFiles: [],
      form: {
        organization_id: null,
        url: null,
      },
    };
  },
  validations() {
    return {
      form: {
        organization_id: {
          required,
        },
        url: {
          required,
          hasConflict: () => !this.hasConflictingFiles,
        },
      },
    };
  },
  computed: {
    orgShortcode() {
      return this.selectedOrganization ?
        this.selectedOrganization.code === `PERSONAL` ?
          `/${this.user.username}/` :
          `/${this.selectedOrganization.code.toLowerCase()}/` :
        `Select an Organization`;
    },
    allowSubmit() {
      return !this.disableUpload &&
      !this.hasConflictingFiles &&
      this.selectedOrganization &&
      this.file && this.form.url;
    },
    hasConflictingFiles() {
      return !!this.conflictingFiles.length;
    },
  },
  watch: {
    'form.url'(url) {
      this.onUrlUpdated(url);
    },
  },
  async created() {
    this.organizations = await OrganizationService.getList();
    this.user = await UserService.whoAmI();
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async uploadFile() {
      this.disableUpload = true;
      const formData = new FormData();
      formData.append(`file`, this.file);
      toastr.info(`File upload in progress... You will be redirected when it is completed`);
      const file = await FileService.upload({
        url: this.form.url,
        organization_id: this.form.organization_id,
      }, formData);
      this.$emit(`uploaded`, file);
      this.file = null;
      this.disableUpload = false;
    },
    onOrganizationChange(val) {
      this.selectedOrganization = this.organizations.find(org => org.id === val);
    },
    urlFormatter(url) {
      return url.toLowerCase()
        .replace(/ /g, `-`)
        .replace(/[^a-zA-Z-]/g, ``)
        .replace(/-{2,}/g, `-`)
        .replace(/(^-)/g, ``)
        .replace(/(-+$)/g, ``);
    },
    async onUrlUpdated(url) {
      if (url && this.form.organization_id) {
        this.conflictingFiles = await FileService.getByUrl({ organization_id: this.form.organization_id, url });
      }
    },
  },
};
</script>
