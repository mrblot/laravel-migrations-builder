import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import feather from "vue-icon";
import Clipboard from "v-clipboard";

Vue.use(Clipboard);

Vue.use(feather, "v-icon");
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
