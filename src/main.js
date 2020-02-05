/* eslint-disable no-console */
import Vue from "vue";
import vuetify from "./plugins/vuetify";

import router from "./router/router";
import store from "./store/store";
import App from './App.vue'



Vue.config.productionTip = false;

console.log(router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
