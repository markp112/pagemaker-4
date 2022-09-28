import { useAuthStore, type User } from '@/stores/auth.store';
import type { Credentials } from '@/views/auth/types';
import { axiosClient } from '../httpService';

function auth() {
  const baseRoute = '/auth/';

  async function login(credential: Credentials): Promise<boolean> {
    try {
      const response = await axiosClient().post(`${baseRoute}login`, credential);
      if (response) {
        const store = useAuthStore();
        const user: User = response.data as User;
        store.setUser(user);
        return true;
      } else {
        return false;
      }
    } 
    catch (err) {
      throw new Error(err as string);
    }
  }

  return { login };
}

export { auth };