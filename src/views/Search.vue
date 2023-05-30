<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h1 style="font-family: EB Garamond,serif;font-size:50px">Search Results</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col lg="2" md="4" sm="6" cols="12" v-for="recipe in sortedRecipes" :key="recipe.name">
      <v-card style="cursor:pointer" :to="'/Recipe/' + recipe.name" v-if="recipe.name">
        <v-img
          :src="`https://firebasestorage.googleapis.com/v0/b/veganrecipes-11631.appspot.com/o/meals%2F${recipe.name}.jpg?alt=media`"
          height="300px"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          cover
        ></v-img>
        <v-card-title>
          {{ recipe.name }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import db from '@/firebase';
  import { useCollection } from 'vuefire';
  import { collection } from 'firebase/firestore';

  export default {
    data: () => ({
      recipes: []
    }),
    methods: {
      getRecipes() {
        const Recipes = useCollection(collection(db, 'Recipes'));

        console.log(Recipes);

        this.recipes = Recipes;
      }
    },
    computed: {
      sortedRecipes() {
        var recipes = this.recipes.filter((recipe) => { return recipe.name.toLowerCase().includes(this.testing.toLowerCase())});
        return recipes.sort((a, b) => {
          if (a.name < b.name ){
            return -1;
          }
          if ( a.name > b.name ){
            return 1;
          }
          return 0;
        });
      },
      testing() {
        return this.$route.params.name;
      }
    },
    watch: {
      testing: {
        handler() {
          this.getRecipes();
        },immediate: true
      }
    },
    mounted() {
      this.getRecipes();
    }
  }
</script>
