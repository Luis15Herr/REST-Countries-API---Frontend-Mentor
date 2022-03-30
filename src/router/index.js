import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/country/:name",
    /*  redirect: (to) => {
      return { path: "/country", query: { q: to.params.name } };
    }, */
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
