import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import auth from "../services/AuthDataService";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  // {
  //   path: "/productos",
  //   name: "Products",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Products.vue"),
  // },

  {
    path: "/sucursales",
    name: "Sucursal",
    component: () => import("../views/Sucursal.vue"),
    children: [
      {
        path: "create",
        name: "SucursalCreate",
        component: () => import("../components/sucursal/SucursalCreate"),
      },
      {
        path: "update/:id",
        name: "SucursalUpdate",
        component: () => import("../components/sucursal/SucursalUpdate"),
      },
    ],
  },
  {
    path: "/empleados",
    name: "Empleado",
    component: () => import("../views/Empleado.vue"),
    children: [
      {
        path: "create",
        name: "EmpleadoCreate",
        component: () => import("../components/empleado/EmpleadoCreate"),
      },
      {
        path: "update/:id",
        name: "EmpleadoUpdate",
        component: () => import("../components/empleado/EmpleadoUpdate"),
      },
    ],
  },
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
    path: "/proveedores",
    name: "Proveedor",
    component: () => import("../views/Proveedor.vue"),
    children: [
      {
        path: "create",
        name: "ProveedorCreate",
        component: () => import("../components/proveedor/ProveedorCreate"),
      },
      {
        path: "update/:id",
        name: "ProveedorUpdate",
        component: () => import("../components/proveedor/ProveedorUpdate"),
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

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login", "/about"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = auth.getUserLogged();

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router;
