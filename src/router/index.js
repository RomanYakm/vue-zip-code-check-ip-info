import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IPLookupView from "../views/IPLookupView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/iplook",
    name: "IPLookup",
    component: IPLookupView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
