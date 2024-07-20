<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="signIn">Sign In</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { signIn } from 'aws-amplify/auth'

const username = ref('')
const password = ref('')

const signIn = async () => {
  try {
    const result = await signIn({
      username: username.value,
      password: password.value
    })
    console.log('Sign in successful:', result)
    // 로그인 성공 후 처리 로직
  } catch (error) {
    console.error('Error signing in:', error)
    // 로그인 실패 처리
  }
}
</script>
