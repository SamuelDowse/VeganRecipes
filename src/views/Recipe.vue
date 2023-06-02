<template>
  <v-row class="pt-4">
    <v-col cols="12" lg="4">
      <v-img
        :src="`https://firebasestorage.googleapis.com/v0/b/veganrecipes-11631.appspot.com/o/meals%2F${this.$route.params.recipe}.jpg?alt=media`"
        style="border-radius: 10px;"
      ></v-img>
      <v-card v-for="item in recipe?.ingredientsOrder" :key="item" class="mt-3">
        <v-card-title>
          {{ item }}
        </v-card-title>
        <v-card-text>
          <span v-for="ingredient in recipe.ingredients[item]" :key="ingredient">
            {{ ingredient }}<br/>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="8">
      <h1 style="font-family: EB Garamond,serif; font-size: 50px;">{{ recipe?.name }}</h1>
      <h2 v-html="recipe?.setup?.join(' &#183; ')"></h2>
      <b><i>Serving Size: {{ recipe?.servingSize }}</i></b><br/><br/>

      <v-card v-for="item in recipe?.stepsOrder" :key="item" class="mb-1">
        <v-card-title>
          <v-checkbox v-model="selected" hide-details="true" :label="item" :value="item"></v-checkbox>
        </v-card-title>
        <v-card-text :class="selected.includes(item) ? 'text-decoration-line-through text-grey' : ''">{{ recipe.steps[item] }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import db from '@/firebase';
  import { useCollection } from 'vuefire';
  import { collection, query, where } from 'firebase/firestore';

  export default {
    data: () => ({
      foundRecipe: [],
      selected: []
    }),
    methods: {
      getRecipe() {
        const Recipes = collection(db, 'Recipes');
        const RecipesQuery = useCollection(query(Recipes, where("name", "==", this.$route.params.recipe)));

        this.foundRecipe = RecipesQuery;
      }
    },
    computed: {
      recipe() {
        return this.foundRecipe[0] || [];
      }
    },
    mounted() {
      this.getRecipe();
    }
  }
</script>
