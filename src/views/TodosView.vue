<template>
  <div class="container">
    <h2>Todo View</h2>
    <div v-if="loading">Loading..</div>
    <form v-if="!loading" @submit.prevent="onSave">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>Todo Subject</label>
            <input type="text" class="form-control" v-model="todo.subject" />
            <!-- v-model로 todo.subject를 실시간으로 바꿔준다 -->
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label>Status</label>
            <div>
              <button
                class="btn"
                :class="todo.complete ? 'btn-success' : 'btn-danger'"
                @click="toggleTodoState"
                type="button"
              >
                <!-- form 태그 안에 버튼은 디폴트가 submit 따라서 타입을 바꿔줘야 submit이 안됨 -->
                {{ todo.complete ? "완료" : "진행중" }}
                <!-- 삼항연산자 조건? true : false -->
              </button>
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" :disabled="todoState">
        Save
      </button>
      <button class="btn btn-outline-dark ml-2" @click="moveList">
        Cancel
      </button>
    </form>
    <ToastBox v-if="showToast" :message="toastMessage" :color="toastType" />
    <!-- 컴포넌트가 배치된곳이 부모임 -->
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "axios";
import _ from "lodash";
import ToastBox from "@/components/ToastBox.vue";
export default {
  components: {
    ToastBox,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 데이터 로딩 화면 창 상태
    const loading = ref(true);
    const todo = ref(null);
    // 원본 데이터 보관용 및 비교(todo 객체)용
    const originalTodo = ref(null);
    // 전달 받은 id를 이용해서 db에서 자료를 가져온다
    const getTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos/${route.params.id}`
        );
        todo.value = { ...response.data };
        originalTodo.value = { ...response.data };
        loading.value = false;
        triggereToast("서버 연결 되었습니다.");
      } catch (err) {
        triggereToast("서버 에러 발생, 잠시 뒤 시도해 주세요", "danger");
      }
    };
    getTodo();
    const toggleTodoState = () => {
      todo.value.complete = !todo.value.complete;
      triggereToast("상태가 변경 되었다");
    };
    const moveList = () => {
      router.push({
        name: "Todos",
      });
    };
    const onSave = async () => {
      try {
        const res = await axios.put(
          `http://localhost:3000/todos/${todo.value.id}`,
          {
            subject: todo.value.subject,
            complete: todo.value.complete,
          }
        );
        originalTodo.value = { ...res.data };
        triggereToast("저장되었습니다.");
      } catch (err) {
        triggereToast(
          "서버 에러가 발생하였습니다. 다시 저장해 주세요",
          "danger"
        );
      }
    };
    const todoState = computed(() => {
      return _.isEqual(todo.value, originalTodo.value);
    });
    // 안내창 관련
    const toastMessage = ref("");
    const toastType = ref("");
    const showToast = ref(false);
    const triggereToast = (message, color = "success") => {
      toastMessage.value = message;
      toastType.value = color;

      showToast.value = true;
      setTimeout(() => {
        // 메세지 중첩의 의도로 clearTimeout은 안썻음
        toastMessage.value = "";
        toastType.value = "";
        showToast.value = false;
      }, 2000);
    };

    return {
      todo,
      loading,
      toggleTodoState,
      moveList,
      onSave,
      todoState,
      toastMessage,
      showToast,
      toastType,
    };
  },
};
</script>

<style></style>
