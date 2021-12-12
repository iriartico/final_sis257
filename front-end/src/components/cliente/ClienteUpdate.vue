<template>
  <div class="pt-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/clientes">Clientes</router-link>
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
        <h2 class="text-center">Editar Usuario</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card aux">
          <div class="card-body">
            <form
              class="row g-3 blanco"
              @submit.prevent="sendCliente"
              novalidate
            >
              <div class="col-md-4">
                <label class="form-label">Nombres</label>
                <input
                  type="text"
                  v-model="cliente.nombre"
                  class="form-control"
                  placeholder="Nombres"
                  required
                />
                <!-- <div class="valid-feedback">Looks good!</div> -->
              </div>

              <div class="col-md-4">
                <label class="form-label">Apellido Paterno</label>
                <input
                  type="text"
                  v-model="cliente.apellidoP"
                  class="form-control"
                  placeholder="Apellido Paterno"
                  required
                />
                <!-- <div class="valid-feedback">Looks good!</div> -->
              </div>

              <div class="col-md-4">
                <label class="form-label">Apellido Materno</label>
                <input
                  type="text"
                  v-model="cliente.apellidoM"
                  class="form-control"
                  placeholder="Apellido Materno"
                  required
                />
                <!-- <div class="valid-feedback">Looks good!</div> -->
              </div>

              <div class="col-md-4">
                <label class="form-label">Username</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input
                    type="text"
                    v-model="cliente.usuario"
                    class="form-control"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <!-- <div class="invalid-feedback">Please choose a username.</div> -->
                </div>
              </div>

              <div class="col-md-5">
                <label class="form-label">Correo</label>
                <input
                  type="text"
                  v-model="cliente.email"
                  class="form-control"
                  placeholder="Ingrese su correo"
                  required
                />
                <!-- <div class="invalid-feedback">Please provide a valid city.</div> -->
              </div>

              <div class="col-md-3">
                <label class="form-label">Celular</label>
                <input
                  type="text"
                  v-model="cliente.celular"
                  class="form-control"
                  placeholder="Ingrese su numero"
                  required
                />
                <!-- <div class="invalid-feedback">Please select a valid state.</div> -->
              </div>

              <div class="col-md-6">
                <label class="form-label">Direccion</label>
                <input
                  type="text"
                  v-model="cliente.direccion"
                  class="form-control"
                  placeholder="Su direccion"
                  required
                />
              </div>

              <div class="col-12">
                <div class="form-check">
                  <input
                    v-model="cliente.premium"
                    class="form-check-input"
                    type="checkbox"
                    value="0"
                    required
                  />
                  <label class="form-check-label" for="invalidCheck">
                    Suscripcion Premium
                  </label>
                </div>
              </div>
              <div class="text-center mt-4">
                <button class="btn btn-primary" type="submit">
                  <ion-icon name="save-outline"></ion-icon> Editar
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
      cliente: {
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        usuario: "",
        email: "",
        celular: "",
        direccion: "",

        premium: false,
      },
      clienteId: 0,
    };
  },
  async created() {
    this.$emit("showParent", false);
    this.clienteId = this.$route.params.id | 0;
    await http
      .get("clientes/" + this.clienteId)
      // await fetch("http://localhost:3000/api/clientes/" + this.clienteId, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      .then((response) => (this.cliente = response.data));
  },
  methods: {
    async sendCliente() {
      await http
        .put("clientes/" + this.clienteId, this.cliente)
        // await fetch("http://localhost:3000/api/clientes/" + this.clienteId, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        //   body: JSON.stringify(this.cliente),
        // })
        .then(() => this.$router.push("/clientes"));
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
