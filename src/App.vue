<template>
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
  <NavBarView />
  <RouterView />

  <Transition name="fade">
    <ToastBox />
  </Transition>
</template>
<script>
// App.vue 에서 emit값 다 처리할 예정이라 여기서 toast 받는다.
import ToastBox from "@/components/ToastBox.vue";
// import { useToast } from "@/composables/toast";
import NavBarView from "@/views/NavbarView.vue";
export default {
  components: {
    ToastBox,
    NavBarView,
  },
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
<style scoped>
#app {
}
.fade-enter-active,
.fade-leave-active {
  transition: all opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.faed-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
