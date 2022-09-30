<template>
  <div class="d-flex flex-column align-items-center mb-3 W-10 registerform">
    <span class="text-2xl font-bold">TODO 회원가입</span>
    <input v-model="username" type="text" placeholder="아이디" />
    <input v-model="email" type="text" placeholder="이메일" />
    <input
      @keyup.enter="onRegister"
      v-model="password"
      type="password"
      placeholder="비밀번호"
    />
    <button v-if="loading">회원가입 중 입니다.</button>
    <button v-if="!loading" @click="onRegister">회원가입</button>
    <router-link to="/login">
      <button class="text-primary">계정이 이미 있으신가요? 로그인 하기</button>
    </router-link>
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
        const credential = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        const user = credential.user;
        // const {user} = await auth.createUserWithEmailAndPassword(
        //   email.value,
        //   password.value
        // );
        // 코드와 동일.
        const doc = USER_COLLECTION.doc(user.uid);
        await doc.set({
          uid: user.uid,
          username: username.value,
          email: email.value,
          profile_image_url: "/profile.jpeg",
        });
        alert("회원 가입에 성공하셨습니다. 로그인 해주세요.");
        router.push("/login");
        // 라우터로 이동
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
        // finally는 try가 실행이되든 실패를 하든 실행되는 것
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
</style>
