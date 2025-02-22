import { createApp } from "vue";
import "assets/scss/main.scss";
import App from "./App.vue";

import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);

app.use(pinia).mount("#app");
