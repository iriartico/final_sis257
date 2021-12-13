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
              >bebeaunclick</router-link
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
              <router-link class="nav-link scrollto" to="/productos"
                >Productos</router-link
              >
            </li>

            <li class="dropdown">
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
                  <router-link class="nav-link scrollto" to="/clientes"
                    >Clientes</router-link
                  >
                </li>
                <li>
                  <router-link class="nav-link scrollto" to="/empleados"
                    >Empleados</router-link
                  >
                </li>
                <li><a href="#">Pedidos</a></li>
              </ul>
            </li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>

        <a href="#" class="book-a-table-btn scrollto">Iniciar sesion</a>
      </div>
    </header>
    <!-- End Header -->
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>
