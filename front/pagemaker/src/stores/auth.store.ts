import { defineStore } from 'pinia';

type User = {
  email: string,
  uid: string,
  displayName: string,
  tokenId: string,
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
          email: window.localStorage.getItem('PMEmail')!,
          uid: window.localStorage.getItem('PMuid')!,
          displayName: window.localStorage.getItem('PMemail')!,
          tokenId: window.localStorage.getItem('PMToken')!
        } 
        return user;
      } else {
        return null;
      }
    }

  },

  actions: {
    setUser(user: User) {
      console.log('%c⧭', 'color: #aa00ff', user);
      this.$state._user = user;
    },

    cacheUser() {
      if(this.$state._user.uid === '') {
        throw new Error('User store cache user: user not defined')
      }
      window.localStorage.setItem('PMdisplayName', this.$state._user.displayName);
      window.localStorage.setItem('PMuid', this.$state._user.uid);
      window.localStorage.setItem('PMEmail', this.$state._user.email);
      window.localStorage.setItem('PMToken', this.$state._user.tokenId);
    }
  }

})

export type { User };