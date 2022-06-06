<template>
  <div class="home container">
    <div class="filter__countries">
      <div class="searchForm">
        <i class="bi bi-search"></i>
        <input
          class="countryToFind"
          type="text"
          placeholder="Search for a country"
          v-model="searchBarValue"
          @keyup="findCountry"
        />
      </div>
      <select
        name="select"
        v-model="filterChoice"
        @change="detectFilter"
        class="selectFilter"
      >
        <option selected value="all">Filter by Region</option>
        <option value="Asia" selected>Asia</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        <option value="Americas">Americas</option>
        <option value="Polar">Polar</option>
      </select>
    </div>
    <div>
      <transition-group tag="div" name="list" class="list__countries">
        <CountryCard
          v-for="item in domCountriesList"
          :name="item.name"
          :population="item.population"
          :region="item.region"
          :capital="item.capital"
          :flag="item.flag"
          :key="item.name"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import CountryCard from "@/components/CountryCard.vue";
import { ref, inject, onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: {
    CountryCard,
  },
  setup() {
    let filterChoice = ref("all"); //Region filter value
    let searchBarValue = ref(""); // Search bar value
    let countries = inject("countries"); // List of all countries
    let domCountriesList = ref(countries.value); //List to show countries

    function handleScroll() {
      /*  if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        if (i >= slicedArr.value.length) return;
        domCountriesList.value.push(...slicedArr.value[i++]);
      } */
    }

    function findCountry() {
      let reg = new RegExp(searchBarValue.value, "gi");
      domCountriesList.value = countries.value.filter((item) => {
        return item.name.match(reg);
      });
    }

    function detectFilter() {
      if (filterChoice.value === "all") {
        domCountriesList.value = countries.value;
      } else {
        domCountriesList.value = countries.value.filter(
          (item) => item.region === filterChoice.value
        );
      }
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    return {
      filterChoice,
      detectFilter,
      searchBarValue,
      countries,
      domCountriesList,
      findCountry,
    };
  },
};
</script>

<style>
.list-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 0.4s ease;
}
</style>