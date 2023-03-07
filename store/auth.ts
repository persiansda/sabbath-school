import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    uid: null,
    email: null,
    displayName: null,
    stsTokenManager: null,
    isAnonymous: false,
  }),

  getters: {
    isLoggedIn: (state) => {
      return state.displayName || state.isAnonymous
    },
  },

  actions: {
    logOut() {},
  },
})
