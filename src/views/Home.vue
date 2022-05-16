<template>
  <v-row class="text-center mx-6">
    <v-col class="mb-4" cols="12">
      <h1 class="subheading font-weight-regular">
        What are you in the mood for?
      </h1>
    </v-col>
    <v-col
      class="mb-4"
      md="2"
      v-for="category in categories"
      :key="category.name"
    >
      <v-card
        style="cursor:pointer"
        :to="'/Category/' + category.name"
        v-if="category.name"
      >
        <v-img
          :src="category.image"
          :to="'/Category/' + category.name"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="400px"
        >
          <v-card-title
            v-text="category.name"
            :to="'/Category/' + category.name"
          ></v-card-title>
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
    tempCategories: [],
  }),
  methods: {
    obtainCategories() {
      db.collection("Categories")
        .orderBy("name", "asc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let item = doc.data();
            this.tempCategories.push({
              name: item.name,
              image: "",
            });
            const listRef = fbstorage.ref("categories/" + item.name + ".jpg");
            listRef.getDownloadURL().then((url) => {
              this.tempCategories.forEach((element) => {
                if (element.name == item.name) {
                  element.image = url;
                }
              });
            });
          });
          this.tempCategories.sort(function(a, b) {
            return a.name - b.name;
          });
        });
    },
  },
  computed: {
    categories() {
      return this.tempCategories;
    },
  },
  mounted() {
    this.obtainCategories();
  },
};
</script>

<style lang="scss">
h1 {
  font-family: "EB Garamond", serif;
}
</style>
