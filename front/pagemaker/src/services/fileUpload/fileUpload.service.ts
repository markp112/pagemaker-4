import { axiosClient } from '../httpService';

const BASE_ROUTE = '/storage'
const getRoute = (userId: string) => `${BASE_ROUTE}/${userId}`;

function FileUploadService() {

  async function uploadFile(file: File, userId: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('filename', file.name);
      return await axiosClient().postMultiPart<FormData, string>(`${getRoute(userId)}`, formData);
    } catch (error) {
      return '';
    }
  }

  return { uploadFile };
}

export { FileUploadService };
