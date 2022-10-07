import { Response } from '@api/types';

function constructResponse<T>(data: T, status: number): Response {
  return {
    data: data,
    status: status,
  };
}

export { constructResponse };