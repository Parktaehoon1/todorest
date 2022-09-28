<template>
  <h2 class="title">{{ title }}</h2>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 50px;
  color: darkgray;
}
</style>
