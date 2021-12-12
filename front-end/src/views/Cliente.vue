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
              Clientes
            </li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-12 text-center" style="color: white">
            <h2>Lista de Clientes</h2>
          </div>
          <div class="col-12 text-left">
            <router-link class="breadcrumb-item" to="/clientes/create"
              ><ion-icon name="person-add-outline"></ion-icon> Crear nuevo
            </router-link>
          </div>
        </div>

        <div class="table container">
          <table class="table table-dark table-striped" id="tableClients">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cliente, index) in clientes" :key="cliente.id">
                <td>{{ index + 1 }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.apellidoP }}</td>
                <td>{{ cliente.apellidoM }}</td>
                <td>{{ cliente.usuario }}</td>
                <td>{{ cliente.email }}</td>
                <!-- <td>dato user</td> -->
                <td>
                  <button
                    class="btn btn-link"
                    @click="updateCliente(cliente.id)"
                  >
                    <ion-icon name="create-outline"></ion-icon> Editar
                  </button>
                  <button
                    class="btn btn-link"
                    @click="deleteCliente(cliente.id)"
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
      clientes: [],
      showParentPage: true,
    };
  },
  created() {
    this.getClientes();
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.showParentPage = toDepth < fromDepth;
    if (this.showParentPage) this.getClientes();
    next();
  },
  methods: {
    async getClientes() {
      await http
        .get("clientes")
        .then((response) => (this.clientes = response.data));
    },

    updateCliente(id) {
      this.$router.push("/clientes/update/" + id);
    },

    async deleteCliente(id) {
      var resp = confirm(
        "¿Desea elimimar a este cliente de la Lista de Clientes?"
      );
      if (resp == true) {
        await http.delete("clientes/" + id).then(() => this.getClientes());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
  },
};
</script>
