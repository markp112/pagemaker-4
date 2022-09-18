import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id:'authStore',

  state: () => ({
    user: {}
  }),


})