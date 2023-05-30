import App from '@/App.vue';
import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import { registerPlugins } from '@/plugins';
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from './firebase';

const app = createApp(App);

registerPlugins(app);

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth()
  ]
});

app.mount('#app');