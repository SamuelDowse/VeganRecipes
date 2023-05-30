<template>
  <v-app-bar flat color="green-darken-4" density="compact">
    <v-btn to="/" :flat="true">
      <v-icon icon="mdi-sprout"></v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-text-field
      :hide-details="true"
      variant="solo"
      theme="dark"
      v-model="searchValue"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      placeholder="Search..."
      append-inner-icon="mdi-send"
      @click:append-inner="beginSearch"
      @keypress="checkIfEnter"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn>
      <v-icon icon="mdi-account"></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    data: () => ({
      searchValue: ''
    }),
    methods: {
      checkIfEnter(event) {
        if (event.code == "Enter") {
          this.beginSearch();
        }
      },
      beginSearch() {
        this.$router.push({path: `/Search/${this.searchValue}`});
        this.searchValue = '';
      }
    }
  }
</script>
