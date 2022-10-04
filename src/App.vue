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
  <RouterView
    @update-todo-toast="updateTodoToast"
    @new-todo-toast="newTodoToast"
    @update-load-fail-toast="updateLoadFailToast"
    @update-todo-fail-toast="updateTodoFailToast"
    @err-subject-toast="errSubjectToast"
    @new-todo-fail-toast="newTodoFailToast"
    @list-load-fail-toast="listLoadFailToast"
    @delete-todo-toast="deleteTodoToast"
    @delete-todo-fail-toast="deleteTodoFailToast"
  />

  <Transition name="fade">
    <ToastBox v-if="showToast" :message="toastMessage" :color="toastType" />
  </Transition>
</template>
<script>
// App.vue 에서 emit값 다 처리할 예정이라 여기서 toast 받는다.
import ToastBox from "@/components/ToastBox.vue";
import { useToast } from "@/composables/toast";
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
    // 안내창 관련 composables 에 useToast 받는다.
    const { showToast, toastMessage, toastType, triggerToast } = useToast();

    const updateTodoToast = () => {
      triggerToast("내용이 업데이트 되었습니다.");
    };
    const newTodoToast = () => {
      triggerToast("새글이 등록되었습니다");
    };
    const updateLoadFailToast = () => {
      triggerToast("내용을 가지고 오는 데 실패하였습니다.", "danger");
    };
    const updateTodoFailToast = () => {
      triggerToast("업데이트 실패하였습니다.", "danger");
    };
    const errSubjectToast = () => {
      triggerToast("제목을 입력하세요.", "danger");
    };
    const newTodoFailToast = () => {
      triggerToast("새글 등록에 실패하였습니다.", "danger");
    };
    const listLoadFailToast = () => {
      triggerToast("목록 호출에 실패하였습니다.", "danger");
    };
    const deleteTodoToast = () => {
      triggerToast("목록을 삭제하였습니다.");
    };
    const deleteTodoFailToast = () => {
      triggerToast("목록 삭제에 실패하였습니다.", "danger");
    };

    return {
      sorry,

      updateTodoToast,
      newTodoToast,
      updateLoadFailToast,
      updateTodoFailToast,
      errSubjectToast,
      newTodoFailToast,
      listLoadFailToast,
      deleteTodoToast,
      deleteTodoFailToast,

      showToast,
      toastMessage,
      toastType,
      triggerToast,
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
