<template>
    <v-container>
        <v-breadcrumbs></v-breadcrumbs>
        <v-row class="text-center" style="margin-top: 30px;">
            <v-col class="mb-4" md="2" v-for="recipe in recipes" :key="recipe.name">
                <v-card style="cursor:pointer" @click="routeToMeal(recipe.name)" v-if="recipe.name">
                    <v-img lazy-src="../assets/loading.gif" :src="recipe.image" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px">
                        <v-card-title v-text="recipe.name"></v-card-title>
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
            recipes: [],
        }),
        methods: {
            routeToMeal(routeName) {
                this.$router.push({ name: 'MealID', params: { id: routeName.replaceAll("'", "") } })
            }
        },
        mounted() {
            this.recipes = [];
            db.collection('Recipes').orderBy("name", "asc").where("categories", "array-contains", this.$route.params.type).get().then(snapshot => {
                snapshot.forEach(doc => {
                    let item = doc.data();
                    const listRef = fbstorage.ref('meals/'+item.name+'.jpg');
                    listRef.getDownloadURL().then((url) => {
                        this.recipes.push({
                            name: item.name,
                            image: url
                        });
                    });
                });
            });
        }
    }
</script>