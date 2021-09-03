// ----------------------- To Do List -----------------------
// Randomly select meals for a set amount of days

<template>
  <v-app>
    <v-overlay :value="overlay">
      <v-card elevation="3" max-height="90vh" max-width="90vw" style="overflow-y:scroll" light>
        <v-img class="white--text align-end" height="200px" src="./assets/shoppingList.jpg">
          <v-card-title>Your Shopping List</v-card-title>
        </v-img>
        <v-card-text class="text--primary" style="color:white !important;">
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="(item, index) in this.$store.state.shoppingList" :key="index">
              <v-expansion-panel-header>{{item}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels accordion v-if="shoppingListItems[index]">
                  <v-expansion-panel v-for="(subitem, subindex) in shoppingListItems[index].ingredientsOrder" :key="subindex">
                    <v-expansion-panel-header>{{subitem}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-checkbox v-for="(subsubitem, subsubindex) in shoppingListItems[index].ingredients[subitem]" :key="subsubindex">
                        <template v-slot:label><div v-html="subsubitem"></div></template>
                      </v-checkbox>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" @click="overlay = false">
            Close Shopping List
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-overlay :value="userAccount" class="text-center">
      <v-sheet style="padding: 10px 20px" rounded v-if="!menu">
        <v-row  v-if="!user">
          <v-col><v-btn color="orange" @click="menu = true; createAccount = true;">Create Account</v-btn></v-col>
        </v-row>
        <v-row  v-if="!user">
          <v-col><v-btn color="orange" @click="menu = true;">Login</v-btn></v-col>
        </v-row>
        <v-row v-if="user">
          <v-col><v-btn color="orange" @click="userAccount = false">Logout</v-btn></v-col>
        </v-row>
        <v-row v-if="user">
          <v-col><v-btn color="orange" @click="userAccount = false" to="/AddNew">Add New Recipe</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col><v-btn color="orange" @click="userAccount = false">Close Menu</v-btn></v-col>
        </v-row>
      </v-sheet>
      <v-sheet style="padding: 10px 20px" rounded v-if="menu">
        <v-row>
          <v-col><v-text-field placeholder="email" v-model="email"></v-text-field></v-col>
        </v-row>
        <v-row>
          <v-col><v-text-field placeholder="password" v-model="password" :type="value ? 'password' : 'text'" :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'" @click:append="() => (value = !value)"></v-text-field></v-col>
        </v-row>
        <v-row v-if="createAccount">
          <v-col><v-text-field placeholder="password" v-model="passwordAgain" :type="value2 ? 'password' : 'text'" :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="() => (value2 = !value2)"></v-text-field></v-col>
        </v-row>
        <v-row v-if="!createAccount">
          <v-col><v-btn color="primary" @click="login">Login</v-btn></v-col>
        </v-row>
        <v-row v-if="createAccount">
          <v-col><v-btn color="primary" @click="createUser">Create Account</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col><v-btn color="secondary" @click="menu = false; createAccount = false;">Cancel</v-btn></v-col>
        </v-row>
      </v-sheet>
    </v-overlay>
    <v-app-bar app color="primary" dark>
      <v-col lg="1">
        <v-btn to="/" style="background-color: black;">
        <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-col>
      <v-col lg="10">
        <v-text-field
          style="margin-top:25px;"
          prepend-inner-icon="mdi-magnify"
          @change="searchRecipes()"
          v-model="search"
          solo
          label="Search"
          clearable
        ></v-text-field>
      </v-col>
      <v-col lg="1">
        <v-btn @click="displayShoppingList()" style="float:right;">
          <v-icon>mdi-basket</v-icon>
        </v-btn>
      </v-col>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer padless>
      <v-col md="1">
        <v-btn @click="displayProfileMenu">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center" md="10" style="font-size: 12px;">
        <strong>Created by Samuel Dowse</strong><br>For Holly and Bryony, my inspirations
      </v-col>
      <v-col md="1">
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value="NTPB5FKULLQ7W" />
          <input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          <img alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import { db, fbauth } from '@/firebaseDatabase';
  export default {
    
    name: 'App',

    components: {},

    data: () => ({
      search: '',
      absolute: true,
      userAccount: false,
      createAccount: false,
      menu: false,
      overlay: false,
      shoppingListItems: [],
      user: undefined,
      email: undefined,
      password: undefined,
      passwordAgain: undefined,
      value: String,
      value2: String,
    }),
    methods: {
      searchRecipes() {
        this.$router.push({ path: '/Search/'+this.search });
      },
      displayProfileMenu() {
        this.userAccount = !this.userAccount;
      },
      displayShoppingList() {
        this.overlay = !this.overlay;
        this.shoppingListItems = [];
        for (var i = 0; i < this.$store.state.shoppingList.length; i++){
          db.collection('Recipes').where("name", "==", this.$store.state.shoppingList[i]).get().then(snapshot => {
            snapshot.forEach(doc => {
              let item = doc.data()
              this.shoppingListItems.push(item);
            });
          });
        }
      },
      login() {
        fbauth.signInWithEmailAndPassword(this.email, this.password).then((userCredential) => {
          this.user = userCredential.user;
          this.userAccount = false;
          this.menu = false;
          this.createAccount = false;
        }).catch(() => {
          alert("Incorrect email or password");
        });
      },
      createUser() {
        if (this.password != this.passwordAgain){
          alert("Passwords must match");
          return false;
        }
        fbauth.createUserWithEmailAndPassword(this.email, this.password).then((userCredential) => {
          this.user = userCredential.user;
          this.userAccount = false;
          this.menu = false;
          this.createAccount = false;
        }).catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            alert("This email address is already in use");
          }
        });
      }
    },
    mounted(){}
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
    background-color: #F0F0F0;
  }

  .v-card__text, .v-card__title {
    word-break: normal !important;
  }
</style>