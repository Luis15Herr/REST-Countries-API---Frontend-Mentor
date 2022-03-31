<template>
  <div class="country container">
    <router-link class="country__back-btn" to="/">Back</router-link>
    <div class="country__content">
      <div class="country__flag">
        <img :src="country.flag" alt="" />
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
              ><b>Currencies:</b> {{ country.currencies.name }}
            </span>
            <span class="country__meta-info"
              ><b>Languages: </b>
              <template v-for="item in country.languages"
                >{{ item.name }},
              </template>
            </span>
          </div>
        </div>
        <div class="country__borders">
          <span
            ><b>Border Countries: </b>
            <template v-for="item in country.borders">{{ item }}, </template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from "vue";

export default {
  name: "CountryView",
  props: ["name"],
  setup(props) {
    let country = ref(null);

    if (country.value === null) {
      let countries = inject("countries");
      countries.value.map((item) => {
        if (item.name === props.name) {
          country.value = item;
          country.value.population = country.value.population
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
      });
    }

    return {
      country,
    };
  },
};
</script>

<style>
</style>