import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;


document.addEventListener("UniAppJSBridgeReady", function() {
  if (window.uni) {
    Vue.prototype.$uni = window.uni;
    console.log("引入 uni-jssdk 成功", window.uni);
  }
  if (window.plus) {
    Vue.prototype.$plus = window.plus;
    console.log("引入 plus-jssdk 成功", window.plus);
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});