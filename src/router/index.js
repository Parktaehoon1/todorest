import { createRouter, createWebHistory } from "vue-router";
import HomeIndex from "@/views/HomeIndex.vue";
import TodosIndex from "@/views/TodosIndex.vue";
import TodosView from "@/views/TodosView.vue";
import ProfileIndex from "@/views/ProfileIndex.vue";
import AboutIndex from "@/views/AboutIndex.vue";
import TodoCreate from "@/views/TodoCreate.vue";

import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
// import { useStore } from "vuex";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeIndex,
    requireAuth: true,
  },
  {
    path: "/todos",
    name: "Todos",
    component: TodosIndex,
    requireAuth: true,
  },
  {
    path: "/todos/:id",
    name: "Todo",
    component: TodosView,
    requireAuth: true,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileIndex,
    requireAuth: true,
  },
  {
    path: "/about",
    name: "About",
    component: AboutIndex,
    requireAuth: true,
  },
  {
    path: "/create",
    name: "TodoCreate",
    component: TodoCreate,
    requireAuth: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 회원가입 가드
router.beforeEach((to, from, next) => {
  const currentUser = store.state.user;
  console.log(currentUser);
  const requireAuth = to.matched.some((record) => record.requireAuth);
  console.log("requireAuth", requireAuth);
  console.log("auth값", requireAuth);
  if (requireAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
  console.log(to);
  console.log(from);
  // router.push("/login");
});

export default router;
