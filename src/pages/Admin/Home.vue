<template>
  <b-card>
    <Datatable
      :items="files"
      :fields="fields"
      scroll-y="40em"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          size="sm"
          class="mr-1"
          @click="$router.push(`/admin/file/${row.item.id}`)"
        >
          Edit
        </b-button>
      </template>
    </Datatable>
  </b-card>
</template>

<script>
import moment from 'moment';
import Datatable from '@/components/Datatable';
import { FileService } from '@/services';

export default {
  name: `Home`,
  components: {
    Datatable,
  },
  data() {
    return {
      files: [],
      fields: [
        { key: `name`, label: `Name`, sortable: true },
        { key: `organization.name`, label: `Organization`, sortable: true },
        {
          key: `uploaded_on`,
          label: `Uploaded On`,
          formatter: (value) => moment(value).format(`MMM Do, YYYY hh:mm:ss`),
          sortable: true,
        },
        {
          key: `published`,
          label: `is Published`,
          formatter: (value) => value ? `Yes` : `No`,
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: `actions`, label: `` },
      ],
    };
  },
  async created() {
    this.files = await FileService.getList();
  },
};
</script>
