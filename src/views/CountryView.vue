<template>
  <div class="country container">
    <router-link class="country__back-btn" to="/"
      ><i class="bi bi-arrow-left"></i> Back</router-link
    >
    <div class="country__content">
      <div class="country__flag">
        <img :src="country.flag" :alt="'flag of ' + name" />
      </div>
      <div class="country__info">
        <h1 class="country__name">
          {{ name }}
        </h1>
        <div class="country__meta">
          <div class="country__meta-row">
            <span class="country__meta-info"
              ><b>Native Name:</b> {{ country.nativeName }}
            </span>
            <span class="country__meta-info"
              ><b>Population:</b> {{ country.population }}
            </span>
            <span class="country__meta-info"
              ><b>Region:</b> {{ country.region }}
            </span>
            <span class="country__meta-info"
              ><b>Sub Region:</b> {{ country.subregion }}
            </span>

            <span class="country__meta-info"
              ><b>Capital:</b> {{ country.capital }}
            </span>
          </div>
          <div class="country__meta-row">
            <span class="country__meta-info"
              ><b>Top Level Domain:</b> {{ country.topLevelDomain[0] }}
            </span>
            <span class="country__meta-info"
              ><b>Currencies: </b>
              <template v-for="item in country.currencies">
                {{ item.name }}
              </template>
            </span>
            <span class="country__meta-info"
              ><b>Languages: </b>
              <template v-for="item in listOfLangs">{{ item }} </template>
            </span>
          </div>
        </div>
        <div class="country__borders">
          <span class="country__borders-title">Border Countries: </span>
          <div class="country__borders-wrapper">
            <router-link
              class="country__borders-item"
              v-for="item in borderCountries"
              v-bind:key="item"
              :to="{ name: 'CountryView', params: { name: item } }"
              >{{ item }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "CountryView",
  props: ["name"],

  setup(props) {
    let countries = inject("countriesList");
    let country = ref(null);
    let borderCountries = ref([]);
    const route = useRoute();

    watch(props, () => {
      if (props != country.value.name) {
        loadCountry();
      }
    });

    function loadCountry() {
      borderCountries.value = [];
      if (props.name === route.params.name) {
        countries.value.map((item) => {
          if (item.name === props.name) {
            country.value = item;
            country.value.population = country.value.population
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            countries.value.map((item) => {
              if (!country.value.borders) return;
              if (country.value.borders.includes(item.alpha3Code)) {
                borderCountries.value.push(item.name);
              } else {
                return;
              }
            });
          }
        });
      }
    }

    const listOfLangs = computed(() => {
      return country.value.languages.map((item, index) => {
        if (index === country.value.languages.length - 1) {
          return item.name + ".";
        }
        return item.name + "," + " ";
      });
    });

    loadCountry();
    return {
      country,
      listOfLangs,
      borderCountries,
    };
  },
};
</script>

<style>
</style>