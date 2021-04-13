<template>
    <v-container>
        <v-row class="text-center" style="margin-top: 30px;">
            <v-col md="2" v-for="recipe in recipes" :key="recipe.name">
                <v-card style="cursor:pointer" @click="routeToMeal(recipe.name)" v-if="recipe.name">
                    <v-img :src="recipe.image" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px" >
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
            recipes: []
        }),
        methods: {
            routeToMeal(routeName) {
                this.$router.push({ path: '/Meal?id='+routeName.replaceAll("\"", "") });
            }
        },
        mounted() {
            this.recipes = [];
            db.collection('Recipes').orderBy("name", "desc").get().then(snapshot => {
                snapshot.forEach(doc => {
                    let item = doc.data();
                    if (new RegExp(this.$route.params.id, 'i').test(item.name) || new RegExp(this.$route.params.id, 'i').test(item.categories)){
                        const listRef = fbstorage.ref('meals/'+item.name+'.jpg');
                        listRef.getDownloadURL().then((url) => {
                            this.recipes.push({
                                name: item.name,
                                image: url
                            });
                        });
                    }
                });
            });
        },
        beforeRouteUpdate(to) {
            this.recipes = [];
            db.collection('Recipes').orderBy("name", "desc").get().then(snapshot => {
                snapshot.forEach(doc => {
                    let item = doc.data();
                    if (new RegExp(to.params.id, 'i').test(item.name) || new RegExp(to.params.id, 'i').test(item.categories)){
                        const listRef = fbstorage.ref('meals/'+item.name+'.jpg');
                        listRef.getDownloadURL().then((url) => {
                            this.recipes.push({
                                name: item.name,
                                image: url
                            });
                        });
                    }
                });
            });
        }
    }
</script>