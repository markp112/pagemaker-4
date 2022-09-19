import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

type User = {
  email: string,
  uid: string,
  displayName: string,
};

export const useAuthStore = defineStore({
  id:'authStore',

  state: () => ({
    user: {} as User,
  }),


  getters: {
    user: (state) => {
      return state.user;
    },

    userUid: (state) => {
      return state.user.uid;
    }
  },

  actions: {
    setUser(user: User) {
      this.$state.user = user;
    }
  }

})

export type { User };