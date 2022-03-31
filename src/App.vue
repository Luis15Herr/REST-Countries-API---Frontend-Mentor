<template>
  <div id="nav">
    <header>
      <div class="container header__wrapper">
        <div class="header__logo">Where in the world?</div>
        <div class="header__theme-switcher">
          <button>Dark Mode</button>
        </div>
      </div>
    </header>
  </div>
  <router-view />
</template>

<script>
import { onMounted, ref, provide } from "@vue/runtime-core";
export default {
  setup() {
    let countries = ref(null);

    onMounted(() => {
      if (localStorage.getItem("list") === null) {
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
      }
      countries.value = countries.value.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    });

    provide("countries", countries);
  },
};
</script>

<style src='@/assets/style.css'>
</style>
