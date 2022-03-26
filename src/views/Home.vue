<template>
  <div class="home container">
    <div class="filter__countries">
      <input
        class="countryToFind"
        type="text"
        placeholder="Search for a country"
        v-model="countryToFind"
        @keyup="findCountry"
      />{{ search }}
      <select name="select" v-model="filter" @change="fil">
        <option selected value="all">All</option>
        <option value="Asia" selected>Asia</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        <option value="Americas">Americas</option>
        <option value="Polar">Polar</option>
      </select>
    </div>
    <div class="list__countries">
      <transition-group name="test">
        <CountryCard
          v-for="item in filtered"
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
// @ is an alias to /src
import CountryCard from "@/components/CountryCard.vue";

import { ref, inject } from "@vue/runtime-core";

export default {
  name: "Home",
  components: {
    CountryCard,
  },
  setup() {
    let countries = inject("countries");
    let filtered = ref(countries.value);
    let filter = ref(null);
    let countryToFind = ref("");

    const fil = () => {
      console.log(filter.value === "all");
      if (filter.value === "all") {
        filtered.value = countries.value;
      } else {
        filtered.value = countries.value.filter(
          (item) => item.region === filter.value
        );
      }
    };

    function findCountry() {
      console.log(countryToFind.value);
      let reg = new RegExp(countryToFind.value, "gi");
      filtered.value = countries.value.filter((item) => {
        return item.name.match(reg);
      });
      console.log(filtered.value);
    }

    return {
      countries,
      filtered,
      filter,
      fil,
      countryToFind,
      findCountry,
    };
  },
};
</script>

<style>
.list__countries {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
}

.test-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.test-enter-to {
  opacity: 1;
  transform: scale(1);
}
.test-enter-active {
  transition: all 2s ease;
}
</style>