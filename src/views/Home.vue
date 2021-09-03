<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4" cols="12">
        <h1 class="subheading font-weight-regular">
          What are you in the mood for?
        </h1>
      </v-col>

      <v-col class="mb-4" md="2" v-for="category in categories" :key="category.name">
        <v-card style="cursor:pointer" @click="routeToCategory(category.name)" v-if="category.name">
          <v-img lazy-src="../assets/loading.gif" :src="category.image" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px">
            <v-card-title v-text="category.name"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { db, fbstorage } from '../firebaseDatabase';
  export default {
    name: 'HelloWorld',

    data: () => ({
      categories: []
    }),
    methods: {
      routeToCategory(routeName) {
        this.$router.push({ name: 'CategoryType', params: { type: routeName.replaceAll("'", "") } })
      }
    },
    mounted() {
      db.collection('Categories').orderBy("name", "asc").get().then(snapshot => {
        snapshot.forEach(doc => {
          let item = doc.data();
          const listRef = fbstorage.ref('categories/'+item.name+'.jpg');
          listRef.getDownloadURL().then((url) => {
            this.categories.push({
              name: item.name,
              image: url
            });
          });
        });
      });
    }
  }
</script>

<style lang="scss">
  h1 {
    font-family: 'EB Garamond', serif;
  }
</style>