<template>
  <div id="nav">
    <header>
      <div class="container header__wrapper">
        <div class="header__logo">Where in the world?</div>
        <div class="header__theme-switcher">
          <button><i class="bi bi-moon-stars"></i> Dark Mode</button>
        </div>
      </div>
    </header>
  </div>
  <div class="test" v-if="loading">
    <h1>HELLO</h1>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { onMounted, ref, provide } from "@vue/runtime-core";
export default {
  setup() {
    let countries = ref(null);
    let loading = ref(true);

    onMounted(() => {
      /*    if (localStorage.getItem("list") === null) {
        console.log("Loading From Web");
        fetch("https://restcountries.com/v2/all")
          .then((response) => response.json())
          .then((data) => {
            countries.value = data;
            localStorage.setItem("list", JSON.stringify(countries.value));
          });
      } else {
        console.log("loadingFromStorage");
        countries.value = JSON.parse(localStorage.getItem("list"));
      } */

      fetch("https://restcountries.com/v2/all")
        .then((response) => response.json())
        .then((data) => {
          countries.value = data;
          localStorage.setItem("list", JSON.stringify(countries.value));
          loading.value = false;
        });
    });

    provide("countries", countries);
    return {
      loading,
    };
  },
};
</script>

<style src='@/assets/style.css'>
</style>
