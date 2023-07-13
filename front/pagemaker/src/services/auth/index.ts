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

  function isTokenExpired(tokenDate: string) {
    const tokenDateTime = new Date(tokenDate);
    const expiryTime = tokenDateTime.setTime(tokenDateTime.getTime() + 59 * 60 * 60 * 1000);
    return new Date() > new Date(expiryTime);
  }

  async function login(credential: Credentials): Promise<boolean> {
    try {
      const response = await axiosClient().post(`${baseRoute}login`, credential);
      console.log('%c⧭', 'color: #86bf60', response);
      if (response) {
        const user: User = response as User;
        user.expiry = new Date().toLocaleDateString();
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

  return { login, getCachedUser, cacheUser, isTokenExpired };
}

export { auth };