<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h1 style="font-family: EB Garamond,serif;font-size:50px">What are you in the mood for?</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col lg="2" md="4" sm="6" cols="12" v-for="recipe in sortedRecipes" :key="recipe.name">
      <item-card :item="recipe" url="Recipe" image="meals"></item-card>
    </v-col>
  </v-row>
</template>

<script>
  import db from '@/firebase';
  import { useCollection } from 'vuefire';
  import { collection, query, where } from 'firebase/firestore';
  import itemCard from '@/components/itemCard.vue';

  export default {
    components: {
      itemCard
    },
    data: () => ({
      recipes: []
    }),
    methods: {
      getRecipes() {
        const Recipes = collection(db, 'Recipes');
        const RecipesQuery = useCollection(query(Recipes, where("categories", "array-contains", this.$route.params.category)));

        this.recipes = RecipesQuery;
      }
    },
    computed: {
      sortedRecipes() {
        var recipes = this.recipes;
        return recipes.sort((a, b) => {
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
      this.getRecipes();
    }
  }
</script>
