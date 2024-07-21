<template>
  <div>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleSignIn" :disabled="isLoading">
      {{ isLoading ? 'Signing In...' : 'Sign In' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const isLoading = ref(false)

const handleSignIn = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    const isSignedIn = await authStore.login(username.value, password.value)
    if (isSignedIn) {
      console.log('User is signed in')
      // 로그인 성공 후 처리 (예: 페이지 리다이렉트)
    } else {
      console.log('Login failed')
    }
  } catch (error) {
    console.error('Error signing in:', error)
  } finally {
    isLoading.value = false
  }
}
</script>