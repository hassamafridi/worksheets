import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import test from './views/test.vue';

const app = createApp(App);
app.component('test', test);


app.use(store).use(router).mount("#app");
