<template>
  <div class="home container">
    <div class="countryFilter">
      <div class="searchForm">
        <i class="bi bi-search" v-if="!isSearching" @click="findCountry"></i>
        <i class="bi bi-house" v-else @click="clearSearch"></i>
        <input
          class="countryFilter__inputTxt"
          type="text"
          placeholder="Search for a country"
          v-model.trim="searchBarValue"
          @keyup.enter="findCountry"
          @keyup="autoComplete"
          @focus="showDiv = true"
        />
        <ul
          class="countryFilter__searchResults"
          v-if="searchBarValue.length > 1 && showDiv"
        >
          <li v-for="item in searchResultList" :key="item.id">
            <router-link
              :to="{ name: 'CountryView', params: { name: item.name } }"
              >{{ item.name }}</router-link
            >
          </li>
          <a
            class="seeAllBtn"
            v-if="searchResultList.length > 4"
            @click="findCountry"
          >
            Show all results</a
          >
        </ul>
      </div>

      <div
        class="aselect selectFilter"
        :data-value="filterChoice"
        :data-list="regions"
      >
        <div class="selector" @click="toggle()">
          <div class="label">
            <span>{{ filterChoice }}</span>
          </div>
          <div class="arrow" :class="{ expanded: listOfFilterVisible }"></div>
          <div :class="{ hidden: !listOfFilterVisible, listOfFilterVisible }">
            <ul>
              <li
                :class="{ current: item === filterChoice }"
                v-for="item in regions"
                @click="select(item)"
                :key="item.id"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <transition-group
      tag="div"
      name="list"
      class="list__countries"
      v-if="filterChoice === 'Filter by Region'"
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
import { ref, inject, onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: {
    CountryCard,
  },
  setup() {
    let filterChoice = ref("Filter by Region"); //Region filter value
    let regions = [
      "Filter by Region",
      "Africa",
      "Americas",
      "Asia",
      "Europe",
      "Oceania",
      "Polar",
    ];
    let searchBarValue = ref(""); // Search bar value
    let countries = inject("countries"); // List of all countries in chunks
    let allCountries = inject("countriesList"); // List of all countries
    let domCountriesList = ref([]); //List to show countries
    let domCountriesListFiltered = ref([]); //List to show countries by filter
    let isSearching = ref(false); //Detect if shearching
    let searchResultList = ref([]);
    let showDiv = ref(false);
    let listOfFilterVisible = ref(false);
    let i = 1;

    function handleScroll() {
      if (isSearching.value === true) return;
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 200
      ) {
        if (i >= countries.value.length) return;
        domCountriesList.value.push(...countries.value[i++]);
      }
    }

    function findCountry(e) {
      showDiv.value = false;
      if (e.key === "Enter") {
        e.target.blur();
      }
      if (searchBarValue.value === "") {
        domCountriesList.value = countries.value[0];
        isSearching.value = false;
        return;
      }
      isSearching.value = true;

      let reg = new RegExp(searchBarValue.value, "gi");
      domCountriesList.value = allCountries.value.filter((item) => {
        return item.name.match(reg);
      });
    }

    function autoComplete() {
      if (searchBarValue.value.length < 1) return;

      document.addEventListener("click", function (e) {
        if (
          e.target.classList.value != "countryFilter__inputTxt" &&
          e.target.classList.value != "countryFilter__searchResults"
        ) {
          showDiv.value = false;
          document.removeEventListener("click", function () {});
        }
      });

      let reg = new RegExp(searchBarValue.value, "gi");
      searchResultList.value = allCountries.value.filter((item) => {
        return item.name.match(reg);
      });

      if (searchResultList.value.length > 5) {
        searchResultList.value = searchResultList.value.slice(0, 5);
      }
    }

    function clearSearch() {
      searchBarValue.value = "";
      isSearching.value = false;
      domCountriesList.value = countries.value[0];
    }

    function detectFilter() {
      if (filterChoice.value === "Filter by Region") {
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
      console.log(countries.value);
    });

    function toggle() {
      listOfFilterVisible.value = !listOfFilterVisible.value;
    }

    function select(option) {
      filterChoice.value = option;
      detectFilter();
    }

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
      searchResultList,
      autoComplete,
      showDiv,
      regions,
      toggle,
      select,
      listOfFilterVisible,
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