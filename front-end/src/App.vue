<template>
  <div>
    <MyHeader />
    <main id="main">
      <router-view class="cover" />
    </main>
    <MyFooter />
  </div>
</template>

<script>
// import TopBar from "./components/layout/TopBar.vue";
import MyHeader from "./components/layout/Header.vue";

import MyFooter from "./components/layout/Footer.vue";
export default {
  components: { MyHeader, MyFooter },
};
</script>

<style>
.cover {
  /* height: 1000px; */
  background-image: url("../public/assets/img/wallpaper-01.jpg");
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.385);
  background-blend-mode: darken;
  /* color: white; */
}
</style>
