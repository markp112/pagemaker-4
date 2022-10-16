import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

type User = {
  email: string,
  uid: string,
  displayName: string,
};

export const useAuthStore = defineStore({
  id:'authStore',

  state: () => {
    return {
      _user: {} as User,
    }
  },

  getters: {
    user: (state) => {
      return state._user;
    },

    userUid: (state) => {
      return state._user.uid;
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
      this.$state._user = user;
    },

    cacheUser() {
      if(this.$state._user.uid === '') {
        throw new Error('User store cache user: user not defined')
      }
      window.localStorage.setItem('PMdisplayName', this.$state._user.displayName);
      window.localStorage.setItem('PMuid', this.$state._user.uid);
      window.localStorage.setItem('PMdemail', this.$state._user.email);
    }
  }

})

export type { User };