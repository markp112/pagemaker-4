import { useAuthStore } from '@/stores/auth.store';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export type HttpResponse = {
  status: number,
  data?: {}
};

const backEndClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1500,
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

const getToken = () => useAuthStore().user.tokenId;

function getRoute(path: string): string {
  return `${import.meta.env.VITE_BACKEND_API}${import.meta.env.VITE_API}${import.meta.env.VITE_API_VERSION}${path}`;
}

async function performGet<T>(path: string): Promise<T> {
  const route = getRoute(path);
  const response = await backEndClient.get(route, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
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

async function performPost<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
  const route = getRoute(path);
  try {
    const configOptions = config; 
    configOptions.headers = {
        'Authorization': `Bearer ${getToken()}`,
    };
    const response = await backEndClient.post(route, payload, config);
    return new Promise((resolve, reject) => {
      if (response.status >= 400) {
        reject(response.data.err);
      } 
      resolve(response.data.data);
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

async function performPut<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
  const route = getRoute(path);
  const configOptions = config; 
  configOptions.headers = {
      'Authorization': `Bearer ${getToken()}`,
  };
  const response = await backEndClient.put(route, payload, config);
  return new Promise((resolve, reject) => {
    if (response.status >= 400) {
      reject(response.data.err);
    }
    resolve(response.data.data);
  })
}

function  axiosClient() {

  async function get<T>(path: string): Promise<T> {
    return await performGet<T>(path);
  }

  async function post<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
    return await performPost<T, U>(path, payload, config);
  }

  async function put<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
    return await performPut<T, U>(path, payload, config);
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
