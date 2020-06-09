<template>
  <b-card>
    <b-form-group label="File Name">
      <b-form-input
        v-model="file.name"
        placeholder="This name is used to identify the file and is shown on the browser tab."
      />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        <span class="pr-3">Scale Ratio</span>
        <b-icon
          id="scaleRatioHelp"
          icon="question-circle-fill"
          variant="primary"
        />
        <b-tooltip
          target="scaleRatioHelp"
          variant="primary"
          placement="bottom"
          triggers="hover"
        >
          If the PDF you uploaded is 8.5in x 11in, leave this value at 1.5.
          Otherwise, you will need to adjust this value until your flipbook shows correctly on the preview page.
        </b-tooltip>
      </template>
      <b-form-input
        v-model="file.size_ratio"
        placeholder="This is used to properly display the flipbook. The default is 1.5 for an 8.5 x 11 flipbook."
      />
    </b-form-group>
  </b-card>
</template>

<script>
export default {
  name: `FileEdit`,
  props: {
    file: { type: Object, required: true },
  },
};
</script>
