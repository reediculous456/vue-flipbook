<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          bg-variant="light"
          title="404: Resource Not Found"
        >
          <p>
            The page/resource you are looking for could not be located.
            Please contact the application support team if the issue continues.
          </p>
          <p v-if="$route.params.message">
            {{ $route.params.message }}
          </p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: `page-not-found-error`,
};
</script>
