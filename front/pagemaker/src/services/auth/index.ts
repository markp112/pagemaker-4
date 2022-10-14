import { useAuthStore, type User } from '@/stores/auth.store';
import type { Credentials } from '@/views/auth/types';
import { axiosClient } from '../httpService';

function auth() {
  const baseRoute = '/auth/';
  const store = useAuthStore();

  function getCachedUser(): User | null {
    return store.getCachedUser;
  }

  function cacheUser(user: User) {
    store.setUser(user);
    store.cacheUser();
  }

  async function login(credential: Credentials): Promise<boolean> {
    try {
      const response = await axiosClient().post(`${baseRoute}login`, credential);
      if (response) {
        const user: User = response.data as User;
        console.log('%c⧭', 'color: #00736b', user);
        store.setUser(user);
        store.cacheUser();
        return true;
      } else {
        return false;
      }
    } 
    catch (err) {
      throw new Error(err as string);
    }
  }

  return { login, getCachedUser, cacheUser };
}

export { auth };