import { displayMessage } from '@/common/displayMessage';
import { useAuthStore } from '@/stores/auth.store';
import type { AxiosResponse } from 'axios';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

const RESPONSE_ERROR = 400;

export type HttpResponse<T> = {
  status: number,
  data?: T
};

const backEndClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 4000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
const backEndClientMultiPart = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 8000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
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
  try {
    const response = await backEndClient.get(route, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      }
    });
    if (response.status !== 200) {
      displayMessage(response.data.data.err, 'error', 'Failed');
    }
    return <T>response.data.data;
  } catch (err) {
    const msg = (err as Error).message;
    displayMessage(msg, 'error', 'Error');
    return <T>null;
  }
}

async function performPost<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
  const route = getRoute(path);
  try {
    const configOptions = config; 
    configOptions.headers = {
        'Authorization': `Bearer ${getToken()}`,
    };
    const response = await backEndClient.post(route, payload, config);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    const errContent = err.response as AxiosResponse;
    const errMsg = errContent.data as { data: {name: string, _status: number }};
    displayMessage(errMsg.data.name, 'error', 'Failed');
    throw new Error(errMsg.data.name);
  }
}
async function performMultipartPost<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
  const route = getRoute(path);
  try {
    const configOptions = config; 
    configOptions.headers = {
        'Authorization': `Bearer ${getToken()}`,
    };
    const response = await backEndClientMultiPart.post(route, payload, config);
    return new Promise((resolve, reject) => {
      if (response.status >= RESPONSE_ERROR) {
        displayMessage(response.data.data.err, 'error', 'Failed');
        reject(response.data.err);
      } 
      resolve(response.data.data);
    })
  } catch (error) {
    console.log('%c⧭', 'color: #d90000', error);
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
      displayMessage(response.data.data.err, 'error', 'Failed');
      reject(response.data.err);
    }
    resolve(response.data.data);
  })
}

async function performDelete(path: string, config: AxiosRequestConfig = {}): Promise<void> {
  try {
    const configOptions = config; 
    configOptions.headers = {
      'Authorization': `Bearer ${getToken()}`,
  };
    const route = getRoute(path);
    await backEndClient.delete(route, config);
  } catch (error) {
    console.log('%c⧭', 'color: #86bf60', error);
    
  }
}

function  axiosClient() {

  async function get<T>(path: string): Promise<T> {
    return performGet<T>(path);
  }

  async function post<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
    return performPost<T, U>(path, payload, config);
  }

  async function postMultiPart<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
    return performMultipartPost<T, U>(path, payload, config);
  }

  async function put<T, U>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<U> {
    return performPut<T, U>(path, payload, config);
  }

  async function deleteResource(path: string): Promise<void> {
    await performDelete(path);
  }

  return { get, post, postMultiPart, put, deleteResource };
} 

export type { ResponseError };

export {
  axiosClient,
};
