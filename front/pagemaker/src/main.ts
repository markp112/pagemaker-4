import { createApp } from "vue";
import { createPinia, setActivePinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/styles/custom-styles.css";
import './index.css';
import { auth } from './services/auth';

const app = createApp(App);
const pinia = createPinia();
setActivePinia(pinia);

app.use(pinia);
app.use(router);
app.mount("#app");
