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
              Empleados
            </li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-12 text-center" style="color: white">
            <h2>Lista de Empleados</h2>
          </div>
          <div class="col-12 text-left">
            <router-link class="breadcrumb-item" to="/empleados/create"
              ><ion-icon name="add-outline"></ion-icon> Crear nuevo
            </router-link>
          </div>
        </div>

        <div class="table container">
          <table class="table table-dark table-striped" id="tableProducts">
            <thead>
              <tr>
                <th>N°</th>
                <th>Usuario</th>
                <th>Nombre(s)</th>
                <th>Paterno</th>
                <th>Materno</th>
                <th>CI</th>
                <th>Direccion</th>
                <th>Sueldo</th>
                <th>Sucursal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(empleado, index) in empleados" :key="empleado.id">
                <td>{{ index + 1 }}</td>
                <td>{{ empleado.usuario }}</td>
                <td>{{ empleado.nombre }}</td>
                <td>{{ empleado.apellidoP }}</td>
                <td>{{ empleado.apellidoM }}</td>
                <td>{{ empleado.ci }}</td>
                <td>{{ empleado.direccion }}</td>
                <td>{{ empleado.sueldo }}</td>
                <td>{{ empleado.sucursal }}</td>
                <td>
                  <button
                    class="btn btn-link"
                    @click="updateEmpleado(empleado.id)"
                  >
                    <ion-icon name="create-outline"></ion-icon> Editar
                  </button>
                  <button
                    class="btn btn-link"
                    @click="deleteEmpleado(empleado.id)"
                  >
                    <ion-icon name="trash-outline"></ion-icon> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from "../services/http-common";

export default {
  data() {
    return {
      empleados: [],
      showParentPage: true,
    };
  },
  created() {
    this.getEmpleados();
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.showParentPage = toDepth < fromDepth;
    if (this.showParentPage) this.getEmpleados();
    next();
  },
  methods: {
    async getEmpleados() {
      await http
        .get("empleados")
        .then((response) => (this.empleados = response.data));
    },

    updateEmpleado(id) {
      this.$router.push("/empleados/update/" + id);
    },

    async deleteEmpleado(id) {
      var resp = confirm("¿Desea eliminar este item de la Lista de Empleados?");
      if (resp == true) {
        await http.delete("empleados/" + id).then(() => this.getEmpleados());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
  },
};
</script>
