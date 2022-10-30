import { useAuthStore } from '@/stores/auth.store';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export type HttpResponse = {
  status: number,
  data?: {}
};

const backEndClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

type ResponseError =  {
  msg: string,
  systemErr: string,
};

type Response = {
  status: number,
  data?: Record<string, unknown>,
  err?: ResponseError,
};

const token = useAuthStore().user.tokenId;

function getRoute(path: string): string {
  return `${import.meta.env.VITE_BACKEND_API}${import.meta.env.VITE_API}${import.meta.env.VITE_API_VERSION}${path}`;
}

async function performGet<T>(path: string): Promise<T> {
  const route = getRoute(path);
  const response = await backEndClient.get(route, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  console.log('%c⧭', 'color: #e50000', response.data);
  return new Promise((resolve, reject) => {
    if (response.status !== 200) {
      reject(response.data.err);
    } else {
      resolve(response.data.data);
    }
  });
}

async function performPost<T, U>(path: string, payload: U, config: AxiosRequestConfig = {}): Promise<T> {
  const route = getRoute(path);
  console.log('%c⧭', 'color: #807160', route);
  try {
    const response = await backEndClient.post(route, payload, config);
    return new Promise((resolve, reject) => {
      if (response.status !== 200) {
        reject(response.data.err);
      } else {
        resolve(response.data.data);
      }
    })
  } catch (error) {
    const err = error as AxiosError;
    const errContent = err.response?.data;
    const errMsg = errContent as Response;
    console.log('%c⧭', 'color: #997326', errMsg);
    console.log('%c⧭', 'color: #731d6d', err.response?.data);
    throw new Error(errMsg.err?.msg as string);
  }
}

async function performPut<T>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<Record<string, unknown> | undefined> {
  const route = getRoute(path);
  const response: Response = await backEndClient.put(route, payload, config);
  return new Promise((resolve, reject) => {
    switch(response.status) {
      case 200:
        resolve(response.data );
        break;
      case 201: 
        resolve(response.data);
        break;
      case 204: 
        resolve(response.data)
        break;
      default: 
        console.log(response, ' - resolved with')
        reject('error')
    }
  })
}

function axiosClient() {

  async function get<T>(path: string): Promise<T> {
    return await performGet<T>(path);
  }

  async function post<T,U>(path: string, payload: U, config: AxiosRequestConfig = {}): Promise<T> {
    return await performPost<T, U>(path, payload, config);
  }

  async function put<T>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<Record<string, unknown> | undefined> {
    return await performPut<T>(path, payload, config);
  }

  // async function get64(path: string): Promise<string> {
  //   return await getBase64(path);
  // }

  return { get, post, put, };
} 

export {
  axiosClient,
};

export type { ResponseError }
