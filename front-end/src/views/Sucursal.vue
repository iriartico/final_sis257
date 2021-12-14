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
              Sucursales
            </li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-12 text-center" style="color: white">
            <h2>Lista de Sucursales</h2>
          </div>
          <div class="col-12 text-left">
            <router-link class="breadcrumb-item" to="/sucursales/create"
              ><ion-icon name="add-outline"></ion-icon> Crear nueva
            </router-link>
          </div>
        </div>

        <div class="table container">
          <table class="table table-dark table-striped" id="tableSucursals">
            <thead>
              <tr>
                <th>N°</th>
                <th>Descripcion</th>
                <th>Direccion</th>
                <th>Zona</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sucursal, index) in sucursales" :key="sucursal.id">
                <td>{{ index + 1 }}</td>
                <td>{{ sucursal.descripcion }}</td>
                <td>{{ sucursal.direccion }}</td>
                <td>{{ sucursal.zona }}</td>
                <td>{{ sucursal.ciudad }}</td>
                <!-- <td>dato user</td> -->
                <td>
                  <button
                    class="btn btn-link"
                    @click="updateSucursal(sucursal.id)"
                  >
                    <ion-icon name="create-outline"></ion-icon> Editar
                  </button>
                  <button
                    class="btn btn-link"
                    @click="deleteSucursal(sucursal.id)"
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
      sucursales: [],
      showParentPage: true,
    };
  },
  created() {
    this.getSucursales();
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.showParentPage = toDepth < fromDepth;
    if (this.showParentPage) this.getSucursales();
    next();
  },
  methods: {
    async getSucursales() {
      await http
        .get("sucursales")
        .then((response) => (this.sucursales = response.data));
    },

    updateSucursal(id) {
      this.$router.push("/sucursales/update/" + id);
    },

    async deleteSucursal(id) {
      var resp = confirm(
        "¿Desea elimimar este sucursal de la Lista de Clientes?"
      );
      if (resp == true) {
        await http.delete("sucursales/" + id).then(() => this.getSucursales());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
  },
};
</script>
