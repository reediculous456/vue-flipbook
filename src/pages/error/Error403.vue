<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <b-card
          bg-variant="light"
          title="403: Forbidden"
          title-tag="h1"
        >
          <p>
            You are not allowed to access this page/resource.
            Please contact the application support team if the issue continues.
          </p>
          <p>
            {{ $route.params.message || `You are not allowed to make this request` }}
          </p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: `forbidden-error`,
};
</script>
