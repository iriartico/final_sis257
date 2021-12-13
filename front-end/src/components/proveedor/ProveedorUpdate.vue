<template>
  <div class="pt-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/proveedores">Proveedores</router-link>
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
        <h2 class="text-center">Editar Proveedor</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card aux">
          <div class="card-body">
            <form
              class="row g-3 needs-validation blanco"
              @submit.prevent="sendProveedor"
              novalidate
            >
              <div class="col-md-6">
                <label class="form-label">Nombre</label>
                <input
                  type="text"
                  v-model="proveedor.nombre"
                  class="form-control"
                  placeholder="Nombre del Provedor"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="validationCustom02" class="form-label">Pais</label>
                <input
                  type="text"
                  v-model="proveedor.pais"
                  class="form-control"
                  placeholder="Pais del Proveedor"
                  required
                />
              </div>

              <div class="col-md-4">
                <label for="validationCustom02" class="form-label"
                  >Ciudad</label
                >
                <input
                  type="text"
                  v-model="proveedor.ciudad"
                  class="form-control"
                  placeholder="Ciudad del Proveedor"
                  required
                />
              </div>

              <div class="col-md-8">
                <label for="validationCustomUsername" class="form-label"
                  >Direccion</label
                >
                <div class="input-group has-validation">
                  <input
                    type="text"
                    v-model="proveedor.direccion"
                    class="form-control"
                    placeholder="Direccion del Proveedor"
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <label for="validationCustom03" class="form-label"
                  >Telefono</label
                >
                <input
                  type="text"
                  v-model="proveedor.telefono"
                  class="form-control"
                  placeholder="Telefono"
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
      proveedor: {
        nombre: "",
        pais: "",
        ciudad: "",
        direccion: "",
        telefono: "",
      },
      proveedorId: 0,
      // proveedores: [],
    };
  },
  async created() {
    this.$emit("showParent", false);
    this.proveedorId = this.$route.params.id | 0;
    await http
      .get("proveedores/" + this.proveedorId)
      .then((response) => (this.proveedor = response.data));

    // await http
    //   .get("proveedores")
    //   .then((response) => (this.proveedores = response.data));
  },
  methods: {
    async sendProveedor() {
      await http
        .put("proveedores/" + this.proveedorId, this.proveedor)
        .then(() => this.$router.push("/proveedores"));
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
