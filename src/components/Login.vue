<template>
  <div class="login-container">
    <h2>{{ getTitle }}</h2>

    <!-- 일반 로그인 폼 -->
    <div v-if="currentStep === 'SIGN_IN'">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleSignIn" :disabled="isLoading">
        {{ isLoading ? 'Signing In...' : 'Sign In' }}
      </button>
    </div>

    <!-- 비밀번호 재설정 폼 -->
    <div v-else-if="currentStep === 'RESET_PASSWORD'">
      <input v-model="newPassword" type="password" placeholder="New Password" />
      <input v-model="confirmationCode" placeholder="Confirmation Code" />
      <button @click="handleResetPassword" :disabled="isLoading">
        {{ isLoading ? 'Resetting...' : 'Reset Password' }}
      </button>
    </div>

    <!-- TOTP 설정 폼 -->
    <div v-else-if="currentStep === 'TOTP_SETUP'">
      <div v-if="qrCodeDataUrl">
        <p>Scan this QR code with your authenticator app:</p>
        <img :src="qrCodeDataUrl" alt="TOTP QR Code" />
      </div>
      <div v-if="sharedSecret">
        <p>Or enter this code manually in your authenticator app:</p>
        <code>{{ sharedSecret }}</code>
      </div>
      <input v-model="totpCode" placeholder="Enter TOTP Code" />
      <button @click="handleConfirmTOTP" :disabled="isLoading">
        {{ isLoading ? 'Confirming...' : 'Confirm TOTP Setup' }}
      </button>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// 상태 변수들
const currentStep = ref('SIGN_IN')
const username = ref('')
const password = ref('')
const newPassword = ref('')
const confirmationCode = ref('')
const totpCode = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const qrCodeDataUrl = ref('')
const sharedSecret = ref('')

// 제목 계산
const getTitle = computed(() => {
  switch (currentStep.value) {
    case 'SIGN_IN': return 'Sign In'
    case 'RESET_PASSWORD': return 'Reset Password'
    case 'TOTP_SETUP': return 'Set Up Two-Factor Authentication'
    default: return 'Authentication'
  }
})

// 로그인 처리
const handleSignIn = async () => {
  if (isLoading.value) return
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.login(username.value, password.value)
    if (result.success) {
      successMessage.value = 'Successfully signed in!'
      // 로그인 성공 후 처리 (예: 리다이렉트)
    } else if (result.nextStep === 'RESET_PASSWORD') {
      currentStep.value = 'RESET_PASSWORD'
      await handleInitiateResetPassword()
    } else if (result.nextStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP') {
      currentStep.value = 'TOTP_SETUP'
      await setupTOTP()
    } else {
      errorMessage.value = `Login failed: ${result.error || 'Unknown error'}`
    }
  } catch (error) {
    errorMessage.value = `Unexpected error: ${error.message || 'Unknown error'}`
  } finally {
    isLoading.value = false
  }
}

// 비밀번호 재설정 초기화
const handleInitiateResetPassword = async () => {
  try {
    const result = await authStore.initiateResetPassword(username.value)
    if (!result.success) {
      errorMessage.value = `Failed to initiate password reset: ${result.error || 'Unknown error'}`
    } else {
      successMessage.value = 'Password reset initiated. Check your email for the confirmation code.'
    }
  } catch (error) {
    errorMessage.value = `Unexpected error: ${error.message || 'Unknown error'}`
  }
}

// 비밀번호 재설정 처리
const handleResetPassword = async () => {
  if (isLoading.value) return
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.confirmResetPassword(
      username.value,
      newPassword.value,
      confirmationCode.value
    )
    if (result.success) {
      successMessage.value = 'Password reset successful. Please sign in with your new password.'
      currentStep.value = 'SIGN_IN'
    } else {
      errorMessage.value = `Failed to reset password: ${result.error || 'Unknown error'}`
    }
  } catch (error) {
    errorMessage.value = `Unexpected error: ${error.message || 'Unknown error'}`
  } finally {
    isLoading.value = false
  }
}

// TOTP 설정
const setupTOTP = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.setUpTOTP()
    if (result.success) {
      qrCodeDataUrl.value = result.qrCodeDataUrl
      sharedSecret.value = result.sharedSecret
      successMessage.value = 'TOTP setup initiated. Please scan the QR code or enter the secret key in your authenticator app.'
    } else {
      errorMessage.value = result.error || 'Failed to set up TOTP'
    }
  } catch (error) {
    errorMessage.value = `Unexpected error: ${error.message || 'Unknown error'}`
  } finally {
    isLoading.value = false
  }
}

// TOTP 확인
const handleConfirmTOTP = async () => {
  if (isLoading.value) return
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.confirmTOTPSetup(totpCode.value)
    if (result.success) {
      successMessage.value = 'TOTP setup confirmed. You are now signed in.'
      // TOTP 설정 성공 후 처리 (예: 리다이렉트)
    } else {
      errorMessage.value = result.error || 'Failed to confirm TOTP setup'
    }
  } catch (error) {
    errorMessage.value = `Unexpected error: ${error.message || 'Unknown error'}`
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

input, button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>