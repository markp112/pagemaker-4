import loginFormVue from '@/views/auth/loginForm.vue';
import type { Credentials } from '@/views/auth/types';
import { axiosClient } from '../httpService';
function auth() {
  const baseRoute = '/auth/';

  async function login(credential: Credentials) {
    console.log('%c', 'color: #f200e2', credential);
    const user = await axiosClient().post(`${baseRoute}login`, credential);
    console.log('%c⧭', 'color: #1d5673', user);

  }

  return { login };
}

export { auth };