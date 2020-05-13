<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          bg-variant="light"
          title="500: Server Error"
        >
          <p>
            An unknown error has occurred. Please contact the application support team if the issue continues.
          </p>
          <p>
            {{ $route.params.message || `An unknown error occurred` }}
          </p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: `server-error`,
};
</script>
