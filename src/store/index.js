import { createStore } from "vuex";

// export default createStore({
//   state: {
//     user: null,
//   },
//   actions: {},
//   mutations: {
//     SET_USER(state, payload) {
//       state.user = payload;
//     },
//   },
//   getters: {
//     getUser(state) {
//       return state.user;
//     },
//   },
// });

const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
});

export default store;
