<template>
  <div class="d-flex flex-column justify-content-center mb-3 W-5 loginform">
    <span class="text-center h3">TodoLIST 로그인</span>
    <div class="login-inner-form">
      <input v-model="email" type="text" placeholder="이메일" />
      <input
        @keyup.enter="onLogin"
        v-model="password"
        type="password"
        placeholder="비밀번호"
      />
      <button v-if="loading" class="border-0 m-2 py-2 px-4 bg-light">
        로그인 중 입니다.
      </button>
      <button
        v-if="!loading"
        @click="onLogin"
        class="border-0 m-2 py-2 px-4 bg-light"
      >
        로그인
      </button>

      <router-link :to="{ name: 'register' }">
        <button class="text-primary border-0 bg-transparent">
          계정이 없으신가요? 회원가입 하기
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, USER_COLLECTION } from "@/firebase";
import { useRouter } from "vue-router";
import store from "@/store/index";
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
        console.log("dddddddoc", doc.data());
        store.commit("SET_USER", doc.data());
        console.log("commit 후 ", doc.data());
        router.replace("/home");
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
      loading,
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
.login-inner-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}
</style>
