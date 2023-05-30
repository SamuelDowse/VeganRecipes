<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon icon="mdi-plus"></v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center text-white" style="background-color: green">
          Add Recipe
        </v-card-title>
        <v-card-text>
          <form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="name"
                  label="Recipe Name"
                  variant="solo-filled"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field
                  v-model="servingSize"
                  label="Serving Size"
                  variant="solo-filled"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-select
                  v-model="categories"
                  :items="selectableCategories"
                  label="Categories"
                  variant="solo-filled"
                  item-title="name"
                  item-value="name"
                  multiple
                  chips
                ></v-select>
              </v-col>

              <v-col cols="12" md="2">
                <v-file-input
                  counter
                  show-size
                  v-model="uploadFile"
                  truncate-length="15"
                  variant="solo-filled"
                ></v-file-input>
              </v-col>
            </v-row>


            <v-card elevation="12">
              <v-card-title style="background-color: rgba(128,0,0,0.6)">
                Setup Steps
              </v-card-title>
              <v-card-text class="pa-5">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="tempSetupStep"
                      label="Setup Step"
                      placeholder="Preheat Oven to 200 degrees"
                      required
                      density="compact"
                      hide-details="true"
                      append-inner-icon="mdi-plus"
                      @click:append-inner="addNewSetupStep"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12">
                    <v-data-table
                      :headers="[{ title: 'Setup Step', key: 'setupStep' },{ title: 'Actions', key: 'actions', width: '240px' },]"
                      :items="tempSetupSteps"
                      item-key="setupStep"
                    >
                      <template #[`item.actions`]="{ item }">
                        <v-btn @click="moveUp(item.index, tempSetupSteps)" variant="text">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn @click="moveDown(item.index, tempSetupSteps)" variant="text">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn @click="deleteItem(item.index, tempSetupSteps)" variant="text">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card elevation="12" class="mt-4">
              <v-card-title style="background-color: rgba(0,128,0,0.6)">
                Ingredients
              </v-card-title>
              <v-card-text class="pa-5">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="tempIngredientParent"
                      label="Ingredient Parent"
                      placeholder="For the dumplings"
                      hide-details="true"
                      density="compact"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="tempIngredient"
                      label="Ingredient"
                      placeholder="Plain Flour"
                      density="compact"
                      hide-details="true"
                      append-inner-icon="mdi-plus"
                      required
                      @click:append-inner="addNewIngredient"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12">
                    <v-data-table
                      :headers="[
                        { title: 'Parent', key: 'parent' },
                        { title: 'Ingredient', key: 'ingredient' },
                        { title: 'Actions', key: 'actions', width: '240px' },
                      ]"
                      show-group-by
                      :items="tempIngredients"
                      item-key="ingredient"
                      :group-by="[{ key: 'parent', order: 'asc' }]"
                    >
                      <template #[`item.actions`]="{ item }">
                        <v-btn @click="deleteItem(item.ingredient, tempIngredients)" variant="text">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>


            <v-card elevation="12" class="mt-4">
              <v-card-title style="background-color: rgba(0,0,128,0.6)">
                Cooking Steps
              </v-card-title>
              <v-card-text class="pa-5">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="tempStepName"
                      label="Step Name"
                      placeholder="Make the dumplings"
                      hide-details="true"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="tempStepInstructions"
                      label="Step Instructions"
                      placeholder="Mix ingredients. Split it to equal sized balls."
                      hide-details="true"
                      required
                      append-inner-icon="mdi-plus"
                      @click:append-inner="addNewStep"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12">
                    <v-data-table
                      :headers="[
                        { title: 'Step', key: 'step' },
                        { title: 'Instructions', key: 'instructions' },
                        { title: 'Actions', key: 'actions', width: '240px' },
                      ]"
                      :items="tempSteps"
                      item-key="instructions"
                    >
                      <template #[`item.actions`]="{ item }">
                        <v-btn @click="moveUp(item.instructions, tempSteps)" variant="text">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn @click="moveDown(item.instructions, tempSteps)" variant="text">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn @click="deleteItem(item.instructions, tempSteps)" variant="text">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="disabled" @click="addNewRecipe">Add Recipe</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '@/firebase';
import { useCollection } from 'vuefire';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
  data () {
    return {
      dialog: false,
      uploadFile: undefined,
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
      tempIngredientParent: "",
      tempIngredient: "",
      tempIngredients: [],

      tempSetupStep: "",
      tempSetupSteps: [],

      tempStepName: "",
      tempStepInstructions: "",
      tempSteps: [],
    }
  },
  methods: {
    async addNewRecipe() {
      var i;
      for (i = 0; i < this.tempSetupSteps.length; i++) {
        this.setup.push(this.tempSetupSteps[i].setupStep);
      }
      for (i = 0; i < this.tempSteps.length; i++) {
        this.stepsOrder.push(this.tempSteps[i].step);
        this.steps[this.tempSteps[i].step] = this.tempSteps[i].instructions;
      }
      for (i = 0; i < this.tempIngredients.length; i++) {
        if (this.ingredientsOrder.includes(this.tempIngredients[i].parent) == false) {
          this.ingredientsOrder.push(this.tempIngredients[i].parent);
        }
        if (this.ingredients[this.tempIngredients[i].parent] == undefined) {
          this.ingredients[this.tempIngredients[i].parent] = [];
        }
        this.ingredients[this.tempIngredients[i].parent].push(
          this.tempIngredients[i].ingredient
        );
      }
      var recipePayload = {
        name: this.name,
        servingSize: this.servingSize,
        setup: this.setup,
        categories: this.categories,
        steps: this.steps,
        stepsOrder: this.stepsOrder,
        ingredientsOrder: this.ingredientsOrder,
        ingredients: this.ingredients,
      };


      const docRef = await addDoc(collection(db, "Recipes"), recipePayload);
      console.log("Document written with ID: ", docRef.id);
      if (docRef.id) {
        const storage = getStorage();
        const storageRef = ref(storage, `meals/${this.name}.jpg`);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, this.uploadFile[0]).then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
          this.dialog = false;
        });
      }
    },
    addNewIngredient() {
      if (this.tempIngredient != "" && this.tempIngredientParent != "") {
        this.tempIngredients.push({
          parent: this.tempIngredientParent,
          ingredient: this.tempIngredient,
        });
        this.tempIngredient = "";
      }
    },
    addNewSetupStep() {
      if (this.tempSetupStep != "") {
        this.tempSetupSteps.push({ setupStep: this.tempSetupStep });
        this.tempSetupStep = "";
      }
    },
    addNewStep() {
      if (this.tempStepName != "" && this.tempStepInstructions != "") {
        this.tempSteps.push({
          step: this.tempStepName,
          instructions: this.tempStepInstructions,
        });
        this.tempStepName = "";
        this.tempStepInstructions = "";
      }
    },
    moveUp(index, array) {
      if (index != 0) array_move(array, index, index - 1);
    },
    moveDown(index, array) {
      if (index != array.length - 1) array_move(array, index, index + 1);
    },
    deleteItem(index, array) {
      array.splice(index, 1);
    },
    selectFile(file) {
      this.uploadFile = file;
    },
  },
  mounted() {
    const Categories = useCollection(collection(db, 'Categories'));
    this.selectableCategories = Categories;
  },
  computed: {
    disabled() {
      if (this.categories.length == 0) {
        return true;
      }
      if (this.tempIngredients.length == 0) {
        return true;
      }
      if (!this.name) {
        return true;
      }
      if (!this.servingSize) {
        return true;
      }
      if (this.tempSetupSteps.length == 0) {
        return true;
      }
      if (this.tempSteps.length == 0) {
        return true;
      }

      return false;
    },
  },
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