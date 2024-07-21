import { defineStore } from 'pinia'
import { getCurrentUser, signIn as amplifySignIn, signOut } from 'aws-amplify/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    authChecked: false,
    user: null,
  }),
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
        const { isSignedIn } = await amplifySignIn({ username, password })
        if (isSignedIn) {
          this.isAuthenticated = true
          await this.checkAuth() // 사용자 정보 업데이트
        }
        return isSignedIn
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async logout() {
      try {
        await signOut()
        this.isAuthenticated = false
        this.user = null
      } catch (error) {
        console.error('Logout error:', error)
      }
    },
  },
})