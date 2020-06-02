<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-form-group
          label="Per page"
          label-cols="2"
          label-cols-sm="2"
          label-cols-md="3"
          label-cols-lg="2"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
        >
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="float-left"
            style="max-width: 25%;"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row :style="{ minHeight }">
      <b-table
        show-empty
        responsive
        striped
        :sticky-header="scrollY"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <slot
          v-for="(_, name) in $slots"
          :slot="name"
          :name="name"
        />
        <template
          v-for="(_, name) in $scopedSlots"
          :slot="name"
          slot-scope="slotData"
        >
          <slot
            :name="name"
            v-bind="slotData"
          />
        </template>
      </b-table>
    </b-row>
    <b-row>
      <b-col class="text-left">
        <p>
          Showing
          {{ (currentPage * perPage) - perPage + 1 }}
          to
          {{
            currentPage * perPage > totalRows || perPage == -1 ?
              totalRows :
              currentPage * perPage
          }}
          of {{ totalRows }} entries
        </p>
      </b-col>
      <b-col>
        <b-pagination
          v-if="perPage !== -1"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          class="my-0"
          first-number
          last-number
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: `Datatable`,
  props: {
    items: { required: true, type: Array },
    fields: { required: true, type: Array },
    perPage: { default: 5, type: Number },
    pageOptions: { default: () => [ 5, 10, 15, { value: -1, text: `All` }], type: Array },
    sortBy: { default: ``, type: String },
    sortDesc: { default: false, type: Boolean },
    sortDirection: { default: `asc`, type: String },
    filterOn: { default: () => [], type: Array },
    scrollY: { default: `500px`, type: String },
    minHeight: { default: `500px`, type: String },
  },
  data() {
    return {
      totalRows: this.items.length,
      currentPage: 1,
      filter: ``,
    };
  },
  methods: {
    onFiltered(filteredItems, count) {
      this.totalRows = count;
      this.currentPage = 1;
      this.$emit(`filtered`, filteredItems, count);
    },
  },
};
</script>

<style lang="scss" scoped>
  .row {
    margin: 0;
  }
</style>
