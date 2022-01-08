<template>
  <div>
    <!-- ======= Header ======= -->
    <header id="header" class="d-flex align-items-center">
      <div
        class="container-fluid container-xl d-flex align-items-center justify-content-between"
      >
        <div class="logo me-auto">
          <h1>
            <router-link class="nav-link scrollto" to="/"
              >bebe<span>aun</span>click</router-link
            >
          </h1>
        </div>

        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li>
              <router-link class="nav-link scrollto" to="/">Inicio</router-link>
            </li>
            <li>
              <router-link class="nav-link scrollto" to="/about"
                >Acerca de</router-link
              >
            </li>

            <li>
              <router-link class="nav-link scrollto" to="/products"
                >Productos</router-link
              >
            </li>

            <li class="dropdown" v-if="authenticate">
              <a href="#"
                ><span>Catalogos</span> <i class="bi bi-chevron-down"></i
              ></a>
              <ul>
                <li>
                  <router-link class="nav-link scrollto" to="/proveedores"
                    >Proveedores</router-link
                  >
                </li>
                <li class="dropdown">
                  <router-link class="nav-link scrollto" to="/productos"
                    >Productos</router-link
                  >
                  <!-- <ul>
                    <li><a href="#">None</a></li>
                    <li><a href="#">None</a></li>
                    <li><a href="#">None</a></li>
                  </ul> -->
                </li>
                <li>
                  <router-link class="nav-link scrollto" to="/sucursales"
                    >Sucursales</router-link
                  >
                </li>
                <li>
                  <router-link class="nav-link scrollto" to="/empleados"
                    >Empleados</router-link
                  >
                </li>
                <li>
                  <router-link class="nav-link scrollto" to="/clientes"
                    >Clientes</router-link
                  >
                </li>
              </ul>
            </li>
            <li>
              <a class="nav-link scrollto" href="#" v-if="authenticate"
                >Hola {{ currentUser }}
              </a>
            </li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <router-link
          class="book-a-table-btn scrollto"
          v-if="!authenticate"
          to="/login"
          @click="login"
          >Iniciar sesi&oacute;n</router-link
        >
        <router-link
          class="book-a-table-btn scrollto"
          v-if="authenticate"
          to="/login"
          @click="logout"
          >Cerrar sesi&oacute;n</router-link
        >
      </div>
    </header>
    <!-- End Header -->
  </div>
</template>

<script>
import auth from "../../services/AuthDataService";

export default {
  name: "Header",
  data() {
    return {
      authenticate: auth.getUserLogged(),
    };
  },
  methods: {
    login() {},
    logout() {
      auth.deleteUserLogged();
      this.authenticate = null;
    },
  },
  computed: {
    currentUser() {
      if (this.authenticate) {
        console.log(JSON.parse(auth.getUserLogged()).username);
        var response = JSON.parse(auth.getUserLogged());
        return response.username;
      } else return "";
    },
  },
};
</script>
