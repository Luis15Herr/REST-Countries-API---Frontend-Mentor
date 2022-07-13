<template>
  <router-link
    :to="{ name: 'CountryView', params: { name: name } }"
    class="card"
    :name="name"
  >
    <div class="card__img">
      <img :src="flag" :alt="'flag of ' + name" />
    </div>
    <div class="card__info">
      <span class="card__title">{{ name }} </span>
      <span class="card__meta-info"> <b>Population:</b> {{ test }} </span>
      <span class="card__meta-info"> <b>Region:</b> {{ region }} </span>
      <span class="card__meta-info"> <b>Capital:</b> {{ capital }} </span>
    </div>
  </router-link>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "CountryCard",
  props: ["country", "name", "population", "region", "capital", "flag"],
  setup(props) {
    const test = computed(() => {
      return props.population
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });
    return {
      test,
    };
  },
};
</script>

<style>
@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>