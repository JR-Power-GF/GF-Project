import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { myPlugin } from "@/utils/plugins";
import "./assets/style/index.css";
import "normalize.css";
const app = createApp(App);
app.use(myPlugin);
app.use(router);

app.mount("#app");
