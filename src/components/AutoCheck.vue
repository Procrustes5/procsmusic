<template>
  <div>
    <p v-if="isAuthenticated">사용자 인증됨</p>
    <p v-else-if="authChecked">사용자 인증 필요</p>
    <p v-else>인증 상태 확인 중...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentUser } from 'aws-amplify/auth'

const isAuthenticated = ref(false)
const authChecked = ref(false)

onMounted(async () => {
  try {
    await getCurrentUser()
    isAuthenticated.value = true
  } catch (error) {
    console.error('User is not authenticated', error)
  } finally {
    authChecked.value = true
  }
})
</script>