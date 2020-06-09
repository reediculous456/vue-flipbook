<template>
  <b-table-simple striped>
    <b-tbody>
      <b-tr>
        <b-th>Name</b-th>
        <b-td>
          {{ file.name }}
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Organization</b-th>
        <b-td>
          {{ file.organization.name }}
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Scale Ratio</b-th>
        <b-td>
          {{ file.size_ratio }}
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Uploaded On</b-th>
        <b-td>
          {{ uploadedOn }}
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Uploaded By</b-th>
        <b-td>
          {{ file.uploader.name }}
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Is Published</b-th>
        <b-td>
          {{ file.published ? `Yes` : `No` }}
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>URL</b-th>
        <b-td>
          <router-link
            v-if="file.published"
            :to="url"
          >
            {{ url }}
          </router-link>
          <span v-else>{{ url }}</span>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import moment from 'moment';

export default {
  name: `FileInfo`,
  props: {
    file: { type: Object, required: true },
  },
  computed: {
    uploadedOn() {
      return moment(this.file.uploaded_on).format(`MMM Do, YYYY hh:mm:ss`);
    },
    url() {
      return `/${this.file.organization.code === `PERSONAL` ?
        this.file.uploader.username :
        this.file.organization.id}/${this.file.url}`;
    },
  },
};
</script>
