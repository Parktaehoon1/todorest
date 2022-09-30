<template>
  <!-- routerlink가 모여있는 곳이 부모 -->
  <div class="p-2 bg-dark d-flex">
    <div
      style="width: 6px; height: 6px; cursor: pointer"
      class="ml-2 bg-danger rounded-circle"
      @click="sorry"
    ></div>
    <div
      style="width: 6px; height: 6px; cursor: pointer"
      class="ml-2 bg-warning rounded-circle cursor-pointer"
      @click="sorry"
    ></div>
    <div
      style="width: 6px; height: 6px cursor: pointer"
      class="ml-2 bg-success rounded-circle"
      @click="sorry"
    ></div>
  </div>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'Home' }"
        >My Todo</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink
              class="nav-link active"
              aria-current="page"
              :to="{ name: 'Home' }"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Todos' }"
              >Todos</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'TodoCreate' }"
              >Todo Create</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'About' }"
              >About</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Profile' }"
              >Profile</RouterLink
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://github.com/tarolong2/todorest"
              target="_blank"
              >Github</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- routerlink는 이동의 수단 routerview는 보여줌의 수단 -->
  <RouterView />
</template>
<script>
export default {
  setup() {
    const sorry = () => {
      alert("죄송합니다. 구현예정입니다.");
    };

    return {
      sorry,
    };
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
#app {
}
nav {
  font-weight: 500;
  font-family: "Roboto", sans-serif;
}
</style>
