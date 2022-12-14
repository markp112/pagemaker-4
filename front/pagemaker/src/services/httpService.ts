import axios, { type AxiosRequestConfig } from 'axios';

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

type Response = {
  status: number,
  data?: Record<string, unknown>,
  err?: {
    msg: string,
    systemErr: string,
  },
};

function getRoute(path: string): string {
  return `${import.meta.env.VITE_BACKEND_API}${import.meta.env.VITE_API}${import.meta.env.VITE_API_VERSION}${path}`;
}

async function performGet<T>(path: string): Promise<T> {
  const route = getRoute(path);
  const response = await backEndClient.get(route);
  console.log('%c⧭', 'color: #e50000', response.data);
  return new Promise((resolve, reject) => {
    if (response.status !== 200) {
      reject(response.data.err);
    } else {
      resolve(response.data);
    }
  });
}

async function getBase64(url: string) {
  return backEndClient.get(url, { responseType: 'arraybuffer' })
  .then(response => Buffer.from(response.data, 'binary').toString('base64'));
}

async function performPost<T>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<Record<string, unknown> | undefined> {
  const route = getRoute(path);
  const response: Response = await backEndClient.post(route, payload, config);
  console.log('%c⧭', 'color: #33cc99', response);
  return new Promise((resolve, reject) => {
    switch(response.status) {
      case 200:
        resolve(response.data);
        break;
      case 201: 
        resolve(response.data);
        break;
      default: 
        console.log(response, ' - resolved with')
        reject('error')
    }
  })
}

async function performPut<T>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<Record<string, unknown> | undefined> {
  const route = getRoute(path);
  const response: Response = await backEndClient.put(route, payload, config);
  console.log('%c⧭', 'color: #33cc99', {response});
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

  async function post<T>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<Record<string, unknown> | undefined> {
    return await performPost<T>(path, payload, config);
  }

  async function put<T>(path: string, payload: T, config: AxiosRequestConfig = {}): Promise<Record<string, unknown> | undefined> {
    return await performPut<T>(path, payload, config);
  }

  async function get64(path: string): Promise<string> {
    return await getBase64(path);
  }

  return { get, post, put, get64 };
} 

export {
  axiosClient,
};
