<template>
  <section>
    <div class="container" style="background-color: #263238">
      <transition name="fade">
        <router-view @showParent="showParent"></router-view>
      </transition>

      <div v-if="showParentPage" class="pt-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">Inicio</router-link>
            </li>
            <li
              class="breadcrumb-item active align-center"
              arial-current="page"
              style="color: white"
            >
              Proveedores
            </li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-12 text-center" style="color: white">
            <h2>Lista de Proveedores</h2>
          </div>
          <div class="col-12 text-left">
            <router-link class="breadcrumb-item" to="/proveedores/create"
              ><ion-icon name="add-outline"></ion-icon> Crear nuevo
            </router-link>
          </div>
        </div>

        <div class="table container">
          <table class="table table-dark table-striped" id="tableClients">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nombre</th>
                <th>Pais</th>
                <th>Ciudad</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(proveedor, index) in proveedores" :key="proveedor.id">
                <td>{{ index + 1 }}</td>
                <td>{{ proveedor.nombre }}</td>
                <td>{{ proveedor.pais }}</td>
                <td>{{ proveedor.ciudad }}</td>
                <td>{{ proveedor.direccion }}</td>
                <td>{{ proveedor.telefono }}</td>
                <!-- <td>dato user</td> -->
                <td>
                  <button
                    class="btn btn-link"
                    @click="updateProveedor(proveedor.id)"
                  >
                    <ion-icon name="create-outline"></ion-icon> Editar
                  </button>
                  <button
                    class="btn btn-link"
                    @click="deleteProveedor(proveedor.id)"
                  >
                    <ion-icon name="trash-outline"></ion-icon> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <button class="btn btn-link text-left" @click="goHome"></button> -->
    </div>
  </section>
</template>
<script>
import http from "../services/http-common";

export default {
  data() {
    return {
      proveedores: [],
      showParentPage: true,
    };
  },
  created() {
    this.getProveedores();
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.showParentPage = toDepth < fromDepth;
    if (this.showParentPage) this.getProveedores();
    next();
  },
  methods: {
    async getProveedores() {
      await http
        .get("proveedores")
        .then((response) => (this.proveedores = response.data));
    },

    updateProveedor(id) {
      this.$router.push("/proveedores/update/" + id);
    },

    async deleteProveedor(id) {
      var resp = confirm(
        "¿Desea elimimar este proveedor de la Lista de Clientes?"
      );
      if (resp == true) {
        await http
          .delete("proveedores/" + id)
          .then(() => this.getProveedores());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
  },
};
</script>
