<template>
  <div class="d-flex flex-column align-items-center mb-3 W-10 loginform">
    <span>TodoLIST 로그인</span>

    <input v-model="email" type="text" placeholder="이메일" />
    <input
      @keyup.enter="onLogin"
      v-model="password"
      type="password"
      placeholder="비밀번호"
    />
    <button v-if="loading">로그인 중 입니다.</button>
    <button v-if="!loading" @click="onLogin">로그인</button>

    <router-link to="/register">
      <button class="text-primary">계정이 없으신가요? 회원가입 하기</button>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, USER_COLLECTION } from "@/firebase";
import { useRouter } from "vue-router";
import store from "@/store";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const loading = ref(false);

    const onLogin = async () => {
      if (!email.value || !password.value) {
        alert("이메일, 비밀번호를 모두 입력해주세요");
        return;
      }
      try {
        loading.value = true;
        const { user } = await auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        // get user info
        const doc = await USER_COLLECTION.doc(user.uid).get();
        store.commit("SET_USER", doc.data());

        router.replace("/");
      } catch (err) {
        switch (err.code) {
          case "auth/invalid-email":
            alert("잘못된 이메일 형식입니다.");
            break;
          case "auth/wrong-password":
            alert("비밀번호가 틀립니다.");
            break;
          case "auth/user-not-found":
            alert("등록되지 않은 이메일입니다.");
            break;
          default:
            alert(err.message);
            break;
        }
      } finally {
        loading.value = false;
      }
    };
    return {
      email,
      password,
      onLogin,
    };
  },
};
</script>

<style>
.loginform {
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
