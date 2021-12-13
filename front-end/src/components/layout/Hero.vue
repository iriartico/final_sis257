<template>
  <div>
    <!-- ======= Hero Section ======= -->
    <section id="hero">
      <div class="hero-container">
        <div
          id="heroCarousel"
          data-bs-interval="5"
          class="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

          <div class="carousel-inner" role="listbox">
            <!-- Slide 1 -->
            <div
              class="carousel-item active"
              style="background: url(assets/img/slide/slide-2.jpg)"
            >
              <div class="carousel-container">
                <div class="carousel-content">
                  <h2 class="animate__animated animate__fadeInDown">
                    bebe<span> aun </span>click
                  </h2>
                  <p class="animate__animated animate__fadeInUp">
                    Porque son los momentos que compartimos con nuestros seres
                    queridos los que cuentan, disfrutalos de la mejor compania
                  </p>
                  <div>
                    <router-link
                      class="btn-menu animate__animated animate__fadeInUp scrollto"
                      to="/productos"
                      >Productos</router-link
                    >
                    <!-- <a
                      href="#menu"
                      class="btn-menu animate__animated animate__fadeInUp scrollto"
                      >Our Menu</a
                    > -->
                    <a
                      href="#book-a-table"
                      class="btn-book animate__animated animate__fadeInUp scrollto"
                      >Book a Table</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Hero -->
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>
