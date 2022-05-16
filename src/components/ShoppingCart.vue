<template>
  <div>
    <v-btn @click="displayShoppingList()" style="float:right;">
      <v-icon>mdi-basket</v-icon>
    </v-btn>
    <v-dialog :value="overlay" width="90vw">
      <v-card elevation="3" style="overflow-y:scroll" dark>
        <v-img
          class="white--text align-end mb-6"
          height="100px"
          src="@/assets/shoppingList.jpg"
        >
          <v-card-title class="text-h2">Your Shopping List</v-card-title>
        </v-img>
        <v-card-text class="text--primary" style="color:white !important;">
          <v-expansion-panels
            accordion
            v-if="shoppingListItems.length != 0"
            light
          >
            <v-expansion-panel
              v-for="(item, index) in this.shoppingList"
              :key="index"
            >
              <v-expansion-panel-header>{{ item }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox
                  v-for="listItem in shoppingListItems.filter(
                    (listItem) => listItem.name == item
                  )[0].brokenIngredientsArray"
                  :key="listItem"
                  :label="listItem"
                >
                  {{ listItem }}
                </v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" @click="overlay = false">
            Close Shopping List
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/firebaseDatabase";
export default {
  name: "ShoppingCart",
  data: () => ({
    overlay: false,
    shoppingListItems: [],
  }),
  methods: {
    displayShoppingList() {
      this.overlay = !this.overlay;
      this.shoppingListItems = [];
      for (var i = 0; i < this.shoppingList.length; i++) {
        db.collection("Recipes")
          .where("name", "==", this.shoppingList[i])
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              let item = doc.data();
              item.brokenIngredients = Object.values(item.ingredients);
              item.brokenIngredientsArray = [];
              item.brokenIngredients.forEach((element) => {
                element.forEach((subElement) => {
                  item.brokenIngredientsArray.push(subElement);
                });
              });
              this.shoppingListItems.push(item);
            });
          });
      }
    },
  },
  computed: {
    ...mapState(["shoppingList"]),
  },
};
</script>

<style lang="scss"></style>
