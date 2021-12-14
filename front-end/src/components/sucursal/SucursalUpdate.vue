<template>
  <div class="pt-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/sucursales">Sucursales</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          arial-current="page"
          style="color: white"
        >
          Editar
        </li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-12" style="color: white">
        <h2 class="text-center">Editar Sucursal</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-5">
        <div class="card aux">
          <div class="card-body">
            <form
              class="row g-4 blanco"
              @submit.prevent="sendSucursal"
              novalidate
            >
              <div class="col-md-12">
                <label class="form-label">Descripcion</label>
                <input
                  type="text"
                  v-model="sucursal.descripcion"
                  class="form-control"
                  placeholder="Nombre del Provedor"
                  required
                />
              </div>

              <div class="col-md-12">
                <label class="form-label">Direccion</label>
                <input
                  type="text"
                  v-model="sucursal.direccion"
                  class="form-control"
                  placeholder="Pais del Sucursal"
                  required
                />
              </div>

              <div class="col-md-12">
                <label class="form-label">Zona</label>
                <div class="input-group has-validation">
                  <input
                    type="text"
                    v-model="sucursal.zona"
                    class="form-control"
                    placeholder="Direccion del Sucursal"
                    required
                  />
                </div>
              </div>

              <div class="col-md-12">
                <label class="form-label">Ciudad</label>
                <input
                  type="text"
                  v-model="sucursal.ciudad"
                  class="form-control"
                  placeholder="Ciudad del Sucursal"
                  required
                />
              </div>

              <div class="text-center mt-4">
                <button class="btn btn-primary" type="submit">
                  <ion-icon name="save-outline"></ion-icon> Guardar
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
      sucursal: {
        descripcion: "",
        direccion: "",
        zona: "",
        ciudad: "",
      },
      sucursalId: 0,
    };
  },
  async created() {
    this.$emit("showParent", false);
    this.sucursalId = this.$route.params.id | 0;
    await http
      .get("sucursales/" + this.sucursalId)
      .then((response) => (this.sucursal = response.data));
  },
  methods: {
    async sendSucursal() {
      await http
        .put("sucursales/" + this.sucursalId, this.sucursal)
        .then(() => this.$router.push("/sucursales"));
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
