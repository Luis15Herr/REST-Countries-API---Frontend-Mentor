<template>
  <div class="home container">
    <div class="filter__countries">
      <div class="searchForm">
        <i class="bi bi-search" v-if="!isSearching" @click="findCountry"></i>
        <i class="bi bi-house" v-else @click="clearSearch"></i>
        <input
          class="countryToFind"
          type="text"
          placeholder="Search for a country"
          v-model.trim="searchBarValue"
          @keyup.enter="findCountry"
          @keyup="autoComplete"
          @focus="showDiv = true"
          @blur="showDiv = false"
        />
        <ul
          class="autoComplete__results"
          v-if="searchBarValue.length > 1 && showDiv"
        >
          <li v-for="item in testList" :key="item.id">
            <router-link
              :to="{ name: 'CountryView', params: { name: item.name } }"
              >{{ item.name }}</router-link
            >
          </li>
          <a v-if="testList.length > 4" @click="findCountry">
            Show all results</a
          >
        </ul>
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

    <transition-group
      tag="div"
      name="list"
      class="list__countries"
      v-if="filterChoice === 'all'"
    >
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
    <transition-group tag="div" name="list" class="list__countries" v-else>
      <CountryCard
        v-for="item in domCountriesListFiltered"
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
    let countries = inject("countries"); // List of all countries in chunks
    let allCountries = inject("countriesList"); // List of all countries in chunks
    let domCountriesList = ref([]); //List to show countries
    let domCountriesListFiltered = ref([]); //List to show countries by filter
    let isSearching = ref(false); //Detect if shearching
    let testList = ref([]);
    let showDiv = ref(false);
    let i = 0;

    watch(countries, () => {
      console.log("test");
    });

    function handleScroll() {
      if (isSearching) return;
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 200
      ) {
        if (i >= countries.value.length) return;
        domCountriesList.value.push(...countries.value[i++]);
      }
    }

    function findCountry() {
      if (searchBarValue.value === "") {
        domCountriesList.value = countries.value[0];
        isSearching.value = false;
        return;
      }
      isSearching.value = true;
      filterChoice.value = "all";
      let reg = new RegExp(searchBarValue.value, "gi");
      domCountriesList.value = allCountries.value.filter((item) => {
        return item.name.match(reg);
      });
    }

    function autoComplete() {
      if (searchBarValue.value.length < 1) return;
      let reg = new RegExp(searchBarValue.value, "gi");
      testList.value = allCountries.value.filter((item) => {
        return item.name.match(reg);
      });

      if (testList.value.length > 5) {
        console.log(testList.value);
        console.log(testList.value.length > 5);
        testList.value = testList.value.slice(0, 5);
      }
    }

    function clearSearch() {
      searchBarValue.value = "";
      isSearching.value = false;
      domCountriesList.value = countries.value[0];
    }

    function detectFilter() {
      if (filterChoice.value === "all") {
        domCountriesList.value = countries.value[0];
      } else {
        domCountriesListFiltered.value = [].concat
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
      clearSearch,
      searchBarValue,
      domCountriesList,
      findCountry,
      countries,
      domCountriesListFiltered,
      isSearching,
      testList,
      autoComplete,
      showDiv,
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