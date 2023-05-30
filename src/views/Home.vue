<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h1 style="font-family: EB Garamond,serif;font-size:50px">What are you in the mood for?</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col lg="2" md="4" sm="6" cols="12" v-for="category in sortedCategories" :key="category.name">
      <v-card style="cursor:pointer" :to="'/Category/' + category.name" v-if="category.name">
        <v-img
          :src="`https://firebasestorage.googleapis.com/v0/b/veganrecipes-11631.appspot.com/o/categories%2F${category.name}.jpg?alt=media`"
          height="300px"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          cover
        ></v-img>
        <v-card-title>
          {{ category.name }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { useFirestore } from 'vuefire';
  import { useCollection } from 'vuefire';
  import { collection } from 'firebase/firestore';

  export default {
    data: () => ({
      categories: []
    }),
    methods: {
      getCategories() {
        const db = useFirestore();
        const Categories = useCollection(collection(db, 'Categories'));
        this.categories = Categories;
      }
    },
    computed: {
      sortedCategories() {
        var categories = this.categories;
        return categories.sort((a, b) => {
          if (a.name < b.name ){
            return -1;
          }
          if ( a.name > b.name ){
            return 1;
          }
          return 0;
        });
      }
    },
    mounted() {
      this.getCategories();
    }
  }
</script>
