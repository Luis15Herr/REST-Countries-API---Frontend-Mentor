<template>
  <div id="nav">
    <header>
      <div class="container header__wrapper">
        <h1 class="header__logo">Where in the world?</h1>
        <div class="header__theme-switcher">
          <button @click="toggleTheme">
            <i class="bi bi-moon-stars"></i> Dark Mode
          </button>
        </div>
      </div>
    </header>
  </div>
  <div class="test" v-if="loading">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <router-view v-else v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { ref, provide, onBeforeMount } from "@vue/runtime-core";
export default {
  setup() {
    let countries = ref(null);
    let countriesList = ref(null);
    let loading = ref(true);
    let darkTheme = ref(false);
    function toggleTheme() {
      darkTheme.value = !darkTheme.value;
      if (darkTheme.value) {
        document.body.classList.add("dark__theme");
        document.body.classList.remove("light__theme");
      } else {
        document.body.classList.remove("dark__theme");
        document.body.classList.add("light__theme");
      }
    }

    function sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    }

    onBeforeMount(() => {
      if (
        localStorage.getItem("allCountriesChunks") === null ||
        localStorage.getItem("allCountries") === null
      ) {
        fetch("https://restcountries.com/v2/all")
          .then((response) => response.json())
          .then((data) => {
            countries.value = sliceIntoChunks(data, 12);
            countriesList.value = data;
            localStorage.setItem(
              "allCountries",
              JSON.stringify(countriesList.value)
            );
            localStorage.setItem(
              "allCountriesChunks",
              JSON.stringify(countries.value)
            );
            loading.value = false;
          });
      } else {
        countriesList.value = JSON.parse(localStorage.getItem("allCountries"));
        countries.value = JSON.parse(
          localStorage.getItem("allCountriesChunks")
        );
        loading.value = false;
      }
    });

    provide("countries", countries);
    provide("countriesList", countriesList);
    return {
      loading,
      toggleTheme,
    };
  },
};
</script>

<style src='@/assets/style.css'>
</style>
