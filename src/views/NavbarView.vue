<template>
  <nav class="navbar font-weight-bold navbar-expand-sm navbar-light bg-light">
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
              href="https://github.com/parktaehoon1"
              target="_blank"
              >Github</a
            >
          </li>
        </ul>
      </div>
    </div>
    <button
      class="w-25 text-right font-weight-bold border-0 bg-transparent text-primary"
      @click="onLogout"
    >
      {{ currentUser.username }}
      로그아웃부분
    </button>
  </nav>
</template>

<script>
import { computed } from "vue";
import { auth } from "@/firebase";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    const currentUser = computed(() => store.state.user);
    console.log("onLogout 실행전", currentUser);
    const onLogout = async () => {
      console.log("onLogout 실행후", currentUser);
      await auth.signOut();
      console.log("await 실행후", currentUser);
      store.commit("SET_USER", null);
      console.log("commit 실행후", currentUser);
      await router.replace("/");
    };

    return {
      currentUser,
      onLogout,
    };
  },
};
</script>

<style scopd>
@charset 'utf-8';
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
@import url(https://fonts.googleapis.com/css?family=Raleway:400,600,700,800);
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");

@font-face {
  font-family: "GmarketSansLight";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "GmarketSansMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "GmarketSansBold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

nav {
  font-family: "Open Sans", GmarketSansMedium, GmarketSansLight, GmarketSansBold,
    "맑은 고딕", "돋움", Dotum, "굴림", Gulim, Sans-serif;
}
</style>
