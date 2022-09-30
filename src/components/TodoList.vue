<template>
  <div>
    <div v-for="(item, index) in todos" v-bind:key="index" class="card mt-2">
      <div class="card-body p-2 d-flex">
        <div class="form-check flex-grow-1 align-items-center">
          <input
            style="cursor: pointer"
            type="checkbox"
            class="form-check-input"
            :checked="item.complete"
            @change="toggleTodo(index)"
          />
          <label
            style="cursor: pointer"
            @click="moveToPage(item.id)"
            class="form-check-label"
            v-bind:class="{ todostyle: item.complete }"
            >{{ item.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="openModal(item.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <teleport to="#modal">
      <ModalWin v-if="showModal" @close-modal="closeModal" @delete="onDelete">
        <template v-slot:title> 할일 삭제 </template>
        <template v-slot:body> 삭제하시겠습니까?</template>
      </ModalWin>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
import ModalWin from "@/components/ModalWin.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    ModalWin,
  },
  props: ["todos"],
  emits: ["delete-todo", "toggle-todo"],
  setup(props, { emit }) {
    const deleteTodo = (index) => {
      console.log("인덱스", index);
      emit("delete-todo", index);
    };
    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };
    // 모달 기능
    const showModal = ref(false);
    const deleteId = ref(null);
    const openModal = (id) => {
      console.log("모달아디", id);
      deleteId.value = id;
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    const onDelete = () => {
      deleteTodo(deleteId.value);
      showModal.value = false;
    };

    const router = useRouter();
    const moveToPage = (id) => {
      // router 를 이용해서 id 를 전송해준다.
      // router.push(`/todos/${id}`);
      router.push({
        name: "Todo",
        params: {
          id,
        },
      });
    };

    return {
      deleteTodo,
      toggleTodo,
      moveToPage,

      showModal,
      openModal,
      closeModal,
      onDelete,
    };
  },
};
</script>

<style></style>
