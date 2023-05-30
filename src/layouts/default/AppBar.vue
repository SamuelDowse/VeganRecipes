<template>
  <v-app-bar flat color="green-darken-4" density="compact">
    <v-btn to="/" variant="text">
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
    <login-dialog v-if="!loggedIn"></login-dialog>
    <add-recipe v-else></add-recipe>
  </v-app-bar>
</template>

<script>
import LoginDialog from '@/components/loginDialog.vue';
import AddRecipe from '@/components/addRecipe.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    LoginDialog,
    AddRecipe
  },
  data: () => ({
    searchValue: '',
    loggedIn: false
  }),
  methods: {
    checkLoggedIn() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.loggedIn = user ? true : false;
      });
    },
    checkIfEnter(event) {
      if (event.code == "Enter") {
        this.beginSearch();
      }
    },
    beginSearch() {
      this.$router.push({path: `/Search/${this.searchValue}`});
      this.searchValue = '';
    }
  },
  mounted() {
    this.checkLoggedIn();
  }
}
</script>
