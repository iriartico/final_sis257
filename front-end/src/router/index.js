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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // {
  //   path: "/productos",
  //   name: "Products",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Products.vue"),
  // },
  {
    path: "/clientes",
    name: "Cliente",
    component: () => import("../views/Cliente.vue"),
    children: [
      {
        path: "create",
        name: "ClienteCreate",
        component: () => import("../components/cliente/ClienteCreate"),
      },
      {
        path: "update/:id",
        name: "ClienteUpdate",
        component: () => import("../components/cliente/ClienteUpdate"),
      },
    ],
  },
  {
    path: "/productos",
    name: "Producto",
    component: () => import("../views/Producto.vue"),
    children: [
      {
        path: "create",
        name: "ProductoCreate",
        component: () => import("../components/producto/ProductoCreate"),
      },
      {
        path: "update/:id",
        name: "ProductoUpdate",
        component: () => import("../components/producto/ProductoUpdate"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
