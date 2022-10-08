import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/styles/custom-styles.css";
import './index.css'

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
