import { createApp } from "vue";
import { createPinia, setActivePinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/custom-styles.css";
import './index.css';
import { FontService } from './services/fonts/font.service';

const app = createApp(App);
const pinia = createPinia();
setActivePinia(pinia);
await FontService().getFontsFromGoogle();
app.use(pinia);
app.use(router);
app.mount("#app");
