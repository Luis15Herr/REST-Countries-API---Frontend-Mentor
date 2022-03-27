<template>
  <router-link
    :to="{ name: 'CountryView', params: { name: name } }"
    class="card"
    :name="name"
  >
    <div class="card__img">
      <img :src="flag" alt="" />
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
.card {
  width: 264px;
  height: 100%;
  border-radius: 7px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 1px 2px 1px #0000000a;
}
.card:hover {
  animation: float 1.5s linear infinite;
  cursor: pointer;
}
.card__img {
  width: 100%;
  height: 160px;
}
.card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__info {
  text-align: left;
  padding: 25px 25px;
  color: black;
}

.card__title {
  width: 100%;
  display: block;
  font-weight: 800;
  font-size: 1em;
  font-size: 1.1em;
  margin-bottom: 17px;
}
.card__meta-info {
  display: block;
  font-size: 0.8em;
  margin-bottom: 6px;
}

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