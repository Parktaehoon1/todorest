import { createRouter, createWebHistory } from "vue-router";
import HomeIndex from "@/views/HomeIndex.vue";
import TodosIndex from "@/views/TodosIndex.vue";
import TodosView from "@/views/TodosView.vue";
import ProfileIndex from "@/views/ProfileIndex.vue";
import AboutIndex from "@/views/AboutIndex.vue";
import TodoCreate from "@/views/TodoCreate.vue";

import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
// import { useStore } from "vuex";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
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
  const currentUser = store.state.toast.setUser;
  const requireAuth = to.matched.some((record) => record.requireAuth);
  console.log("currentuserDate", currentUser);
  console.log("requireAuth", requireAuth);
  if (requireAuth && !currentUser) next("/");
  else next();

  console.log(to);
  console.log(from);
  // router.push("/login");
});

export default router;
