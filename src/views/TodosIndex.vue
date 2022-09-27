<template>
  <div class="container">
    <HeaderTitle :title="title" />
    <!-- 할일검색폼 -->
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <!-- 할일입력 -->
    <TodoForm @add-todo="addTodo" style="margin-top: 10px" />
    <!-- 서버에러 출력 -->
    <ErrorBox :errtext="error" />
    <!-- 목록없음 안내 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 할일목록 -->
    <TodoList
      :todos="todos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />
    <!-- Pagination -->
    <Pagination :page="page" :totalpage="totalPage" @getTodo="getTodo" />
  </div>
</template>

<script>
import axios from "axios";
import { computed, ref, watch, watchEffect } from "vue";
import TodoForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import Pagination from "@/components/PaginationView.vue";
import ErrorBox from "@/components/ErrorBox.vue";
import HeaderTitle from "@/components/HeaderTitie.vue";
export default {
  components: {
    TodoForm,
    TodoList,
    Pagination,
    ErrorBox,
    HeaderTitle,
  },
  setup() {
    const title = "TODO LIST";
    const todos = ref([]);
    //Pagination 구현
    // 전체목록수
    const totalCount = ref(0);
    // 페이지당 보여줄 개수
    const limit = 5;
    // 현재 페이지
    const page = ref(1);
    // 총 페이지 수
    const totalPage = computed(() => {
      return Math.ceil(totalCount.value / limit);
    });

    const searchText = ref("");

    // ref, reactive, computed, props 등이 변경될때 마다 실행
    // watchEffect 를 사용합니다.
    watchEffect(() => {
      // console.log(page.value);
      // console.log(totalCout.value);
      // console.log(filterTodos.value);
      // console.log(totalPage.value);
    });

    // 연속으로 검색어를 무수하ㅔ 보내는 부분 일정 수정
    let timeout = null;

    watch(searchText, () => {
      // 검색 기능은 추후 보완할 예정~!
      // 일정한 시간이 지나고 난 다음 1번만!! 실행
      // 타이머를 없앤다.
      clearTimeout(timeout);
      // 그리고 다시 타이머를 생성한다.
      timeout = setTimeout(() => {
        getTodo(1);
      }, 2000);
    });

    const filterTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    const getTodo = async (nowPage = page.value) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos?_page=${nowPage}&_limit=${limit}&subject_like=${searchText.value}&_order=desc&_sort=id`
        );
        todos.value = response.data;

        console.log(response.headers);
        // 총 목록수
        totalCount.value = response.headers["x-total-count"];
        console.log(totalCount.value);
        page.value = nowPage;
      } catch (err) {
        error.value = "서버 목록 호출에 실패했습니다. 잠시 뒤 이용해주세요.";
      }
    };

    getTodo();

    const error = ref("");
    const addTodo = async (todo) => {
      try {
        await axios.post("http://localhost:3000/todos", {
          id: todo.id,
          subject: todo.subject,
          complete: todo.complete,
        });
        todos.value.push(todo);
        // 목록이 갱신 됐으니까 1페이지로 이동, 안하면 데이터 꼬일수도있다
        getTodo(1);
      } catch (err) {
        error.value = "서버 데이터 저장 실패";
      }
    };

    const deleteTodo = async (index) => {
      try {
        // 현재 index 는 인덱스 번호 0,1,2,3,4 가 전송된다.
        // 실제 저장되어 있는 id를 파악한다.
        const id = todos.value[index].id;
        await axios.delete("http://localhost:3000/todos/" + id);
        todos.value.splice(index, 1);
        // 목록이 갱신 됐으니까 1페이지로 이동, 안하면 데이터 꼬일수도있다
        getTodo(page.value);
      } catch (err) {
        error.value = "삭제 요청이 거부되었습니다.";
      }
    };

    const toggleTodo = async (index) => {
      try {
        // 어느 데이터를 수정할 것인가를 전달
        // 업데이트 할 내용을 전달한다.
        const id = todos.value[index].id;
        const complete = !todos.value[index].complete;
        await axios.patch("http://localhost:3000/todos/" + id, {
          complete,
        });
        todos.value[index].complete = complete;
      } catch (err) {
        error.value = "업데이트에 실패하였습니다.";
      }
    };

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
      error,
      totalPage,
      page,
      getTodo,
      title,
    };
  },
};
</script>

<style scoped>
.todostyle {
  text-decoration: line-through;
  color: gray;
}
</style>
