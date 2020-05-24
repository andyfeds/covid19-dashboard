<template>
  <div class="search">
    <label class="text-center">Search your city, resources, etc</label>
    <v-col cols="12">
      <v-text-field
        single-line
        solo
        prepend-inner-icon="mdi-magnify"
        append-icon="mdi-heart-outline"
      ></v-text-field>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style lang="scss" scoped>
.search label {
  color: #6c757d;
  font-size: 0.75rem;
  margin-bottom: 1rem;
  text-align: center;
  display: block;
}
.search > * {
  align-self: center;
}

.v-text-field.v-text-field--solo .v-input__control {
  min-height: 64px;
  padding: 1rem;
}
</style>
