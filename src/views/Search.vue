<template>
  <v-row class="text-center mx-6" style="margin-top: 30px;">
    <v-col md="2" v-for="recipe in recipes" :key="recipe.name">
      <v-card
        style="cursor:pointer"
        :to="'/Meal/' + recipe.name"
        v-if="recipe.name"
      >
        <v-img
          :src="recipe.image"
          class="white--text align-end"
          gradien
          t="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="400px"
        >
          <v-card-title v-text="recipe.name"></v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { db, fbstorage } from "../firebaseDatabase";
export default {
  name: "HelloWorld",

  data: () => ({
    recipes: [],
  }),
  methods: {
    doSearch() {
      this.recipes = [];
      db.collection("Recipes")
        .orderBy("name", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let item = doc.data();
            if (
              new RegExp(this.search, "i").test(item.name) ||
              new RegExp(this.search, "i").test(item.categories)
            ) {
              const listRef = fbstorage.ref("meals/" + item.name + ".jpg");
              listRef.getDownloadURL().then((url) => {
                this.recipes.push({
                  name: item.name,
                  image: url,
                });
              });
            }
          });
        });
    },
  },
  watch: {
    search() {
      this.doSearch();
    },
  },
  computed: {
    ...mapState(["search"]),
  },
  mounted() {
    this.doSearch();
  },
};
</script>
