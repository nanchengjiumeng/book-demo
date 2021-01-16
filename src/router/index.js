import Vue from "vue";
import VueRouter from "vue-router";
import ViewTree from "../views/tree";
import ViewAns from "../views/ans";
// import ViewCuo from "../views/cuo";
// import ViewVdi from "../views/vdi";

Vue.use(VueRouter);

const routes = [
  {
    path: "/ans/:number",
    name: "Answer",
    component: ViewAns
  },
  {
    path: "",
    name: "Home",
    component: ViewTree
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
