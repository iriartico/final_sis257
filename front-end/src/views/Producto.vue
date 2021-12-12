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
              Productos
            </li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-12 text-center" style="color: white">
            <h2>Lista de Productos</h2>
          </div>
          <div class="col-12 text-left">
            <router-link class="breadcrumb-item" to="/productos/create"
              ><ion-icon name="add-outline"></ion-icon> Crear nuevo
            </router-link>
          </div>
        </div>

        <div class="table container">
          <table class="table table-dark table-striped" id="tableProducts">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nombre</th>
                <th>Proveedor</th>
                <th>Precio-Compra</th>
                <th>Precio-Venta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producto, index) in productos" :key="producto.id">
                <td>{{ index + 1 }}</td>
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.proveedor }}</td>
                <td> Bs. {{ producto.precioC }}</td>
                <td> Bs. {{ producto.precioV }}</td>
                <td>
                  <button
                    class="btn btn-link"
                    @click="updateProducto(producto.id)"
                  >
                    <ion-icon name="create-outline"></ion-icon> Editar
                  </button>
                  <button
                    class="btn btn-link"
                    @click="deleteProducto(producto.id)"
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
      productos: [],
      showParentPage: true,
    };
  },
  created() {
    this.getProductos();
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.showParentPage = toDepth < fromDepth;
    if (this.showParentPage) this.getProductos();
    next();
  },
  methods: {
    async getProductos() {
      await http
        .get("productos")
        .then((response) => (this.productos = response.data));
    },

    updateProducto(id) {
      this.$router.push("/productos/update/" + id);
    },

    async deleteProducto(id) {
      var resp = confirm(
        "¿Desea elimimar a este item de la Lista de Productos?"
      );
      if (resp == true) {
        await http.delete("productos/" + id).then(() => this.getProductos());
      }
    },
    showParent(show) {
      this.showParentPage = show;
    },
  },
};
</script>
