<template>
  <div>
    <MyHero />
    <!-- <top-bar /> -->
    <About />
    <!-- <why-us /> -->
  </div>
</template>

<script>
// import TopBar from "./layout/TopBar.vue";
import MyHero from "./layout/Hero.vue";
import About from "./sections/About.vue";
// import WhyUs from "./sections/WhyUs.vue";
export default {
  name: "Principal",
  components: { About, MyHero },
  // props: {
  //   msg: String,
  // },
};
</script>
