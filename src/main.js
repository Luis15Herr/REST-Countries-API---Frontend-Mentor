import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import SequentialEntrance from "vue-sequential-entrance";
import "vue-sequential-entrance/vue-sequential-entrance.css";

createApp(App).use(router).mount("#app");
App.use(SequentialEntrance);
