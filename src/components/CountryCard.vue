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
      <span class="card__title"> <b>Country</b>{{ name }} </span>
      <span class="card__meta-info"> <b>Population:</b>{{ population }} </span>
      <span class="card__meta-info"> <b>Region:</b>{{ region }} </span>
      <span class="card__meta-info"> <b>Capital:</b>{{ capital }} </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CountryCard",
  props: ["country", "name", "population", "region", "capital", "flag"],
  setup() {},
};
</script>

<style>
.card {
  width: 250px;
}
.card:hover {
  animation: float 1.5s linear infinite;
  cursor: pointer;
}
.card__img {
  width: 100%;
}
.card__img img {
  width: 100%;
}
.card__info {
  text-align: left;
}
.card__meta-info {
  display: block;
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