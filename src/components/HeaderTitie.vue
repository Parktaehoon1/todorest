<template>
  <h2 class="title">{{ title }}</h2>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
h2 {
  text-align: center;
  font-size: 50px;
  color: blue;
}
</style>
