<template>
  <v-container>
    <v-row class="text-left" v-if="recipe.name">
        <v-col md="4">
            <v-img :src="image" style="border-radius:10px;"></v-img>

            <h2>Ingredients</h2>

            <div v-for="(item) in recipe.ingredientsOrder" v-bind:key="item.name">
                <h4>{{item}}</h4>
                <ul>
                    <li v-for="subItem in recipe.ingredients[item]" :key="subItem.name" v-html="subItem"></li>
                </ul>
            </div>
        </v-col>
        <v-col md="8">
            <h1 v-html="recipe.name"></h1>
            <h2 v-html="recipe.setup.join(' &#183; ')"></h2>
            <h3 v-html="'Serving Size: ' + recipe.servingSize"></h3>
            <v-btn style="margin:10px;" class="success" @click="readRecipe()">{{readRecipeButton}}</v-btn>
            <v-btn style="margin:10px;" class="success" @click="addToShoppingCart()">{{shoppingCart}}</v-btn>
            <p v-for="(item) in recipe.stepsOrder" v-bind:key="item.name" style="padding: 10px 0px;" v-html="'<b>'+item+'</b>: '+recipe.steps[item]"></p>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import { db, fbstorage } from '../firebaseDatabase';
    export default {

    name: 'Meal',

    data: () => ({
        recipe: {},
        image: '',
        instructionCount: 0,
        readRecipeButton: 'Read Recipe',
        shoppingCart: 'Add to Shopping Cart'
    }),
    methods: {
        readRecipe() {
            let utter = new SpeechSynthesisUtterance();
            utter.text = this.recipe.steps[this.recipe.stepsOrder[this.instructionCount]];
            window.speechSynthesis.speak(utter);
            if (this.instructionCount < this.recipe.stepsOrder.length -1) {
                this.readRecipeButton = 'Next Step';
                this.instructionCount++;
            } else {
                this.readRecipeButton = 'Read Recipe';
                this.instructionCount = 0;
            }
        },
        addToShoppingCart() {
            if (this.shoppingCart == "Add to Shopping Cart"){ 
                this.$store.commit('addToShopping', this.$route.params.id);
                this.shoppingCart = "Remove from Shopping Cart";
            } else {
                this.$store.commit('removeFromShopping', this.$route.params.id);
                this.shoppingCart = "Add to Shopping Cart";
            }
        }
    },
    mounted() {
        db.collection('Recipes').where("name", "==", this.$route.params.id).get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc);
                let item = doc.data()
                item.id = doc.id
                this.recipe = item;
                const listRef = fbstorage.ref('meals/'+item.name+'.jpg');
                listRef.getDownloadURL().then((url) => { this.image = url; });
            });
        });
        if (this.$store.state.shoppingList.includes(this.$route.params.id)) {
            this.shoppingCart = "Remove from Shopping Cart";
        }
    }
}
</script>