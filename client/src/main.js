import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Socketio from "@/plugins/Socket.io";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

import "primeflex/primeflex.css";
import "primevue/resources/themes/arya-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(Socketio, {
  connection:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:3000"
      : "ws://panstwamiasta.online:3000",
  options: {},
});

app.directive("tooltip", Tooltip);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.mount("#app");
