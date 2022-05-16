<template>
  <div>
    <v-btn @click="displayProfileMenu">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-dialog :value="userAccount" class="text-center" width="300">
      <v-card style="padding: 10px 20px" rounded v-if="!menu">
        <v-row v-if="!user">
          <v-col>
            <v-btn
              color="orange"
              @click="
                menu = true;
                createAccount = true;
              "
              width="100%"
            >
              Create Account
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="!user">
          <v-col cols="12">
            <v-btn color="orange" @click="menu = true" width="100%"
              >Login</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="user">
          <v-col>
            <v-btn color="orange" @click="userAccount = false" width="100%">
              Logout
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="user">
          <v-col>
            <v-btn
              color="orange"
              @click="userAccount = false"
              to="/AddNew"
              width="100%"
            >
              Add New Recipe
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="red" dark @click="userAccount = false" width="100%">
              Close Menu
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card style="padding: 10px 20px" rounded v-if="menu">
        <v-row>
          <v-col>
            <v-text-field
              filled
              placeholder="Email"
              hide-details
              v-model="email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              filled
              placeholder="Password"
              v-model="password"
              hide-details
              :type="value ? 'password' : 'text'"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="createAccount">
          <v-col>
            <v-text-field
              filled
              placeholder="Confirm Password"
              v-model="passwordAgain"
              hide-details
              :type="value2 ? 'password' : 'text'"
              :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value2 = !value2)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="!createAccount">
          <v-col
            ><v-btn color="primary" width="100%" @click="login"
              >Login</v-btn
            ></v-col
          >
        </v-row>
        <v-row v-if="createAccount">
          <v-col>
            <v-btn color="primary" width="100%" @click="createUser">
              Create Account
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="red"
              dark
              width="100%"
              @click="
                menu = false;
                createAccount = false;
              "
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { fbauth } from "@/firebaseDatabase";
import { mapState } from "vuex";
export default {
  name: "Accounts",

  components: {},

  data: () => ({
    userAccount: false,
    createAccount: false,
    menu: false,
    user: undefined,
    email: undefined,
    password: undefined,
    passwordAgain: undefined,
    value: String,
    value2: String,
  }),
  methods: {
    displayProfileMenu() {
      this.userAccount = !this.userAccount;
    },
    login() {
      fbauth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user;
          this.userAccount = false;
          this.menu = false;
          this.createAccount = false;
        })
        .catch(() => {
          alert("Incorrect email or password");
        });
    },
    createUser() {
      if (this.password != this.passwordAgain) {
        alert("Passwords must match");
        return false;
      }
      fbauth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user;
          this.userAccount = false;
          this.menu = false;
          this.createAccount = false;
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            alert("This email address is already in use");
          }
        });
    },
  },
  mounted() {},
  computed: {
    ...mapState(["shoppingList"]),
  },
};
</script>

<style lang="scss">
h1 {
  font-size: 50px;
}

h3 {
  font-size: 15px;
  font-style: italic;
}

.v-main__wrap {
  background-color: #f0f0f0;
}

.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>
