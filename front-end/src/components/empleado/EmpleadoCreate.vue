<template>
  <div class="pt-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/empleados">Empleados</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          arial-current="page"
          style="color: white"
        >
          Crear
        </li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-12" style="color: white">
        <h2 class="text-center">Crear Empleado</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card aux">
          <div class="card-body">
            <form
              class="row g-3 needs-validation blanco"
              @submit.prevent="sendEmpleado"
              novalidate
            >
              <div class="col-md-6">
                <label class="form-label">Usuario</label>
                <input
                  type="text"
                  v-model="empleado.usuario"
                  class="form-control"
                  placeholder="Nombre de Usuario"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Sucursal</label>
                <select
                  v-model="empleado.id_tienda"
                  class="form-select"
                  required
                >
                  <option
                    v-for="sucursal in sucursales"
                    :key="sucursal.id"
                    :value="sucursal.id"
                  >
                    {{ sucursal.descripcion }}
                  </option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label">Nombre(s)</label>
                <input
                  type="text"
                  v-model="empleado.nombre"
                  class="form-control"
                  placeholder="Nombre(s)"
                  required
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">Paterno</label>
                <input
                  type="text"
                  v-model="empleado.apellidoP"
                  class="form-control"
                  placeholder="Apellido Paterno"
                  required
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">Materno</label>
                <input
                  type="text"
                  v-model="empleado.apellidoM"
                  class="form-control"
                  placeholder="Apellido Materno"
                  required
                />
              </div>

              <div class="col-md-3">
                <label class="form-label">CI</label>
                <input
                  type="text"
                  v-model="empleado.ci"
                  class="form-control"
                  placeholder="Cedula de Identidad"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Direccion</label>
                <div class="input-group has-validation">
                  <input
                    type="text"
                    v-model="empleado.direccion"
                    class="form-control"
                    placeholder="Direccion"
                    required
                  />
                </div>
              </div>

              <div class="col-md-3">
                <label for="validationCustom03" class="form-label"
                  >Sueldo</label
                >
                <input
                  type="text"
                  v-model="empleado.sueldo"
                  class="form-control"
                  placeholder="Sueldo"
                  required
                />
              </div>

              <div class="text-center mt-4">
                <button class="btn btn-primary" type="submit">
                  <ion-icon name="save-outline"></ion-icon> Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-link text-left" @click="goBack">
      <ion-icon name="caret-back-outline"></ion-icon> Volver
    </button>
  </div>
</template>
<script>
import http from "../../services/http-common";

export default {
  data() {
    return {
      empleado: {
        usuario: "",
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        ci: "",
        direccion: "",
        sueldo: "",
      },
      sucursales: [],
    };
  },
  async created() {
    this.$emit("showParent", false);
    await http
      .get("sucursales")
      .then((response) => (this.sucursales = response.data));
  },
  methods: {
    async sendEmpleado() {
      await http
        .post("empleados", this.empleado)
        .then(() => this.$router.push("/empleados"));
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.aux {
  background-color: #212121;
}

.blanco {
  color: white;
}
</style>
