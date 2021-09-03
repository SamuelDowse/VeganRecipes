import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import { firestorePlugin } from 'vuefire';

import Home from './views/Home.vue';
import Meal from './views/Meal.vue';
import Category from './views/Category.vue';
import Search from './views/Search.vue';
import AddNew from './views/AddNew.vue';

Vue.use(VueRouter);
Vue.use(firestorePlugin);
Vue.use(Vuex);

const router = new VueRouter({ routes: [
  { path: '/', component: Home, name: 'Home' },
  { path: '/Category', component: Category, name: 'Category' },
  { path: '/Category/:type', component: Category, name: 'CategoryType' },
  { path: '/Meal', component: Meal, name: 'Meal' },
  { path: '/Meal/:id', component: Meal, name: 'MealID' },
  { path: '/Search', component: Search, name: 'Search' },
  { path: '/Search/:id', component: Search, name: 'SearchID' },
  { path: '/AddNew', component: AddNew, name: 'AddNew' },
] });

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        shoppingList: []
    },
    mutations: {
        addToShopping(state, item) {
          if (!state.shoppingList.includes(item)){
            state.shoppingList.push(item);
          }
        },
        removeFromShopping(state, item) {
          state.shoppingList.splice(state.shoppingList.indexOf(item), 1);
        }
    },
    actions: {},
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
