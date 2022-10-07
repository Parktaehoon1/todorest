import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import modules from "./modules/index.js";

export default createStore({
  modules,
  plugins: [createPersistedState()],
});
