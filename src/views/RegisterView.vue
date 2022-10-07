<template>
  <div class="d-flex flex-column justify-content-center mb-3 W-5 registerform">
    <span class="text-center h3">TODO 회원가입</span>
    <div class="register-inner-form">
      <input v-model="username" type="text" placeholder="아이디" />
      <input v-model="email" type="text" placeholder="이메일" />
      <input
        @keyup.enter="onRegister"
        v-model="password"
        type="password"
        placeholder="비밀번호"
      />
      <button v-if="loading" class="border-0 m-2 py-2 px-4 bg-light">
        회원가입 중 입니다.
      </button>
      <button
        v-if="!loading"
        @click="onRegister"
        class="border-0 m-2 py-2 px-4 bg-light"
      >
        회원가입
      </button>
      <router-link :to="{ name: 'login' }">
        <button class="text-primary border-0 bg-transparent">
          계정이 이미 있으신가요? 로그인 하기
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, USER_COLLECTION } from "@/firebase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const router = useRouter();

    const onRegister = async () => {
      if (!username.value || !email.value || !password.value) {
        alert("유저네임, 이메일, 비밀번호를 모두 입력해주세요");
        return;
      }

      try {
        loading.value = true;
        const { user } = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        const doc = USER_COLLECTION.doc(user.uid);
        await doc.set({
          uid: user.uid,
          username: username.value,
          email: email.value,
        });

        alert("회원 가입에 성공하셨습니다. 로그인 해주세요.");
        router.push("/");
      } catch (err) {
        switch (err.code) {
          case "auth/invalid-email":
            alert("이메일을 바르게 입력해주세요");
            break;
          case "auth/weak-password":
            alert("비밀번호가 너무 쉬워요");
            break;
          case "auth/email-already-in-use":
            alert("이미 가입되어 있는 이메일 입니다.");
            break;
          default:
            alert("회원가입실패");
            break;
        }
      } finally {
        loading.value = false;
      }
    };
    return {
      username,
      email,
      password,
      loading,
      onRegister,
    };
  },
};
</script>

<style>
.registerform {
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.register-inner-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}
</style>
