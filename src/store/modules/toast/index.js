export default {
  namespaced: true,
  state: {
    toasts: [],
    // showToast: false,
    // toastMessage: "",
    // toastType: "",
    user: {},
  },
  actions: {
    triggerToast({ commit }, { message, color }) {
      // 메세지 업데이트
      commit("ADD_TOAST", { message, color });
      // 타이머 업데이트
      setTimeout(() => {
        // 목록 toasts  제일 앞쪽 즉, 배열[0] 삭제
        commit("REMOVE_TOAST");
      }, 3000);
    },
    setUser({ commit }, { email, username, uid }) {
      commit("SET_USER", { email, username, uid });
    },
  },
  mutations: {
    ADD_TOAST(state, payload) {
      console.log(payload);
      state.toasts.push(payload);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
    SET_USER(state, { payload }) {
      console.log("pppppppppppayyyyyload", payload);
      state.user = payload;
    },
    // SET_USER: (state, payload) => {
    //   console.log("payyyyyyyyloooadd", payload);
    //   state.user = payload;
    // },
  },
};
