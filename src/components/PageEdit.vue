<template>
  <b-card>
    <p>Page: {{ page.page_number }}</p>
    <b-form-group>
      <b-form-checkbox
        v-model="page.is_double"
        inline
      >
        is Double Page
      </b-form-checkbox>
      <b-icon
        :id="`doublePage${page.page_number}`"
        icon="question-circle-fill"
        variant="primary"
      />
      <b-tooltip
        :target="`doublePage${page.page_number}`"
        variant="primary"
        placement="bottom"
        triggers="hover"
      >
        Some PDFs are exported in booklet form.
        If this page in the PDF you uploaded is really 2 pages in print, check this box
      </b-tooltip>
    </b-form-group>
    <b-form-group label="Alt text">
      <b-form-textarea
        v-model="page.alt_text"
        placeholder="Write 1-2 sentences to summarize this page for screen readers"
      />
    </b-form-group>
    <b-form-group label="Long description">
      <b-form-textarea
        v-model="page.long_description"
        placeholder="Write a detailed description of everything on the page for screen readers"
      />
    </b-form-group>
  </b-card>
</template>

<script>
export default {
  name: `PageEdit`,
  props: {
    page: { type: Object, required: true },
  },
};
</script>
