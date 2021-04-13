<template>
    <v-container>
        <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title style="cursor:pointer;" @click="doAction">{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-alert v-model="goodAlert" type="success" close-text="Close Alert" dismissible style="position: fixed; bottom: 50px; right: 20px; z-index:100;">
            Your recipe has successfully been added!
        </v-alert>
        <v-alert v-model="badAlert" type="error" close-text="Close Alert" dismissible style="position: fixed; bottom: 50px; right: 20px; z-index:100;">
            Your recipe failed to upload, please try again!
        </v-alert>
        <v-row class="text-center" style="margin-top: 30px;">
            <v-col md="12">
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="name" label="Recipe Name" solo required></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" md="2">
                            <v-text-field v-model="servingSize" label="Serving Size" solo required></v-text-field>
                        </v-col>

                        <v-col cols="12" md="2">
                            <v-select v-model="categories" :items="selectableCategories" label="Categories" solo multiple chips></v-select>
                        </v-col>

                        <v-col cols="12" md="2">
                            <v-file-input counter show-size truncate-length="15" @change="selectFile" solo></v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <v-sheet style="padding: 20px;">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="tempSetupStep" label="Setup Step" placeholder="Preheat Oven to 200 degrees" solo required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-btn @click="addNewSetupStep()" class="warning">Add Setup Step</v-btn>
                                    </v-col>
                                </v-row>
                                 <v-row>
                                    <v-col md="12">
                                        <v-data-table :headers="[{text:'Setup Step',value:'setupStep'}]" :items="tempSetupSteps" item-key="setupStep" class="elevation-1" @contextmenu:row="show"></v-data-table>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row style="margin-top: 50px;">
                        <v-col md="12">
                            <v-sheet style="padding: 20px;">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field v-model="tempIngredientParent" label="Ingredient Parent" placeholder="For the dumplings" solo required></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="tempIngredient" label="Ingredient" placeholder="Plain Flour" solo required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" style="margin-top:0px;">
                                        <v-btn @click="addNewIngredient" class="warning">Add Ingredient</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="12">
                                        <v-data-table :headers="[{text:'Parent',value:'parent'},{text:'Ingredient',value:'ingredient'}]" show-group-by :items="tempIngredients" item-key="ingredient" class="elevation-1" group-by="parent" @contextmenu:row="show"></v-data-table>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row style="margin-top: 50px;">
                        <v-col md="12">
                            <v-sheet style="padding: 20px;">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="tempStepName" label="Step Name" placeholder="Make the dumplings" solo required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea v-model="tempStepInstructions" label="Step Instructions" placeholder="Mix ingredients. Split it to equal sized balls." solo required></v-textarea>
                                    </v-col>
                                    <v-col cols="12" style="margin-top:0px;">
                                        <v-btn @click="addNewStep" class="warning">Add Step</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="12">
                                        <v-data-table :headers="[{text:'Step',value:'step'},{text:'Instructions',value:'instructions'}]" :items="tempSteps" item-key="instructions" class="elevation-1" @contextmenu:row="show"></v-data-table>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <v-btn @click="addNewRecipe" class="primary">Add Recipe</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { db, fbstorage } from '../firebaseDatabase';
    export default {
        name: 'HelloWorld',
        data: () => ({
            uploadFile: undefined,
            // -------
            goodAlert: false,
            badAlert: false,
            showMenu: false,
            contextMenuParent: undefined,
            contextMenuItem: undefined,
            x: 0,
            y: 0,
            items: [
                { title: "Move Up" },
                { title: "Move Down" },
                { title: "Delete" },
            ],
            // -------
            categories: [],
            ingredients: {},
            ingredientsOrder: [],
            name: "",
            servingSize: "",
            setup: [],
            steps: {},
            stepsOrder: [],
            // -------
            selectableCategories: [],
            // -------
            tempIngredientParent: '',
            tempIngredient: '',
            tempIngredients: [],

            tempSetupStep: '',
            tempSetupSteps: [],

            tempStepName: '',
            tempStepInstructions: '',
            tempSteps: [],
        }),
        methods: {
            addNewRecipe() {
                var i;
                for (i = 0; i < this.tempSetupSteps.length; i++){
                    this.setup.push(this.tempSetupSteps[i].setupStep);
                }
                for (i = 0; i < this.tempSteps.length; i++){
                    this.stepsOrder.push(this.tempSteps[i].step);
                    this.steps[this.tempSteps[i].step] = this.tempSteps[i].instructions;
                }
                for (i = 0; i < this.tempIngredients.length; i++){
                    if (this.ingredientsOrder.includes(this.tempIngredients[i].parent) == false) {
                        this.ingredientsOrder.push(this.tempIngredients[i].parent);
                    }
                    if (this.ingredients[this.tempIngredients[i].parent] == undefined) {
                        this.ingredients[this.tempIngredients[i].parent] = [];
                    }
                    this.ingredients[this.tempIngredients[i].parent].push(this.tempIngredients[i].ingredient);
                }
                var test = {
                    name: this.name,
                    servingSize: this.servingSize,
                    setup: this.setup,
                    categories: this.categories,
                    steps: this.steps,
                    stepsOrder: this.stepsOrder,
                    ingredientsOrder: this.ingredientsOrder,
                    ingredients: this.ingredients
                };
                db.collection("Recipes").add(test).then(() => { this.goodAlert = true; }).catch(() => { this.badAlert = true; });

                var storageRef = fbstorage.ref();
                var metadata = {
                    contentType: 'image/jpeg'
                };
                storageRef.child('meals/' + this.name+'.jpg').put(this.uploadFile, metadata);
            },
            addNewIngredient() {
                if (this.tempIngredient != '' && this.tempIngredientParent != '') {
                    this.tempIngredients.push({parent: this.tempIngredientParent, ingredient: this.tempIngredient});
                    this.tempIngredient = '';
                }
            },
            addNewSetupStep() {
                if (this.tempSetupStep != ''){
                    this.tempSetupSteps.push({setupStep: this.tempSetupStep});
                    this.tempSetupStep = '';
                }
            },
            addNewStep() {
                if (this.tempStepName != '' && this.tempStepInstructions != '') {
                    this.tempSteps.push({step: this.tempStepName, instructions: this.tempStepInstructions});
                    this.tempStepName = ''; this.tempStepInstructions = '';
                }
            },
            show(e) {
                this.contextMenuParent = e.path[3].innerText;
                this.contextMenuItem = e.target.innerText;
                e.preventDefault();
                this.showMenu = false;
                this.x = e.clientX;
                this.y = e.clientY;
                this.$nextTick(() => {
                    this.showMenu = true;
                });
            },
            doAction(e){
                var x;
                if (this.contextMenuParent.includes('Setup')){
                    switch (e.target.innerText) {
                        case "Move Up":
                            this.tempSetupSteps.forEach((element, index) => { if (element.setupStep == this.contextMenuItem){x = index; } });
                            if (x != 0) {
                                array_move(this.tempSetupSteps, x, x-1);
                            }
                            break;
                        case "Move Down":
                            this.tempSetupSteps.forEach((element, index) => { if (element.setupStep == this.contextMenuItem){x = index; } });
                            if (x != this.tempSetupSteps.length - 1) {
                                array_move(this.tempSetupSteps, x, x+1);
                            }
                            break;
                        case "Delete":
                            this.tempSetupSteps.forEach((element, index) => {
                                if (element.setupStep == this.contextMenuItem){
                                    this.tempSetupSteps.splice(index, 1);
                                }
                            });
                            break;
                    }
                } else if (this.contextMenuParent.includes('Ingredient')){
                    switch (e.target.innerText) {
                        case "Move Up":
                            this.tempIngredients.forEach((element, index) => { if (element.ingredient == this.contextMenuItem){x = index; } });
                            if (x != 0) {
                                array_move(this.tempIngredients, x, x-1);
                            }
                            break;
                        case "Move Down":
                            this.tempIngredients.forEach((element, index) => { if (element.ingredient == this.contextMenuItem){x = index; } });
                            if (x != this.tempIngredients.length - 1) {
                                array_move(this.tempIngredients, x, x+1);
                            }
                            break;
                        case "Delete":
                            this.tempIngredients.forEach((element, index) => {
                                if (element.ingredient == this.contextMenuItem){
                                    this.tempIngredients.splice(index, 1);
                                }
                            });
                            break;
                    }
                } else {
                    switch (e.target.innerText) {
                        case "Move Up":
                            this.tempSteps.forEach((element, index) => { if (element.instructions == this.contextMenuItem){x = index; } });
                            if (x != 0) {
                                array_move(this.tempSteps, x, x-1);
                            }
                            break;
                        case "Move Down":
                            this.tempSteps.forEach((element, index) => { if (element.instructions == this.contextMenuItem){x = index; } });
                            if (x != this.tempSteps.length - 1) {
                                array_move(this.tempSteps, x, x+1);
                            }
                            break;
                        case "Delete":
                            this.tempSteps.forEach((element, index) => {
                                if (element.instructions == this.contextMenuItem){
                                    this.tempSteps.splice(index, 1);
                                }
                            });
                            break;
                    }
                }
            },
            selectFile(file) {
                this.uploadFile = file;
            },
        },
        mounted() {
            db.collection('Categories').orderBy("name", "asc").get().then(snapshot => {
                snapshot.forEach(doc => {
                    let item = doc.data();
                    this.selectableCategories.push(item.name);
                });
            });
        }
    }
    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    }
</script>