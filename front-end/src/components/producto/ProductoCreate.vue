<template>
  <div class="pt-2">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/productos">Productos</router-link>
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
        <h2 class="text-center">Crear Producto</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card aux">
          <div class="card-body">
            <form
              class="row g-3 needs-validation blanco"
              @submit.prevent="sendProducto"
              novalidate
            >
              <div class="col-md-6">
                <label class="form-label">Nombre</label>
                <input
                  type="text"
                  v-model="producto.nombre"
                  class="form-control"
                  placeholder="Nombre del Producto"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Proveedores</label>
                <select
                  v-model="producto.id_proveedor"
                  class="form-select"
                  required
                >
                  <option
                    v-for="proveedor in proveedores"
                    :key="proveedor.id"
                    :value="proveedor.id"
                  >
                    {{ proveedor.nombre }}
                  </option>
                </select>
              </div>

              <div class="col-md-12">
                <label class="form-label">Descripcion</label>
                <input
                  type="text"
                  v-model="producto.descripcion"
                  class="form-control"
                  placeholder="Descripcion del Producto"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Precio de Compra</label>
                <div class="input-group has-validation">
                  <input
                    type="text"
                    v-model="producto.precioC"
                    class="form-control"
                    placeholder="bs."
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <label class="form-label">Precio de Venta</label>
                <input
                  type="text"
                  v-model="producto.precioV"
                  class="form-control"
                  placeholder="bs."
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Stock</label>
                <input
                  type="text"
                  v-model="producto.stock"
                  class="form-control"
                  placeholder="Cantidad"
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
      producto: {
        nombre: "",
        descripcion: "",
        precioC: "",
        precioV: "",
        stock: "",
      },
      proveedores: [],
    };
  },
  async created() {
    this.$emit("showParent", false);
    await http
      .get("proveedores")
      .then((response) => (this.proveedores = response.data));
  },
  methods: {
    async sendProducto() {
      await http
        .post("productos", this.producto)
        .then(() => this.$router.push("/productos"));
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
