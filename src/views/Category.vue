<template>
  <v-row class="text-center mx-6" style="margin-top: 30px;">
    <v-col class="mb-4" md="2" v-for="recipe in recipes" :key="recipe.name">
      <v-card
        style="cursor:pointer"
        :to="'/Meal/' + recipe.name"
        v-if="recipe.name"
      >
        <v-img
          lazy-src="../assets/loading.gif"
          :src="recipe.image"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="400px"
        >
          <v-card-title v-text="recipe.name"></v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { db, fbstorage } from "../firebaseDatabase";
export default {
  name: "HelloWorld",

  data: () => ({
    tempRecipes: [],
  }),
  computed: {
    recipes() {
      return this.tempRecipes;
    },
  },
  methods: {},
  mounted() {
    this.recipes = [];
    db.collection("Recipes")
      .orderBy("name", "asc")
      .where("categories", "array-contains", this.$route.params.type)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let item = doc.data();
          this.tempRecipes.push({
            name: item.name,
            image: "",
          });
          const listRef = fbstorage.ref("meals/" + item.name + ".jpg");
          listRef.getDownloadURL().then((url) => {
            this.tempRecipes.forEach((element) => {
              if (element.name == item.name) {
                element.image = url;
              }
            });
          });
        });
      });
  },
};
</script>
