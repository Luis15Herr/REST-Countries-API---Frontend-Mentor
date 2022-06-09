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
</template>

<script>
import CountryCard from "@/components/CountryCard.vue";
import { ref, inject, onMounted, watch } from "@vue/runtime-core";

export default {
  name: "Home",
  components: {
    CountryCard,
  },
  setup() {
    let filterChoice = ref("all"); //Region filter value
    let searchBarValue = ref(""); // Search bar value
    let countries = inject("countries"); // List of all countries
    let domCountriesList = ref([]); //List to show countries
    let i = 0;

    watch(countries, () => {
      console.log("test");
    });

    function handleScroll() {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 200
      ) {
        if (i >= countries.value.length) return;
        domCountriesList.value.push(...countries.value[i++]);
      }
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
        domCountriesList.value = [].concat
          .apply([], countries.value)
          .filter((item) => item.region === filterChoice.value);
      }
    }
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      domCountriesList.value.push(...countries.value[0]);
    });

    return {
      filterChoice,
      detectFilter,
      searchBarValue,
      domCountriesList,
      findCountry,
      countries,
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