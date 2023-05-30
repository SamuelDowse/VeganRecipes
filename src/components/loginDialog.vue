<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon icon="mdi-account"></v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center text-white" style="background-color: green">
          Login
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
          </form>
          <span>{{ errorMessage }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="registerUser">Register</v-btn>
          <v-btn color="success" @click="loginUser">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
  export default {
    data () {
      return {
        dialog: false,
        email: '',
        password: '',
        errorMessage: ''
      }
    },
    methods: {
      loginUser() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
          this.dialog = false;
        }).catch((error) => {
          this.errorMessage = error.message;
        });
      },
      registerUser() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password).then(() => {
          this.dialog = false;
        }).catch((error) => {
          this.errorMessage = error.message;
        });
      }
    }
  }
</script>