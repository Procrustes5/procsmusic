<template>
  <div>
    <h2>Set Up Two-Factor Authentication</h2>
    <div v-if="qrCodeDataUrl">
      <p>Scan this QR code with your authenticator app:</p>
      <img :src="qrCodeDataUrl" alt="TOTP QR Code" />
    </div>
    <div v-if="sharedSecret">
      <p>Or enter this code manually in your authenticator app:</p>
      <code>{{ sharedSecret }}</code>
    </div>
    <div>
      <input v-model="totpCode" placeholder="Enter TOTP Code" />
      <button @click="confirmSetup" :disabled="isLoading">
        {{ isLoading ? 'Confirming...' : 'Confirm Setup' }}
      </button>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const qrCodeDataUrl = ref('')
const sharedSecret = ref('')
const totpCode = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

onMounted(async () => {
  const result = await authStore.setUpTOTP()
  if (result.success) {
    qrCodeDataUrl.value = result.qrCodeDataUrl
    sharedSecret.value = result.sharedSecret
  } else {
    errorMessage.value = result.error || 'Failed to set up TOTP'
  }
})

const confirmSetup = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const result = await authStore.confirmTOTPSetup(totpCode.value)
    if (result.success) {
      console.log('TOTP setup confirmed')
      // Handle successful TOTP setup (e.g., redirect to dashboard)
    } else {
      errorMessage.value = result.error || 'Failed to confirm TOTP setup'
    }
  } catch (error) {
    errorMessage.value = error.message || 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>