import { createRouter, createWebHistory } from "vue-router";
import useAuth from "./composable/useAuth";

import Index from "./pages/index.vue";
import About from "./pages/about.vue";
import Hello from "./pages/hello.vue";
import Shop from "./pages/shop.vue";
import Login from "./pages/login.vue";
import Secret from "./pages/secret.vue";
import NotFound from "./pages/404.vue";

const { isAuthenticated } = useAuth();

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/hello",
    name: "Hello",
    component: Hello,
  },
  {
      path: "/shop",
      name: "Shop",
      component: Shop,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/secret",
      name: "Secret",
      component: Secret,
      beforeEnter: (to, from, next) => {
        console.log(isAuthenticated);
        if (!isAuthenticated.value) {
          next("/login");
        }
        next();
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;