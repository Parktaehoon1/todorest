<template>
  <div class="d-flex flex-column align-items-center mb-3 W-10">
    <span class="text-2xl font-bold">트위터 회원가입</span>
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
export default {};
</script>

<style></style>
