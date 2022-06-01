<template>
  <div class="home container">
    <div class="filter__countries">
      <div class="searchForm">
        <i class="bi bi-search"></i>
        <input
          class="countryToFind"
          type="text"
          placeholder="Search for a country"
          v-model="countryToFind"
          @keyup="findCountry"
        />
      </div>
      <select name="select" v-model="filter" @change="fil" class="selectFilter">
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
      <sequential-entrance class="list__countries">
        <CountryCard
          v-for="item in listToShow"
          :name="item.name"
          :population="item.population"
          :region="item.region"
          :capital="item.capital"
          :flag="item.flag"
          :key="item.name"
        />
      </sequential-entrance>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CountryCard from "@/components/CountryCard.vue";

import { ref, inject, onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: {
    CountryCard,
  },
  setup() {
    let countries = inject("countries");
    let filtered = ref(countries.value);
    let filter = ref("all"); //Select
    let slicedArr = ref([]);
    let listToShow = ref([]);
    let countryToFind = ref("");
    let i = 0;

    const fil = () => {
      if (filter.value === "all") {
        filtered.value = countries.value;
      } else {
        filtered.value = countries.value.filter(
          (item) => item.region === filter.value
        );
      }
      slicedArr.value = sliceIntoChunks(filtered.value, 12);
      loadFilter();
    };

    function loadFilter() {
      listToShow.value = [];
      listToShow.value.push(...slicedArr.value[0]);
    }

    function sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    }

    function handleScroll() {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        if (i >= slicedArr.value.length) return;
        listToShow.value.push(...slicedArr.value[i++]);
      }
    }

    function findCountry() {
      let reg = new RegExp(countryToFind.value, "gi");
      listToShow.value = countries.value.filter((item) => {
        return item.name.match(reg);
      });
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      slicedArr.value = sliceIntoChunks(filtered.value, 12);

      loadFilter();
    });
    return {
      countries,
      filtered,
      filter,
      listToShow,
      fil,
      countryToFind,
      findCountry,
    };
  },
};
</script>

<style>
.list__countries {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 75px;
  column-gap: 75px;
  grid-auto-rows: 335px;
}
</style>