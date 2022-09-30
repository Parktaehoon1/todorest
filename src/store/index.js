import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: null,
  },
  actions: {},
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  plugins: [createPersistedState()],
});

// const store = createStore({
//   state() {
//     return {
//       user: null,
//     };
//   },
//   mutations: {
//     SET_USER: (state, user) => {
//       state.user = user;
//     },
//   },
// });

// export default store;
