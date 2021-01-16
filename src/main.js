import Vue from "vue";
import Vant from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import 'vant/lib/index.css';

import './g/g.js'
import './g/u.js'
// import './g/net.js'
import './g/ut.js'
import './g/ui.js'
import './g/vue.js'

Vue.use(Vant)
const Html5Plus = navigator.userAgent.includes('Html5Plus')

// 判断是不是在APP中
if(Html5Plus){
document.addEventListener("UniAppJSBridgeReady", function() {
  if (window.uni) {
    Vue.prototype.$uni = window.uni;
    console.log("引入 uni-jssdk 成功", window.uni);
  }
  if (window.plus) {
    Vue.prototype.$plus = window.plus;
    window.plus.navigator.setStatusBarStyle("dark");
    console.log("引入 plus-jssdk 成功", window.plus);
  }
  mountVue()
})
}else{
  mountVue()
}

function mountVue(){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}

