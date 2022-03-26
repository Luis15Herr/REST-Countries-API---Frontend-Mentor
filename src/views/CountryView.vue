<template>
  <router-link to="/">VOLVER</router-link>
  <h1>Coño de la madre</h1>
  <h1>Vista de {{ name }}</h1>
  <h1>Vista de {{ country.capital }}</h1>
  <img :src="country.flag" alt="" />
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