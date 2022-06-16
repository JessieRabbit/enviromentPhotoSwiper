import Vue from "vue";
import App from "./App.vue";
import bodyLock from "@/pages/index/directive/bodyLock";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);

Vue.directive("body-lock", bodyLock);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
