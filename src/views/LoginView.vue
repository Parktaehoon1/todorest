<template>
  <div class="d-flex flex-column align-items-center mb-3 W-10">
    <span>트위터 로그인</span>

    <input v-model="email" type="text" placeholder="이메일" />
    <input
      @keyup.enter="onLogin"
      v-model="password"
      type="password"
      placeholder="비밀번호"
    />
    <button>로그인 중 입니다.</button>
    <button>로그인</button>

    <router-link to="/register">
      <button class="text-primary">계정이 없으신가요? 회원가입 하기</button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
