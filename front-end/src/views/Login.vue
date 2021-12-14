<template>
  <div class="gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4">
                <form class="form" @submit.prevent="login">
                  <h1 style="color: #ffab00">Iniciar sesi&oacute;n</h1>
                  <p class="text-white-50 mb-5">
                    Por favor ingrese su usuario y contraseña
                  </p>

                  <div class="form-outline form-white mb-4">
                    <input
                      v-model="username"
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Ingresar usuario"
                      required
                    />
                    <label class="form-label" for="typeEmailX">Usuario</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      v-model="password"
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Ingresar contraseña"
                      required
                    />
                    <label class="form-label" for="typePasswordX"
                      >Contraseña</label
                    >
                  </div>

                  <!-- Como reuperar datos anteriores en Cokkies con la opcion id... -->
                  <!-- <div class="form-outline form-white mb-4">
                    <input
                      id="typeEmailX"
                      v-model="username"
                      class="form-control form-control-lg"
                      required
                    />
                    <label class="form-label" for="typeEmailX">Usuario</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      id="typePasswordX"
                      v-model="password"
                      class="form-control form-control-lg"
                      required
                    />
                    <label class="form-label" for="typePasswordX"
                      >Contraseña</label
                    >
                  </div> -->

                  <!-- <p class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!">Forgot password?</a>
                </p> -->
                  <p v-if="error" class="text-danger">
                    Usuario o contraseña incorrectos
                  </p>
                  <button
                    class="btn btn-secondary btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Ingresar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "../services/AuthDataService";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async login() {
      try {
        await auth.login(this.username, this.password).then(() => {
          if (auth.getUserLogged()) {
            this.$router.push("/");
          } else return (this.error = true);
          // this.$router.go();
          // this.$router.push("/");
        });
      } catch (error) {
        console.log(error);
        this.error = true;
      }
    },
  },
};
</script>

<style>
.gradient-custom {
  /* fallback for old browsers */
  background: #886ca7;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgb(44, 12, 79),
    rgb(43, 66, 106)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgb(125, 58, 197), rgb(55, 99, 175));
}
</style>
