import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Generator from "../views/Generator.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Generator",
    component: Generator
  }
];

const router = new VueRouter({
  routes
});

export default router;
