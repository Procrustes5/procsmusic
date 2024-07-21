import { defineStore } from 'pinia'
import {
  getCurrentUser,
  signIn,
  signOut,
  confirmSignIn,
  resetPassword,
  confirmResetPassword,
  setUpTOTP as amplifySetUpTOTP
} from 'aws-amplify/auth'
import QRCode from 'qrcode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    authChecked: false,
    user: null as any | null,
    signInData: null as any | null,
  }),
  getters: {
    username: (state) => state.user?.username || '',
  },
  actions: {
    async checkAuth() {
      if (this.authChecked) return
      try {
        const user = await getCurrentUser()
        this.isAuthenticated = true
        this.user = user
      } catch (error) {
        this.isAuthenticated = false
        this.user = null
      } finally {
        this.authChecked = true
      }
    },
    async login(username: string, password: string) {
      try {
        const { isSignedIn, nextStep } = await signIn({ username, password })
        if (isSignedIn) {
          this.isAuthenticated = true
          await this.checkAuth()
          return { success: true }
        } else {
          this.signInData = nextStep
          return { success: false, nextStep: nextStep.signInStep, totpSetupDetails: nextStep.totpSetupDetails }
        }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, error: error.message || 'Unknown error' }
      }
    },
    async confirmSignInWithNewPassword(newPassword: string) {
      try {
        if (!this.signInData) {
          throw new Error('No sign in data available')
        }
        const { isSignedIn } = await confirmSignIn({
          challengeResponse: newPassword
        })
        if (isSignedIn) {
          this.isAuthenticated = true
          await this.checkAuth()
          return { success: true }
        } else {
          return { success: false, error: 'Failed to confirm sign in' }
        }
      } catch (error: any) {
        console.error('Confirm sign in error:', error)
        return { success: false, error: error.message || 'Unknown error' }
      }
    },
    async confirmSignInWithMFACode(mfaCode: string) {
      try {
        if (!this.signInData) {
          throw new Error('No sign in data available')
        }
        const { isSignedIn } = await confirmSignIn({
          challengeResponse: mfaCode
        })
        if (isSignedIn) {
          this.isAuthenticated = true
          await this.checkAuth()
          return { success: true }
        } else {
          return { success: false, error: 'Failed to confirm sign in with MFA code' }
        }
      } catch (error: any) {
        console.error('Confirm sign in with MFA code error:', error)
        return { success: false, error: error.message || 'Unknown error' }
      }
    },
    async logout() {
      try {
        await signOut()
        this.isAuthenticated = false
        this.user = null
        this.signInData = null
        return { success: true }
      } catch (error: any) {
        console.error('Logout error:', error)
        return { success: false, error: error.message || 'Unknown error' }
      }
    },
    async initiateResetPassword(username: string) {
      try {
        const { nextStep } = await resetPassword({ username })
        return { success: true, nextStep }
      } catch (error: any) {
        console.error('Initiate reset password error:', error)
        return { success: false, error: error.message || 'Unknown error' }
      }
    },
    async confirmResetPassword(username: string, newPassword: string, confirmationCode: string) {
      try {
        await confirmResetPassword({ username, newPassword, confirmationCode })
        return { success: true }
      } catch (error: any) {
        console.error('Confirm reset password error:', error)
        return { success: false, error: error.message || 'Unknown error' }
      }
    },
    async setUpTOTP() {
      try {
        const { totpSetupDetails } = await amplifySetUpTOTP()
        const issuer = 'procsmusic' // 앱 이름을 여기에 입력하세요
        const username = this.user?.username || 'user'
        const totpUri = `otpauth://totp/${issuer}:${username}?secret=${totpSetupDetails.sharedSecret}&issuer=${issuer}`
        const qrCodeDataUrl = await QRCode.toDataURL(totpUri)
        return {
          success: true,
          sharedSecret: totpSetupDetails.sharedSecret,
          qrCodeDataUrl
        }
      } catch (error) {
        console.error('TOTP setup error:', error)
        return {
          success: false,
          error: error.message || 'Failed to set up TOTP'
        }
      }
    },

    async confirmTOTPSetup(totpCode: string) {
      try {
        const { isSignedIn } = await confirmSignIn({ challengeResponse: totpCode })
        if (isSignedIn) {
          this.isAuthenticated = true
          await this.checkAuth()
          return { success: true }
        } else {
          return { success: false, error: 'Failed to confirm TOTP setup' }
        }
      } catch (error) {
        console.error('Confirm TOTP setup error:', error)
        return { success: false, error: error.message || 'Failed to confirm TOTP setup' }
      }
    },
    clearAuthData() {
      this.isAuthenticated = false
      this.user = null
      this.signInData = null
      this.authChecked = false
    }
  },
})