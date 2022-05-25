import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:name",
    name: "CountryView",
    component: () => import("../views/CountryView.vue"),
    props: true,
    beforeEnter: (to) => {
      const country = to.params.name;
      const countries = JSON.parse(localStorage.getItem("list"));
      const exist = countries.some((item) => {
        return item.name === country;
      });
      if (!exist)
        return {
          path: "/404",
          component: () => import("../views/NotFound.vue"),
        };
    },
  },
  { path: "/404", component: () => import("../views/NotFound.vue") },
  {
    path: "/:catchAll(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
