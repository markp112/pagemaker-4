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
    },

    getCachedUser: (): User | null => {
      if (window.localStorage.getItem('PMuid')) {
        const user: User = {
          email: window.localStorage.getItem('PMemail')!,
          uid: window.localStorage.getItem('PMuid')!,
          displayName: window.localStorage.getItem('PMemail')!
        } 
        return user;
      } else {
        return null;
      }
    }


  },

  actions: {
    setUser(user: User) {
      this.$state.user = user;
    },

    cacheUser() {
      if(this.$state.user.uid === '') {
        throw new Error('User store cache user: user not defined')
      }
      window.localStorage.setItem('PMdisplayName', this.$state.user.displayName);
      window.localStorage.setItem('PMuid', this.$state.user.uid);
      window.localStorage.setItem('PMdemail', this.$state.user.email);
    }
  }

})

export type { User };