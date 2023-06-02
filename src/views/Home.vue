<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h1 style="font-family: EB Garamond,serif;font-size:50px;">What are you in the mood for?</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col lg="2" md="4" sm="6" cols="12" v-for="category in sortedCategories" :key="category.name">
      <item-card :item="category" url="Category" image="categories"></item-card>
    </v-col>
  </v-row>
</template>

<script>
  import db from '@/firebase';
  import { useCollection } from 'vuefire';
  import { collection } from 'firebase/firestore';
  import ItemCard from '@/components/itemCard.vue';

  export default {
    components: {
      ItemCard
    },
    data: () => ({
      categories: []
    }),
    methods: {
      getCategories() {
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
