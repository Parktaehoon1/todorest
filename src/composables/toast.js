import { computed } from "vue";
import { useStore } from "vuex";

export const useToast = () => {
  // vuex 접근 관리
  const store = useStore();
  // 안내상자에 관리될 목록
  const toasts = computed(() => store.state.toasts);
  const triggerToast = (message, color) => {
    store.dispatch("toast/triggerToast", { message, color });
    // toast 안에 triggerToast로 dispatch 맞음
  };
  return {
    triggerToast,
    toasts,
  };
};
